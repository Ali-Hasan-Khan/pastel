import { NextRequest } from 'next/server'
import { POST } from '@/app/api/upload/route'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

// Mock dependencies
jest.mock('@clerk/nextjs/server')
jest.mock('@/lib/prisma', () => ({
    prisma: {
        user: {
            upsert: jest.fn(),
        },
        rateLimit: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
    },
}))

const mockUpload = jest.fn()
const mockGetPublicUrl = jest.fn()

jest.mock('@/lib/supabase', () => ({
    supabase: {
        storage: {
            from: jest.fn(() => ({
                upload: mockUpload,
                getPublicUrl: mockGetPublicUrl,
            })),
        },
    },
}))

const mockAuth = auth as jest.MockedFunction<typeof auth>
const mockPrisma = prisma as any
const mockSupabase = supabase as any

describe('/api/upload rate limiting', () => {
    const mockUserId = 'user_123'
    const mockUser = {
        id: 'user_db_123',
        clerkId: mockUserId,
        plan: 'FREE' as const,
    }

    const createMockFile = (name: string, type: string, size: number) => {
        const file = new File(['test content'], name, { type })
        // Override the size property
        Object.defineProperty(file, 'size', {
            value: size,
            writable: true,
            configurable: true,
            enumerable: true
        })
        return file
    }

    const createMockFormData = (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        return formData
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockAuth.mockResolvedValue({
            userId: mockUserId,
            sessionId: 'session_123',
            sessionClaims: {},
            sessionStatus: 'active',
            actor: null,
            isAuthenticated: true,
            tokenType: 'session_token',
            getToken: jest.fn(),
            has: jest.fn(),
            debug: jest.fn(),
        } as any)
        mockPrisma.user.upsert.mockResolvedValue(mockUser)

        // Mock Supabase upload success
        mockUpload.mockResolvedValue({
            data: { path: 'test-file.jpg' },
            error: null,
        })

        mockGetPublicUrl.mockReturnValue({
            data: { publicUrl: 'https://example.com/test-file.jpg' },
        })
    })

    describe('Rate limit enforcement', () => {
        it('should allow requests within rate limit', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024) // 1MB
            const formData = createMockFormData(file)

            // Mock rate limit check - within limit
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 1, // Under the limit of 3
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 2,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data.success).toBe(true)
            expect(data.data.url).toBe('https://example.com/test-file.jpg')
            expect(response.headers.get('X-RateLimit-Limit')).toBe('3')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('1')
        })

        it('should reject requests that exceed rate limit', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            // Mock rate limit check - exceeded limit
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 3, // At the limit of 3
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(429)
            expect(data.error).toBe('Rate limit exceeded')
            expect(data.message).toContain('You have exceeded the rate limit for /api/upload')
            expect(data.limit).toBe(3)
            expect(data.remaining).toBe(0)
            expect(response.headers.get('Retry-After')).toBeDefined()
        })

        it('should create new rate limit record when none exists', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            // Mock no existing rate limit record
            mockPrisma.rateLimit.findUnique.mockResolvedValue(null)
            mockPrisma.rateLimit.create.mockResolvedValue({
                id: 'rate_limit_new',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)

            expect(response.status).toBe(200)
            expect(mockPrisma.rateLimit.create).toHaveBeenCalledWith({
                data: {
                    userId: mockUser.id,
                    endpoint: '/api/upload',
                    windowStart: expect.any(Date),
                    count: 0,
                },
            })
        })

        it('should handle different user plans correctly', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            // Test PREMIUM user with higher limits
            const premiumUser = { ...mockUser, plan: 'PREMIUM' as const }
            mockPrisma.user.upsert.mockResolvedValue(premiumUser)

            // Mock rate limit check for premium user
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_premium',
                userId: premiumUser.id,
                endpoint: '/api/upload',
                count: 25, // Under premium limit of 50
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_premium',
                userId: premiumUser.id,
                endpoint: '/api/upload',
                count: 26,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)

            expect(response.status).toBe(200)
            expect(response.headers.get('X-RateLimit-Limit')).toBe('50')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('24')
        })

        it('should handle ULTIMATE users with unlimited requests', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            // Test ULTIMATE user with unlimited requests
            const ultimateUser = { ...mockUser, plan: 'ULTIMATE' as const }
            mockPrisma.user.upsert.mockResolvedValue(ultimateUser)

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)

            expect(response.status).toBe(200)
            expect(response.headers.get('X-RateLimit-Limit')).toBe('-1')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('-1')
        })
    })

    describe('File upload functionality', () => {
        it('should successfully upload valid image files', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 2,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data.success).toBe(true)
            expect(data.data.url).toBe('https://example.com/test-file.jpg')
            expect(data.data.filename).toBeDefined()
            expect(data.data.originalName).toBe('test.jpg')
            expect(data.data.size).toBe(1024 * 1024)
            expect(data.data.type).toBe('image/jpeg')
        })

        it('should reject files that are too large', async () => {
            const file = createMockFile('large.jpg', 'image/jpeg', 6 * 1024 * 1024) // 6MB
            const formData = createMockFormData(file)

            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(400)
            expect(data.success).toBe(false)
            expect(data.error).toBe('File too large. Maximum size is 5MB.')
        })

        it('should reject invalid file types', async () => {
            const file = createMockFile('test.txt', 'text/plain', 1024)
            const formData = createMockFormData(file)

            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(400)
            expect(data.success).toBe(false)
            expect(data.error).toBe('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.')
        })

        it('should reject requests without files', async () => {
            const formData = new FormData()

            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(400)
            expect(data.success).toBe(false)
            expect(data.error).toBe('No file provided')
        })

        it('should handle Supabase upload errors', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            // Mock Supabase upload error
            mockSupabase.storage.from().upload.mockResolvedValue({
                data: null,
                error: { message: 'Upload failed' },
            })

            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(500)
            expect(data.success).toBe(false)
            expect(data.error).toBe('Upload failed')
        })
    })

    describe('Error handling', () => {
        it('should return 401 for unauthenticated requests', async () => {
            mockAuth.mockResolvedValue({
                userId: null,
                sessionId: null,
                sessionClaims: null,
                sessionStatus: 'unauthenticated',
                actor: null,
                isAuthenticated: false,
                tokenType: null,
                getToken: jest.fn(),
                has: jest.fn(),
                debug: jest.fn(),
                redirectToSignIn: jest.fn(),
                redirectToSignUp: jest.fn(),
            } as any)

            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(401)
            expect(data.error).toBe('Unauthorized')
        })

        it('should handle rate limit database errors gracefully', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            mockPrisma.rateLimit.findUnique.mockRejectedValue(new Error('Database error'))

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)

            // Should still process the request if rate limiting fails
            expect(response.status).toBe(200)
        })

        it('should handle general errors gracefully', async () => {
            const file = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
            const formData = createMockFormData(file)

            // Mock an error in the upload process
            mockSupabase.storage.from().upload.mockRejectedValue(new Error('Network error'))

            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/upload',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(500)
            expect(data.success).toBe(false)
            expect(data.error).toBe('Upload failed')
        })
    })
})

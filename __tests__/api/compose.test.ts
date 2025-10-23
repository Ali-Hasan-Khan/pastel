import { NextRequest } from 'next/server'
import { POST } from '@/app/api/compose/route'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'



// Mock dependencies
jest.mock('@clerk/nextjs/server')
jest.mock('@/lib/prisma', () => ({
    prisma: {
        user: {
            upsert: jest.fn(),
        },
        capsule: {
            create: jest.fn(),
        },
        rateLimit: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
    },
}))

jest.mock('@/lib/redis-cache', () => ({
    invalidateCache: jest.fn(),
}))

const mockAuth = auth as jest.MockedFunction<typeof auth>
const mockPrisma = prisma as any

describe('/api/compose rate limiting', () => {
    const mockUserId = 'user_123'
    const mockUser = {
        id: 'user_db_123',
        clerkId: mockUserId,
        plan: 'FREE' as const,
    }

    const validCapsuleData = {
        title: 'Test Capsule',
        content: 'Test content',
        deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        images: [],
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
        mockPrisma.capsule.create.mockResolvedValue({
            id: 'capsule_123',
            ...validCapsuleData,
            userId: mockUser.id,
            status: 'scheduled',
            createdAt: new Date(),
            deliveredAt: null,
            aiReflection: null,
        })
    })

    describe('Rate limit enforcement', () => {
        it('should allow requests within rate limit', async () => {
            // Mock rate limit check - within limit
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/compose',
                count: 2, // Under the limit of 5
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/compose',
                count: 3,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/compose', {
                method: 'POST',
                body: JSON.stringify(validCapsuleData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data.success).toBe(true)
            expect(response.headers.get('X-RateLimit-Limit')).toBe('5')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('2')
        })

        it('should reject requests that exceed rate limit', async () => {
            // Mock rate limit check - exceeded limit
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/compose',
                count: 5, // At the limit of 5
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/compose', {
                method: 'POST',
                body: JSON.stringify(validCapsuleData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(429)
            expect(data.error).toBe('Rate limit exceeded')
            expect(data.message).toContain('You have exceeded the rate limit for /api/compose')
            expect(data.limit).toBe(5)
            expect(data.remaining).toBe(0)
            expect(response.headers.get('Retry-After')).toBeDefined()
        })

        it('should create new rate limit record when none exists', async () => {
            // Mock no existing rate limit record
            mockPrisma.rateLimit.findUnique.mockResolvedValue(null)
            mockPrisma.rateLimit.create.mockResolvedValue({
                id: 'rate_limit_new',
                userId: mockUser.id,
                endpoint: '/api/compose',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/compose', {
                method: 'POST',
                body: JSON.stringify(validCapsuleData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const response = await POST(request)

            expect(response.status).toBe(200)
            expect(mockPrisma.rateLimit.create).toHaveBeenCalledWith({
                data: {
                    userId: mockUser.id,
                    endpoint: '/api/compose',
                    windowStart: expect.any(Date),
                    count: 0,
                },
            })
        })

        it('should handle different user plans correctly', async () => {
            // Test PREMIUM user with higher limits
            const premiumUser = { ...mockUser, plan: 'PREMIUM' as const }
            mockPrisma.user.upsert.mockResolvedValue(premiumUser)

            // Mock rate limit check for premium user
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_premium',
                userId: premiumUser.id,
                endpoint: '/api/compose',
                count: 50, // Under premium limit of 100
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_premium',
                userId: premiumUser.id,
                endpoint: '/api/compose',
                count: 51,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/compose', {
                method: 'POST',
                body: JSON.stringify(validCapsuleData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const response = await POST(request)

            expect(response.status).toBe(200)
            expect(response.headers.get('X-RateLimit-Limit')).toBe('100')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('49')
        })

        it('should handle ULTIMATE users with unlimited requests', async () => {
            // Test ULTIMATE user with unlimited requests
            const ultimateUser = { ...mockUser, plan: 'ULTIMATE' as const }
            mockPrisma.user.upsert.mockResolvedValue(ultimateUser)

            const request = new NextRequest('http://localhost:3000/api/compose', {
                method: 'POST',
                body: JSON.stringify(validCapsuleData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const response = await POST(request)

            expect(response.status).toBe(200)
            expect(response.headers.get('X-RateLimit-Limit')).toBe('-1')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('-1')
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

            const request = new NextRequest('http://localhost:3000/api/compose', {
                method: 'POST',
                body: JSON.stringify(validCapsuleData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(401)
            expect(data.error).toBe('Unauthorized')
        })

        it('should handle rate limit database errors gracefully', async () => {
            mockPrisma.rateLimit.findUnique.mockRejectedValue(new Error('Database error'))

            const request = new NextRequest('http://localhost:3000/api/compose', {
                method: 'POST',
                body: JSON.stringify(validCapsuleData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const response = await POST(request)

            // Should still process the request if rate limiting fails
            expect(response.status).toBe(200)
        })
    })
})
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/analytics/heatmap/route'
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
            findMany: jest.fn(),
        },
        rateLimit: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
    },
}))

const mockAuth = auth as jest.MockedFunction<typeof auth>
const mockPrisma = prisma as any

describe('/api/analytics/heatmap rate limiting', () => {
    const mockUserId = 'user_123'
    const mockUser = {
        id: 'user_db_123',
        clerkId: mockUserId,
        plan: 'FREE' as const,
    }

    const mockCapsules = [
        {
            content: 'Happy memory with joy and love',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        },
        {
            content: 'Sad day with anxiety and stress',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
        {
            content: 'Grateful for amazing opportunities',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
    ]

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
        mockPrisma.capsule.findMany.mockResolvedValue(mockCapsules)
    })

    describe('Rate limit enforcement', () => {
        it('should allow requests within rate limit', async () => {
            // Mock rate limit check - within limit
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 5, // Under the limit of 10
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 6,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data.success).toBe(true)
            expect(data.data.days).toBeDefined()
            expect(Array.isArray(data.data.days)).toBe(true)
            expect(data.data.days.length).toBe(365)
            expect(response.headers.get('X-RateLimit-Limit')).toBe('10')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('4')
        })

        it('should reject requests that exceed rate limit', async () => {
            // Mock rate limit check - exceeded limit
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 10, // At the limit of 10
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)
            const data = await response.json()

            expect(response.status).toBe(429)
            expect(data.error).toBe('Rate limit exceeded')
            expect(data.message).toContain('You have exceeded the rate limit for /api/analytics')
            expect(data.limit).toBe(10)
            expect(data.remaining).toBe(0)
            expect(response.headers.get('Retry-After')).toBeDefined()
        })

        it('should create new rate limit record when none exists', async () => {
            // Mock no existing rate limit record
            mockPrisma.rateLimit.findUnique.mockResolvedValue(null)
            mockPrisma.rateLimit.create.mockResolvedValue({
                id: 'rate_limit_new',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)

            expect(response.status).toBe(200)
            expect(mockPrisma.rateLimit.create).toHaveBeenCalledWith({
                data: {
                    userId: mockUser.id,
                    endpoint: '/api/analytics',
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
                endpoint: '/api/analytics',
                count: 100, // Under premium limit of 200
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_premium',
                userId: premiumUser.id,
                endpoint: '/api/analytics',
                count: 101,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)

            expect(response.status).toBe(200)
            expect(response.headers.get('X-RateLimit-Limit')).toBe('200')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('99')
        })

        it('should handle ULTIMATE users with unlimited requests', async () => {
            // Test ULTIMATE user with unlimited requests
            const ultimateUser = { ...mockUser, plan: 'ULTIMATE' as const }
            mockPrisma.user.upsert.mockResolvedValue(ultimateUser)

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)

            expect(response.status).toBe(200)
            expect(response.headers.get('X-RateLimit-Limit')).toBe('-1')
            expect(response.headers.get('X-RateLimit-Remaining')).toBe('-1')
        })
    })

    describe('Heatmap functionality', () => {
        it('should generate 365 days of data', async () => {
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 2,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data.data.days.length).toBe(365)

            // Check that each day has the expected structure
            data.data.days.forEach((day: any) => {
                expect(day).toHaveProperty('date')
                expect(day).toHaveProperty('score')
                expect(day).toHaveProperty('count')
                expect(typeof day.date).toBe('string')
                expect(typeof day.score).toBe('number')
                expect(typeof day.count).toBe('number')
            })
        })

        it('should handle empty capsule data', async () => {
            mockPrisma.capsule.findMany.mockResolvedValue([])
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 2,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data.data.days.length).toBe(365)

            // All days should have score 0 and count 0
            data.data.days.forEach((day: any) => {
                expect(day.score).toBe(0)
                expect(day.count).toBe(0)
            })
        })

        it('should calculate emotional scores for each day', async () => {
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 2,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)
            const data = await response.json()

            expect(response.status).toBe(200)

            // Find days with data and check scores
            const daysWithData = data.data.days.filter((day: any) => day.count > 0)
            expect(daysWithData.length).toBeGreaterThan(0)

            daysWithData.forEach((day: any) => {
                expect(day.score).toBeGreaterThanOrEqual(0)
                expect(day.score).toBeLessThanOrEqual(10)
            })
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

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)
            const data = await response.json()

            expect(response.status).toBe(401)
            expect(data.error).toBe('Unauthorized')
        })

        it('should handle rate limit database errors gracefully', async () => {
            mockPrisma.rateLimit.findUnique.mockRejectedValue(new Error('Database error'))

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            const response = await GET(request)

            // Should still process the request if rate limiting fails
            expect(response.status).toBe(200)
        })

        it('should handle capsule database errors gracefully', async () => {
            // Mock rate limiting to succeed
            mockPrisma.rateLimit.findUnique.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_123',
                userId: mockUser.id,
                endpoint: '/api/analytics',
                count: 2,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            // Mock capsule database error
            mockPrisma.capsule.findMany.mockRejectedValue(new Error('Database error'))

            const request = new NextRequest('http://localhost:3000/api/analytics/heatmap')

            // The rate limiting middleware will catch the error and retry the handler
            // Since the handler keeps throwing the same error, it will eventually fail
            await expect(GET(request)).rejects.toThrow('Database error')
        })
    })
})

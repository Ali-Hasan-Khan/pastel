import { checkRateLimit, PLAN_LIMITS } from '@/lib/rate-limit'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
    prisma: {
        rateLimit: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
    },
}))


const mockPrisma = prisma as any


describe('Rate Limit Logic', () => {
    const userId = 'user_123'
    const endpoint = '/api/compose'

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('checkRateLimit', () => {
        it('should return success for unlimited plans', async () => {
            const result = await checkRateLimit(userId, endpoint, 'ULTIMATE')

            expect(result.success).toBe(true)
            expect(result.limit).toBe(-1)
            expect(result.remaining).toBe(-1)
        })

        it('should return success for unknown plans', async () => {
            const result = await checkRateLimit(userId, endpoint, 'UNKNOWN')

            expect(result.success).toBe(true)
            expect(result.limit).toBe(-1)
            expect(result.remaining).toBe(-1)
        })

        it('should return success for unknown endpoints', async () => {
            const result = await checkRateLimit(userId, '/api/unknown', 'FREE')

            expect(result.success).toBe(true)
            expect(result.limit).toBe(-1)
            expect(result.remaining).toBe(-1)
        })

        it('should create new rate limit record when none exists', async () => {
            mockPrisma.rateLimit.findUnique.mockResolvedValue(null)
            mockPrisma.rateLimit.create.mockResolvedValue({
                id: 'rate_limit_new',
                userId,
                endpoint,
                count: 0,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            // Add the update mock that returns the incremented count
            mockPrisma.rateLimit.update.mockResolvedValue({
                id: 'rate_limit_new',
                userId,
                endpoint,
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const result = await checkRateLimit(userId, endpoint, 'FREE')

            expect(result.success).toBe(true)
            expect(result.limit).toBe(5) // FREE plan limit
            expect(result.remaining).toBe(4)
            expect(mockPrisma.rateLimit.create).toHaveBeenCalled()
        })

        it('should increment existing rate limit record', async () => {
            const existingRecord = {
                id: 'rate_limit_existing',
                userId,
                endpoint,
                count: 2,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            mockPrisma.rateLimit.findUnique.mockResolvedValue(existingRecord)
            mockPrisma.rateLimit.update.mockResolvedValue({
                ...existingRecord,
                count: 3,
            })

            const result = await checkRateLimit(userId, endpoint, 'FREE')

            expect(result.success).toBe(true)
            expect(result.limit).toBe(5)
            expect(result.remaining).toBe(2)
            expect(mockPrisma.rateLimit.update).toHaveBeenCalledWith({
                where: { id: existingRecord.id },
                data: { count: 3 },
            })
        })

        it('should return failure when rate limit exceeded', async () => {
            const existingRecord = {
                id: 'rate_limit_exceeded',
                userId,
                endpoint,
                count: 5, // At the limit
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            mockPrisma.rateLimit.findUnique.mockResolvedValue(existingRecord)

            const result = await checkRateLimit(userId, endpoint, 'FREE')

            expect(result.success).toBe(false)
            expect(result.limit).toBe(5)
            expect(result.remaining).toBe(0)
            expect(result.retryAfter).toBeDefined()
        })

        it('should calculate correct window start time', async () => {
            const now = new Date('2024-01-01T12:30:00Z')
            jest.useFakeTimers()
            jest.setSystemTime(now)

            mockPrisma.rateLimit.findUnique.mockResolvedValue(null)
            mockPrisma.rateLimit.create.mockResolvedValue({
                id: 'rate_limit_window',
                userId,
                endpoint,
                count: 1,
                windowStart: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            await checkRateLimit(userId, endpoint, 'FREE')

            // Should create record with window start aligned to hour boundary
            expect(mockPrisma.rateLimit.create).toHaveBeenCalledWith({
                data: {
                    userId,
                    endpoint,
                    windowStart: new Date('2024-01-01T12:00:00Z'), // Hour boundary
                    count: 0,
                },
            })

            jest.useRealTimers()
        })
    })

    describe('PLAN_LIMITS configuration', () => {
        it('should have correct limits for FREE plan', () => {
            expect(PLAN_LIMITS.FREE['/api/compose']).toEqual({
                windowMs: 60 * 60 * 1000, // 1 hour
                maxRequests: 5,
            })
        })

        it('should have correct limits for PREMIUM plan', () => {
            expect(PLAN_LIMITS.PREMIUM['/api/compose']).toEqual({
                windowMs: 60 * 60 * 1000, // 1 hour
                maxRequests: 100,
            })
        })

        it('should have unlimited requests for ULTIMATE plan', () => {
            expect(PLAN_LIMITS.ULTIMATE['/api/compose']).toEqual({
                windowMs: 60 * 60 * 1000, // 1 hour
                maxRequests: -1, // Unlimited
            })
        })
    })
})
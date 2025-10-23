import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getEndpointFromPath, getUserPlan } from './rate-limit';
import { prisma } from '@/lib/prisma'

export function withRateLimit(
    handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>,
    options?: {
        skipRateLimit?: boolean
        customEndpoint?: string
    }
) {
    return async (req: NextRequest, ...args: any[]) => {
        if (options?.skipRateLimit) {
            return handler(req, ...args)
        }
        try {
            const { userId: clerkId } = await auth()
            if (!clerkId) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
            }
            const user = await prisma.user.upsert({
                where: { clerkId },
                update: {},
                create: { clerkId, plan: 'FREE' },
            })
            const endpoint = options?.customEndpoint || getEndpointFromPath(req.nextUrl.pathname)
            const rateLimitResult = await checkRateLimit(user.id, endpoint, user.plan)
            if (!rateLimitResult.success) {
                return NextResponse.json(
                    {
                        error: 'Rate limit exceeded',
                        message: `You have exceeded the rate limit for ${endpoint}. Please try again later.`,
                        limit: rateLimitResult.limit,
                        remaining: rateLimitResult.remaining,
                        reset: rateLimitResult.reset,
                        retryAfter: rateLimitResult.retryAfter
                    },
                    {
                        status: 429,
                        headers: {
                            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
                            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                            'X-RateLimit-Reset': rateLimitResult.reset.toISOString(),
                            'Retry-After': rateLimitResult.retryAfter?.toString() || '60'
                        }
                    }
                )
            }
            const response = await handler(req, ...args)
            response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
            response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
            response.headers.set('X-RateLimit-Reset', rateLimitResult.reset.toISOString())
            return response
        } catch (error) {
            console.error('Rate limiting error:', error)
            return handler(req, ...args)
        }
    }
}
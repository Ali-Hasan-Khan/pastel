import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export interface RateLimitConfig {
    windowMs: number
    maxRequests: number
    skipSuccessfulRequests?: boolean
    skipFailedRequests?: boolean
}

export interface PlanLimits {
    [key: string]: RateLimitConfig
}

export const PLAN_LIMITS: Record<string, PlanLimits> = {
    FREE: {
        '/api/upload': { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 uploads per hour
        '/api/compose': { windowMs: 60 * 60 * 1000, maxRequests: 5 }, // 5 compositions per hour
        '/api/analytics': { windowMs: 60 * 60 * 1000, maxRequests: 10 }, // 10 analytics requests per hour
    },
    PREMIUM: {
        '/api/upload': { windowMs: 60 * 60 * 1000, maxRequests: 50 }, // 50 uploads per hour
        '/api/compose': { windowMs: 60 * 60 * 1000, maxRequests: 100 }, // 100 compositions per hour
        '/api/analytics': { windowMs: 60 * 60 * 1000, maxRequests: 200 }, // 200 analytics requests per hour
    },
    ULTIMATE: {
        '/api/upload': { windowMs: 60 * 60 * 1000, maxRequests: -1 }, // Unlimited
        '/api/compose': { windowMs: 60 * 60 * 1000, maxRequests: -1 }, // Unlimited
        '/api/analytics': { windowMs: 60 * 60 * 1000, maxRequests: -1 }, // Unlimited
    }
}

export interface RateLimitResult {
    success: boolean
    limit: number
    remaining: number
    reset: Date
    retryAfter?: number
}

export async function checkRateLimit(userId: string, endpoint: string, plan: string): Promise<RateLimitResult> {
    const limits = PLAN_LIMITS[plan]
    if (!limits) {
        return {
            success: true,
            limit: -1,
            remaining: -1,
            reset: new Date(Date.now() + 60 * 60 * 1000)
        }
    }

    const config = limits[endpoint]
    if (!config) {
        return {
            success: true,
            limit: -1,
            remaining: -1,
            reset: new Date(Date.now() + 60 * 60 * 1000)
        }
    }

    // Unlimited requests
    if (config.maxRequests === -1) {
        return {
            success: true,
            limit: -1,
            remaining: -1,
            reset: new Date(Date.now() + config.windowMs)
        }
    }

    const now = new Date()
    const windowStart = new Date(now.getTime() - (now.getTime() % config.windowMs))

    // Get or create rate limit record
    let rateLimit = await prisma.rateLimit.findUnique({
        where: {
            userId_endpoint_windowStart: {
                userId,
                endpoint,
                windowStart
            }
        }
    })

    if (!rateLimit) {
        rateLimit = await prisma.rateLimit.create({
            data: {
                userId,
                endpoint,
                windowStart,
                count: 0
            }
        })
    }

    // Check if limit exceeded
    if (rateLimit.count >= config.maxRequests) {
        const resetTime = new Date(windowStart.getTime() + config.windowMs)
        const retryAfter = Math.ceil((resetTime.getTime() - now.getTime()) / 1000)

        return {
            success: false,
            limit: config.maxRequests,
            remaining: 0,
            reset: resetTime,
            retryAfter
        }
    }

    // Increment counter
    const updatedRateLimit = await prisma.rateLimit.update({
        where: { id: rateLimit.id },
        data: { count: rateLimit.count + 1 }
    })

    return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - updatedRateLimit.count,
        reset: new Date(windowStart.getTime() + config.windowMs)
    }
}

export async function getUserPlan(userId: string): Promise<string> {
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { plan: true }
    })

    return user?.plan || 'FREE'
}

export function getEndpointFromPath(pathname: string): string {
    // Map specific routes to rate limit categories
    if (pathname.startsWith('/api/capsules')) return '/api/capsules'
    if (pathname.startsWith('/api/upload')) return '/api/upload'
    if (pathname.startsWith('/api/compose')) return '/api/compose'
    if (pathname.startsWith('/api/analytics')) return '/api/analytics'

    return pathname
}


import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL!)

redis.on('connect', () => {
    console.log('Connected to Redis')
})

redis.on('error', (error) => {
    console.error('Redis connection error:', error)
})

export async function getCachedData(key: string): Promise<any | null> {
    try {
        const data = await redis.get(key)
        return data ? JSON.parse(data) : null
    } catch (error) {
        console.error('Error fetching cached data:', error)
        return null
    }
}

export async function setCachedData(key: string, data: any, ttlSeconds: number = 30): Promise<void> {
    try {
        await redis.setex(key, ttlSeconds, JSON.stringify(data))
    } catch (error) {
        console.error('Cache set error:', error)
    }
}

export async function invalidateCache(pattern: string): Promise<void> {
    try {
        const keys = await redis.keys(pattern)
        if (keys.length > 0) {
            await redis.del(...keys)
            console.log(`Invalidated ${keys.length} cache keys matching: ${pattern}`)
        }
    } catch (error) {
        console.error('Cache invalidation error:', error)
    }
}

export async function clearAllCache(): Promise<void> {
    try {
        await redis.flushall()
        console.log('Cleared all cache')
    } catch (error) {
        console.error('Cache clear error:', error)
    }
}

// Health check function
export async function checkRedisHealth(): Promise<boolean> {
    try {
        await redis.ping()
        return true
    } catch (error) {
        console.error('Redis health check failed:', error)
        return false
    }
}
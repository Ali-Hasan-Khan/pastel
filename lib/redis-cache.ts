import Redis from "ioredis"

let redis: Redis | null = null
let redisAvailable: boolean | null = null
let lastHealthCheck = 0

const HEALTH_CHECK_INTERVAL = 30_000

function createRedisClient(): Redis | null {
  const url = process.env.REDIS_URL
  if (!url) return null

  const client = new Redis(url, {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    connectTimeout: 3000,
    retryStrategy: (times) => {
      if (times > 30) return null
      return Math.min(times * 200, 5000)
    },
  })

  client.on('connect', () => {
    redisAvailable = true
    console.log('Connected to Redis')
  })

  client.on('close', () => {
    redisAvailable = false
  })

  client.on('error', (error) => {
    console.error('Redis connection error:', error)
  })

  return client
}

function getRedisClient(): Redis | null {
  if (!redis) redis = createRedisClient()
  return redis
}

/**
 * Returns true when Redis is reachable. The result is cached for 30s so a
 * down Redis isn't pinged on every request.
 */
export async function isCacheAvailable(): Promise<boolean> {
  const now = Date.now()
  if (now - lastHealthCheck < HEALTH_CHECK_INTERVAL && redisAvailable !== null) {
    return redisAvailable
  }
  lastHealthCheck = now
  try {
    const client = getRedisClient()
    if (!client) {
      redisAvailable = false
      return false
    }
    await client.ping()
    redisAvailable = true
  } catch {
    redisAvailable = false
  }
  return redisAvailable
}

export async function getCachedData(key: string): Promise<any | null> {
  if (!(await isCacheAvailable())) return null
  try {
    const client = getRedisClient()!
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error fetching cached data:', error)
    return null
  }
}

export async function setCachedData(key: string, data: any, ttlSeconds: number = 30): Promise<void> {
  if (!(await isCacheAvailable())) return
  try {
    await getRedisClient()!.setex(key, ttlSeconds, JSON.stringify(data))
  } catch (error) {
    console.error('Cache set error:', error)
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  if (!(await isCacheAvailable())) return
  try {
    const client = getRedisClient()!
    const keys = await client.keys(pattern)
    if (keys.length > 0) {
      await client.del(...keys)
      console.log(`Invalidated ${keys.length} cache keys matching: ${pattern}`)
    }
  } catch (error) {
    console.error('Cache invalidation error:', error)
  }
}

export async function clearAllCache(): Promise<void> {
  if (!(await isCacheAvailable())) return
  try {
    await getRedisClient()!.flushall()
    console.log('Cleared all cache')
  } catch (error) {
    console.error('Cache clear error:', error)
  }
}

// Health check function
export async function checkRedisHealth(): Promise<boolean> {
  return isCacheAvailable()
}

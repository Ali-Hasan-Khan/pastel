import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getCachedData, setCachedData } from '@/lib/redis-cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get the current user's ID from Clerk
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    // Create cache key for this user
    const cacheKey = `dashboard-stats:${userId}`
    
    // Try to get cached data first
    const cachedData = await getCachedData(cacheKey)
    
    if (cachedData) {
      console.log(`Serving cached data for user: ${userId}`)
      return NextResponse.json({ 
        success: true, 
        data: cachedData,
        cached: true,
        timestamp: new Date().toISOString()
      })
    }

    console.log(`Fetching fresh data for user: ${userId}`)
    const now = new Date()

    // Get all capsules for the user
    const [
      totalCapsules,
      upcomingCapsules,
      deliveredCapsules,
      recentCapsules
    ] = await Promise.all([
      // Total capsules count
      prisma.capsule.count({
        where: { userId }
      }),
      
      // Upcoming capsules (scheduled and delivery date in future)
      prisma.capsule.count({
        where: {
          userId,
          status: 'scheduled',
          deliveryDate: {
            gt: now
          }
        }
      }),
      
      // Delivered capsules (delivery date in past or status is delivered)
      prisma.capsule.count({
        where: {
          userId,
          OR: [
            {
              deliveryDate: {
                lte: now
              }
            },
            {
              status: 'delivered'
            }
          ]
        }
      }),
      
      // Recent capsules (last 5, ordered by creation date)
      prisma.capsule.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          deliveryDate: true,
          status: true,
          createdAt: true
        }
      })
    ])

    const stats = {
      totalCapsules,
      upcomingCapsules,
      deliveredCapsules,
      recentCapsules,
      lastUpdated: new Date().toISOString()
    }

    // Cache the result for 30 seconds
    await setCachedData(cacheKey, stats, 30)
    console.log(`Cached data for user: ${userId}`)

    return NextResponse.json({ 
      success: true, 
      data: stats,
      cached: false,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    )
  }
} 
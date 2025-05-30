import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

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
      recentCapsules
    }

    return NextResponse.json({ 
      success: true, 
      data: stats 
    })
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    )
  }
} 
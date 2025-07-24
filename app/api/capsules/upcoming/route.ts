import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
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

    // Fetch upcoming capsules for the authenticated user
    const now = new Date()
    const upcomingCapsules = await prisma.capsule.findMany({
      where: {
        userId: userId,
        deliveryDate: {
          gt: now, // Greater than current date/time
        },
        status: 'scheduled',
      },
      orderBy: {
        deliveryDate: 'asc', // Sort by delivery date, earliest first
      },
    })

    // Calculate remaining days for each capsule
    const capsulesWithRemainingDays = upcomingCapsules.map(capsule => ({
      ...capsule,
      remainingDays: Math.ceil(
        (new Date(capsule.deliveryDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      ),
    }))

    return NextResponse.json({ 
      success: true, 
      data: capsulesWithRemainingDays 
    })
  } catch (error: any) {
    console.error('Error fetching upcoming capsules:', error)
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    )
  }
} 
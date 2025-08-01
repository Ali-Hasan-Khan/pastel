import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClerkClient } from '@clerk/backend'
import { processPendingDeliveries, retryFailedDeliveries } from '@/lib/services/delivery-service'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin privileges
    const { userId } = await auth()
    const user = await clerkClient.users.getUser(userId as string)

    if (user.publicMetadata.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }


    const { action } = await request.json()

    let result
    if (action === 'retry') {
      result = await retryFailedDeliveries()
    } else {
      result = await processPendingDeliveries()
    }

    return NextResponse.json({
      success: result.success,
      message: `${action === 'retry' ? 'Retry' : 'Delivery'} process completed`,
      details: result
    })

  } catch (error) {
    console.error('Manual delivery trigger error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: (error as Error).message 
      },
      { status: 500 }
    )
  }
} 
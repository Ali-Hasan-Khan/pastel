import { NextRequest, NextResponse } from 'next/server'
import { processPendingDeliveries } from '@/lib/services/delivery-service'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from a trusted cron service
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    console.log('Cron job triggered')
    console.log('Auth header present:', !!authHeader)
    console.log('Cron secret present:', !!cronSecret)
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      console.log('Authorization failed')
      console.log('Expected:', `Bearer ${cronSecret}`)
      console.log('Received:', authHeader)
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    console.log('Authorization successful - starting capsule delivery process...')
    const result = await processPendingDeliveries()
    
    return NextResponse.json({
      success: true,
      message: 'Cron job completed successfully',
      details: result
    })

  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
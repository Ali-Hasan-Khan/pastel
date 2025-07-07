import { NextRequest, NextResponse } from 'next/server'
import { processPendingDeliveries } from '@/lib/services/delivery-service'

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a trusted cron service
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    console.log('Starting capsule delivery process...')
    const result = await processPendingDeliveries()

    return NextResponse.json({
      success: result.success,
      message: `Processed ${result.processed} capsules successfully, ${result.failed} failed`,
      details: result
    })

  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: (error as Error).message 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Capsule delivery cron endpoint is active',
    timestamp: new Date().toISOString()
  })
} 
import { PrismaClient } from '@prisma/client'
import { clerkClient } from '@clerk/nextjs/server'
import { sendCapsuleDeliveryEmail } from '../email'

const prisma = new PrismaClient()

export interface DeliveryResult {
  success: boolean
  processed: number
  failed: number
  errors: string[]
}

export async function processPendingDeliveries(): Promise<DeliveryResult> {
  const result: DeliveryResult = {
    success: true,
    processed: 0,
    failed: 0,
    errors: []
  }

  try {
    // Find all capsules ready for delivery
    const now = new Date()
    const pendingCapsules = await prisma.capsule.findMany({
      where: {
        status: 'scheduled',
        deliveryDate: {
          lte: now
        }
      },
      orderBy: {
        deliveryDate: 'asc'
      }
    })

    console.log(`Found ${pendingCapsules.length} capsules ready for delivery`)

    for (const capsule of pendingCapsules) {
      try {
        await deliverCapsule(capsule)
        result.processed++
      } catch (error) {
        console.error(`Failed to deliver capsule ${capsule.id}:`, error)
        result.failed++
        result.errors.push(`Capsule ${capsule.id}: ${error instanceof Error ? error.message : String(error)}`)
        
        // Log the failure
        await logDeliveryAttempt(capsule.id, capsule.userId, 'failed', 'email', error instanceof Error ? error.message : String(error))
      }
    }

    if (result.failed > 0) {
      result.success = false
    }

    console.log(`Delivery process completed: ${result.processed} successful, ${result.failed} failed`)
    return result

  } catch (error) {
    console.error('Critical error in delivery process:', error)
    result.success = false
    result.errors.push(`Critical error: ${error instanceof Error ? error.message : String(error)}`)
    return result
  }
}

async function deliverCapsule(capsule: any) {
  try {
    // Get user details from Clerk
    const client = await clerkClient()
    const user = await client.users.getUser(capsule.userId)
    const userEmail = user.emailAddresses[0]?.emailAddress
    const userName = user.firstName || user.username || 'Friend'

    if (!userEmail) {
      throw new Error(`No email found for user ${capsule.userId}`)
    }

    // Send email notification
    const emailResult = await sendCapsuleDeliveryEmail({
      userEmail,
      userName,
      capsule
    })

    if (!emailResult.success) {
      throw new Error(`Email delivery failed: ${emailResult.error}`)
    }

    // Update capsule status
    await prisma.capsule.update({
      where: { id: capsule.id },
      data: {
        status: 'delivered',
        deliveryDate: new Date(),
        deliveredAt: new Date()
      }
    })

    // Log successful delivery
    await logDeliveryAttempt(capsule.id, capsule.userId, 'success', 'email')

    console.log(`Successfully delivered capsule ${capsule.id} to ${userEmail}`)

  } catch (error) {
    // Update capsule status to failed (you might want to implement retry logic)
    await prisma.capsule.update({
      where: { id: capsule.id },
      data: {
        status: 'failed'
      }
    })

    throw error
  }
}

async function logDeliveryAttempt(
  capsuleId: string, 
  userId: string, 
  status: string, 
  method: string, 
  error?: string
) {
  try {
    await prisma.deliveryLog.create({
      data: {
        id: crypto.randomUUID(),
        capsuleId,
        userId,
        status,
        method,
        error
      }
    })
  } catch (logError) {
    console.error('Failed to log delivery attempt:', logError)
  }
}

// Function to retry failed deliveries
export async function retryFailedDeliveries(): Promise<DeliveryResult> {
  const result: DeliveryResult = {
    success: true,
    processed: 0,
    failed: 0,
    errors: []
  }

  try {
    const failedCapsules = await prisma.capsule.findMany({
      where: {
        status: 'failed',
        deliveryDate: {
          lte: new Date()
        }
      }
    })

    for (const capsule of failedCapsules) {
      try {
        // Reset status to scheduled for retry
        await prisma.capsule.update({
          where: { id: capsule.id },
          data: { status: 'scheduled' }
        })

        await deliverCapsule(capsule)
        result.processed++
      } catch (error) {
        result.failed++
        result.errors.push(`Retry failed for capsule ${capsule.id}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    return result
  } catch (error) {
    result.success = false
    result.errors.push(`Retry process error: ${error instanceof Error ? error.message : String(error)}`)
    return result
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { invalidateCache } from '@/lib/redis-cache'
import { withRateLimit } from '@/lib/rate-limit-middleware'

async function createCapsule(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, content, deliveryDate, images = [] } = await req.json()

  try {
    // Find or create user
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: { clerkId: userId, plan: 'FREE' }
    })

    const capsule = await prisma.capsule.create({
      data: {
        title,
        content,
        deliveryDate: new Date(deliveryDate),
        userId: user.id,
        status: 'scheduled',
        images,
      },
    })

    // Invalidate user's dashboard cache
    await invalidateCache(`dashboard-stats:${userId}`)
    console.log(`Invalidated cache for user: ${userId}`)

    return NextResponse.json({ success: true, data: capsule })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// Apply rate limiting to the POST handler
export const POST = withRateLimit(createCapsule, {
  customEndpoint: '/api/compose'
}) 
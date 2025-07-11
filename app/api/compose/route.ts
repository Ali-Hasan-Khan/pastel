import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { invalidateCache } from '@/lib/redis-cache'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { title, content, deliveryDate, userId, status, images } = await req.json()
  
  try {
    const capsule = await prisma.capsule.create({
      data: {
        title,
        content,
        deliveryDate: new Date(deliveryDate),
        userId,
        status: status || 'scheduled',
        images: images || [],
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
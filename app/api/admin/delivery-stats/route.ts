import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find or create user to get the database user ID
    const user = await prisma.user.upsert({
        where: { clerkId },
        update: {},
        create: { clerkId, plan: 'FREE' }
    })

    const pending = await prisma.capsule.count({
        where: {
            status: 'pending',
            userId: user.id
        }
    })
    const delivered = await prisma.capsule.count({
        where: {
            status: 'delivered',
            userId: user.id
        }
    })
    const failed = await prisma.capsule.count({
        where: {
            status: 'failed',
            userId: user.id
        }
    })
    return NextResponse.json({ pending, delivered, failed })
}
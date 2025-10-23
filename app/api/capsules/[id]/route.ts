import { NextRequest, NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { prisma } from "@/lib/prisma"
import { invalidateCache } from "@/lib/redis-cache"


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params
    const capsule = await prisma.capsule.findUnique({
        where: { id }
    })

    if (!capsule) {
        return NextResponse.json({ error: 'Capsule not found' }, { status: 404 })
    }

    if (capsule.userId !== user.id) {
        return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
    }

    return NextResponse.json(capsule)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId: clerkId } = await auth()
    if (!clerkId) {
        return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
    }

    // Find or create user to get the database user ID
    const user = await prisma.user.upsert({
        where: { clerkId },
        update: {},
        create: { clerkId, plan: 'FREE' }
    })

    const { id } = await params

    const capsule = await prisma.capsule.findUnique({
        where: { id, userId: user.id }
    })

    if (!capsule) {
        return NextResponse.json({ error: 'Capsule not found' }, { status: 404 })
    }

    try {
        await prisma.capsule.delete({
            where: { id, userId: user.id }
        })

        // Invalidate user's dashboard cache
        await invalidateCache(`dashboard-stats:${clerkId}`)
        console.log(`Invalidated cache for user: ${clerkId}`)

        return NextResponse.json({ success: true, message: 'Capsule deleted successfully' })
    } catch (error) {
        console.error('Error deleting capsule:', error)
        return NextResponse.json({ error: 'Failed to delete capsule' }, { status: 500 })
    }
}
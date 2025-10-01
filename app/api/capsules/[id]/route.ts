import { NextRequest, NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { prisma } from "@/lib/prisma"
import { invalidateCache } from "@/lib/redis-cache"


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth()
    
    
    const { id } = await params
    const capsule = await prisma.capsule.findUnique({
        where: { id }
    })


    if (!capsule) {
        return NextResponse.json({ error: 'Capsule not found' }, { status: 404 })
    }

    if(capsule.userId !== userId) {
        return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
    }

    return NextResponse.json(capsule)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
    }
    const { id } = await params

    const capsule = await prisma.capsule.findUnique({
        where: { id, userId: userId as string }
    })

    if (!capsule) {
        return NextResponse.json({ error: 'Capsule not found' }, { status: 404 })
    }

    try {
        await prisma.capsule.delete({
            where: { id, userId: userId as string }
        })

        // Invalidate user's dashboard cache
        await invalidateCache(`dashboard-stats:${userId}`)
        console.log(`Invalidated cache for user: ${userId}`)

        return NextResponse.json({ success: true, message: 'Capsule deleted successfully' })
    } catch (error) {
        console.error('Error deleting capsule:', error)
        return NextResponse.json({ error: 'Failed to delete capsule' }, { status: 500 })
    }
}
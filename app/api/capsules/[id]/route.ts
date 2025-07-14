import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import { auth, createClerkClient } from '@clerk/nextjs/server'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth()
    
    const user = await clerkClient.users.getUser(userId as string)
    
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
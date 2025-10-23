import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
    try {
        const { userId: clerkId } = await auth()
        if (!clerkId) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Find or create user to get the database user ID
        const user = await prisma.user.upsert({
            where: { clerkId },
            update: {},
            create: { clerkId, plan: 'FREE' }
        })

        const capsules = await prisma.capsule.findMany({
            where: {
                status: 'delivered',
                userId: user.id
            }
        })

        return NextResponse.json(capsules)
    } catch (error) {
        console.error('Error fetching delivered capsules:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch delivered capsules' },
            { status: 500 }
        )
    }
}
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import { auth } from "@clerk/nextjs/server"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }
        const capsules = await prisma.capsule.findMany({
            where: {
                status: 'delivered',
                userId: userId
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
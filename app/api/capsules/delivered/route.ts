import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const capsules = await prisma.capsule.findMany({
            where: {
                status: 'delivered'
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
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const { userId } = await auth()
    const pending = await prisma.capsule.count({
        where: {
            status: 'pending',
            userId: userId as string
        }
    })
    const delivered = await prisma.capsule.count({
        where: {
            status: 'delivered',
            userId: userId as string
        }
    })
    const failed = await prisma.capsule.count({
        where: {
            status: 'failed',
            userId: userId as string
        }
    })
    return NextResponse.json({ pending, delivered, failed })
}
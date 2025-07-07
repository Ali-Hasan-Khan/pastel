import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const capsule = await prisma.capsule.findUnique({
        where: { id }
    })

    if (!capsule) {
        return NextResponse.json({ error: 'Capsule not found' }, { status: 404 })
    }

    return NextResponse.json(capsule)
}
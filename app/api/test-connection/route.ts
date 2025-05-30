import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const data = await prisma.capsule.findMany({ take: 1 })
    return NextResponse.json({ success: true, message: 'Successfully connected to database', data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
} 
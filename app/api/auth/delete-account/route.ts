import { NextRequest, NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

const client = await clerkClient()

export async function DELETE(request: NextRequest) {
    try {
        const { userId: clerkId } = await auth()
        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Find or create user to get the database user ID
        const user = await prisma.user.upsert({
            where: { clerkId },
            update: {},
            create: { clerkId, plan: 'FREE' }
        })

        // delete all capsules by user
        const capsules = await prisma.capsule.findMany({
            where: {
                userId: user.id
            }
        })

        for (const capsule of capsules) {
            await prisma.capsule.delete({
                where: { id: capsule.id }
            })
        }

        // delete user from database
        await prisma.user.delete({
            where: { id: user.id }
        })

        // delete user from clerk
        await client.users.deleteUser(clerkId)
        return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting account:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
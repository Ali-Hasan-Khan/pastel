import { NextRequest, NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

const client = await clerkClient()

export async function DELETE(request: NextRequest) {
    try{
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        // delete all capsules by user
        const capsules = await prisma.capsule.findMany({
            where: {
                userId: userId
            }
        })

        for (const capsule of capsules) {
            await prisma.capsule.delete({
                where: { id: capsule.id }
            })
        }

        // delete user from clerk
        await client.users.deleteUser(userId)
        return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting account:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
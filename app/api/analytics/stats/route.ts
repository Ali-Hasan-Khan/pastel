import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
import { prisma } from "@/lib/prisma"

function computeEmotionalScore(text: string): number {
    if (!text) return 5;
    const t = text.toLowerCase();

    const positive = [
        'happy', 'joy', 'grateful', 'love', 'excited', 'hope', 'proud', 'calm', 'peace',
        'optimistic', 'great', 'good', 'amazing', 'wonderful', 'relaxed', 'content'
    ];
    const negative = [
        'sad', 'angry', 'anxious', 'worried', 'stress', 'tired', 'upset', 'fear', 'regret',
        'pain', 'bad', 'terrible', 'awful', 'lonely', 'frustrated', 'overwhelmed'
    ];

    let score = 0;
    for (const w of positive) if (t.includes(w)) score += 1;
    for (const w of negative) if (t.includes(w)) score -= 1;

    // Map roughly from [-5, +5] to [0, 10]
    const normalized = Math.max(-5, Math.min(5, score));
    return ((normalized + 5) / 10) * 10;
}


export async function GET(request: NextRequest) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const capsules = await prisma.capsule.findMany({
        where: { userId: userId },
        select: { content: true, aiReflection: true }
    })
    const totalMemories = capsules.length
    let emotionalScore = 5
    if(totalMemories>0){
        const scores = capsules.map(c => computeEmotionalScore(c.content))
        emotionalScore = scores.reduce((a,b) => a+b, 0)/scores.length
    }
    const aiInsights = capsules.reduce((acc, c) => acc + (c.aiReflection && c.aiReflection.length > 0 ? 1 : 0), 0)

    const stats = {
        totalMemories,
        emotionalScore: Number(emotionalScore.toFixed(2)),
        aiInsights
    }
    if (!stats) {
        return NextResponse.json({ error: "Stats not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: stats })
}
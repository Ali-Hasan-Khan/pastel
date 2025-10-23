import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from '@/lib/rate-limit-middleware'

function computeEmotionalScore(text: string): number {
    if (!text) return 5;
    const t = text.toLowerCase();
    const pos = ['happy', 'joy', 'grateful', 'love', 'excited', 'hope', 'proud', 'calm', 'peace', 'optimistic', 'great', 'good', 'amazing', 'wonderful', 'relaxed', 'content'];
    const neg = ['sad', 'angry', 'anxious', 'worried', 'stress', 'tired', 'upset', 'fear', 'regret', 'pain', 'bad', 'terrible', 'awful', 'lonely', 'frustrated', 'overwhelmed'];
    let s = 0;
    for (const w of pos) if (t.includes(w)) s += 1;
    for (const w of neg) if (t.includes(w)) s -= 1;
    const clamped = Math.max(-5, Math.min(5, s));
    return ((clamped + 5) / 10) * 10; // 0–10
}

async function getAnalyticsHeatmap(_req: NextRequest) {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    // Find or create user to get the database user ID
    const user = await prisma.user.upsert({
        where: { clerkId },
        update: {},
        create: { clerkId, plan: 'FREE' }
    });

    const since = new Date();
    since.setDate(since.getDate() - 365);
    const capsules = await prisma.capsule.findMany({
        where: { userId: user.id, createdAt: { gte: since } },
        select: { content: true, createdAt: true },
        orderBy: { createdAt: "asc" },
    });

    const byDay = new Map<string, number[]>();
    for (const c of capsules) {
        const key = c.createdAt.toISOString().slice(0, 10); // YYYY-MM-DD
        const score = computeEmotionalScore(c.content);
        if (!byDay.has(key)) byDay.set(key, []);
        byDay.get(key)!.push(score);
    }

    const days: Array<{ date: string; score: number; count: number }> = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - (364 - i));
        const key = d.toISOString().slice(0, 10);
        const arr = byDay.get(key) || [];
        const avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
        days.push({ date: key, score: Number(avg.toFixed(2)), count: arr.length });
    }

    // console.log("capsules: ",capsules);
    // console.log("byday: ", byDay)
    // console.log("days: ", days.slice(-10))

    return NextResponse.json({ success: true, data: { days } });
}

// Apply rate limiting to the GET handler
export const GET = withRateLimit(getAnalyticsHeatmap, {
    customEndpoint: '/api/analytics'
})
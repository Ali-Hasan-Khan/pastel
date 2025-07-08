import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { capsuleContent } = await request.json()

    const prompt = `
    You are an empathetic assistant that reads personal journal entries (called "capsules") written by users to their future selves.
    For each capsule, generate a short, thoughtful reflection that offers encouragement, insight, or a gentle observation about the entry.
    Do not summarize the entry; instead, respond as if you are a supportive friend, highlighting the emotional tone, growth, or hopes expressed.
    Keep your reflection to 2-3 sentences.
    If the entry is not a personal memory or journal, politely respond: "This entry does not appear to be a personal memory or reflection."
    Also don't include quotes in your response.
    Capsule Entry:
    "${capsuleContent}"

    AI Reflection:
    `
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://pastel.alihk.me", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "Pastel", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "mistralai/mistral-7b-instruct:free",
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ]
        })
      });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }   

    const data = await response.json()

    // console.log('data', data.choices[0].message.content)

    return NextResponse.json({ message: 'AI reflections cron job completed', data: data.choices[0].message.content })
}
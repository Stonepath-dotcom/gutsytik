import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  return NextResponse.json(
    { message: "Mova AI Summary API. Send a POST request with { url, title, platform }.", docs: "https://getmova.my.id" },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per minute for AI summary
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 10);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const { url, title, platform } = await request.json();
    if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful video content analyzer. Provide a concise summary of what this video is about based on its title and platform. Keep it to 2-3 sentences. Respond in the same language as the title.",
        },
        {
          role: "user",
          content: `Summarize this video: Title="${title}", Platform=${platform}, URL=${url}`,
        },
      ],
    });

    const summary = completion.choices[0]?.message?.content || "Unable to generate summary.";
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("AI Summary error:", error);
    return NextResponse.json({ error: "Failed to generate AI summary" }, { status: 500 });
  }
}

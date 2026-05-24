import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

const YT_DLP_API = process.env.YTDLP_API_URL || "http://127.0.0.1:8888";

/**
 * Proxy route to the local yt-dlp API server.
 * This allows Vercel to access the yt-dlp API through our Next.js server.
 */
export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, 10);
  if (!success) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("url");
    const audio = searchParams.get("audio");

    if (!targetUrl) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    const apiUrl = `${YT_DLP_API}/info?url=${encodeURIComponent(targetUrl)}&audio=${audio || "0"}`;
    const res = await fetch(apiUrl, {
      signal: AbortSignal.timeout(35000),
      headers: { "Accept": "application/json" },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("yt-dlp proxy error:", error);
    return NextResponse.json({ error: "yt-dlp API unavailable" }, { status: 503 });
  }
}

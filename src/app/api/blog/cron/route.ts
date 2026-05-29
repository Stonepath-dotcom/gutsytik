import { NextRequest, NextResponse } from "next/server";

// This endpoint is called by Vercel Cron to auto-generate blog posts
export async function GET(req: NextRequest) {
  try {
    // Verify cron secret (optional security)
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Call the generate endpoint internally
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`;

    const response = await fetch(`${baseUrl}/api/blog/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Generation failed", details: errorData },
        { status: 500 }
      );
    }

    const result = await response.json();

    // Optionally trigger Vercel redeployment via Deploy Hook
    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
      try {
        await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
      } catch {
        // Silently fail - redeployment is optional
      }
    }

    return NextResponse.json({
      success: true,
      generated: result.post,
      message: "New blog post auto-generated successfully",
    });
  } catch (error: any) {
    console.error("Cron blog generation error:", error);
    return NextResponse.json(
      { error: "Cron job failed", details: error.message },
      { status: 500 }
    );
  }
}

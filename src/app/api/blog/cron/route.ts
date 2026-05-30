import { NextRequest, NextResponse } from "next/server";

/**
 * Vercel Cron endpoint - Runs daily at 6am WIB
 * 
 * Schedule:
 * - Mon/Wed/Fri/Sun: Generate NEW blog post
 * - Tue/Thu/Sat: Refresh EXISTING old blog post
 * 
 * This keeps the content fresh AND growing!
 */
export async function GET(req: NextRequest) {
  try {
    // Verify cron secret (optional security)
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://getmova.my.id";

    // Determine the day of week (0=Sun, 1=Mon, ...6=Sat)
    const dayOfWeek = new Date().getDay();
    const isGenerateDay = [0, 1, 3, 5].includes(dayOfWeek); // Sun, Mon, Wed, Fri
    const isRefreshDay = [2, 4, 6].includes(dayOfWeek); // Tue, Thu, Sat

    let result: any = {};

    if (isGenerateDay) {
      // Generate NEW blog post
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

      result = await response.json();
      result.action = "generated";
    } else if (isRefreshDay) {
      // Refresh EXISTING old blog post
      const response = await fetch(`${baseUrl}/api/blog/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: false }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // If no posts to refresh, try generating instead
        const genResponse = await fetch(`${baseUrl}/api/blog/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        result = genResponse.ok 
          ? { ...(await genResponse.json()), action: "generated (fallback)" }
          : { error: "Both refresh and generate failed" };
      } else {
        result = await response.json();
        result.action = "refreshed";
      }
    }

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
      dayOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek],
      result,
      message: `Cron job completed - ${result.action || "no action"}`,
    });
  } catch (error: any) {
    console.error("Cron blog error:", error);
    return NextResponse.json(
      { error: "Cron job failed", details: error.message },
      { status: 500 }
    );
  }
}

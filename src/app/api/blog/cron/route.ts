import { NextRequest, NextResponse } from "next/server";

/**
 * Vercel Cron endpoint - MEGA AUTOMATION HUB!
 *
 * Daily Cron (6 AM WIB):
 * - Mon/Wed/Fri/Sun: Generate NEW blog post + trending topics + PAA enrichment
 * - Tue/Thu/Sat: Refresh EXISTING old blog post + link check + OG image generation
 *
 * Weekly Cron (Sunday):
 * - SEO Audit + Keyword Research + Content Gap + Backlink + Report
 * + Topic Cluster + Competitor Monitor + Web Vitals + Translate top posts
 * + Full Site IndexNow Submission
 *
 * 19 total automations working together to DOMINATE Google rankings!
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
    const isSunday = dayOfWeek === 0;

    let result: any = {};
    const automations: Record<string, any> = {};

    // Helper for non-blocking fetch
    const fireAndForget = (url: string, options: RequestInit, key: string) => {
      fetch(url, options)
        .then(async (r) => {
          automations[key] = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations[key] = null;
        });
    };

    // === DAILY TASKS ===
    if (isGenerateDay) {
      // 1. Generate NEW blog post (blocking - wait for result)
      try {
        const response = await fetch(`${baseUrl}/api/blog/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          result = await response.json();
          result.action = "generated";
        } else {
          result = { action: "generate_failed", error: await response.json().catch(() => ({})) };
        }
      } catch (err: any) {
        result = { action: "generate_error", error: err.message };
      }

      // 2. Discover trending topics (non-blocking)
      fireAndForget(
        `${baseUrl}/api/blog/trending`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ maxTopics: 5 }) },
        "trending"
      );

      // 3. PAA enrichment for recent posts (non-blocking)
      fireAndForget(
        `${baseUrl}/api/blog/paa`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ maxQuestions: 5 }) },
        "paa"
      );
    } else if (isRefreshDay) {
      // 1. Refresh EXISTING old blog post (blocking)
      try {
        const response = await fetch(`${baseUrl}/api/blog/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ force: false }),
        });

        if (response.ok) {
          result = await response.json();
          result.action = "refreshed";
        } else {
          // Fallback: try generating instead
          const genResponse = await fetch(`${baseUrl}/api/blog/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          });
          result = genResponse.ok
            ? { ...(await genResponse.json()), action: "generated (fallback)" }
            : { action: "both_failed", error: "Both refresh and generate failed" };
        }
      } catch (err: any) {
        result = { action: "refresh_error", error: err.message };
      }

      // 2. Check for broken links (non-blocking)
      fireAndForget(
        `${baseUrl}/api/blog/link-check`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
        "linkCheck"
      );

      // 3. Generate OG images for posts without them (non-blocking)
      fireAndForget(
        `${baseUrl}/api/blog/og-image`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) },
        "ogImage"
      );
    }

    // === WEEKLY TASKS (Sunday) ===
    if (isSunday) {
      // Run all weekly automations (non-blocking, parallel)

      // 1. SEO Audit
      fireAndForget(
        `${baseUrl}/api/blog/seo-audit`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
        "seoAudit"
      );

      // 2. Keyword Research
      fireAndForget(
        `${baseUrl}/api/blog/keyword-research`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ focusArea: "general" }) },
        "keywordResearch"
      );

      // 3. Content Gap Analysis
      fireAndForget(
        `${baseUrl}/api/blog/content-gap`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
        "contentGap"
      );

      // 4. Backlink Opportunity Finder
      fireAndForget(
        `${baseUrl}/api/blog/backlinks`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
        "backlinks"
      );

      // 5. Weekly Performance Report
      fireAndForget(
        `${baseUrl}/api/blog/report`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
        "report"
      );

      // 6. Comprehensive IndexNow (submit ALL blog URLs)
      fireAndForget(
        `${baseUrl}/api/blog/index-now`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ submitAll: true }) },
        "indexNow"
      );

      // 7. Topic Cluster Strategy
      fireAndForget(
        `${baseUrl}/api/blog/topic-cluster`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
        "topicCluster"
      );

      // 8. Competitor Monitor
      fireAndForget(
        `${baseUrl}/api/blog/competitor`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
        "competitor"
      );

      // 9. Web Vitals Check
      fireAndForget(
        `${baseUrl}/api/blog/vitals`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
        "vitals"
      );

      // 10. Translate top posts to English
      fireAndForget(
        `${baseUrl}/api/blog/translate`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lang: "en", maxPosts: 2 }) },
        "translate"
      );
    }

    // Optionally trigger Vercel redeployment via Deploy Hook
    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
      try {
        await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
      } catch {
        // Silently fail - redeployment is optional
      }
    }

    const dailyTasks = isGenerateDay
      ? ["generate", "trending", "paa"]
      : ["refresh", "link-check", "og-image"];

    const weeklyTasks = [
      "seo-audit", "keyword-research", "content-gap", "backlinks",
      "report", "index-now", "topic-cluster", "competitor",
      "vitals", "translate",
    ];

    return NextResponse.json({
      success: true,
      dayOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek],
      isWeeklyRun: isSunday,
      result,
      automationsTriggered: isSunday ? [...dailyTasks, ...weeklyTasks] : dailyTasks,
      totalAutomations: isSunday ? dailyTasks.length + weeklyTasks.length : dailyTasks.length,
      message: `Cron job completed - ${result.action || "no action"} | ${isSunday ? dailyTasks.length + weeklyTasks.length : dailyTasks.length} automations triggered`,
    });
  } catch (error: any) {
    console.error("Cron blog error:", error);
    return NextResponse.json(
      { error: "Cron job failed", details: error.message },
      { status: 500 }
    );
  }
}

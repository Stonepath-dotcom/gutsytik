import { NextRequest, NextResponse } from "next/server";

/**
 * Vercel Cron endpoint - SUPER CHARGED automation hub!
 *
 * Daily Cron (6 AM WIB):
 * - Mon/Wed/Fri/Sun: Generate NEW blog post + trending topics
 * - Tue/Thu/Sat: Refresh EXISTING old blog post + link check
 *
 * Weekly Cron (Sunday midnight):
 * - SEO Audit + Keyword Research + Content Gap + Backlink + Report
 *
 * All automations work together to boost Google ranking!
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

    // === DAILY TASKS ===
    if (isGenerateDay) {
      // 1. Generate NEW blog post
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

      // 2. Discover trending topics (non-blocking, adds new topics to pool)
      fetch(`${baseUrl}/api/blog/trending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maxTopics: 5 }),
      })
        .then(async (r) => {
          automations.trending = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations.trending = null;
        });
    } else if (isRefreshDay) {
      // 1. Refresh EXISTING old blog post
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
      fetch(`${baseUrl}/api/blog/link-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (r) => {
          automations.linkCheck = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations.linkCheck = null;
        });
    }

    // === WEEKLY TASKS (Sunday) ===
    if (isSunday) {
      // Run all weekly automations in parallel (non-blocking)

      // 1. SEO Audit
      fetch(`${baseUrl}/api/blog/seo-audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (r) => {
          automations.seoAudit = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations.seoAudit = null;
        });

      // 2. Keyword Research
      fetch(`${baseUrl}/api/blog/keyword-research`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focusArea: "general" }),
      })
        .then(async (r) => {
          automations.keywordResearch = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations.keywordResearch = null;
        });

      // 3. Content Gap Analysis
      fetch(`${baseUrl}/api/blog/content-gap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (r) => {
          automations.contentGap = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations.contentGap = null;
        });

      // 4. Backlink Opportunity Finder
      fetch(`${baseUrl}/api/blog/backlinks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (r) => {
          automations.backlinks = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations.backlinks = null;
        });

      // 5. Weekly Performance Report
      fetch(`${baseUrl}/api/blog/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (r) => {
          automations.report = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations.report = null;
        });

      // 6. Comprehensive IndexNow (submit ALL blog URLs)
      fetch(`${baseUrl}/api/blog/index-now`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submitAll: true }),
      })
        .then(async (r) => {
          automations.indexNow = r.ok ? await r.json() : null;
        })
        .catch(() => {
          automations.indexNow = null;
        });
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
      isWeeklyRun: isSunday,
      result,
      automationsTriggered: isSunday
        ? ["seo-audit", "keyword-research", "content-gap", "backlinks", "report", "index-now"]
        : isGenerateDay
        ? ["generate", "trending"]
        : ["refresh", "link-check"],
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

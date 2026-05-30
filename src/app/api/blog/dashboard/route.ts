import { NextResponse } from "next/server";
import { getAutomationDashboard, getAllAutoBlogPosts, getAutoBlogData } from "@/lib/auto-blog";

/**
 * Automation Dashboard API
 * Returns all automation metrics and status in one API call
 * Use this to monitor how all the automations are performing
 */
export async function GET() {
  try {
    const dashboard = getAutomationDashboard();
    const posts = getAllAutoBlogPosts();
    const data = getAutoBlogData();

    // Automation schedule info
    const schedule = {
      daily: {
        cron: "0 6 * * *",
        description: "Daily at 6 AM WIB",
        tasks: {
          "Senin, Rabu, Jumat, Minggu": ["Generate blog post", "Discover trending topics"],
          "Selasa, Kamis, Sabtu": ["Refresh old blog post", "Check broken links"],
        },
      },
      weekly: {
        cron: "Sunday (via daily cron)",
        description: "Every Sunday",
        tasks: [
          "SEO Audit",
          "Keyword Research",
          "Content Gap Analysis",
          "Backlink Opportunity Finder",
          "Weekly Performance Report",
          "Full Site IndexNow Submission",
        ],
      },
      indexNow: {
        cron: "0 0 * * 0",
        description: "Weekly IndexNow ping",
        tasks: ["Submit all URLs to Bing, Yandex, Google"],
      },
    };

    // All available API endpoints
    const endpoints = {
      "POST /api/blog/generate": "Generate a new blog post",
      "GET /api/blog/generate": "List auto-generated posts",
      "POST /api/blog/refresh": "Refresh an old blog post",
      "GET /api/blog/refresh": "List posts eligible for refresh",
      "POST /api/blog/trending": "Discover trending topics via web search",
      "GET /api/blog/trending": "Check current topics pool",
      "POST /api/blog/seo-audit": "Run SEO audit",
      "GET /api/blog/seo-audit": "Quick SEO health check",
      "POST /api/blog/keyword-research": "Find keyword opportunities",
      "GET /api/blog/keyword-research": "Keyword stats",
      "POST /api/blog/content-gap": "Analyze content gaps vs competitors",
      "POST /api/blog/backlinks": "Find backlink opportunities",
      "POST /api/blog/link-check": "Check for broken links",
      "GET /api/blog/link-check": "Quick link health stats",
      "POST /api/blog/report": "Generate weekly SEO report",
      "GET /api/blog/report": "Quick stats",
      "POST /api/blog/social": "Generate social media posts",
      "POST /api/blog/index-now": "Submit URLs to search engines",
      "GET /api/blog/index-now": "Get IndexNow key",
      "GET /api/blog/dashboard": "This endpoint - full dashboard",
      "GET /api/blog/cron": "Cron trigger (runs daily)",
    };

    // Recent posts summary
    const recentPosts = posts.slice(0, 5).map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      readingTime: p.readingTime,
      lastUpdated: (p as any).lastUpdated || null,
    }));

    // Audit history
    const auditHistory = (data.audits || []).slice(-5).map((a) => ({
      date: a.date,
      overallScore: a.score?.overall || 0,
      criticalIssues: a.criticalIssuesCount,
    }));

    return NextResponse.json({
      success: true,
      dashboard,
      schedule,
      endpoints,
      recentPosts,
      auditHistory,
      linkHealth: data.linkHealth || null,
      keywordResearch: data.keywordResearch || null,
      contentGap: data.contentGap || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard", details: error.message },
      { status: 500 }
    );
  }
}

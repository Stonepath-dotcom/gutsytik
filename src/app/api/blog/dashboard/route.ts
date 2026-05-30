import { NextResponse } from "next/server";
import { getAutomationDashboard, getAllAutoBlogPosts, getAutoBlogData } from "@/lib/auto-blog";

/**
 * Automation Dashboard API - MEGA VERSION
 * Returns all automation metrics and status in one API call
 * 19 automations working together to DOMINATE Google rankings!
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
          "Senin, Rabu, Jumat, Minggu": [
            "Generate blog post",
            "Discover trending topics",
            "PAA enrichment (add FAQ questions)",
          ],
          "Selasa, Kamis, Sabtu": [
            "Refresh old blog post",
            "Check broken links",
            "Generate OG images",
          ],
        },
      },
      weekly: {
        cron: "Sunday (via daily cron)",
        description: "Every Sunday - 10 automations!",
        tasks: [
          "SEO Audit",
          "Keyword Research",
          "Content Gap Analysis",
          "Backlink Opportunity Finder",
          "Weekly Performance Report",
          "Full Site IndexNow Submission",
          "Topic Cluster Strategy",
          "Competitor Monitor",
          "Web Vitals Check",
          "Translate top posts to English",
        ],
      },
      indexNow: {
        cron: "0 0 * * 0",
        description: "Weekly IndexNow ping",
        tasks: ["Submit all URLs to Bing, Yandex, Google"],
      },
    };

    // All available API endpoints (19 automations!)
    const endpoints = {
      // Content Generation
      "POST /api/blog/generate": "Generate a new blog post via AI",
      "GET /api/blog/generate": "List auto-generated posts",
      "POST /api/blog/refresh": "Refresh an old blog post with fresh content",
      "GET /api/blog/refresh": "List posts eligible for refresh",
      "POST /api/blog/paa": "Add People Also Ask questions to FAQ sections",
      "POST /api/blog/translate": "Translate posts to English for global SEO",
      "GET /api/blog/translate": "Check translation status",
      "POST /api/blog/og-image": "Generate AI OG images for blog posts",
      "GET /api/blog/og-image": "Check which posts need OG images",
      // SEO & Research
      "POST /api/blog/trending": "Discover trending topics via web search",
      "GET /api/blog/trending": "Check current topics pool",
      "POST /api/blog/seo-audit": "Run comprehensive SEO audit",
      "GET /api/blog/seo-audit": "Quick SEO health check",
      "POST /api/blog/keyword-research": "Find keyword opportunities from competitors",
      "GET /api/blog/keyword-research": "Keyword stats",
      "POST /api/blog/content-gap": "Analyze content gaps vs competitors",
      "POST /api/blog/topic-cluster": "Generate topic cluster strategy",
      // Link Building & Monitoring
      "POST /api/blog/backlinks": "Find backlink opportunities + email templates",
      "POST /api/blog/link-check": "Check for broken links",
      "GET /api/blog/link-check": "Quick link health stats",
      "POST /api/blog/competitor": "Monitor competitor moves",
      // Performance & Reporting
      "POST /api/blog/vitals": "Check Core Web Vitals & performance",
      "GET /api/blog/vitals": "Quick vitals status",
      "POST /api/blog/report": "Generate weekly SEO report",
      "GET /api/blog/report": "Quick stats",
      // Distribution
      "POST /api/blog/social": "Generate social media posts (Twitter/FB/LinkedIn)",
      "POST /api/blog/index-now": "Submit URLs to search engines (Bing/Yandex/Google)",
      "GET /api/blog/index-now": "Get IndexNow key",
      // System
      "GET /api/blog/dashboard": "This endpoint - full dashboard (19 automations!)",
      "GET /api/blog/cron": "Cron trigger (runs daily, 13-16 automations/day)",
    };

    // Recent posts summary
    const recentPosts = posts.slice(0, 5).map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      readingTime: p.readingTime,
      lastUpdated: (p as any).lastUpdated || null,
      ogImage: (p as any).ogImage || null,
      translated: !!(p as any).translations?.en,
    }));

    // Audit history
    const auditHistory = (data.audits || []).slice(-5).map((a) => ({
      date: a.date,
      overallScore: a.score?.overall || 0,
      criticalIssues: a.criticalIssuesCount,
    }));

    // Translation stats
    const translationStats = {
      totalPosts: posts.length,
      translatedToEn: posts.filter((p) => (p as any).translations?.en).length,
    };

    // OG image stats
    const ogStats = {
      totalPosts: posts.length,
      withOgImage: posts.filter((p) => (p as any).ogImage).length,
    };

    return NextResponse.json({
      success: true,
      totalAutomations: 19,
      dashboard,
      schedule,
      endpoints,
      recentPosts,
      auditHistory,
      translationStats,
      ogStats,
      linkHealth: data.linkHealth || null,
      keywordResearch: data.keywordResearch || null,
      contentGap: data.contentGap || null,
      vitalsCheck: (data as any).vitalsCheck || null,
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

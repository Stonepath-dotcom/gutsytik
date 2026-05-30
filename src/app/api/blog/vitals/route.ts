import { NextRequest, NextResponse } from "next/server";
import { createZai } from "@/lib/zai";
import { getAllAutoBlogPosts, getAutoBlogData, saveAutoBlogData } from "@/lib/auto-blog";

/**
 * Auto Web Vitals & Performance Monitor
 * Uses web search to check Core Web Vitals data and performance benchmarks
 * Provides recommendations for improving page speed (critical for Google ranking!)
 *
 * Google's Core Web Vitals are a DIRECT ranking factor since 2021!
 */
export async function POST(req: NextRequest) {
  try {
    const zai = await createZai();
    const baseUrl = "https://getmova.my.id";

    // Check website performance via web search
    const searchQueries = [
      "getmova.my.id core web vitals",
      "getmova.my.id page speed",
      "site performance check getmova",
      "core web vitals optimization tips 2026",
      "next.js performance optimization 2026",
      "page speed ranking factor Google 2026",
    ];

    const searchPromises = searchQueries.map(async (query) => {
      try {
        const results = await zai.functions.invoke("web_search", {
          query,
          num: 5,
        });
        return results || [];
      } catch {
        return [];
      }
    });

    const searchResults = await Promise.allSettled(searchPromises);

    const allSnippets: string[] = [];
    for (const result of searchResults) {
      if (result.status === "fulfilled" && Array.isArray(result.value)) {
        for (const item of result.value) {
          if (item.snippet) allSnippets.push(item.snippet);
          if (item.name) allSnippets.push(item.name);
        }
      }
    }

    // Try to check the actual site
    let siteCheckResult: { ok: boolean; status: number; responseTime: number } | null = null;
    try {
      const startTime = Date.now();
      const siteResponse = await fetch(baseUrl, {
        method: "HEAD",
        signal: AbortSignal.timeout(10000),
      });
      siteCheckResult = {
        ok: siteResponse.ok,
        status: siteResponse.status,
        responseTime: Date.now() - startTime,
      };
    } catch {
      siteCheckResult = { ok: false, status: 0, responseTime: -1 };
    }

    // Use AI to generate performance recommendations
    const vitalsResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah web performance specialist berbahasa Indonesia yang ahli dalam Core Web Vitals dan Next.js optimization. Analisis dan berikan rekomendasi performa untuk website "GetMova" (getmova.my.id) - situs download video online yang dibangun dengan Next.js.`,
        },
        {
          role: "user",
          content: `Analisis performa web untuk GetMova.

INFO WEBSITE:
- Framework: Next.js 16 (App Router) + React 19
- Styling: Tailwind CSS v4
- Deployment: Vercel
- Domain: getmova.my.id
- Site Check: ${siteCheckResult ? `Status ${siteCheckResult.status}, Response Time ${siteCheckResult.responseTime}ms` : "Unable to check"}

HASIL PENCARIAN TERKAIT:
${allSnippets.slice(0, 15).join("\n---\n")}

HALAMAN YANG ADA:
- Homepage (banyak section: hero, features, platforms, FAQ, stats, blog preview)
- Platform pages (9 halaman)
- Blog (28 static + auto-generated)
- Legal pages (5 halaman)

ANALISIS DAN BERIKAN:
1. Core Web Vitals Assessment (estimasi berdasarkan teknologi)
2. Performance Bottlenecks yang kemungkinan ada
3. Optimization Recommendations (prioritized)
4. Next.js-specific optimizations
5. Image optimization strategy
6. JavaScript bundle optimization
7. CSS optimization
8. Caching strategy
9. Mobile performance tips
10. Quick wins yang bisa langsung diimplementasi

Output JSON:
{
  "estimatedVitals": {
    "lcp": "estimate + rating (good/needs-improvement/poor)",
    "fid": "estimate + rating",
    "cls": "estimate + rating",
    "fcp": "estimate + rating",
    "ttfb": "estimate + rating"
  },
  "bottlenecks": [{ "issue": "...", "impact": "high|medium|low", "page": "..." }],
  "recommendations": [{ "action": "...", "impact": "high|medium|low", "effort": "high|medium|low", "details": "..." }],
  "nextJsOptimizations": ["..."],
  "imageOptimization": ["..."],
  "cachingStrategy": ["..."],
  "quickWins": [{ "action": "...", "expectedImprovement": "..." }],
  "mobileSpecific": ["..."],
  "overallScore": 0-100
}

OUTPUT HANYA JSON.`,
        },
      ],
      temperature: 0.4,
      max_tokens: 3000,
    });

    let vitalsData;
    try {
      const responseText = vitalsResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      vitalsData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      vitalsData = {
        estimatedVitals: {},
        bottlenecks: [],
        recommendations: [],
        nextJsOptimizations: [],
        imageOptimization: [],
        cachingStrategy: [],
        quickWins: [],
        mobileSpecific: [],
        overallScore: 50,
      };
    }

    // Save vitals data
    const data = getAutoBlogData();
    (data as any).vitalsCheck = {
      lastCheck: new Date().toISOString(),
      siteResponseTime: siteCheckResult?.responseTime || -1,
      siteStatus: siteCheckResult?.ok || false,
      estimatedScore: vitalsData.overallScore,
    };
    saveAutoBlogData(data);

    return NextResponse.json({
      success: true,
      siteCheck: siteCheckResult,
      vitalsData,
      message: "Web vitals analysis completed",
    });
  } catch (error: any) {
    console.error("Web vitals error:", error);
    return NextResponse.json(
      { error: "Failed to check web vitals", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Quick vitals status
export async function GET() {
  const data = getAutoBlogData();
  const vitalsCheck = (data as any).vitalsCheck;

  return NextResponse.json({
    lastCheck: vitalsCheck?.lastCheck || null,
    siteResponseTime: vitalsCheck?.siteResponseTime || null,
    estimatedScore: vitalsCheck?.estimatedScore || null,
  });
}

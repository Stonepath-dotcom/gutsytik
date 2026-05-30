import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { getAllAutoBlogPosts, getAutoBlogData } from "@/lib/auto-blog";

/**
 * Auto SEO Audit
 * Uses AI to analyze the site's SEO health and provide actionable recommendations
 * Checks: meta tags, content quality, internal linking, schema markup, etc.
 *
 * Runs weekly via cron - keeps the site optimized for Google!
 */
export async function POST(req: NextRequest) {
  try {
    const zai = await ZAI.create();
    const data = getAutoBlogData();
    const posts = getAllAutoBlogPosts();

    // Collect site data for audit
    const siteData = {
      totalAutoPosts: posts.length,
      totalTopics: data.topics.length,
      postsWithInternalLinks: 0,
      postsWithFaq: 0,
      postsWithHowTo: 0,
      postsWithLastUpdated: 0,
      averageWordCount: 0,
      postsByMonth: {} as Record<string, number>,
      keywordsUsed: new Set<string>(),
    };

    // Analyze posts
    for (const post of posts) {
      // Check internal links
      if (post.content.includes('<a href="/') || post.content.includes('<a href="https://getmova')) {
        siteData.postsWithInternalLinks++;
      }

      // Check FAQ schema
      if (post.faqJsonLd && (post.faqJsonLd as any).mainEntity?.length > 0) {
        siteData.postsWithFaq++;
      }

      // Check HowTo schema
      if (post.howToJsonLd && (post.howToJsonLd as any).step?.length > 0) {
        siteData.postsWithHowTo++;
      }

      // Check last updated
      if ((post as any).lastUpdated) {
        siteData.postsWithLastUpdated++;
      }

      // Estimate word count
      const plainText = post.content.replace(/<[^>]*>/g, "").trim();
      const wordCount = plainText.split(/\s+/).length;
      siteData.averageWordCount += wordCount;

      // Count by month
      const month = post.dateISO?.substring(0, 7) || "unknown";
      siteData.postsByMonth[month] = (siteData.postsByMonth[month] || 0) + 1;

      // Collect keywords
      for (const kw of post.keywords) {
        siteData.keywordsUsed.add(kw);
      }
    }

    if (posts.length > 0) {
      siteData.averageWordCount = Math.round(siteData.averageWordCount / posts.length);
    }

    // Use AI to generate SEO audit
    const auditResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah SEO auditor profesional berbahasa Indonesia. Analisis data website dan berikan rekomendasi SEO yang actionable dan spesifik. Fokus pada faktor yang langsung mempengaruhi ranking Google.`,
        },
        {
          role: "user",
          content: `Lakukan SEO audit untuk website "GetMova" (getmova.my.id) - situs download video online.

DATA WEBSITE SAAT INI:
- Total artikel auto-generated: ${siteData.totalAutoPosts}
- Total topik tersedia: ${siteData.totalTopics}
- Artikel dengan internal links: ${siteData.postsWithInternalLinks}/${siteData.totalAutoPosts}
- Artikel dengan FAQ schema: ${siteData.postsWithFaq}/${siteData.totalAutoPosts}
- Artikel dengan HowTo schema: ${siteData.postsWithHowTo}/${siteData.totalAutoPosts}
- Artikel yang sudah di-update: ${siteData.postsWithLastUpdated}/${siteData.totalAutoPosts}
- Rata-rata jumlah kata per artikel: ${siteData.averageWordCount}
- Total keyword unik: ${siteData.keywordsUsed.size}
- Distribusi artikel per bulan: ${JSON.stringify(siteData.postsByMonth)}

HALAMAN YANG ADA:
- Homepage (hero, features, platforms, FAQ, stats)
- Platform pages: YouTube, TikTok, Instagram, Facebook, Twitter, Pinterest, Reddit, Telegram
- Blog: 28 artikel statis + ${siteData.totalAutoPosts} auto-generated
- Legal: Privacy, Terms, Disclaimer, DMCA, Cookie Policy
- Info: About, Contact, FAQ, How It Works
- Sitemap.xml, RSS feed (feed.xml)

FITUR YANG SUDAH ADA:
- JSON-LD schema (Article, FAQPage, HowTo, BreadcrumbList)
- IndexNow (Bing, Yandex, Google ping)
- Internal linking otomatis
- Content refresh otomatis
- Sitemap & RSS feed

ANALISIS DAN BERIKAN:
1. SEO Score (0-100) dengan breakdown per kategori
2. Critical Issues (harus diperbaiki segera)
3. Warnings (perlu perhatian)
4. Opportunities (peluang peningkatan)
5. Action Items (langkah konkret yang harus dilakukan)
6. Keyword gaps (keyword yang belum ditarget)
7. Content strategy recommendations

Output dalam format JSON:
{
  "score": { "overall": 0-100, "content": 0-100, "technical": 0-100, "onpage": 0-100, "schema": 0-100 },
  "criticalIssues": ["..."],
  "warnings": ["..."],
  "opportunities": ["..."],
  "actionItems": [{ "priority": "high|medium|low", "task": "...", "impact": "..." }],
  "keywordGaps": ["..."],
  "contentStrategy": ["..."],
  "topRecommendations": ["..."]
}

OUTPUT HANYA JSON, tanpa penjelasan tambahan.`,
        },
      ],
      temperature: 0.4,
      max_tokens: 3000,
    });

    let auditResult;
    try {
      const responseText = auditResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      auditResult = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      auditResult = {
        score: { overall: 50, content: 50, technical: 50, onpage: 50, schema: 50 },
        criticalIssues: ["Audit parsing failed"],
        warnings: [],
        opportunities: [],
        actionItems: [],
        keywordGaps: [],
        contentStrategy: [],
        topRecommendations: [],
      };
    }

    // Save audit to data store
    const auditData = {
      date: new Date().toISOString(),
      score: auditResult.score,
      criticalIssuesCount: auditResult.criticalIssues?.length || 0,
      warningsCount: auditResult.warnings?.length || 0,
      opportunitiesCount: auditResult.opportunities?.length || 0,
    };

    // Store last 10 audits
    if (!data.audits) (data as any).audits = [];
    (data as any).audits.push(auditData);
    if ((data as any).audits.length > 10) {
      (data as any).audits = (data as any).audits.slice(-10);
    }

    // Don't save to file to avoid disrupting blog data - just return the result

    return NextResponse.json({
      success: true,
      audit: auditResult,
      siteData: {
        totalPosts: siteData.totalAutoPosts,
        averageWordCount: siteData.averageWordCount,
        internalLinkCoverage: posts.length > 0 ? `${Math.round((siteData.postsWithInternalLinks / posts.length) * 100)}%` : "0%",
        schemaCoverage: posts.length > 0 ? `${Math.round((siteData.postsWithFaq / posts.length) * 100)}%` : "0%",
        contentFreshness: posts.length > 0 ? `${Math.round((siteData.postsWithLastUpdated / posts.length) * 100)}%` : "0%",
      },
      message: "SEO audit completed successfully",
    });
  } catch (error: any) {
    console.error("SEO audit error:", error);
    return NextResponse.json(
      { error: "Failed to perform SEO audit", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Quick SEO health check
export async function GET() {
  const posts = getAllAutoBlogPosts();
  const data = getAutoBlogData();

  const quickStats = {
    totalAutoPosts: posts.length,
    availableTopics: data.topics.length - posts.length,
    lastGenerated: data.lastGenerated,
    recentAudits: (data as any).audits?.slice(-3) || [],
  };

  return NextResponse.json(quickStats);
}

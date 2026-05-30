import { NextRequest, NextResponse } from "next/server";
import { createZai } from "@/lib/zai";
import { getAllAutoBlogPosts, getAutoBlogData } from "@/lib/auto-blog";

/**
 * Auto Performance Report Generator
 * Generates a comprehensive weekly SEO & content performance report
 * Uses AI to analyze trends and provide strategic recommendations
 *
 * This gives you a snapshot of how GetMova's SEO is performing!
 */
export async function POST(req: NextRequest) {
  try {
    const zai = await createZai();
    const posts = getAllAutoBlogPosts();
    const data = getAutoBlogData();

    // Gather all metrics
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    // Post analytics
    const recentPosts = posts.filter((p) => new Date(p.dateISO) >= oneWeekAgo);
    const monthlyPosts = posts.filter((p) => new Date(p.dateISO) >= oneMonthAgo);
    const refreshedPosts = posts.filter((p) => (p as any).lastUpdated);

    // Content quality metrics
    const avgWordCount =
      posts.length > 0
        ? Math.round(
            posts.reduce((sum, p) => {
              const wc = p.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
              return sum + wc;
            }, 0) / posts.length
          )
        : 0;

    const postsWithInternalLinks = posts.filter(
      (p) => p.content.includes('<a href="/') || p.content.includes("getmova")
    ).length;

    const postsWithFaq = posts.filter(
      (p) => (p.faqJsonLd as any)?.mainEntity?.length > 0
    ).length;

    const postsWithHowTo = posts.filter(
      (p) => (p.howToJsonLd as any)?.step?.length > 0
    ).length;

    // Keyword coverage
    const allKeywords = new Set<string>();
    const keywordFrequency: Record<string, number> = {};
    for (const post of posts) {
      for (const kw of post.keywords) {
        allKeywords.add(kw.toLowerCase());
        keywordFrequency[kw.toLowerCase()] = (keywordFrequency[kw.toLowerCase()] || 0) + 1;
      }
    }

    // Content freshness
    const postsOlderThan7Days = posts.filter(
      (p) => new Date(p.dateISO) < oneWeekAgo
    );
    const stalePosts = postsOlderThan7Days.filter(
      (p) => !(p as any).lastUpdated
    );

    // Use AI to generate comprehensive report
    const reportResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah SEO analyst profesional berbahasa Indonesia. Buat laporan performa SEO mingguan yang komprehensif dan actionable untuk website "GetMova" (getmova.my.id).`,
        },
        {
          role: "user",
          content: `Buat laporan performa SEO mingguan untuk GetMova.

METRIK MINGGUAN:
- Total artikel: ${posts.length}
- Artikel minggu ini: ${recentPosts.length}
- Artikel bulan ini: ${monthlyPosts.length}
- Artikel yang sudah di-refresh: ${refreshedPosts.length}
- Artikel stale (>7 hari belum update): ${stalePosts.length}

KUALITAS KONTEN:
- Rata-rata jumlah kata: ${avgWordCount}
- Artikel dengan internal links: ${postsWithInternalLinks}/${posts.length} (${posts.length > 0 ? Math.round((postsWithInternalLinks / posts.length) * 100) : 0}%)
- Artikel dengan FAQ schema: ${postsWithFaq}/${posts.length} (${posts.length > 0 ? Math.round((postsWithFaq / posts.length) * 100) : 0}%)
- Artikel dengan HowTo schema: ${postsWithHowTo}/${posts.length} (${posts.length > 0 ? Math.round((postsWithHowTo / posts.length) * 100) : 0}%)
- Total keyword unik: ${allKeywords.size}
- Keyword paling sering: ${Object.entries(keywordFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([k, v]) => `${k} (${v}x)`)
            .join(", ")}

TOPIK:
- Total topik tersedia: ${data.topics.length}
- Topik belum ditulis: ${data.topics.length - posts.length}
- Terakhir generate: ${data.lastGenerated || "Belum ada"}

AUTOMATION STATUS:
- Auto blog generation: Aktif (4x/minggu)
- Content refresh: Aktif (3x/minggu)
- IndexNow: Aktif
- Internal linking: Aktif
- Social media post: Aktif

BUAT LAPORAN DENGAN:
1. Executive Summary (ringkasan singkat)
2. Key Metrics & Trends
3. Content Health Score (0-100)
4. Top Performing Content Type
5. Content Velocity (apakah cukup cepat)
6. SEO Strengths
7. SEO Weaknesses
8. Priority Actions for Next Week
9. Content Calendar Recommendation
10. Competitive Positioning Assessment

Output JSON:
{
  "executiveSummary": "...",
  "contentHealthScore": 0-100,
  "keyMetrics": { "metric": "value" },
  "trends": ["trend yang teridentifikasi"],
  "strengths": ["kekuatan SEO"],
  "weaknesses": ["kelemahan yang perlu diperbaiki"],
  "priorityActions": [{ "action": "...", "impact": "high|medium|low", "effort": "high|medium|low" }],
  "contentCalendar": [{ "day": "Senin", "topic": "...", "type": "..." }],
  "competitiveAssessment": "analisis posisi kompetitif",
  "nextWeekGoals": ["goal untuk minggu depan"],
  "riskAlerts": ["risiko yang perlu diwaspadai"]
}

OUTPUT HANYA JSON, tanpa penjelasan tambahan.`,
        },
      ],
      temperature: 0.4,
      max_tokens: 3000,
    });

    let reportData;
    try {
      const responseText = reportResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      reportData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      reportData = {
        executiveSummary: "Report generation partially failed",
        contentHealthScore: 50,
        keyMetrics: {},
        trends: [],
        strengths: [],
        weaknesses: [],
        priorityActions: [],
        contentCalendar: [],
        competitiveAssessment: "",
        nextWeekGoals: [],
        riskAlerts: [],
      };
    }

    return NextResponse.json({
      success: true,
      reportPeriod: {
        from: oneWeekAgo.toISOString().split("T")[0],
        to: now.toISOString().split("T")[0],
      },
      rawMetrics: {
        totalPosts: posts.length,
        weeklyPosts: recentPosts.length,
        monthlyPosts: monthlyPosts.length,
        avgWordCount,
        internalLinkRate: posts.length > 0 ? `${Math.round((postsWithInternalLinks / posts.length) * 100)}%` : "0%",
        schemaRate: posts.length > 0 ? `${Math.round((postsWithFaq / posts.length) * 100)}%` : "0%",
        keywordCount: allKeywords.size,
        stalePosts: stalePosts.length,
      },
      report: reportData,
      message: "Weekly SEO performance report generated successfully",
    });
  } catch (error: any) {
    console.error("Report generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate report", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Quick stats
export async function GET() {
  const posts = getAllAutoBlogPosts();
  const data = getAutoBlogData();

  return NextResponse.json({
    totalAutoPosts: posts.length,
    availableTopics: data.topics.length - posts.length,
    lastGenerated: data.lastGenerated,
    recentAudits: (data as any).audits?.slice(-3) || [],
  });
}

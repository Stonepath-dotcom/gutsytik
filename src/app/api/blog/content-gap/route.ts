import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { getAllAutoBlogPosts, getAutoBlogData, saveAutoBlogData } from "@/lib/auto-blog";

/**
 * Auto Content Gap Analysis
 * Compares GetMova's content with competitor sites to find topics they cover that we don't
 * Uses web search to find competitor articles + AI to analyze gaps
 *
 * This is GOLD for SEO - find what competitors rank for that you're missing!
 */
export async function POST(req: NextRequest) {
  try {
    const zai = await ZAI.create();
    const posts = getAllAutoBlogPosts();
    const data = getAutoBlogData();

    // Get our existing content inventory
    const ourTopics = [
      ...data.topics,
      ...posts.map((p) => p.slug),
      ...posts.map((p) => p.title.toLowerCase()),
    ];

    // Search competitor content
    const competitorSearches = [
      "site:savefrom.net download video",
      "site:snaptik.app tiktok download",
      "site:y2mate.com youtube download",
      "site:ssstik.io tiktok downloader",
      "site:snapinsta.app instagram download",
      "video downloader blog artikel Indonesia",
      "tutorial download video blog terlengkap",
      "cara download video semua platform panduan",
    ];

    const searchPromises = competitorSearches.map(async (query) => {
      try {
        const results = await zai.functions.invoke("web_search", {
          query,
          num: 8,
        });
        return results || [];
      } catch {
        return [];
      }
    });

    const searchResults = await Promise.allSettled(searchPromises);

    // Collect competitor content
    const competitorContent: {
      url: string;
      name: string;
      snippet: string;
      host: string;
    }[] = [];

    for (const result of searchResults) {
      if (result.status === "fulfilled" && Array.isArray(result.value)) {
        for (const item of result.value) {
          competitorContent.push({
            url: item.url || "",
            name: item.name || "",
            snippet: item.snippet || "",
            host: item.host_name || "",
          });
        }
      }
    }

    // Use AI to identify content gaps
    const gapResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah content strategist dan SEO analyst berbahasa Indonesia. Analisis konten kompetitor dan identifikasi celah konten (content gaps) untuk website "GetMova" (getmova.my.id).`,
        },
        {
          role: "user",
          content: `Analisis content gap untuk GetMova.

KONTEN KOMPETITOR (${competitorContent.length} hasil):
${competitorContent.slice(0, 30).map((c) => `[${c.host}] ${c.name}\n${c.snippet}`).join("\n\n")}

TOPIK YANG SUDAH DICOVER GETMOVA:
${ourTopics.slice(0, 80).join(", ")}

HALAMAN YANG SUDAH ADA:
- YouTube Downloader, YouTube MP3
- TikTok, Instagram, Facebook, Twitter/X Downloader
- Pinterest, Reddit, Telegram Downloader
- 28 artikel blog statis + ${posts.length} auto-generated
- FAQ, How It Works, About, Contact

TEMUKAN:
1. Topik yang kompetitor cover tapi GetMova belum (content gaps)
2. Format konten yang kompetitor pakai tapi GetMova belum (listicle, comparison, dll)
3. Keyword yang kompetitor rank tapi GetMova belum
4. Topik yang bisa dibuat lebih baik dari kompetitor (skyscraper technique)
5. Platform/fitur baru yang belum ada kontennya

Setiap gap harus punya:
- topic: topik/slug artikel yang harus dibuat
- type: tipe konten (tutorial, comparison, listicle, guide, faq)
- competitorRanking: kompetitor mana yang ranking
- difficulty: seberapa sulit untuk rank
- estimatedTraffic: estimasi traffic potensial
- priority: 1-10

Output JSON:
{
  "contentGaps": [
    {
      "topic": "...",
      "slug": "...",
      "type": "tutorial|comparison|listicle|guide|faq",
      "competitorRanking": "...",
      "difficulty": "easy|medium|hard",
      "estimatedTraffic": "...",
      "priority": 1-10,
      "suggestedTitle": "...",
      "whyImportant": "..."
    }
  ],
  "formatGaps": ["format konten yang belum dimanfaatkan"],
  "skyscraperOpportunities": ["konten yang bisa dibuat lebih baik"],
  "quickWins": ["gap yang paling mudah ditutup segera"],
  "strategy": "strategi content gap keseluruhan"
}

OUTPUT HANYA JSON, tanpa penjelasan tambahan.`,
        },
      ],
      temperature: 0.4,
      max_tokens: 3000,
    });

    let gapData;
    try {
      const responseText = gapResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      gapData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      gapData = {
        contentGaps: [],
        formatGaps: [],
        skyscraperOpportunities: [],
        quickWins: [],
        strategy: "",
      };
    }

    // Add top content gap topics to our topics pool
    const existingSlugs = new Set([
      ...data.topics,
      ...data.posts.map((p) => p.slug),
    ]);

    let newTopicsAdded = 0;
    const newTopics: string[] = [];

    if (gapData.contentGaps) {
      // Sort by priority
      const sortedGaps = [...gapData.contentGaps].sort(
        (a: any, b: any) => (b.priority || 5) - (a.priority || 5)
      );

      for (const gap of sortedGaps.slice(0, 15)) {
        const slug = gap.slug || gap.topic
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 60);

        if (!existingSlugs.has(slug) && slug.length > 5) {
          data.topics.push(slug);
          existingSlugs.add(slug);
          newTopics.push(slug);
          newTopicsAdded++;
        }
      }
    }

    saveAutoBlogData(data);

    return NextResponse.json({
      success: true,
      competitorContentAnalyzed: competitorContent.length,
      contentGapsFound: gapData.contentGaps?.length || 0,
      newTopicsAdded,
      newTopics,
      gapData,
      message: `Found ${gapData.contentGaps?.length || 0} content gaps, added ${newTopicsAdded} new topics`,
    });
  } catch (error: any) {
    console.error("Content gap analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze content gaps", details: error.message },
      { status: 500 }
    );
  }
}

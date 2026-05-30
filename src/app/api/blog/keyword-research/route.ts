import { NextRequest, NextResponse } from "next/server";
import { createZai } from "@/lib/zai";
import { getAutoBlogData, saveAutoBlogData, getAllAutoBlogPosts } from "@/lib/auto-blog";

/**
 * Auto Keyword Research
 * Uses web search + AI to discover keyword opportunities for GetMova
 * Finds long-tail keywords with high potential that competitors are ranking for
 *
 * This feeds into: blog topic generation, landing page optimization, content strategy
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const focusArea = (body.focusArea as string) || "general";
    const zai = await createZai();

    // Search for competitor keywords and trending queries
    const searchQueries = [
      "download video online gratis Indonesia",
      "tiktok downloader tanpa watermark",
      "instagram reels download hd",
      "youtube to mp3 converter 2026",
      "cara download video dari sosial media",
      "video downloader terbaik 2026",
      "download video tanpa aplikasi",
      "snaptik savefrom y2mate alternatif",
    ];

    // Run searches in parallel
    const searchPromises = searchQueries.map(async (query) => {
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

    // Collect all data from search results
    const competitorData: {
      url: string;
      name: string;
      snippet: string;
      host: string;
    }[] = [];

    for (const result of searchResults) {
      if (result.status === "fulfilled" && Array.isArray(result.value)) {
        for (const item of result.value) {
          competitorData.push({
            url: item.url || "",
            name: item.name || "",
            snippet: item.snippet || "",
            host: item.host_name || "",
          });
        }
      }
    }

    // Use AI to analyze keywords
    const posts = getAllAutoBlogPosts();
    const existingKeywords = new Set<string>();
    for (const post of posts) {
      for (const kw of post.keywords) {
        existingKeywords.add(kw.toLowerCase());
      }
    }

    const keywordResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah keyword research specialist berbahasa Indonesia yang ahli dalam SEO. Analisis hasil pencarian web dan temukan keyword opportunities yang belum ditarget oleh website "GetMova" (getmova.my.id).`,
        },
        {
          role: "user",
          content: `Analisis hasil pencarian web dan temukan keyword opportunities untuk GetMova.

HASIL PENCARIAN WEB (${competitorData.length} hasil):
${competitorData.slice(0, 30).map((d) => `[${d.host}] ${d.name}\n${d.snippet}`).join("\n\n")}

KEYWORD YANG SUDAH DITARGET:
${Array.from(existingKeywords).slice(0, 50).join(", ")}

FOCUS AREA: ${focusArea}

TEMUKAN:
1. Long-tail keywords yang belum ditarget (minimal 15)
2. Keyword gaps (kompetitor ranking tapi GetMova belum)
3. Trending keywords 2026 yang relevan
4. Question keywords (how, cara, tips, dll)
5. Comparison keywords (vs, terbaik, alternatif, dll)

Setiap keyword harus punya estimasi:
- difficulty: low/medium/high
- intent: informational/navigational/transactional
- suggestedContent: ide konten untuk keyword tersebut

Output JSON:
{
  "keywordOpportunities": [
    {
      "keyword": "...",
      "difficulty": "low|medium|high",
      "intent": "informational|navigational|transactional",
      "searchVolume": "estimasi volume",
      "suggestedContent": "ide konten",
      "priority": 1-10
    }
  ],
  "competitorInsights": ["insight tentang kompetitor"],
  "contentGaps": ["celah konten yang bisa dieksploitasi"],
  "quickWins": ["keyword mudah rank yang bisa ditarget segera"]
}

OUTPUT HANYA JSON, tanpa penjelasan tambahan.`,
        },
      ],
      temperature: 0.4,
      max_tokens: 3000,
    });

    let keywordData;
    try {
      const responseText = keywordResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      keywordData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      keywordData = {
        keywordOpportunities: [],
        competitorInsights: [],
        contentGaps: [],
        quickWins: [],
      };
    }

    // Convert top keyword opportunities into blog topics and add them
    const data = getAutoBlogData();
    const existingSlugs = new Set([
      ...data.topics,
      ...data.posts.map((p) => p.slug),
    ]);

    let newTopicsAdded = 0;
    const newTopics: string[] = [];

    if (keywordData.keywordOpportunities) {
      for (const kw of keywordData.keywordOpportunities) {
        // Convert keyword to slug
        const slug = kw.keyword
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .substring(0, 60);

        if (!existingSlugs.has(slug) && slug.length > 5) {
          data.topics.push(slug);
          existingSlugs.add(slug);
          newTopics.push(slug);
          newTopicsAdded++;
        }
      }
    }

    // Add quick win topics too
    if (keywordData.quickWins) {
      for (const qw of keywordData.quickWins) {
        const slug = qw
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
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
      competitorResultsAnalyzed: competitorData.length,
      keywordOpportunities: keywordData.keywordOpportunities?.length || 0,
      newTopicsAdded,
      newTopics,
      keywordData,
      message: `Found ${keywordData.keywordOpportunities?.length || 0} keyword opportunities, added ${newTopicsAdded} new topics`,
    });
  } catch (error: any) {
    console.error("Keyword research error:", error);
    return NextResponse.json(
      { error: "Failed to research keywords", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Quick keyword stats
export async function GET() {
  const posts = getAllAutoBlogPosts();
  const allKeywords = new Set<string>();
  for (const post of posts) {
    for (const kw of post.keywords) {
      allKeywords.add(kw.toLowerCase());
    }
  }

  return NextResponse.json({
    totalKeywords: allKeywords.size,
    keywords: Array.from(allKeywords),
    totalPosts: posts.length,
  });
}

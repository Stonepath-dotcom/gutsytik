import { NextRequest, NextResponse } from "next/server";
import { createZai } from "@/lib/zai";

/**
 * Auto Backlink Opportunity Finder
 * Uses web search to find websites, blogs, and directories that might link to GetMova
 * Finds: resource pages, blog directories, guest post opportunities, competitor backlinks
 *
 * Key strategy: Find sites that link to competitors → outreach to them too!
 */
export async function POST(req: NextRequest) {
  try {
    const zai = await createZai();

    // Search for backlink opportunities
    const searchQueries = [
      // Resource pages that list video downloaders
      "resource video downloader tools",
      "daftar situs download video gratis",
      "best free video downloaders 2026",
      // Blog directories
      "submit blog Indonesia gratis",
      "directory submission Indonesia",
      // Guest post opportunities
      "guest post teknologi Indonesia",
      "tulis artikel teknologi guest post",
      // Competitor mentions
      "savefrom alternatif terbaik",
      "snaptik alternatif download tiktok",
      "y2mate alternatif youtube downloader",
      // Q&A sites where we can answer
      "cara download video tanpa watermark site:quora.com",
      "download video online aman",
      // Educational/resource lists
      "tools download video gratis terbaik",
      "aplikasi download video rekomendasi",
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

    // Collect results
    const allResults: {
      url: string;
      name: string;
      snippet: string;
      host: string;
      query: string;
    }[] = [];

    for (let i = 0; i < searchResults.length; i++) {
      const result = searchResults[i];
      if (result.status === "fulfilled" && Array.isArray(result.value)) {
        for (const item of result.value) {
          allResults.push({
            url: item.url || "",
            name: item.name || "",
            snippet: item.snippet || "",
            host: item.host_name || "",
            query: searchQueries[i],
          });
        }
      }
    }

    // Use AI to categorize and score backlink opportunities
    const backlinkResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah link building specialist berbahasa Indonesia. Analisis hasil pencarian web dan identifikasi peluang backlink untuk website "GetMova" (getmova.my.id) - situs download video online gratis.`,
        },
        {
          role: "user",
          content: `Analisis hasil pencarian web dan identifikasi peluang backlink untuk GetMova.

HASIL PENCARIAN (${allResults.length} hasil):
${allResults.slice(0, 30).map((r) => `[${r.host}] ${r.name}\n${r.snippet}\nURL: ${r.url}\nQuery: ${r.query}`).join("\n\n")}

KATEGORI PELUANG BACKLINK:
1. **Resource Pages** - Halaman yang list tools/resources (mudah didapat, cukup email minta ditambahkan)
2. **Blog Directory** - Direktori blog yang bisa submit gratis
3. **Guest Post** - Blog yang terima guest post (perlu tulis artikel)
4. **Q&A Sites** - Quora/Reddit threads yang bisa dijawab + link
5. **Competitor Mentions** - Site yang mention kompetitor (bisa di-outreach juga)
6. **Review Sites** - Site yang review tools sejenis
7. **Social Bookmarking** - Situs social bookmark Indonesia

Setiap opportunity harus punya:
- url: URL target
- type: kategori peluang
- difficulty: easy/medium/hard
- suggestedApproach: cara outreach yang direkomendasikan
- emailTemplate: template email singkat untuk outreach (dalam bahasa Indonesia)
- priority: 1-10

Output JSON:
{
  "opportunities": [
    {
      "url": "...",
      "name": "...",
      "type": "resource|directory|guest_post|qa|competitor|review|social",
      "difficulty": "easy|medium|hard",
      "suggestedApproach": "...",
      "emailTemplate": "...",
      "priority": 1-10
    }
  ],
  "quickWins": ["peluang yang paling mudah didapat"],
  "outreachStrategy": "strategi outreach keseluruhan",
  "estimatedBacklinks": "estimasi jumlah backlink yang bisa didapat dalam 1 bulan"
}

OUTPUT HANYA JSON, tanpa penjelasan tambahan.`,
        },
      ],
      temperature: 0.5,
      max_tokens: 3000,
    });

    let backlinkData;
    try {
      const responseText = backlinkResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      backlinkData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      backlinkData = {
        opportunities: [],
        quickWins: [],
        outreachStrategy: "",
        estimatedBacklinks: "",
      };
    }

    return NextResponse.json({
      success: true,
      sitesAnalyzed: allResults.length,
      opportunitiesFound: backlinkData.opportunities?.length || 0,
      backlinkData,
      message: `Found ${backlinkData.opportunities?.length || 0} backlink opportunities`,
    });
  } catch (error: any) {
    console.error("Backlink finder error:", error);
    return NextResponse.json(
      { error: "Failed to find backlink opportunities", details: error.message },
      { status: 500 }
    );
  }
}

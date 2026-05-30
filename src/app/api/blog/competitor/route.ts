import { NextRequest, NextResponse } from "next/server";
import { createZai } from "@/lib/zai";

/**
 * Auto Competitor Monitor
 * Tracks what competitors are doing - new content, features, rankings
 * Alerts when competitors make moves that GetMova should respond to
 *
 * Know your enemy = beat your enemy in Google rankings!
 */
export async function POST(req: NextRequest) {
  try {
    const zai = await createZai();

    // Main competitors for GetMova
    const competitors = [
      { name: "SaveFrom", url: "savefrom.net", type: "video downloader" },
      { name: "SnapTik", url: "snaptik.app", type: "tiktok downloader" },
      { name: "Y2Mate", url: "y2mate.com", type: "youtube downloader" },
      { name: "SSSTik", url: "ssstik.io", type: "tiktok downloader" },
      { name: "SnapInsta", url: "snapinsta.app", type: "instagram downloader" },
      { name: "9xBuddy", url: "9xbuddy.app", type: "multi-platform downloader" },
    ];

    // Search for recent competitor activity
    const searchQueries = [
      "savefrom.net update 2026",
      "snaptik new features 2026",
      "y2mate alternative 2026",
      "video downloader terbaru Indonesia 2026",
      "download video online terbaik 2026 Indonesia",
      "competitor getmova savefrom snaptik y2mate",
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

    // Use AI to analyze competitor landscape
    const competitorResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah competitive intelligence analyst berbahasa Indonesia. Analisis lanskap kompetitor untuk website "GetMova" (getmova.my.id) - situs download video online gratis. Identifikasi ancaman, peluang, dan strategi counter.`,
        },
        {
          role: "user",
          content: `Analisis kompetitor untuk GetMova.

KOMPETITOR UTAMA:
${competitors.map((c) => `- ${c.name} (${c.url}): ${c.type}`).join("\n")}

HASIL PENCARIAN WEB TERBARU:
${allResults.slice(0, 25).map((r) => `[${r.host}] ${r.name}\n${r.snippet}`).join("\n\n")}

KEUNGGULAN GETMOVA:
- Support multi-platform (YouTube, TikTok, Instagram, Facebook, Twitter, Pinterest, Reddit, Telegram)
- Blog content yang aktif
- PWA support
- Tanpa iklan pop-up berlebihan
- Desain modern & mobile-friendly

ANALISIS:
1. **Competitor Moves** - Apa yang kompetitor lakukan baru-baru ini?
2. **Threats** - Ancaman dari kompetitor
3. **Opportunities** - Peluang yang bisa dieksploitasi
4. **Feature Gaps** - Fitur yang kompetitor punya tapi GetMova belum
5. **Content Gaps** - Konten yang kompetitor punya tapi GetMova belum
6. **Counter Strategy** - Strategi untuk mengalahkan kompetitor
7. **Quick Wins** - Langkah cepat yang bisa dilakukan segera

Output JSON:
{
  "competitorMoves": [{ "competitor": "...", "move": "...", "impact": "high|medium|low", "date": "..." }],
  "threats": [{ "threat": "...", "severity": "high|medium|low", "response": "..." }],
  "opportunities": [{ "opportunity": "...", "potential": "high|medium|low", "action": "..." }],
  "featureGaps": [{ "feature": "...", "competitor": "...", "priority": 1-10 }],
  "contentGaps": [{ "topic": "...", "competitor": "...", "priority": 1-10 }],
  "counterStrategy": [{ "strategy": "...", "timeline": "immediate|short-term|long-term" }],
  "quickWins": ["..."],
  "overallPosition": "leading|competitive|falling-behind",
  "positionExplanation": "..."
}

OUTPUT HANYA JSON.`,
        },
      ],
      temperature: 0.4,
      max_tokens: 3000,
    });

    let competitorData;
    try {
      const responseText = competitorResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      competitorData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      competitorData = {
        competitorMoves: [],
        threats: [],
        opportunities: [],
        featureGaps: [],
        contentGaps: [],
        counterStrategy: [],
        quickWins: [],
        overallPosition: "competitive",
        positionExplanation: "Analysis incomplete",
      };
    }

    return NextResponse.json({
      success: true,
      competitorsAnalyzed: competitors.length,
      searchResultsFound: allResults.length,
      competitorData,
      message: "Competitor analysis completed successfully",
    });
  } catch (error: any) {
    console.error("Competitor monitor error:", error);
    return NextResponse.json(
      { error: "Failed to monitor competitors", details: error.message },
      { status: 500 }
    );
  }
}

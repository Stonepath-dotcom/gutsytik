import { NextRequest, NextResponse } from "next/server";
import { createZai } from "@/lib/zai";
import { getAutoBlogData, saveAutoBlogData } from "@/lib/auto-blog";

/**
 * Auto Trending Topics Discovery
 * Uses z-ai-web-dev-sdk web search to find trending video download topics
 * Automatically adds new topics to the auto-blog topics pool
 *
 * This keeps the blog always writing about what people are searching for RIGHT NOW!
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const maxTopics = (body.maxTopics as number) || 10;

    const zai = await createZai();

    // Search for trending video download topics
    const searchQueries = [
      "download video trending 2026 Indonesia",
      "cara download video terbaru 2026",
      "video downloader populer 2026",
      "tiktok download tanpa watermark 2026",
      "instagram reels downloader 2026",
      "youtube download mp3 mp4 2026",
    ];

    // Run multiple searches in parallel
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

    // Collect all snippets and titles
    const allSnippets: string[] = [];
    const allNames: string[] = [];

    for (const result of searchResults) {
      if (result.status === "fulfilled" && Array.isArray(result.value)) {
        for (const item of result.value) {
          if (item.snippet) allSnippets.push(item.snippet);
          if (item.name) allNames.push(item.name);
        }
      }
    }

    if (allSnippets.length === 0 && allNames.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No search results found",
        newTopics: [],
      });
    }

    // Use AI to generate topic ideas from search results
    const topicResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah SEO content strategist berbahasa Indonesia. Tugas kamu adalah menganalisis hasil pencarian web dan menghasilkan ide topik artikel blog yang relevan, trending, dan punya potensi ranking tinggi di Google Indonesia.`,
        },
        {
          role: "user",
          content: `Berdasarkan hasil pencarian web berikut, generate ${maxTopics} ide topik artikel blog untuk website "GetMova" (download video online).

HASIL PENCARIAN WEB:
${allSnippets.slice(0, 20).join("\n---\n")}

JUDUL PENCARIAN:
${allNames.slice(0, 20).join("\n---\n")}

SYARAT TOPIK:
1. Format slug (huruf kecil, strip sebagai spasi): contoh "cara-download-video-tiktok-lite-2026"
2. Topik harus relevan dengan download video / konversi video / platform sosial media
3. Topik harus punya search volume potensial di Google Indonesia
4. Hindari topik yang sudah terlalu generic (seperti "cara download youtube")
5. Fokus pada topik yang spesifik, trending, dan long-tail keyword
6. Bisa termasuk: platform baru, fitur baru, update 2026, perbandingan, tips spesifik

Output HANYA JSON array:
["slug-topik-1", "slug-topik-2", ...]

OUTPUT HANYA JSON ARRAY, tanpa penjelasan tambahan.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    let newTopics: string[] = [];
    try {
      const responseText = topicResponse.choices[0]?.message?.content || "[]";
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      newTopics = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      newTopics = [];
    }

    if (newTopics.length === 0) {
      return NextResponse.json({
        success: false,
        message: "AI failed to generate topic ideas",
        newTopics: [],
      });
    }

    // Add new topics to the auto-blog data (avoid duplicates)
    const data = getAutoBlogData();
    const existingSlugs = new Set([
      ...data.topics,
      ...data.posts.map((p) => p.slug),
    ]);

    let addedCount = 0;
    for (const topic of newTopics) {
      const normalizedTopic = topic.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      if (!existingSlugs.has(normalizedTopic) && normalizedTopic.length > 5) {
        data.topics.push(normalizedTopic);
        existingSlugs.add(normalizedTopic);
        addedCount++;
      }
    }

    saveAutoBlogData(data);

    return NextResponse.json({
      success: true,
      searchResultsFound: allSnippets.length,
      newTopicsAdded: addedCount,
      newTopics: newTopics.slice(0, addedCount),
      totalTopicsAvailable: data.topics.length,
      message: `Found ${addedCount} new trending topics from web search`,
    });
  } catch (error: any) {
    console.error("Trending topics error:", error);
    return NextResponse.json(
      { error: "Failed to discover trending topics", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Check current trending status
export async function GET() {
  const data = getAutoBlogData();
  const usedSlugs = new Set(data.posts.map((p) => p.slug));
  const availableTopics = data.topics.filter((t) => !usedSlugs.has(t));

  return NextResponse.json({
    totalTopics: data.topics.length,
    usedTopics: usedSlugs.size,
    availableTopics: availableTopics.length,
    topics: data.topics,
  });
}

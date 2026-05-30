import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { getAllAutoBlogPosts, getAutoBlogData, saveAutoBlogData } from "@/lib/auto-blog";

/**
 * Auto Topic Cluster Strategy Generator
 * Creates pillar page + cluster content structure for maximum SEO impact
 * Google loves organized topic clusters - it shows topical authority!
 *
 * Strategy: One pillar page (comprehensive guide) + multiple cluster articles
 * that link back to the pillar page = topical authority + better rankings
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const focusArea = (body.focusArea as string) || "auto";
    const zai = await ZAI.create();

    const posts = getAllAutoBlogPosts();
    const data = getAutoBlogData();

    // Define main topic clusters for GetMova
    const clusterAreas = [
      {
        pillar: "download-video-youtube",
        pillarTitle: "Panduan Lengkap Download Video YouTube 2026",
        keywords: ["youtube", "download youtube", "youtube mp3", "youtube mp4", "youtube 4k"],
        clusterTopicPatterns: [
          "download-video-youtube-shorts",
          "download-video-youtube-hd-1080p",
          "download-video-youtube-mp4",
          "download-youtube-mp3",
          "download-video-youtube-tanpa-aplikasi",
          "download-video-youtube-dengan-subtitle",
          "download-video-4k-dari-youtube",
          "download-playlist-youtube",
        ],
      },
      {
        pillar: "download-video-tiktok",
        pillarTitle: "Panduan Lengkap Download Video TikTok 2026",
        keywords: ["tiktok", "download tiktok", "tiktok tanpa watermark", "snaptik"],
        clusterTopicPatterns: [
          "download-video-tiktok-tanpa-watermark",
          "download-video-tiktok-lite",
          "download-sound-tiktok-mp3",
          "download-video-tiktok-slideshow",
          "perbandingan-tiktok-downloader",
        ],
      },
      {
        pillar: "download-video-instagram",
        pillarTitle: "Panduan Lengkap Download Video Instagram 2026",
        keywords: ["instagram", "reels", "igtv", "instagram story"],
        clusterTopicPatterns: [
          "cara-download-video-instagram-reels",
          "download-video-instagram-igtv-dan-live",
          "download-instagram-reels",
          "download-video-instagram-story",
          "download-video-instagram-carousel",
        ],
      },
      {
        pillar: "download-video-tanpa-watermark",
        pillarTitle: "Panduan Download Video Tanpa Watermark dari Semua Platform",
        keywords: ["tanpa watermark", "no watermark", "download video bersih"],
        clusterTopicPatterns: [
          "download-video-tanpa-watermark-gratis",
          "download-video-tanpa-watermark-terbaik",
          "tips-menghilangkan-watermark-video",
        ],
      },
    ];

    // Use AI to analyze current content coverage and suggest clusters
    const clusterResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah SEO content strategist berbahasa Indonesia yang ahli dalam topic cluster strategy. Buat strategi pillar page + cluster content yang komprehensif untuk website "GetMova" (getmova.my.id).`,
        },
        {
          role: "user",
          content: `Buat strategi topic cluster untuk GetMova.

KONTEN YANG SUDAH ADA:
- ${posts.length} artikel auto-generated
- Topik yang sudah ditulis: ${posts.map((p) => p.slug).slice(0, 30).join(", ")}
- Topik tersedia: ${data.topics.slice(0, 30).join(", ")}

CLUSTER AREA YANG DIDEFINISIKAN:
${clusterAreas.map((c) => `Pillar: ${c.pillarTitle}\nCluster: ${c.clusterTopicPatterns.join(", ")}`).join("\n\n")}

HALAMAN PLATFORM YANG SUDAH ADA:
- YouTube Downloader, YouTube MP3
- TikTok, Instagram, Facebook, Twitter/X Downloader
- Pinterest, Reddit, Telegram Downloader

TUGAS:
1. Evaluasi cluster areas yang sudah ada - apakah sudah lengkap?
2. Buat cluster areas BARU yang belum terpikirkan
3. Untuk setiap cluster, tentukan:
   - Pillar page topic (artikel utama yang comprehensive)
   - Cluster articles (artikel spesifik yang link ke pillar)
   - Internal linking strategy (bagaimana mereka saling link)
   - Priority (mana yang harus dibuat dulu)

4. Tambahkan cluster untuk platform yang belum punya cluster:
   - Facebook, Twitter/X, Pinterest, Reddit, Telegram

Output JSON:
{
  "existingClusters": [
    {
      "pillar": { "slug": "...", "title": "..." },
      "clusterArticles": [{ "slug": "...", "title": "...", "status": "exists|missing" }],
      "completeness": "0-100%",
      "priority": 1-10
    }
  ],
  "newClusters": [
    {
      "pillar": { "slug": "...", "title": "..." },
      "clusterArticles": [{ "slug": "...", "title": "..." }],
      "priority": 1-10
    }
  ],
  "internalLinkingStrategy": "strategi linking",
  "contentCalendar": [{ "week": 1, "tasks": ["..."] }],
  "topRecommendations": ["..."]
}

OUTPUT HANYA JSON.`,
        },
      ],
      temperature: 0.5,
      max_tokens: 3000,
    });

    let clusterData;
    try {
      const responseText = clusterResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      clusterData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      clusterData = {
        existingClusters: [],
        newClusters: [],
        internalLinkingStrategy: "",
        contentCalendar: [],
        topRecommendations: [],
      };
    }

    // Add missing cluster article topics to the topics pool
    const existingSlugs = new Set([
      ...data.topics,
      ...data.posts.map((p) => p.slug),
    ]);

    let newTopicsAdded = 0;
    const newTopics: string[] = [];

    // Add from new clusters
    if (clusterData.newClusters) {
      for (const cluster of clusterData.newClusters) {
        // Add pillar
        if (cluster.pillar?.slug && !existingSlugs.has(cluster.pillar.slug)) {
          data.topics.push(cluster.pillar.slug);
          existingSlugs.add(cluster.pillar.slug);
          newTopics.push(cluster.pillar.slug);
          newTopicsAdded++;
        }
        // Add cluster articles
        for (const article of cluster.clusterArticles || []) {
          if (article.slug && !existingSlugs.has(article.slug)) {
            data.topics.push(article.slug);
            existingSlugs.add(article.slug);
            newTopics.push(article.slug);
            newTopicsAdded++;
          }
        }
      }
    }

    // Add from existing clusters (missing articles)
    if (clusterData.existingClusters) {
      for (const cluster of clusterData.existingClusters) {
        for (const article of cluster.clusterArticles || []) {
          if (article.status === "missing" && article.slug && !existingSlugs.has(article.slug)) {
            data.topics.push(article.slug);
            existingSlugs.add(article.slug);
            newTopics.push(article.slug);
            newTopicsAdded++;
          }
        }
      }
    }

    saveAutoBlogData(data);

    return NextResponse.json({
      success: true,
      clusterData,
      newTopicsAdded,
      newTopics,
      message: `Generated topic cluster strategy with ${newTopicsAdded} new topics added`,
    });
  } catch (error: any) {
    console.error("Topic cluster error:", error);
    return NextResponse.json(
      { error: "Failed to generate topic clusters", details: error.message },
      { status: 500 }
    );
  }
}

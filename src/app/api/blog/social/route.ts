import { NextRequest, NextResponse } from "next/server";
import { createZai } from "@/lib/zai";

/**
 * Auto Social Media Post Generator
 * Generates social media captions for new blog posts
 * Can auto-post to Twitter/X and generate content for other platforms
 */

interface SocialPost {
  platform: string;
  content: string;
  hashtags: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { title, slug, description } = body as {
      title: string;
      slug: string;
      description: string;
    };

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const baseUrl = "https://getmova.my.id";
    const articleUrl = `${baseUrl}/blog/${slug}`;

    // Generate social media posts using AI
    const zai = await createZai();

    const socialResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah social media manager profesional berbahasa Indonesia. Buat caption social media yang engaging, clickable, dan SEO-friendly.`,
        },
        {
          role: "user",
          content: `Buat caption social media untuk artikel blog berikut:

Judul: ${title}
Deskripsi: ${description}
URL: ${articleUrl}

Buat caption untuk 3 platform:

1. TWITTER/X (maks 280 karakter):
   - Hook yang bikin penasaran
   - Sertakan URL
   - 2-3 hashtag relevan

2. FACEOOK/INSTAGRAM (lebih panjang, engaging):
   - Pembuka yang menarik
   - Poin-poin singkat
   - CTA ke URL
   - 5-7 hashtag

3. LINKEDIN (profesional):
   - Insight atau statistic yang relevan
   - Tips singkat
   - CTA professional
   - 3-5 hashtag

Output dalam format JSON:
{
  "posts": [
    {
      "platform": "twitter",
      "content": "...",
      "hashtags": ["...", "..."]
    },
    {
      "platform": "facebook",
      "content": "...",
      "hashtags": ["...", "..."]
    },
    {
      "platform": "linkedin",
      "content": "...",
      "hashtags": ["...", "..."]
    }
  ]
}

OUTPUT HANYA JSON, tanpa penjelasan tambahan.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    let socialPosts: SocialPost[] = [];
    try {
      const responseText = socialResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      socialPosts = parsed.posts || [];
    } catch {
      // Fallback posts if AI fails
      socialPosts = [
        {
          platform: "twitter",
          content: `Baru saja publish! ${title} ${articleUrl}`,
          hashtags: ["#DownloadVideo", "#GetMova", "#TanpaWatermark"],
        },
        {
          platform: "facebook",
          content: `Artikel baru di blog GetMova! ${title}\n\n${description}\n\nBaca selengkapnya: ${articleUrl}`,
          hashtags: ["#DownloadVideo", "#GetMova", "#TanpaWatermark", "#VideoDownloader", "#Gratis"],
        },
        {
          platform: "linkedin",
          content: `New article: ${title}\n\n${description}\n\nRead more: ${articleUrl}`,
          hashtags: ["#VideoDownloader", "#TechTips", "#GetMova"],
        },
      ];
    }

    // Auto-post to Twitter/X if API key is configured
    let twitterPosted = false;
    if (process.env.TWITTER_API_KEY && process.env.TWITTER_API_SECRET && socialPosts[0]) {
      try {
        const twitterPost = socialPosts[0];
        // Twitter/X API v2 posting
        const tweetResponse = await fetch("https://api.twitter.com/2/tweets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
          body: JSON.stringify({
            text: twitterPost.content,
          }),
        });
        twitterPosted = tweetResponse.ok;
      } catch {
        // Twitter posting is optional
      }
    }

    return NextResponse.json({
      success: true,
      posts: socialPosts,
      twitterPosted,
      articleUrl,
      message: socialPosts.length > 0 
        ? `Generated ${socialPosts.length} social media posts`
        : "Failed to generate social media posts",
    });
  } catch (error: any) {
    console.error("Social post generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate social posts", details: error.message },
      { status: 500 }
    );
  }
}

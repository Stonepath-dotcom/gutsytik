import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { getAllAutoBlogPosts, getAutoBlogData, saveAutoBlogData } from "@/lib/auto-blog";

/**
 * Auto Multi-Language Content Translation
 * Translates blog posts to English to reach a broader audience
 * English content = access to global search traffic!
 *
 * Strategy: Create English versions of top articles for international SEO
 * Hreflang tags will be added automatically for Google to understand the relationship
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const targetSlug = body.slug as string | undefined;
    const targetLang = (body.lang as string) || "en";
    const maxPosts = (body.maxPosts as number) || 2;
    const zai = await ZAI.create();

    const posts = getAllAutoBlogPosts();

    // Find posts that haven't been translated yet
    const targetPosts = targetSlug
      ? posts.filter((p) => p.slug === targetSlug)
      : posts.filter((p) => !(p as any).translations?.[targetLang]).slice(0, maxPosts);

    if (targetPosts.length === 0) {
      return NextResponse.json({
        success: true,
        message: `All posts already translated to ${targetLang}`,
        postsProcessed: 0,
      });
    }

    const results: {
      slug: string;
      originalTitle: string;
      translatedTitle: string;
      lang: string;
      success: boolean;
    }[] = [];

    for (const post of targetPosts) {
      try {
        // Translate the article content using AI
        const translateResponse = await zai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are a professional translator and SEO writer. Translate the following Indonesian blog article to ${targetLang === "en" ? "English" : targetLang}. Keep the HTML structure intact. Maintain the same SEO keyword strategy but adapt keywords naturally to ${targetLang === "en" ? "English" : targetLang} search patterns. Mention "Mova" and "getmova.my.id" at least 2 times naturally.`,
            },
            {
              role: "user",
              content: `Translate this article to ${targetLang === "en" ? "English" : targetLang}.

TITLE: ${post.title}
DESCRIPTION: ${post.description}
KEYWORDS: ${post.keywords.join(", ")}

CONTENT:
${post.content.substring(0, 6000)}

IMPORTANT:
1. Keep ALL HTML tags exactly as they are (h2, h3, p, ul, li, div, etc.)
2. Keep the id attributes on headings (translate the id text too)
3. Translate naturally - don't do word-for-word translation
4. Adapt cultural references to international audience
5. Keep SEO keywords natural in ${targetLang === "en" ? "English" : targetLang}
6. Include "Mova" and "getmova.my.id" at least 2 times naturally

Output JSON:
{
  "title": "translated title",
  "description": "translated meta description (max 155 chars)",
  "keywords": ["translated keyword 1", "keyword 2", ...],
  "content": "translated HTML content",
  "slug": "english-slug-version"
}

OUTPUT HANYA JSON.`,
            },
          ],
          temperature: 0.3,
          max_tokens: 4000,
        });

        const responseText = translateResponse.choices[0]?.message?.content || "{}";
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const translation = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

        if (!translation || !translation.content) {
          results.push({
            slug: post.slug,
            originalTitle: post.title,
            translatedTitle: "",
            lang: targetLang,
            success: false,
          });
          continue;
        }

        // Save translation to post data
        const data = getAutoBlogData();
        const postIndex = data.posts.findIndex((p) => p.slug === post.slug);

        if (postIndex !== -1) {
          if (!(data.posts[postIndex] as any).translations) {
            (data.posts[postIndex] as any).translations = {};
          }

          (data.posts[postIndex] as any).translations[targetLang] = {
            title: translation.title,
            description: translation.description,
            keywords: translation.keywords,
            content: translation.content,
            slug: translation.slug,
            date: new Date().toISOString(),
          };

          saveAutoBlogData(data);
        }

        results.push({
          slug: post.slug,
          originalTitle: post.title,
          translatedTitle: translation.title,
          lang: targetLang,
          success: true,
        });
      } catch (err: any) {
        results.push({
          slug: post.slug,
          originalTitle: post.title,
          translatedTitle: "",
          lang: targetLang,
          success: false,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    return NextResponse.json({
      success: true,
      postsProcessed: results.length,
      translationsCreated: successCount,
      targetLang,
      results,
      message: `Translated ${successCount}/${results.length} articles to ${targetLang === "en" ? "English" : targetLang}`,
    });
  } catch (error: any) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate content", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Check translation status
export async function GET() {
  const posts = getAllAutoBlogPosts();
  const translationStats = {
    totalPosts: posts.length,
    translatedToEn: posts.filter((p) => (p as any).translations?.en).length,
    translationCoverage: "0%",
  };

  if (posts.length > 0) {
    translationStats.translationCoverage = `${Math.round(
      (translationStats.translatedToEn / posts.length) * 100
    )}%`;
  }

  return NextResponse.json(translationStats);
}

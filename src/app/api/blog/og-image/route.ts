import { NextRequest, NextResponse } from "next/server";
import { createZai } from "@/lib/zai";
import { getAllAutoBlogPosts, getAutoBlogData, saveAutoBlogData } from "@/lib/auto-blog";
import fs from "fs";
import path from "path";

/**
 * Auto OG Image Generator
 * Uses AI image generation to create custom Open Graph thumbnails for blog posts
 * Custom OG images increase CTR in social media shares by 2-3x!
 *
 * Google also shows OG images in search results, improving visibility.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const targetSlug = body.slug as string | undefined;
    const size = (body.size as string) || "1152x864"; // Good for OG image

    const posts = getAllAutoBlogPosts();

    // Find posts without OG images (or specific slug)
    const targetPosts = targetSlug
      ? posts.filter((p) => p.slug === targetSlug)
      : posts.filter((p) => !(p as any).ogImage).slice(0, 3); // Process 3 at a time

    if (targetPosts.length === 0) {
      return NextResponse.json({
        success: true,
        message: "All posts already have OG images",
        postsProcessed: 0,
      });
    }

    const zai = await createZai();
    const results: {
      slug: string;
      title: string;
      imagePath: string;
      success: boolean;
    }[] = [];

    for (const post of targetPosts) {
      try {
        // Generate a visually appealing OG image
        const prompt = `Professional blog article thumbnail for "${post.title}". Modern tech design with gradient background (green to blue), video download theme, Indonesian tech blog style, clean typography, no text overlay, abstract digital illustration of video streaming and downloading, futuristic 2026 aesthetic, high quality, professional look`;

        const imageResponse = await zai.images.generations.create({
          prompt,
          size: size as any,
        });

        const imageBase64 = imageResponse.data[0]?.base64;

        if (!imageBase64) {
          results.push({
            slug: post.slug,
            title: post.title,
            imagePath: "",
            success: false,
          });
          continue;
        }

        // Save the image to public directory
        const publicDir = path.join(process.cwd(), "public", "blog-og");
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        const imageFileName = `${post.slug}-og.png`;
        const imagePath = path.join(publicDir, imageFileName);
        const imageBuffer = Buffer.from(imageBase64, "base64");
        fs.writeFileSync(imagePath, imageBuffer);

        // Update post data with OG image path
        const data = getAutoBlogData();
        const postIndex = data.posts.findIndex((p) => p.slug === post.slug);
        if (postIndex !== -1) {
          (data.posts[postIndex] as any).ogImage = `/blog-og/${imageFileName}`;
          saveAutoBlogData(data);
        }

        results.push({
          slug: post.slug,
          title: post.title,
          imagePath: `/blog-og/${imageFileName}`,
          success: true,
        });
      } catch (err: any) {
        results.push({
          slug: post.slug,
          title: post.title,
          imagePath: "",
          success: false,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    return NextResponse.json({
      success: true,
      postsProcessed: results.length,
      imagesGenerated: successCount,
      results,
      message: `Generated ${successCount}/${results.length} OG images`,
    });
  } catch (error: any) {
    console.error("OG image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate OG images", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Check which posts need OG images
export async function GET() {
  const posts = getAllAutoBlogPosts();
  const postsWithOg = posts.filter((p) => (p as any).ogImage);
  const postsWithoutOg = posts.filter((p) => !(p as any).ogImage);

  return NextResponse.json({
    totalPosts: posts.length,
    withOgImage: postsWithOg.length,
    withoutOgImage: postsWithoutOg.length,
    postsNeedingImage: postsWithoutOg.map((p) => ({
      slug: p.slug,
      title: p.title,
    })),
  });
}

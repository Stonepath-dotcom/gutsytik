import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { getAllAutoBlogPosts, getAutoBlogData, saveAutoBlogData, type AutoBlogPost } from "@/lib/auto-blog";

/**
 * Auto Content Refresh - Update existing articles with fresh information
 * Google loves fresh, updated content! This rewrites/refreshes old articles.
 * 
 * Strategy:
 * - Pick the oldest auto-generated article
 * - Use AI to rewrite it with updated information
 * - Update the "lastUpdated" field (shows Google the content is fresh)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const specificSlug = body.slug as string | undefined;
    const forceRefresh = body.force as boolean || false;

    const data = getAutoBlogData();
    const posts = data.posts || [];

    if (posts.length === 0) {
      return NextResponse.json(
        { error: "No auto-generated posts to refresh" },
        { status: 400 }
      );
    }

    // Pick the oldest post (last in array) unless a specific slug is given
    let targetPost: AutoBlogPost | undefined;
    if (specificSlug) {
      targetPost = posts.find((p) => p.slug === specificSlug);
    } else {
      // Find posts that haven't been updated recently (> 7 days old)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const oldPosts = posts.filter((p) => {
        const postDate = new Date(p.dateISO);
        return postDate < sevenDaysAgo || forceRefresh;
      });

      targetPost = oldPosts.length > 0 
        ? oldPosts[oldPosts.length - 1] // Oldest eligible post
        : posts[posts.length - 1]; // Fallback to oldest
    }

    if (!targetPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Use AI to refresh the content
    const zai = await ZAI.create();

    const refreshResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah editor blog profesional berbahasa Indonesia. Tugas kamu adalah memperbarui dan meningkatkan artikel blog yang sudah ada agar lebih segar, relevan, dan SEO-friendly untuk tahun 2026. Pertahankan gaya bahasa santai dan engaging.`,
        },
        {
          role: "user",
          content: `Perbarui artikel berikut tentang "${targetPost.title}".

ARTIKEL ASLI (ringkasan):
${targetPost.description}

Keyword: ${targetPost.keywords.join(", ")}

TUGAS:
1. Tulis ulang artikel dengan informasi terbaru untuk tahun 2026
2. Tambahkan tips dan trik baru yang belum ada
3. Pastikan keyword tetap natural dan tidak overstuffed
4. Sebutkan "Mova" dan "getmova.my.id" minimal 3 kali
5. Tambahkan minimal 1 sub-heading baru yang relevan
6. Update FAQ section dengan pertanyaan yang lebih relevan
7. Pastikan ada paragraf tentang "update terbaru 2026"

Format output sebagai HTML (sama seperti artikel asli):
- <h2 id="slug"> untuk heading
- <p> untuk paragraf
- <ul><li> untuk list
- <div class="info-box"> dan <div class="warning-box"> jika perlu
- <div class="step-card"> untuk langkah-langkah

JANGAN sertakan <html>, <head>, <body>, <!DOCTYPE>, <meta>, <script>, <style>.

OUTPUT HANYA KONTEN HTML ARTIKEL YANG DIPERBARUI.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    let refreshedContent = refreshResponse.choices[0]?.message?.content || "";

    // Clean up HTML content
    refreshedContent = refreshedContent
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .replace(/<html[^>]*>/gi, "")
      .replace(/<\/html>/gi, "")
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
      .replace(/<body[^>]*>/gi, "")
      .replace(/<\/body>/gi, "")
      .replace(/<meta[^>]*>/gi, "")
      .replace(/<link[^>]*>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
      .trim();

    // Update the post in the data
    const now = new Date();
    const updatedDateStr = now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const updatedDateISO = now.toISOString().split("T")[0];

    const updatedPosts = data.posts.map((p) => {
      if (p.slug === targetPost!.slug) {
        return {
          ...p,
          content: refreshedContent,
          lastUpdated: updatedDateStr,
          lastUpdatedISO: updatedDateISO,
          dateISO: p.dateISO, // Keep original publish date
        };
      }
      return p;
    });

    data.posts = updatedPosts;
    saveAutoBlogData(data);

    // Auto-submit to search engines
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://getmova.my.id";
      await fetch(`${baseUrl}/api/blog/index-now`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urls: [`/blog/${targetPost.slug}`],
        }),
      });
    } catch {
      // IndexNow submission is optional
    }

    return NextResponse.json({
      success: true,
      refreshed: {
        slug: targetPost.slug,
        title: targetPost.title,
        lastUpdated: updatedDateStr,
      },
      message: `Article "${targetPost.title}" has been refreshed`,
    });
  } catch (error: any) {
    console.error("Content refresh error:", error);
    return NextResponse.json(
      { error: "Failed to refresh content", details: error.message },
      { status: 500 }
    );
  }
}

// GET: List posts eligible for refresh
export async function GET() {
  const posts = getAllAutoBlogPosts();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const eligiblePosts = posts.filter((p) => {
    const postDate = new Date(p.dateISO);
    return postDate < sevenDaysAgo;
  });

  return NextResponse.json({
    totalPosts: posts.length,
    eligibleForRefresh: eligiblePosts.length,
    posts: eligiblePosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      dateISO: p.dateISO,
      lastUpdated: (p as any).lastUpdated || null,
    })),
  });
}

import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import {
  addAutoBlogPost,
  getAvailableTopic,
  blogGradients,
  blogIcons,
  type AutoBlogPost,
} from "@/lib/auto-blog";

// Related article pool for internal linking
const relatedPool = [
  { slug: "cara-download-video-tiktok-tanpa-watermark", title: "Cara Download Video TikTok Tanpa Watermark", description: "Panduan lengkap download video TikTok tanpa watermark." },
  { slug: "cara-download-video-instagram-reels", title: "Cara Download Video Instagram Reels", description: "Tutorial download Instagram Reels tanpa watermark." },
  { slug: "download-video-tanpa-watermark-gratis", title: "Download Video Tanpa Watermark Gratis", description: "Kumpulan cara download video tanpa watermark dari semua platform." },
  { slug: "tips-aman-download-video-online", title: "Tips Aman Download Video Online", description: "Panduan keamanan saat download video online." },
  { slug: "cara-download-video-facebook-hd", title: "Cara Download Video Facebook HD", description: "Tutorial download video Facebook kualitas HD." },
  { slug: "download-video-twitter-x-tanpa-watermark", title: "Download Video Twitter/X Tanpa Watermark", description: "Cara download video dari Twitter/X tanpa watermark." },
  { slug: "ekstrak-audio-mp3-dari-video", title: "Cara Ekstrak Audio MP3 dari Video", description: "Panduan ekstrak audio MP3 dari video online." },
  { slug: "download-video-tanpa-watermark-terbaik", title: "10 Situs Download Video Tanpa Watermark Terbaik 2026", description: "Rekomendasi situs download video tanpa watermark." },
  { slug: "cara-download-video-pinterest", title: "Cara Download Video Pinterest", description: "Tutorial download video dari Pinterest." },
  { slug: "cara-download-reddit-video-dengan-audio", title: "Cara Download Video Reddit Dengan Audio", description: "Solusi download video Reddit dengan audio utuh." },
  { slug: "cara-download-video-dari-telegram", title: "Cara Download Video dari Telegram", description: "Panduan download video Telegram dengan cepat." },
  { slug: "download-video-tanpa-aplikasi", title: "Download Video Tanpa Aplikasi", description: "Cara download video langsung dari browser." },
  { slug: "perbedaan-download-video-hd-dan-sd", title: "Perbedaan Kualitas Video HD vs SD", description: "Perbandingan kualitas video HD dan SD." },
  { slug: "perbandingan-tiktok-downloader", title: "Perbandingan TikTok Downloader Terbaik 2026", description: "Review TikTok downloader terbaik tahun 2026." },
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const customTopic = body.topic as string | undefined;
    const customKeywords = body.keywords as string[] | undefined;

    // Get topic
    const topic = customTopic || getAvailableTopic();
    if (!topic) {
      return NextResponse.json(
        { error: "No more topics available for auto-generation" },
        { status: 400 }
      );
    }

    const topicTitle = slugToTitle(topic);

    // Generate blog content using AI
    const zai = await ZAI.create();

    const keywordsList = customKeywords || [
      topic.replace(/-/g, " "),
      "download video",
      "tanpa watermark",
      "gratis",
      "2026",
    ];

    // Step 1: Generate the article content
    const contentResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah penulis blog profesional berbahasa Indonesia yang ahli dalam teknologi dan tutorial download video. Tulis artikel yang informatif, SEO-friendly, dan engaging. Gunakan bahasa yang santai tapi tetap profesional (gaya bahasa Indonesia informal seperti "kamu", "nggak", "banget").`,
        },
        {
          role: "user",
          content: `Tulis artikel blog lengkap tentang "${topicTitle}".

PANDUAN:
1. Artikel harus minimal 1500 kata
2. Gunakan gaya bahasa Indonesia yang santai dan engaging
3. Sisipkan keyword secara natural: ${keywordsList.join(", ")}
4. Sebutkan "Mova" dan "getmova.my.id" minimal 3 kali sebagai rekomendasi tool download video
5. Struktur artikel harus punya:
   - Paragraf pembuka yang menarik perhatian
   - Minimal 4 sub-heading (h2)
   - Beberapa sub-heading (h3) jika perlu
   - Daftar bullet points untuk tips atau langkah-langkah
   - FAQ section di akhir (minimal 3 pertanyaan)
   - Kesimpulan dengan CTA ke getmova.my.id

6. Format output sebagai HTML langsung (BUKAN markdown). Gunakan tag:
   - <h2 id="slug-dari-judul"> untuk heading utama
   - <h3> untuk sub-heading
   - <p> untuk paragraf
   - <ul><li> untuk bullet list
   - <ol><li> untuk numbered list
   - <strong> untuk bold
   - <em> untuk italic
   - <a href="/"> untuk link ke Mova
   - <div class="info-box"><p>...</p></div> untuk info box
   - <div class="warning-box"><p>...</p></div> untuk warning box
   - <div class="step-card"><p><span class="step-number">N</span>...</p></div> untuk langkah-langkah

7. Setiap h2 harus punya atribut id yang slug-friendly (huruf kecil, strip, tanpa karakter spesial)
8. Tulis konten yang original dan bermanfaat, bukan generic
9. JANGAN sertakan tag <html>, <head>, <body>, atau <!DOCTYPE> — hanya konten artikel saja
10. JANGAN sertakan <meta>, <link>, <script>, atau <style> tags

OUTPUT HANYA KONTEN HTML ARTIKEL (mulai dari <h2>, <p>, <div>, dll), TANPA wrapper HTML document dan TANPA penjelasan tambahan.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    let htmlContent =
      contentResponse.choices[0]?.message?.content || "";

    // Clean up HTML content - strip full document wrappers if AI accidentally generated them
    htmlContent = htmlContent
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

    // Step 2: Generate metadata
    const metaResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah SEO expert. Generate metadata untuk artikel blog dalam format JSON.`,
        },
        {
          role: "user",
          content: `Generate metadata JSON untuk artikel tentang "${topicTitle}".

Output HANYA JSON dengan format:
{
  "title": "Judul artikel SEO-friendly, maks 60 karakter, sertakan tahun 2026",
  "description": "Meta description, maks 155 karakter, sertakan keyword utama",
  "keywords": ["keyword1", "keyword2", ...],
  "readingTime": "N menit baca",
  "headings": [
    {"id": "slug-id", "text": "Teks Heading"}
  ],
  "faqItems": [
    {"question": "Pertanyaan FAQ", "answer": "Jawaban FAQ"}
  ],
  "howToSteps": [
    {"name": "Nama langkah", "text": "Deskripsi langkah"}
  ]
}

Pastikan:
- Title mengandung keyword utama dan tahun 2026
- Description mengandung keyword dan call-to-action
- Keywords minimal 5, maks 10
- Headings sesuai dengan struktur artikel
- FAQ minimal 3 item
- HowTo steps minimal 3 langkah`,
        },
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });

    let metadata;
    try {
      const metaText = metaResponse.choices[0]?.message?.content || "{}";
      const jsonMatch = metaText.match(/\{[\s\S]*\}/);
      metadata = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      metadata = {
        title: `${topicTitle} - Panduan Lengkap 2026`,
        description: `Panduan lengkap ${topicTitle.toLowerCase()} tahun 2026. Tips dan tutorial terbaru yang mudah diikuti.`,
        keywords: keywordsList,
        readingTime: "7 menit baca",
        headings: [],
        faqItems: [],
        howToSteps: [],
      };
    }

    // Build the post object
    const now = new Date();
    const dateStr = now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const dateISO = now.toISOString().split("T")[0];

    const gradient = pickRandom(blogGradients, 1)[0];
    const icon = pickRandom(blogIcons, 1)[0];
    const relatedArticles = pickRandom(relatedPool, 3);

    // Build JSON-LD schemas
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity:
        metadata.faqItems?.map((faq: { question: string; answer: string }) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })) || [],
    };

    const howToJsonLd = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: metadata.title || topicTitle,
      description: metadata.description || "",
      totalTime: `PT${Math.max(2, (metadata.howToSteps?.length || 3))}M`,
      step:
        metadata.howToSteps?.map(
          (step: { name: string; text: string }, i: number) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.name,
            text: step.text,
          })
        ) || [],
    };

    const post: AutoBlogPost = {
      slug: topic,
      title: metadata.title || `${topicTitle} - Panduan Lengkap 2026`,
      description:
        metadata.description ||
        `Panduan lengkap ${topicTitle.toLowerCase()} tahun 2026.`,
      date: dateStr,
      dateISO: dateISO,
      readingTime: metadata.readingTime || "7 menit baca",
      gradient,
      icon,
      content: htmlContent,
      keywords: metadata.keywords || keywordsList,
      headings: metadata.headings || [],
      relatedArticles,
      faqJsonLd,
      howToJsonLd,
    };

    // Save to JSON file
    addAutoBlogPost(post);

    return NextResponse.json({
      success: true,
      post: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        readingTime: post.readingTime,
      },
    });
  } catch (error: any) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate blog post", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // List auto-generated blog posts
  const { getAllAutoBlogPosts } = await import("@/lib/auto-blog");
  const posts = getAllAutoBlogPosts();
  return NextResponse.json({
    count: posts.length,
    posts: posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      readingTime: p.readingTime,
    })),
  });
}

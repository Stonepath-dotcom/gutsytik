import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { getAllAutoBlogPosts, getAutoBlogData, saveAutoBlogData } from "@/lib/auto-blog";

/**
 * Auto People Also Ask (PAA) Scraper
 * Uses web search to find "People Also Ask" questions from Google
 * Automatically adds these questions to blog FAQ sections
 *
 * This is HUGE for SEO - Google loves content that answers PAA questions!
 * When you answer the exact questions Google shows, you rank higher.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const targetSlug = body.slug as string | undefined;
    const maxQuestions = (body.maxQuestions as number) || 10;
    const zai = await ZAI.create();

    const posts = getAllAutoBlogPosts();

    // If specific slug provided, only process that post
    const targetPosts = targetSlug
      ? posts.filter((p) => p.slug === targetSlug)
      : posts.slice(0, 5); // Process up to 5 posts

    if (targetPosts.length === 0) {
      return NextResponse.json(
        { error: "No posts to process" },
        { status: 400 }
      );
    }

    const results: {
      slug: string;
      title: string;
      questionsFound: number;
      questionsAdded: number;
    }[] = [];

    for (const post of targetPosts) {
      // Search for PAA questions related to this post's topic
      const searchQuery = `${post.title.replace(/2026/g, "").trim()} pertanyaan umum`;

      let paaQuestions: { question: string; answer: string }[] = [];

      try {
        // Use web search to find related questions people ask
        const searchResults = await zai.functions.invoke("web_search", {
          query: searchQuery,
          num: 8,
        });

        const snippets = Array.isArray(searchResults)
          ? searchResults.map((r: any) => `${r.name}\n${r.snippet}`).join("\n\n")
          : "";

        // Use AI to extract/generate PAA-style questions
        const paaResponse = await zai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Kamu adalah SEO specialist berbahasa Indonesia. Tugas kamu adalah menghasilkan pertanyaan "People Also Ask" (PAA) yang persis seperti yang muncul di Google ketika orang mencari topik tertentu. Pertanyaan harus natural, seperti yang benar-benar dicari orang di Google Indonesia.`,
            },
            {
              role: "user",
              content: `Topik artikel: "${post.title}"
Keyword: ${post.keywords.join(", ")}

HASIL PENCARIAN WEB TERKAIT:
${snippets.substring(0, 2000)}

Generate ${maxQuestions} pertanyaan PAA (People Also Ask) yang:
1. Pertanyaan yang benar-benar dicari orang di Google Indonesia
2. Relevan dengan topik artikel
3. Menggunakan bahasa yang natural (campuran formal dan informal)
4. Mencakup variasi: "cara...", "apakah...", "kenapa...", "berapa...", "dimana..."

Setiap pertanyaan harus punya jawaban singkat (2-3 kalimat) yang SEO-friendly dan mention "Mova" atau "getmova.my.id" minimal 1x.

Output JSON:
{
  "questions": [
    { "question": "...", "answer": "..." }
  ]
}

OUTPUT HANYA JSON.`,
            },
          ],
          temperature: 0.6,
          max_tokens: 2000,
        });

        const responseText = paaResponse.choices[0]?.message?.content || "{}";
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
        paaQuestions = parsed.questions || [];
      } catch {
        paaQuestions = [];
      }

      if (paaQuestions.length === 0) {
        results.push({
          slug: post.slug,
          title: post.title,
          questionsFound: 0,
          questionsAdded: 0,
        });
        continue;
      }

      // Add PAA questions to the post's FAQ section in content
      const data = getAutoBlogData();
      const postIndex = data.posts.findIndex((p) => p.slug === post.slug);

      if (postIndex === -1) continue;

      // Build FAQ HTML section
      const faqHtml = paaQuestions
        .map(
          (q) => `
<div class="faq-item">
  <h3>${q.question}</h3>
  <p>${q.answer}</p>
</div>`
        )
        .join("\n");

      // Check if FAQ section already exists in content
      let updatedContent = data.posts[postIndex].content;
      if (updatedContent.includes("Pertanyaan yang Sering Diajukan") || updatedContent.includes("FAQ")) {
        // Append to existing FAQ section
        const faqSectionRegex = /(<h2[^>]*id="[^"]*faq[^"]*"[^>]*>.*?)(<\/div>\s*<\/div>|<\/section>)/is;
        if (faqSectionRegex.test(updatedContent)) {
          updatedContent = updatedContent.replace(
            faqSectionRegex,
            `$1${faqHtml}$2`
          );
        } else {
          // Add before closing tags
          updatedContent += faqHtml;
        }
      } else {
        // Add new FAQ section at the end
        updatedContent += `
<h2 id="pertanyaan-yang-sering-diajukan">Pertanyaan yang Sering Diajukan</h2>
${faqHtml}`;
      }

      // Update FAQ JSON-LD schema
      const existingFaq = (data.posts[postIndex].faqJsonLd as any)?.mainEntity || [];
      const newFaqEntities = paaQuestions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      }));

      data.posts[postIndex].content = updatedContent;
      data.posts[postIndex].faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [...existingFaq, ...newFaqEntities],
      };

      // Update headings
      if (!data.posts[postIndex].headings.find((h) => h.id === "pertanyaan-yang-sering-diajukan")) {
        data.posts[postIndex].headings.push({
          id: "pertanyaan-yang-sering-diajukan",
          text: "Pertanyaan yang Sering Diajukan",
        });
      }

      saveAutoBlogData(data);

      results.push({
        slug: post.slug,
        title: post.title,
        questionsFound: paaQuestions.length,
        questionsAdded: paaQuestions.length,
      });
    }

    // Auto-submit updated URLs to search engines
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://getmova.my.id";

    const updatedUrls = results
      .filter((r) => r.questionsAdded > 0)
      .map((r) => `/blog/${r.slug}`);

    if (updatedUrls.length > 0) {
      fetch(`${baseUrl}/api/blog/index-now`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: updatedUrls }),
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      postsProcessed: results.length,
      totalQuestionsAdded: results.reduce((sum, r) => sum + r.questionsAdded, 0),
      results,
      message: `Added ${results.reduce((sum, r) => sum + r.questionsAdded, 0)} PAA questions across ${results.length} posts`,
    });
  } catch (error: any) {
    console.error("PAA error:", error);
    return NextResponse.json(
      { error: "Failed to fetch PAA questions", details: error.message },
      { status: 500 }
    );
  }
}

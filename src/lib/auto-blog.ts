import fs from "fs";
import path from "path";

export interface AutoBlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateISO: string;
  readingTime: string;
  gradient: string;
  icon: string;
  content: string; // HTML content
  keywords: string[];
  headings: { id: string; text: string }[];
  relatedArticles: { slug: string; title: string; description: string }[];
  faqJsonLd: object;
  howToJsonLd: object;
  lastUpdated?: string;
  lastUpdatedISO?: string;
  socialPosted?: boolean;
  indexedAt?: string;
}

interface AutoBlogData {
  posts: AutoBlogPost[];
  lastGenerated: string | null;
  topics: string[];
}

const DATA_PATH = path.join(process.cwd(), "src/data/auto-blog.json");

export function getAutoBlogData(): AutoBlogData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { posts: [], lastGenerated: null, topics: [] };
  }
}

export function saveAutoBlogData(data: AutoBlogData): void {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save auto-blog data:", err);
  }
}

export function getAllAutoBlogPosts(): AutoBlogPost[] {
  const data = getAutoBlogData();
  return data.posts || [];
}

export function getAutoBlogPostBySlug(slug: string): AutoBlogPost | null {
  const posts = getAllAutoBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function addAutoBlogPost(post: AutoBlogPost): void {
  const data = getAutoBlogData();
  // Avoid duplicates
  if (!data.posts.find((p) => p.slug === post.slug)) {
    data.posts.unshift(post); // Add to beginning (newest first)
    data.lastGenerated = new Date().toISOString();
    saveAutoBlogData(data);
  }
}

export function getAvailableTopic(): string | null {
  const data = getAutoBlogData();
  const usedSlugs = new Set(data.posts.map((p) => p.slug));
  const availableTopics = data.topics.filter((t) => !usedSlugs.has(t));
  if (availableTopics.length === 0) return null;
  // Pick a random topic
  return availableTopics[Math.floor(Math.random() * availableTopics.length)];
}

// Gradients and icons for visual variety
export const blogGradients = [
  "from-[#10B981]/20 via-[#34D399]/15 to-[#10B981]/10",
  "from-[#3B82F6]/20 via-[#60A5FA]/15 to-[#3B82F6]/10",
  "from-[#8B5CF6]/20 via-[#A78BFA]/15 to-[#8B5CF6]/10",
  "from-[#EC4899]/20 via-[#F472B6]/15 to-[#EC4899]/10",
  "from-[#F59E0B]/20 via-[#FBBF24]/15 to-[#F59E0B]/10",
  "from-[#EF4444]/20 via-[#F87171]/15 to-[#EF4444]/10",
  "from-[#06B6D4]/20 via-[#22D3EE]/15 to-[#06B6D4]/10",
  "from-[#14B8A6]/20 via-[#2DD4BF]/15 to-[#14B8A6]/10",
  "from-[#6366F1]/20 via-[#818CF8]/15 to-[#6366F1]/10",
  "from-[#D946EF]/20 via-[#E879F9]/15 to-[#D946EF]/10",
];

export const blogIcons = [
  "🎬", "📱", "💾", "🔍", "⚡", "🎯", "🚀", "💡", "📊", "🔧",
  "🎵", "📸", "📺", "🎧", "🌐", "📌", "💬", "🔴", "📘", "✨",
];

/**
 * Auto Internal Linking - Add internal links to content
 * Scans content for relevant keywords and adds links to other blog posts
 */
export function addInternalLinks(content: string, allPosts: AutoBlogPost[]): string {
  let enhancedContent = content;

  // Define keyword-to-slug mappings for internal linking
  const linkMap: { keywords: string[]; url: string; anchor: string }[] = [
    { keywords: ["tiktok", "download tiktok"], url: "/tiktok-downloader", anchor: "TikTok Downloader" },
    { keywords: ["instagram", "reels", "ig tv"], url: "/instagram-downloader", anchor: "Instagram Downloader" },
    { keywords: ["facebook", "fb"], url: "/facebook-downloader", anchor: "Facebook Downloader" },
    { keywords: ["twitter", "twitter/x", "tweet"], url: "/twitter-downloader", anchor: "Twitter/X Downloader" },
    { keywords: ["pinterest", "pin"], url: "/pinterest-downloader", anchor: "Pinterest Downloader" },
    { keywords: ["reddit"], url: "/reddit-downloader", anchor: "Reddit Downloader" },
    { keywords: ["telegram", "tele"], url: "/telegram-downloader", anchor: "Telegram Downloader" },
    { keywords: ["youtube", "yt"], url: "/youtube-downloader", anchor: "YouTube Downloader" },
    { keywords: ["mp3", "audio", "konversi audio"], url: "/youtube-mp3", anchor: "YouTube MP3" },
    { keywords: ["watermark", "tanpa watermark"], url: "/blog/download-video-tanpa-watermark-gratis", anchor: "download video tanpa watermark" },
    { keywords: ["aman", "keamanan", "virus"], url: "/blog/tips-aman-download-video-online", anchor: "tips aman download video" },
  ];

  // Add links from other auto-generated posts too
  for (const post of allPosts) {
    // Extract main keyword from title (first 2-3 words)
    const mainWords = post.title
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !["cara", "dari", "dengan", "yang", "untuk", "dan", "tanpa"].includes(w))
      .slice(0, 2);

    if (mainWords.length >= 2) {
      linkMap.push({
        keywords: [mainWords.join(" ")],
        url: `/blog/${post.slug}`,
        anchor: post.title.length > 40 ? post.title.substring(0, 40) + "..." : post.title,
      });
    }
  }

  // Only add max 3 internal links per article to avoid over-optimization
  let linksAdded = 0;
  const maxLinks = 3;

  for (const link of linkMap) {
    if (linksAdded >= maxLinks) break;
    if (enhancedContent.includes(link.url)) continue; // Already linked

    for (const keyword of link.keywords) {
      if (linksAdded >= maxLinks) break;

      // Find the first occurrence of the keyword that isn't already inside an <a> tag
      const regex = new RegExp(`(?<!<a[^>]*>[^<]*)\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?![^<]*<\\/a>)`, "i");

      if (regex.test(enhancedContent)) {
        enhancedContent = enhancedContent.replace(regex, `<a href="${link.url}">$1</a>`);
        linksAdded++;
        break; // Move to next link
      }
    }
  }

  return enhancedContent;
};

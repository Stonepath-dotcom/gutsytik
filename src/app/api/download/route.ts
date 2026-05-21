import { NextRequest, NextResponse } from "next/server";

// Simulated video data for different platforms
const mockVideos = [
  {
    title: "Tutorial Makeup Natural untuk Sehari-hari ✨",
    author: "@beautyqueen",
    duration: "02:34",
  },
  {
    title: "Resep Nasi Goreng Spesial 5 Menit 🍳",
    author: "@chefkitchen",
    duration: "01:48",
  },
  {
    title: "Sunset di Bali - Cinematic Travel Vlog",
    author: "@travelwithme",
    duration: "03:21",
  },
  {
    title: "Tutorial Dance Viral TikTok Terbaru 💃",
    author: "@dancecreator",
    duration: "00:45",
  },
  {
    title: "Unboxing iPhone 17 Pro Max 📱",
    author: "@techreview",
    duration: "05:12",
  },
  {
    title: "Kucing Lucu Bermain dengan Mainan 🐱",
    author: "@cutepets",
    duration: "00:30",
  },
];

const qualityOptions = [
  { label: "HD", resolution: "1080p" },
  { label: "SD", resolution: "720p" },
  { label: "Low", resolution: "480p" },
];

function detectPlatform(url: string): string {
  const hostname = (() => {
    try {
      return new URL(url).hostname.toLowerCase();
    } catch {
      return "";
    }
  })();

  if (hostname.includes("tiktok")) return "TikTok";
  if (hostname.includes("instagram")) return "Instagram";
  if (hostname.includes("youtube") || hostname.includes("youtu.be"))
    return "YouTube";
  if (hostname.includes("facebook") || hostname.includes("fb.")) return "Facebook";
  if (hostname.includes("twitter") || hostname.includes("x.com")) return "Twitter/X";
  if (hostname.includes("pinterest")) return "Pinterest";
  if (hostname.includes("likee")) return "Likee";
  if (hostname.includes("snackvideo")) return "Snack Video";
  return "Unknown";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL tidak boleh kosong." },
        { status: 400 }
      );
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.trim());
    } catch {
      return NextResponse.json(
        { error: "Format URL tidak valid. Pastikan link yang dimasukkan benar." },
        { status: 400 }
      );
    }

    // Check for valid protocols
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "Hanya URL dengan protokol HTTP/HTTPS yang didukung." },
        { status: 400 }
      );
    }

    // Simulate processing delay (1-2 seconds)
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    // Pick a random mock video
    const video = mockVideos[Math.floor(Math.random() * mockVideos.length)];
    const platform = detectPlatform(url);

    // Construct simulated response
    const result = {
      title: video.title,
      thumbnail: `https://picsum.photos/seed/${Date.now()}/320/180`,
      duration: video.duration,
      author: video.author,
      platform,
      downloadUrl: `https://gutsytik.com/dl/${Date.now()}/no-watermark.mp4`,
      qualityOptions,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal. Silakan coba lagi nanti." },
      { status: 500 }
    );
  }
}

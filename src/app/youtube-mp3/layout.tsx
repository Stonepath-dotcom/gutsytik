import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube ke MP3 - Konversi & Download Audio YouTube Gratis | getmova",
  description:
    "Konversi video YouTube ke MP3 gratis. Download audio, lagu, podcast dari YouTube dalam format MP3 berkualitas tinggi. Cepat, gratis, tanpa batas. YouTube to MP3 converter terbaik.",
  keywords: [
    "youtube to mp3",
    "youtube ke mp3",
    "download mp3 youtube",
    "konversi youtube mp3",
    "youtube audio downloader",
    "youtube mp3 converter",
  ],
  alternates: { canonical: "https://getmova.my.id/youtube-mp3" },
  openGraph: {
    title: "YouTube ke MP3 - Download Audio YouTube Gratis | getmova",
    description: "Konversi YouTube ke MP3 gratis. Download lagu dan podcast dari YouTube.",
    url: "https://getmova.my.id/youtube-mp3",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova YouTube to MP3" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube ke MP3 - Download Audio YouTube Gratis | getmova",
    description: "Konversi YouTube ke MP3 gratis. Download lagu dan podcast dari YouTube.",
    images: ["/og-image.png"],
  },
};

export default function YouTubeMP3Layout({ children }: { children: React.ReactNode }) {
  return children;
}

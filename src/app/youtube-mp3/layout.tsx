import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube ke MP3 - Konversi & Download Audio YouTube Gratis | Mova",
  description: "Konversi video YouTube ke MP3 gratis. Download audio, lagu, podcast dari YouTube dalam format MP3 berkualitas tinggi. Cepat, gratis, tanpa batas. YouTube to MP3 converter terbaik.",
  alternates: { canonical: "https://getmova.my.id/youtube-mp3" },
  openGraph: {
    title: "YouTube ke MP3 - Download Audio YouTube Gratis | Mova",
    description: "Konversi YouTube ke MP3 gratis. Download lagu dan podcast dari YouTube.",
    url: "https://getmova.my.id/youtube-mp3",
  },
};

export default function YouTubeMP3Layout({ children }: { children: React.ReactNode }) {
  return children;
}

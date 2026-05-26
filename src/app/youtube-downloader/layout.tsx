import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video YouTube Gratis - HD, MP4, MP3 | Mova",
  description:
    "Download video YouTube gratis dalam kualitas HD, MP4. Konversi YouTube ke MP3 juga tersedia. Cepat, gratis, tanpa daftar akun. Video downloader YouTube terbaik Indonesia.",
  alternates: { canonical: "https://getmova.my.id/youtube-downloader" },
  openGraph: {
    title: "Download Video YouTube Gratis - Mova",
    description:
      "Download video YouTube HD, MP4, konversi ke MP3. Gratis dan cepat.",
    url: "https://getmova.my.id/youtube-downloader",
  },
};

export default function YouTubeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

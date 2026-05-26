import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video TikTok Tanpa Watermark - Gratis & Cepat | Mova",
  description:
    "Download video TikTok tanpa watermark gratis. Simpan video TikTok HD, audio MP3, dan slideshow. Tanpa daftar, tanpa batas download. Cepat dan mudah.",
  alternates: { canonical: "https://getmova.my.id/tiktok-downloader" },
  openGraph: {
    title: "Download Video TikTok Tanpa Watermark - Mova",
    description:
      "Download video TikTok tanpa watermark gratis. HD, audio, slideshow. Tanpa daftar akun.",
    url: "https://getmova.my.id/tiktok-downloader",
  },
};

export default function TikTokDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

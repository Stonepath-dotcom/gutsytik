import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Video Downloader - Download Video & Reels Instagram Gratis",
  description:
    "Download video, Reels, Story, dan foto dari Instagram gratis. Simpan konten Instagram tanpa watermark dalam kualitas HD. Cepat, mudah, tanpa batas. Instagram downloader terbaik.",
  keywords: [
    "instagram downloader",
    "download video instagram",
    "instagram reels downloader",
    "download reels instagram",
    "instagram story saver",
    "simpan video instagram",
    "instagram video saver",
    "download instagram hd",
    "instagram downloader gratis",
    "saveinsta alternative",
  ],
  alternates: { canonical: "https://getmova.my.id/instagram-downloader" },
  openGraph: {
    title: "Instagram Video Downloader - Download Video & Reels Instagram Gratis",
    description:
      "Download video, Reels, dan Story Instagram tanpa watermark. Gratis dan mudah.",
    url: "https://getmova.my.id/instagram-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Instagram Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Video Downloader - Download Video & Reels Instagram Gratis",
    description: "Download video dan Reels Instagram tanpa watermark. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
};

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

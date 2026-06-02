import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Foto TikTok Slide - Simpan Foto TikTok Gratis",
  description:
    "Download foto slide TikTok (swipe photo) gratis. Simpan semua foto dari TikTok slide dalam kualitas HD. Cepat, mudah, tanpa batas. TikTok photo downloader terbaik.",
  keywords: [
    "tiktok photo downloader",
    "download foto tiktok",
    "tiktok slide downloader",
    "tiktok swipe photo",
    "simpan foto tiktok",
    "download tiktok foto slide",
    "tiktok photo saver",
    "tiktok foto downloader gratis",
  ],
  alternates: { canonical: "https://getmova.my.id/tiktok-photo-slide" },
  openGraph: {
    title: "Download Foto TikTok Slide - Simpan Foto TikTok Gratis",
    description:
      "Download foto slide TikTok dalam kualitas HD. Gratis dan mudah.",
    url: "https://getmova.my.id/tiktok-photo-slide",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova TikTok Photo Slide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Foto TikTok Slide - Simpan Foto TikTok Gratis",
    description: "Download foto slide TikTok dalam kualitas HD. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

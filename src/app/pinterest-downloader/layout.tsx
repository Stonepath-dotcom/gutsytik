import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest Video Downloader - Download Video Pinterest Gratis | getmova",
  description:
    "Download video Pinterest ke galeri HP dengan mudah dan gratis. Simpan video Pinterest tanpa watermark dalam kualitas HD. Pinterest downloader terbaik.",
  keywords: [
    "pinterest downloader",
    "download video pinterest",
    "pinterest video saver",
    "simpan video pinterest",
    "pinterest tanpa watermark",
  ],
  alternates: { canonical: "https://getmova.my.id/pinterest-downloader" },
  openGraph: {
    title: "Pinterest Video Downloader - Download Video Pinterest Gratis | getmova",
    description:
      "Download video Pinterest tanpa watermark dalam kualitas HD. Gratis dan mudah.",
    url: "https://getmova.my.id/pinterest-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Pinterest Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinterest Video Downloader - Download Video Pinterest Gratis | getmova",
    description: "Download video Pinterest tanpa watermark. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
};

export default function PinterestDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

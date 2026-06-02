import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Video Downloader - Download Video YouTube Gratis",
  description:
    "Download video YouTube gratis dalam berbagai kualitas. Simpan video YouTube ke MP4 dengan mudah dan cepat. YouTube downloader terbaik Indonesia.",
  keywords: [
    "youtube downloader",
    "download video youtube",
    "youtube video saver",
    "simpan video youtube",
    "youtube video download",
    "download youtube hd",
    "youtube downloader gratis",
    "save youtube video",
  ],
  alternates: { canonical: "https://getmova.my.id/youtube-downloader" },
  openGraph: {
    title: "YouTube Video Downloader - Download Video YouTube Gratis",
    description:
      "Download video YouTube dalam berbagai kualitas. Gratis dan mudah.",
    url: "https://getmova.my.id/youtube-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova YouTube Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Video Downloader - Download Video YouTube Gratis",
    description: "Download video YouTube dalam berbagai kualitas. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: false },
};

export default function YouTubeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

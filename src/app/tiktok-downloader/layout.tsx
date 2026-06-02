import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok Video Downloader - Download Video TikTok Tanpa Watermark",
  description:
    "Download video TikTok tanpa watermark gratis. Simpan video, foto, dan slide TikTok dalam kualitas HD. Cepat, mudah, tanpa batas. TikTok downloader terbaik Indonesia.",
  keywords: [
    "tiktok downloader",
    "download video tiktok",
    "tiktok tanpa watermark",
    "tiktok no watermark",
    "simpan video tiktok",
    "tiktok video saver",
    "download tiktok hd",
    "tiktok downloader gratis",
    "snaptik alternative",
    "ssstik alternative",
  ],
  alternates: { canonical: "https://getmova.my.id/tiktok-downloader" },
  openGraph: {
    title: "TikTok Video Downloader - Download Video TikTok Tanpa Watermark",
    description:
      "Download video TikTok tanpa watermark dalam kualitas HD. Gratis dan mudah.",
    url: "https://getmova.my.id/tiktok-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova TikTok Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Video Downloader - Download Video TikTok Tanpa Watermark",
    description: "Download video TikTok tanpa watermark. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
};

export default function TikTokDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

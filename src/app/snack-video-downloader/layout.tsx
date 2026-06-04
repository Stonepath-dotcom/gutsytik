import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snack Video Downloader - Download Video Snack Video Tanpa Watermark",
  description:
    "Download video Snack Video tanpa watermark gratis. Simpan video Snack Video dalam kualitas HD. Cepat, mudah, tanpa batas. Snack Video downloader terbaik Indonesia.",
  keywords: [
    "snack video downloader",
    "download video snack video",
    "snack video tanpa watermark",
    "snack video no watermark",
    "simpan video snack video",
    "snack video saver",
    "download snack video hd",
    "snack video download gratis",
  ],
  alternates: { canonical: "https://getmova.my.id/snack-video-downloader" },
  openGraph: {
    title: "Snack Video Downloader - Download Video Snack Video Tanpa Watermark",
    description:
      "Download video Snack Video tanpa watermark dalam kualitas HD. Gratis dan mudah.",
    url: "https://getmova.my.id/snack-video-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Snack Video Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snack Video Downloader - Download Video Snack Video Tanpa Watermark",
    description: "Download video Snack Video tanpa watermark. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
};

export default function SnackVideoDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

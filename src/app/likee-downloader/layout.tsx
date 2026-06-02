import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Likee Video Downloader - Download Video Likee Tanpa Watermark",
  description:
    "Download video Likee tanpa watermark gratis. Simpan video Likee dalam kualitas HD. Cepat, mudah, tanpa batas. Likee downloader terbaik Indonesia.",
  keywords: [
    "likee downloader",
    "download video likee",
    "likee tanpa watermark",
    "likee no watermark",
    "simpan video likee",
    "likee video saver",
    "download likee hd",
    "likee video download gratis",
  ],
  alternates: { canonical: "https://getmova.my.id/likee-downloader" },
  openGraph: {
    title: "Likee Video Downloader - Download Video Likee Tanpa Watermark",
    description:
      "Download video Likee tanpa watermark dalam kualitas HD. Gratis dan mudah.",
    url: "https://getmova.my.id/likee-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Likee Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Likee Video Downloader - Download Video Likee Tanpa Watermark",
    description: "Download video Likee tanpa watermark. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
};

export default function LikeeDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

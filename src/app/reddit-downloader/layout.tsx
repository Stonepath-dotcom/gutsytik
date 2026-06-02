import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit Video Downloader - Download Video Reddit dengan Audio",
  description:
    "Download video Reddit dengan audio lengkap. Simpan video dari subreddit favorit kamu dalam kualitas terbaik, gratis dan cepat. Reddit downloader terbaik Indonesia.",
  keywords: [
    "reddit downloader",
    "download video reddit",
    "reddit video saver",
    "reddit with audio",
    "simpan video reddit",
    "reddit video download",
    "download reddit hd",
    "reddit video audio",
    "save reddit video",
  ],
  alternates: { canonical: "https://getmova.my.id/reddit-downloader" },
  openGraph: {
    title: "Reddit Video Downloader - Download Video Reddit dengan Audio",
    description:
      "Download video Reddit dengan audio lengkap. Gratis dan cepat.",
    url: "https://getmova.my.id/reddit-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Reddit Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reddit Video Downloader - Download Video Reddit dengan Audio",
    description: "Download video Reddit dengan audio lengkap. Gratis dan cepat.",
    images: ["/og-image.png"],
  },
};

export default function RedditDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit Video Downloader - Download Video Reddit dengan Audio",
  description:
    "Download video Reddit dengan audio lengkap. Simpan video dari subreddit favorit kamu dalam kualitas terbaik, gratis dan cepat.",
  alternates: { canonical: "https://getmova.my.id/reddit-downloader" },
};

export default function RedditDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

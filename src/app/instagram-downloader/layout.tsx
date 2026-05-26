import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video Instagram & Reels Gratis - Tanpa Login | Mova",
  description:
    "Download video Instagram, Reels, dan Stories gratis. Simpan video IG dalam kualitas HD tanpa login akun. Cepat, gratis, dan aman. Instagram downloader terbaik Indonesia.",
  alternates: { canonical: "https://getmova.my.id/instagram-downloader" },
  openGraph: {
    title: "Download Video Instagram & Reels Gratis - Mova",
    description:
      "Download video Instagram, Reels, dan Stories gratis. HD, tanpa login.",
    url: "https://getmova.my.id/instagram-downloader",
  },
};

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

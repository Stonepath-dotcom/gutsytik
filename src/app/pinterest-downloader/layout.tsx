import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest Video Downloader - Download Video Pinterest Gratis",
  description:
    "Download video Pinterest ke galeri HP dengan mudah dan gratis. Simpan video Pinterest tanpa watermark dalam kualitas HD.",
  alternates: { canonical: "https://getmova.my.id/pinterest-downloader" },
};

export default function PinterestDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

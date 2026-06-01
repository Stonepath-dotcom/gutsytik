import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telegram Video Downloader - Download Video Telegram Gratis",
  description:
    "Download video Telegram ke galeri HP dengan mudah dan gratis. Simpan video dari channel dan grup Telegram dalam kualitas HD. Cepat, aman, tanpa batas.",
  keywords: [
    "download video telegram",
    "telegram downloader",
    "telegram video download",
    "download video telegram gratis",
    "simpan video telegram",
    "telegram video saver",
    "cara download video telegram",
    "download telegram hd",
    "save telegram video",
    "telegram downloader online",
  ],
  alternates: {
    canonical: "https://getmova.my.id/telegram-downloader",
  },
  openGraph: {
    title: "Telegram Video Downloader - Download Video Telegram Gratis",
    description:
      "Download video Telegram ke galeri HP dengan mudah dan gratis. Simpan video dari channel dan grup Telegram dalam kualitas HD.",
    url: "https://getmova.my.id/telegram-downloader",
    siteName: "GetMova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Telegram Video Downloader - Download Video Telegram Gratis",
    description:
      "Download video Telegram ke galeri HP dengan mudah dan gratis. Simpan video dari channel dan grup Telegram dalam kualitas HD.",
  },
};

export default function TelegramDownloaderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

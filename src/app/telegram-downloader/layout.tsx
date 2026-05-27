import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video Telegram Gratis - Cepat & Mudah | getmova",
  description:
    "Download video Telegram gratis dengan mudah dan cepat. Simpan video dari channel, grup, dan chat Telegram dalam kualitas HD. Tanpa daftar, tanpa batas download. Telegram video downloader terbaik Indonesia.",
  keywords: [
    "download video telegram",
    "telegram downloader",
    "telegram video downloader",
    "simpan video telegram",
    "download video dari telegram",
    "telegram video saver",
    "unduh video telegram gratis",
    "download video telegram hp",
    "cara download video telegram",
    "telegram downloader online",
  ],
  alternates: { canonical: "https://getmova.my.id/telegram-downloader" },
  openGraph: {
    title: "Download Video Telegram Gratis - Cepat & Mudah | getmova",
    description:
      "Download video Telegram gratis. Simpan video dari channel dan grup Telegram dalam kualitas HD. Tanpa daftar akun.",
    url: "https://getmova.my.id/telegram-downloader",
    siteName: "getmova",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Telegram Gratis - Cepat & Mudah | getmova",
    description:
      "Download video Telegram gratis. Simpan video dari channel dan grup Telegram dalam kualitas HD. Tanpa daftar akun.",
  },
};

export default function TelegramDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

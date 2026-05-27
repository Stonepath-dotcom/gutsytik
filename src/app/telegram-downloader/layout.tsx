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
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Telegram Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Telegram Gratis - Cepat & Mudah | getmova",
    description:
      "Download video Telegram gratis. Simpan video dari channel dan grup Telegram dalam kualitas HD. Tanpa daftar akun.",
    images: ["/og-image.png"],
  },
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Telegram Video Downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  description: "Download video Telegram gratis dengan mudah dan cepat. Simpan video dari channel dan grup Telegram dalam kualitas HD.",
  url: "https://getmova.my.id/telegram-downloader",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "11200",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "Telegram Downloader", item: "https://getmova.my.id/telegram-downloader" },
  ],
};

export default function TelegramDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {children}
    </>
  );
}

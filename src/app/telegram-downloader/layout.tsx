import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Video Telegram Gratis - Cepat & Mudah",
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
    title: "Download Video Telegram Gratis - Cepat & Mudah",
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
    title: "Download Video Telegram Gratis - Cepat & Mudah",
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

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara download video dari Telegram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buka Telegram, temukan video yang ingin didownload, klik kanan pada video lalu pilih Copy Link atau salin link dari channel. Tempel link tersebut di kolom input Mova dan klik Download. Video akan otomatis terunduh ke perangkat kamu.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video dari channel Telegram private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, Mova hanya bisa mendownload video dari channel dan grup Telegram yang bersifat publik. Konten dari channel private tidak dapat diakses oleh pihak ketiga.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video Telegram di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi, tidak ada biaya tersembunyi, dan tidak ada batasan jumlah download per hari.",
      },
    },
    {
      "@type": "Question",
      name: "Kualitas video Telegram apa yang didukung Mova?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova mendownload video Telegram dalam kualitas asli atau kualitas terbaik yang tersedia. Video akan tersimpan dalam format MP4 yang kompatibel dengan semua perangkat.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download file besar dari Telegram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendukung download video berukuran besar dari Telegram. Pastikan koneksi internet stabil saat mendownload file besar agar proses berjalan lancar tanpa terputus.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video Telegram dengan Mova",
  description: "Panduan langkah demi langkah untuk download video dari channel dan grup Telegram menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video Telegram",
      text: "Buka Telegram, temukan video di channel atau grup, klik kanan pada video dan pilih Copy Link. Atau salin link dari pesan yang berisi video.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link video Telegram yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Klik Download",
      text: "Klik tombol Download dan tunggu Mova memproses video Telegram. Pilih kualitas video yang diinginkan dari opsi yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Simpan Video ke Perangkat",
      text: "Setelah proses selesai, video Telegram akan otomatis tersimpan ke galeri HP atau folder download di perangkat kamu.",
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      {children}
    </>
  );
}

import type { Metadata } from "next";
import { SnackVideoDownloaderClient } from "./client";

export const metadata: Metadata = {
  title: "Download Video Snack Video Tanpa Watermark - Gratis & Cepat",
  description:
    "Download video Snack Video tanpa watermark gratis dan cepat. Simpan video Snack Video dalam kualitas HD tanpa logo. Support semua format video Snack Video. Snack Video downloader terbaik Indonesia.",
  keywords: [
    "snack video downloader",
    "download video snack video",
    "snack video tanpa watermark",
    "snack video no watermark",
    "snack video download",
    "simpan video snack video",
    "download snack video hd",
    "snack video saver",
    "snack video download gratis",
    "cara download video snack video",
  ],
  openGraph: {
    title: "Download Video Snack Video Tanpa Watermark - Gratis & Cepat",
    description:
      "Download video Snack Video tanpa watermark gratis dan cepat. Simpan video Snack Video HD tanpa logo dengan Mova.",
    url: "https://getmova.my.id/snack-video-downloader",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Snack Video Tanpa Watermark - Gratis & Cepat",
    description:
      "Download video Snack Video tanpa watermark gratis dan cepat. Simpan video Snack Video HD tanpa logo dengan Mova.",
  },
  alternates: {
    canonical: "https://getmova.my.id/snack-video-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Snack Video Downloader",
  description: "Download video Snack Video tanpa watermark gratis dan cepat. Kualitas HD, tanpa registrasi.",
  url: "https://getmova.my.id/snack-video-downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "176",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "Snack Video Downloader", item: "https://getmova.my.id/snack-video-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video Snack Video tanpa watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendownload video Snack Video tanpa watermark. Video yang kamu dapatkan bersih tanpa logo Snack Video.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video Snack Video di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi dan tidak ada biaya tersembunyi.",
      },
    },
    {
      "@type": "Question",
      name: "Format video apa yang dihasilkan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Video disimpan dalam format MP4 yang kompatibel dengan semua perangkat.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video Snack Video yang private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, Mova hanya bisa mendownload video Snack Video yang bersifat publik.",
      },
    },
    {
      "@type": "Question",
      name: "Kualitas video apa yang didukung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova mendownload video Snack Video dalam kualitas terbaik yang tersedia tanpa kompresi.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video Snack Video Tanpa Watermark dengan Mova",
  description: "Panduan langkah demi langkah untuk download video Snack Video tanpa watermark gratis menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video Snack Video",
      text: "Buka aplikasi Snack Video, temukan video yang ingin didownload, tap tombol Share lalu pilih Copy Link untuk menyalin URL video.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link video Snack Video yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Klik Download",
      text: "Klik tombol Download dan tunggu Mova memproses video. Mova akan otomatis menghapus watermark Snack Video dari video.",
    },
  ],
};

const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Download Video Snack Video Tanpa Watermark - Gratis & Cepat",
  description: "Download video Snack Video tanpa watermark gratis dan cepat. Simpan video Snack Video dalam kualitas HD tanpa logo.",
  url: "https://getmova.my.id/snack-video-downloader",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".hero-title", ".faq-section"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />
      <SnackVideoDownloaderClient />
    </>
  );
}

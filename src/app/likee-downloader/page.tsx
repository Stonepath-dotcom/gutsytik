import type { Metadata } from "next";
import { LikeeDownloaderClient } from "./client";

export const metadata: Metadata = {
  title: "Download Video Likee Tanpa Watermark - Gratis & Cepat",
  description:
    "Download video Likee tanpa watermark gratis dan cepat. Simpan video Likee dalam kualitas HD tanpa logo. Support semua format video Likee. Likee downloader terbaik Indonesia.",
  keywords: [
    "likee downloader",
    "download video likee",
    "likee tanpa watermark",
    "likee no watermark",
    "likee video download",
    "simpan video likee",
    "download likee hd",
    "likee video saver",
    "likee video download gratis",
    "cara download video likee",
  ],
  openGraph: {
    title: "Download Video Likee Tanpa Watermark - Gratis & Cepat",
    description:
      "Download video Likee tanpa watermark gratis dan cepat. Simpan video Likee HD tanpa logo dengan Mova.",
    url: "https://getmova.my.id/likee-downloader",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Likee Tanpa Watermark - Gratis & Cepat",
    description:
      "Download video Likee tanpa watermark gratis dan cepat. Simpan video Likee HD tanpa logo dengan Mova.",
  },
  alternates: {
    canonical: "https://getmova.my.id/likee-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Likee Downloader",
  description: "Download video Likee tanpa watermark gratis dan cepat. Kualitas HD, tanpa registrasi.",
  url: "https://getmova.my.id/likee-downloader",
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
    ratingCount: "198",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "Likee Downloader", item: "https://getmova.my.id/likee-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video Likee tanpa watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendownload video Likee tanpa watermark. Video yang kamu dapatkan bersih tanpa logo Likee.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video Likee di Mova gratis?",
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
      name: "Apakah Mova bisa download video Likee yang private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, Mova hanya bisa mendownload video Likee yang bersifat publik.",
      },
    },
    {
      "@type": "Question",
      name: "Kualitas video apa yang didukung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova mendownload video Likee dalam kualitas terbaik yang tersedia tanpa kompresi.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video Likee Tanpa Watermark dengan Mova",
  description: "Panduan langkah demi langkah untuk download video Likee tanpa watermark gratis menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video Likee",
      text: "Buka aplikasi Likee, temukan video yang ingin didownload, tap tombol Share lalu pilih Copy Link untuk menyalin URL video.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link video Likee yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Klik Download",
      text: "Klik tombol Download dan tunggu Mova memproses video. Mova akan otomatis menghapus watermark Likee dari video.",
    },
  ],
};

const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Download Video Likee Tanpa Watermark - Gratis & Cepat",
  description: "Download video Likee tanpa watermark gratis dan cepat. Simpan video Likee dalam kualitas HD tanpa logo.",
  url: "https://getmova.my.id/likee-downloader",
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
      <LikeeDownloaderClient />
    </>
  );
}

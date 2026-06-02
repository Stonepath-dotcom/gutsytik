import type { Metadata } from "next";
import { TikTokPhotoSlidePage } from "./client";

export const metadata: Metadata = {
  title: "Download Slide Foto TikTok - Gratis & HD | GetMova",
  description:
    "Download slide foto TikTok (photo carousel) dalam kualitas HD. Simpan semua foto dari TikTok slideshow satu per satu atau sekaligus. Gratis, cepat, dan tanpa watermark!",
  keywords: [
    "download slide foto tiktok",
    "download foto tiktok",
    "tiktok photo slide downloader",
    "tiktok slideshow download",
    "download foto tiktok hd",
    "tiktok carousel download",
    "simpan foto tiktok",
    "download semua foto tiktok",
    "tiktok photo downloader",
    "download gambar tiktok",
  ],
  openGraph: {
    title: "Download Slide Foto TikTok - Gratis & HD | GetMova",
    description:
      "Download slide foto TikTok (photo carousel) dalam kualitas HD. Simpan semua foto dari TikTok slideshow satu per satu atau sekaligus.",
    url: "https://getmova.my.id/tiktok-photo-slide",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Slide Foto TikTok - Gratis & HD | GetMova",
    description:
      "Download slide foto TikTok (photo carousel) dalam kualitas HD. Simpan semua foto dari TikTok slideshow satu per satu atau sekaligus.",
  },
  alternates: {
    canonical: "https://getmova.my.id/tiktok-photo-slide",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova TikTok Photo Slide Downloader",
  description: "Download slide foto TikTok dalam kualitas HD. Simpan semua foto dari TikTok carousel satu per satu atau sekaligus.",
  url: "https://getmova.my.id/tiktok-photo-slide",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    ratingCount: "167",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "TikTok Photo Slide", item: "https://getmova.my.id/tiktok-photo-slide" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa itu slide foto TikTok?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Slide foto TikTok (juga disebut photo carousel atau photo slideshow) adalah konten TikTok yang terdiri dari beberapa foto yang ditampilkan secara bergantian dengan musik latar. Format ini sangat populer di TikTok untuk menampilkan portofolio, tips, before-after, dan berbagai konten visual lainnya.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara download slide foto TikTok?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cukup salin link video TikTok yang berisi slide foto, tempel di kolom input Mova, lalu klik Download. Mova akan otomatis mendeteksi bahwa konten tersebut adalah slide foto dan menampilkan setiap foto secara terpisah. Kamu bisa download satu per satu atau download semua foto sekaligus.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah bisa download semua foto sekaligus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya! Mova menyediakan tombol 'Download Semua Foto' yang akan mengunduh seluruh foto dalam slide secara otomatis satu per satu ke perangkat kamu. Setiap foto akan disimpan dalam kualitas aslinya.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah kualitas foto tetap HD saat didownload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendownload foto dalam resolusi aslinya tanpa kompresi. Kualitas foto yang kamu dapatkan sama persis dengan yang ditampilkan di TikTok.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah bisa download audio dari slide foto TikTok?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova juga menyediakan opsi untuk mengekstrak audio/musik dari slide foto TikTok dan menyimpannya sebagai file MP3.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Slide Foto TikTok dengan Mova",
  description: "Panduan langkah demi langkah untuk download slide foto TikTok gratis menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Slide Foto TikTok",
      text: "Buka aplikasi TikTok, temukan konten slide foto yang ingin didownload, tap tombol Share lalu pilih Copy Link.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka halaman TikTok Photo Slide Mova di browser, tempel link yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download Foto",
      text: "Mova akan menampilkan semua foto dari slide. Klik foto individual untuk download satu per satu, atau gunakan tombol Download Semua Foto untuk mengunduh semuanya sekaligus.",
    },
  ],
};

const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Download Foto TikTok Slide - Simpan Foto TikTok Gratis",
  description: "Download foto slide TikTok (swipe photo) gratis. Simpan semua foto dari TikTok slide dalam kualitas HD.",
  url: "https://getmova.my.id/tiktok-photo-slide",
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
      <TikTokPhotoSlidePage />
    </>
  );
}

import type { Metadata } from "next";
import { TwitterDownloaderPage } from "./client";

export const metadata: Metadata = {
  title: "Download Video Twitter/X Tanpa Watermark - Gratis",
  description:
    "Download video Twitter/X tanpa watermark gratis dan cepat. Simpan video dari tweet publik dalam kualitas HD. Support twitter.com dan x.com.",
  keywords: [
    "download video twitter",
    "twitter downloader",
    "twitter video download",
    "x video download",
    "download video x",
    "twitter gif download",
    "simpan video twitter",
    "twitter video saver",
    "cara download video twitter",
    "download video x gratis",
    "twitter downloader online",
  ],
  openGraph: {
    title: "Download Video Twitter/X Tanpa Watermark - Gratis",
    description:
      "Download video Twitter/X tanpa watermark gratis dan cepat. Simpan video dari tweet publik dalam kualitas HD.",
    url: "https://getmova.my.id/twitter-downloader",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Twitter/X Tanpa Watermark - Gratis",
    description:
      "Download video Twitter/X tanpa watermark gratis dan cepat. Simpan video dari tweet publik dalam kualitas HD.",
  },
  alternates: {
    canonical: "https://getmova.my.id/twitter-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Twitter/X Downloader",
  description: "Download video Twitter/X tanpa watermark gratis dan cepat. Kualitas HD, tanpa registrasi.",
  url: "https://getmova.my.id/twitter-downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "15600",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "Twitter/X Downloader", item: "https://getmova.my.id/twitter-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video dari Twitter dan X?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendukung download video dari twitter.com maupun x.com. Kedua domain tersebut didukung secara penuh oleh Mova.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah video Twitter yang didownload memiliki watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, video Twitter/X yang didownload melalui Mova tidak memiliki watermark. Kamu mendapatkan video bersih sesuai kualitas aslinya.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara download video Twitter/X?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Klik tombol Share pada tweet yang berisi video, pilih 'Copy link'. Tempel link tersebut di kolom input Mova dan klik Download. Video akan tersimpan di perangkat kamu.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video Twitter/X di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi atau berlangganan. Download sepuas kamu tanpa batasan.",
      },
    },
    {
      "@type": "Question",
      name: "Bisakah saya download video Twitter dari akun private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, Mova hanya bisa mendownload video dari tweet yang bersifat publik. Konten dari akun private tidak dapat diakses.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video Twitter/X Tanpa Watermark dengan Mova",
  description: "Panduan langkah demi langkah untuk download video Twitter/X tanpa watermark gratis menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video Twitter/X",
      text: "Buka Twitter/X, temukan tweet yang berisi video, klik tombol Share lalu pilih Copy Link untuk menyalin URL tweet.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link video Twitter/X yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Klik Download",
      text: "Klik tombol Download dan tunggu Mova memproses video. Mova akan mendownload video tanpa watermark dalam kualitas terbaik.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Simpan Video ke Perangkat",
      text: "Setelah proses selesai, video Twitter/X akan otomatis tersimpan ke galeri HP atau folder download di perangkat kamu.",
    },
  ],
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
      <TwitterDownloaderPage />
    </>
  );
}

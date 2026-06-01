import type { Metadata } from "next";
import { InstagramDownloaderPage } from "./client";

export const metadata: Metadata = {
  title: "Download Video Instagram Reels & Story - Gratis",
  description:
    "Download video Instagram Reels, Story, dan IGTV gratis tanpa watermark. Simpan video IG dalam kualitas tinggi dengan Mova. Cepat, mudah, dan gratis!",
  keywords: [
    "download video instagram",
    "instagram downloader",
    "download instagram reels",
    "instagram story download",
    "download ig reels",
    "instagram video saver",
    "save instagram video",
    "ig downloader",
    "download reels instagram",
    "instagram reels saver",
    "cara download video instagram",
    "instagram video download gratis",
  ],
  openGraph: {
    title: "Download Video Instagram Reels & Story - Gratis",
    description:
      "Download video Instagram Reels, Story, dan IGTV gratis tanpa watermark. Simpan video IG dalam kualitas tinggi dengan Mova.",
    url: "https://getmova.my.id/instagram-downloader",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Instagram Reels & Story - Gratis",
    description:
      "Download video Instagram Reels, Story, dan IGTV gratis tanpa watermark. Simpan video IG dalam kualitas tinggi dengan Mova.",
  },
  alternates: {
    canonical: "https://getmova.my.id/instagram-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Instagram Downloader",
  description: "Download video Instagram Reels, Story, dan IGTV gratis. Kualitas tinggi, tanpa registrasi, tanpa watermark.",
  url: "https://getmova.my.id/instagram-downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "Instagram Downloader", item: "https://getmova.my.id/instagram-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah Mova bisa download Instagram Story?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova bisa mendownload Instagram Story selama story tersebut bersifat publik. Kamu hanya perlu menyalin link story dan memasukkannya ke kolom input di Mova.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara download Instagram Reels dengan Mova?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buka Instagram, temukan Reels yang ingin didownload, tap tombol Share lalu pilih Copy Link. Tempel link tersebut di kolom input Mova dan klik Download. Video akan tersimpan di perangkat kamu.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video dari akun Instagram private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, Mova hanya bisa mendownload video dari akun Instagram yang bersifat publik. Video dari akun private tidak dapat diakses oleh pihak ketiga.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video Instagram di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi atau berlangganan.",
      },
    },
    {
      "@type": "Question",
      name: "Format video apa yang didukung untuk download Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova mendukung download video Instagram dalam format MP4 dengan kualitas terbaik yang tersedia. Untuk konten audio, tersedia juga format MP3.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video Instagram Reels dan Story dengan Mova",
  description: "Panduan langkah demi langkah untuk download video Instagram Reels, Story, dan IGTV gratis menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video Instagram",
      text: "Buka Instagram, temukan Reels, Story, atau video yang ingin didownload, tap tombol Share lalu pilih Copy Link untuk menyalin URL.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link video Instagram yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Klik Download",
      text: "Klik tombol Download dan tunggu Mova memproses video Instagram. Pilih kualitas dan format video yang diinginkan.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Simpan Video ke Perangkat",
      text: "Setelah proses selesai, video Instagram akan otomatis tersimpan ke galeri HP atau folder download di perangkat kamu.",
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
      <InstagramDownloaderPage />
    </>
  );
}

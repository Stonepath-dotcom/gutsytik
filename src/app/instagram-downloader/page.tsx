import type { Metadata } from "next";
import { InstagramDownloaderPage } from "./client";

export const metadata: Metadata = {
  title: "Download Video Instagram Reels & Story - Gratis 2025 | Mova",
  description:
    "Download video Instagram Reels, Story, dan IGTV gratis tanpa watermark. Simpan video IG dalam kualitas tinggi dengan Mova. Cepat, mudah, dan gratis!",
  keywords: [
    "instagram downloader",
    "download instagram reels",
    "download video instagram",
    "instagram story download",
    "download ig reels",
    "instagram video saver",
    "save instagram video",
    "ig downloader",
  ],
  openGraph: {
    title: "Download Video Instagram Reels & Story - Gratis 2025 | Mova",
    description:
      "Download video Instagram Reels, Story, dan IGTV gratis tanpa watermark. Simpan video IG dalam kualitas tinggi dengan Mova.",
    url: "https://getmova.my.id/instagram-downloader",
    siteName: "Mova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Instagram Reels & Story - Gratis 2025 | Mova",
    description:
      "Download video Instagram Reels, Story, dan IGTV gratis tanpa watermark. Simpan video IG dalam kualitas tinggi dengan Mova.",
  },
  alternates: {
    canonical: "https://getmova.my.id/instagram-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
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
      <InstagramDownloaderPage />
    </>
  );
}

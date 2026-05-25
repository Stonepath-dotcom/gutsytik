import type { Metadata } from "next";
import { TwitterDownloaderPage } from "./client";

export const metadata: Metadata = {
  title: "Download Video Twitter/X Tanpa Watermark - Gratis 2025 | Mova",
  description:
    "Download video Twitter/X tanpa watermark gratis dan cepat. Simpan video dari tweet publik dalam kualitas HD. Support twitter.com dan x.com.",
  keywords: [
    "twitter downloader",
    "download video twitter",
    "twitter video download",
    "x video download",
    "download video x",
    "twitter gif download",
    "simpan video twitter",
    "twitter video saver",
  ],
  openGraph: {
    title: "Download Video Twitter/X Tanpa Watermark - Gratis 2025 | Mova",
    description:
      "Download video Twitter/X tanpa watermark gratis dan cepat. Simpan video dari tweet publik dalam kualitas HD.",
    url: "https://getmova.my.id/twitter-downloader",
    siteName: "Mova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Twitter/X Tanpa Watermark - Gratis 2025 | Mova",
    description:
      "Download video Twitter/X tanpa watermark gratis dan cepat. Simpan video dari tweet publik dalam kualitas HD.",
  },
  alternates: {
    canonical: "https://getmova.my.id/twitter-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
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
      <TwitterDownloaderPage />
    </>
  );
}

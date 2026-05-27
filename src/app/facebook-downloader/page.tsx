import type { Metadata } from "next";
import { FacebookDownloaderPage } from "./client";

export const metadata: Metadata = {
  title: "Download Video Facebook HD - Gratis & Cepat 2026 | getmova",
  description:
    "Download video Facebook HD gratis dan cepat. Simpan video FB dalam kualitas tinggi tanpa watermark. Support video publik, Reels, dan Watch.",
  keywords: [
    "facebook downloader",
    "download video facebook",
    "facebook video download",
    "fb video download",
    "download video fb hd",
    "facebook reels download",
    "simpan video facebook",
  ],
  openGraph: {
    title: "Download Video Facebook HD - Gratis & Cepat 2026 | getmova",
    description:
      "Download video Facebook HD gratis dan cepat. Simpan video FB dalam kualitas tinggi tanpa watermark.",
    url: "https://getmova.my.id/facebook-downloader",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video Facebook HD - Gratis & Cepat 2026 | getmova",
    description:
      "Download video Facebook HD gratis dan cepat. Simpan video FB dalam kualitas tinggi tanpa watermark.",
  },
  alternates: {
    canonical: "https://getmova.my.id/facebook-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Mova Facebook Downloader",
  description: "Download video Facebook HD gratis dan cepat. Kualitas tinggi, tanpa registrasi, tanpa watermark.",
  url: "https://getmova.my.id/facebook-downloader",
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
    { "@type": "ListItem", position: 2, name: "Facebook Downloader", item: "https://getmova.my.id/facebook-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara download video Facebook dengan Mova?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buka Facebook, temukan video yang ingin didownload, klik kanan pada video lalu pilih 'Copy link' atau salin URL dari address bar. Tempel link di Mova dan klik Download.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video Facebook HD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendukung download video Facebook dalam kualitas HD jika video tersebut tersedia dalam resolusi HD. Opsi SD juga tersedia untuk menghemat ruang penyimpanan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video Facebook di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi, tidak ada biaya tersembunyi, dan tidak ada iklan pop-up yang mengganggu.",
      },
    },
    {
      "@type": "Question",
      name: "Bisakah Mova download video Facebook dari akun private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, Mova hanya bisa mendownload video Facebook yang bersifat publik. Video dari akun private tidak dapat diakses oleh pihak ketiga.",
      },
    },
    {
      "@type": "Question",
      name: "Format video apa yang dihasilkan oleh Mova?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova mendownload video Facebook dalam format MP4 yang kompatibel dengan semua perangkat dan pemutar video. Format ini bisa diputar di HP, laptop, tablet, dan smart TV.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <FacebookDownloaderPage />
    </>
  );
}

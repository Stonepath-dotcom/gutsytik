import type { Metadata } from "next";
import { YouTubeDownloaderPage } from "./client";

export const metadata: Metadata = {
  title: "Download Video YouTube MP4 HD - Gratis & Cepat",
  description:
    "Download video YouTube MP4 HD gratis dan cepat. Konversi YouTube ke MP3 atau MP4 dengan kualitas terbaik. Support video panjang, Shorts, dan playlist.",
  keywords: [
    "download video youtube",
    "youtube downloader",
    "download youtube mp4",
    "youtube video download",
    "youtube mp3",
    "download video youtube hd",
    "youtube to mp3",
    "youtube to mp4",
    "convert youtube",
    "cara download video youtube",
    "youtube video saver",
    "download youtube gratis",
  ],
  openGraph: {
    title: "Download Video YouTube MP4 HD - Gratis & Cepat",
    description:
      "Download video YouTube MP4 HD gratis dan cepat. Konversi YouTube ke MP3 atau MP4 dengan kualitas terbaik.",
    url: "https://getmova.my.id/youtube-downloader",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video YouTube MP4 HD - Gratis & Cepat",
    description:
      "Download video YouTube MP4 HD gratis dan cepat. Konversi YouTube ke MP3 atau MP4 dengan kualitas terbaik.",
  },
  alternates: {
    canonical: "https://getmova.my.id/youtube-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova YouTube Downloader",
  description: "Download video YouTube MP4 HD dan konversi ke MP3 gratis. Kualitas terbaik, cepat, tanpa registrasi.",
  url: "https://getmova.my.id/youtube-downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "31500",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "YouTube Downloader", item: "https://getmova.my.id/youtube-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video YouTube dalam format MP4?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendukung download video YouTube dalam format MP4 dengan berbagai pilihan kualitas, mulai dari 360p hingga 1080p HD. Kamu bisa memilih resolusi yang sesuai dengan kebutuhan.",
      },
    },
    {
      "@type": "Question",
      name: "Bisakah Mova mengkonversi YouTube ke MP3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova bisa mengekstrak audio dari video YouTube dan menyimpannya dalam format MP3. Fitur ini cocok untuk menyimpan musik, podcast, atau konten audio lainnya dari YouTube.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa kualitas video YouTube terbaik yang bisa didownload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kualitas tergantung pada video aslinya. Jika video tersedia dalam 1080p, Mova bisa mendownloadnya dalam 1080p. Mova menyediakan semua opsi kualitas yang tersedia untuk setiap video.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video YouTube yang berdurasi panjang?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendukung download video YouTube berdurasi panjang. Namun, video yang sangat panjang mungkin membutuhkan waktu lebih lama untuk diproses. Pastikan koneksi internet stabil saat mendownload.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video YouTube di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi atau berlangganan. Semua fitur YouTube downloader Mova tersedia secara cuma-cuma.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video YouTube MP4 HD dengan Mova",
  description: "Panduan langkah demi langkah untuk download video YouTube dalam format MP4 HD gratis menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video YouTube",
      text: "Buka YouTube, temukan video yang ingin didownload, salin URL video dari address bar atau tombol Share.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link video YouTube yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Pilih Format dan Kualitas",
      text: "Klik tombol Download, lalu pilih format MP4 atau MP3 dan kualitas video yang diinginkan (360p, 480p, 720p, atau 1080p HD).",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Simpan Video ke Perangkat",
      text: "Setelah proses selesai, video YouTube akan otomatis tersimpan ke galeri HP atau folder download di perangkat kamu.",
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
      <YouTubeDownloaderPage />
    </>
  );
}

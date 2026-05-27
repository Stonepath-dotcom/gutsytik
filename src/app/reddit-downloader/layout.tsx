import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit Video Downloader - Download Video Reddit dengan Audio | getmova",
  description:
    "Download video Reddit dengan audio lengkap. Simpan video dari subreddit favorit kamu dalam kualitas terbaik, gratis dan cepat. Reddit downloader terbaik Indonesia.",
  keywords: [
    "reddit downloader",
    "download video reddit",
    "reddit video saver",
    "reddit with audio",
    "simpan video reddit",
    "reddit video download",
    "download reddit hd",
    "reddit video audio",
    "save reddit video",
  ],
  alternates: { canonical: "https://getmova.my.id/reddit-downloader" },
  openGraph: {
    title: "Reddit Video Downloader - Download Video Reddit dengan Audio | getmova",
    description:
      "Download video Reddit dengan audio lengkap. Gratis dan cepat.",
    url: "https://getmova.my.id/reddit-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Reddit Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reddit Video Downloader - Download Video Reddit dengan Audio | getmova",
    description: "Download video Reddit dengan audio lengkap. Gratis dan cepat.",
    images: ["/og-image.png"],
  },
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Reddit Video Downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  description: "Download video Reddit dengan audio lengkap. Simpan video dari subreddit favorit dalam kualitas terbaik, gratis dan cepat.",
  url: "https://getmova.my.id/reddit-downloader",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "9800",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "Reddit Downloader", item: "https://getmova.my.id/reddit-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara download video Reddit dengan audio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buka Reddit, temukan post yang berisi video, tap tombol Share lalu pilih Copy Link. Tempel link tersebut di kolom input Mova dan klik Download. Mova akan otomatis menggabungkan video dan audio Reddit menjadi satu file MP4 yang siap disimpan.",
      },
    },
    {
      "@type": "Question",
      name: "Kenapa video Reddit yang didownload tidak ada suaranya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reddit menyimpan video dan audio secara terpisah. Mova secara otomatis menggabungkan keduanya sehingga video yang kamu download sudah lengkap dengan audio. Tidak perlu langkah tambahan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video Reddit di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi, tidak ada biaya tersembunyi, dan kamu bisa download video Reddit sepuasnya tanpa batasan jumlah.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video dari subreddit private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, Mova hanya bisa mendownload video dari subreddit dan post yang bersifat publik. Konten dari subreddit private tidak dapat diakses oleh pihak ketiga.",
      },
    },
    {
      "@type": "Question",
      name: "Kualitas video apa yang didukung untuk download Reddit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova mendownload video Reddit dalam kualitas terbaik yang tersedia, mulai dari 480p hingga 1080p HD. Kualitas tergantung pada video asli yang diupload ke Reddit.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video Reddit dengan Audio",
  description: "Panduan langkah demi langkah untuk download video Reddit lengkap dengan audio menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video Reddit",
      text: "Buka Reddit, temukan post dengan video yang ingin didownload, tap tombol Share lalu pilih Copy Link untuk menyalin URL post.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link video Reddit yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Klik Download",
      text: "Klik tombol Download dan tunggu Mova memproses video. Mova akan otomatis menggabungkan video dan audio Reddit menjadi satu file.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Simpan Video ke Perangkat",
      text: "Setelah proses selesai, video Reddit lengkap dengan audio akan otomatis tersimpan ke galeri HP atau folder download di perangkat kamu.",
    },
  ],
};

export default function RedditDownloaderLayout({
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

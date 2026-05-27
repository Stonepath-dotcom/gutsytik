import type { Metadata } from "next";
import { TikTokDownloaderPage } from "./client";

export const metadata: Metadata = {
  title: "Download Video TikTok Tanpa Watermark - Gratis & Cepat 2026 | getmova",
  description:
    "Download video TikTok tanpa watermark gratis dan cepat. Simpan video TikTok dalam kualitas HD tanpa logo. Support semua format video TikTok, termasuk slideshow dan live.",
  keywords: [
    "tiktok downloader",
    "download video tiktok tanpa watermark",
    "tiktok no watermark",
    "tiktok video download",
    "download tiktok hd",
    "tiktok tanpa watermark",
    "snaptik alternative",
    "simpan video tiktok",
  ],
  openGraph: {
    title: "Download Video TikTok Tanpa Watermark - Gratis & Cepat 2026 | getmova",
    description:
      "Download video TikTok tanpa watermark gratis dan cepat. Simpan video TikTok HD tanpa logo dengan Mova.",
    url: "https://getmova.my.id/tiktok-downloader",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Video TikTok Tanpa Watermark - Gratis & Cepat 2026 | getmova",
    description:
      "Download video TikTok tanpa watermark gratis dan cepat. Simpan video TikTok HD tanpa logo dengan Mova.",
  },
  alternates: {
    canonical: "https://getmova.my.id/tiktok-downloader",
  },
};

const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Mova TikTok Downloader",
  description: "Download video TikTok tanpa watermark gratis dan cepat. Kualitas HD, tanpa registrasi.",
  url: "https://getmova.my.id/tiktok-downloader",
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
    { "@type": "ListItem", position: 2, name: "TikTok Downloader", item: "https://getmova.my.id/tiktok-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah Mova benar-benar bisa download TikTok tanpa watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova menggunakan teknologi khusus yang secara otomatis menghapus watermark TikTok saat proses download. Hasilnya adalah video bersih tanpa logo TikTok dan username yang biasanya muncul di sudut video.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download TikTok tanpa watermark di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis. Mova tidak membebankan biaya apapun untuk download video TikTok tanpa watermark. Tidak ada batasan jumlah download per hari.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara download video TikTok yang diprivate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova hanya bisa mendownload video TikTok yang bersifat publik. Video dari akun private tidak bisa diakses oleh pihak ketiga termasuk Mova.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah kualitas video TikTok yang di-download berkurang?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak, Mova mendownload video TikTok dalam kualitas aslinya. Jika video tersedia dalam resolusi HD (1080p), Mova akan memberikan opsi download HD tersebut.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova aman untuk download video TikTok?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova sepenuhnya aman. Kami tidak menyimpan data pribadi pengguna, tidak meminta akses ke akun TikTok, dan tidak mengandung malware atau virus.",
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
      <TikTokDownloaderPage />
    </>
  );
}

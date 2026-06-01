import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest Video Downloader - Download Video Pinterest Gratis",
  description:
    "Download video Pinterest ke galeri HP dengan mudah dan gratis. Simpan video Pinterest tanpa watermark dalam kualitas HD. Pinterest downloader terbaik.",
  keywords: [
    "pinterest downloader",
    "download video pinterest",
    "pinterest video saver",
    "simpan video pinterest",
    "pinterest tanpa watermark",
    "pinterest video download",
    "download pinterest hd",
    "pinterest video downloader gratis",
  ],
  alternates: { canonical: "https://getmova.my.id/pinterest-downloader" },
  openGraph: {
    title: "Pinterest Video Downloader - Download Video Pinterest Gratis",
    description:
      "Download video Pinterest tanpa watermark dalam kualitas HD. Gratis dan mudah.",
    url: "https://getmova.my.id/pinterest-downloader",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova Pinterest Downloader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinterest Video Downloader - Download Video Pinterest Gratis",
    description: "Download video Pinterest tanpa watermark. Gratis dan mudah.",
    images: ["/og-image.png"],
  },
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Pinterest Video Downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  description: "Download video Pinterest ke galeri HP dengan mudah dan gratis. Simpan video Pinterest tanpa watermark dalam kualitas HD.",
  url: "https://getmova.my.id/pinterest-downloader",
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
    { "@type": "ListItem", position: 2, name: "Pinterest Downloader", item: "https://getmova.my.id/pinterest-downloader" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara download video Pinterest dengan Mova?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buka Pinterest, temukan video atau pin yang ingin didownload, tap tombol Share lalu pilih Copy Link. Tempel link tersebut di kolom input Mova dan klik Download. Video Pinterest akan otomatis tersimpan di perangkat kamu.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download video Pinterest tanpa watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendownload video Pinterest dalam kualitas asli tanpa menambahkan watermark apapun. Video yang kamu dapatkan bersih dan sama seperti tampilan aslinya di Pinterest.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah download video Pinterest di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi, tidak ada biaya tersembunyi, dan tidak ada batasan jumlah download per hari.",
      },
    },
    {
      "@type": "Question",
      name: "Format video apa yang dihasilkan Mova untuk Pinterest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova mendownload video Pinterest dalam format MP4 yang kompatibel dengan semua perangkat. Format ini bisa diputar di HP, laptop, tablet, dan smart TV tanpa aplikasi tambahan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download gambar dari Pinterest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova tidak hanya mendownload video Pinterest tapi juga mendukung download gambar dan GIF dari Pinterest. Cukup salin link pin dan tempel di Mova.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Download Video Pinterest dengan Mova",
  description: "Panduan langkah demi langkah untuk download video Pinterest gratis menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video Pinterest",
      text: "Buka aplikasi Pinterest, temukan video yang ingin didownload, tap tombol Share lalu pilih Copy Link untuk menyalin URL video.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link video Pinterest yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Klik Download",
      text: "Klik tombol Download dan tunggu Mova memproses video Pinterest. Pilih kualitas video yang diinginkan dari opsi yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Simpan Video ke Perangkat",
      text: "Setelah proses selesai, video Pinterest akan otomatis tersimpan ke galeri HP atau folder download di perangkat kamu.",
    },
  ],
};

export default function PinterestDownloaderLayout({
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

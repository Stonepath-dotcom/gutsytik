import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube ke MP3 - Konversi & Download Audio YouTube Gratis",
  description:
    "Konversi video YouTube ke MP3 gratis. Download audio, lagu, podcast dari YouTube dalam format MP3 berkualitas tinggi. Cepat, gratis, tanpa batas. YouTube to MP3 converter terbaik.",
  keywords: [
    "youtube to mp3",
    "youtube ke mp3",
    "download mp3 youtube",
    "konversi youtube mp3",
    "youtube audio downloader",
    "youtube mp3 converter",
    "download lagu youtube",
    "convert youtube to mp3",
    "youtube mp3 gratis",
    "ekstrak audio youtube",
  ],
  alternates: { canonical: "https://getmova.my.id/youtube-mp3" },
  openGraph: {
    title: "YouTube ke MP3 - Download Audio YouTube Gratis",
    description: "Konversi YouTube ke MP3 gratis. Download lagu dan podcast dari YouTube.",
    url: "https://getmova.my.id/youtube-mp3",
    siteName: "getmova",
    type: "website",
    images: [{ url: "/og-image.png", width: 1344, height: 768, alt: "getmova YouTube to MP3" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube ke MP3 - Download Audio YouTube Gratis",
    description: "Konversi YouTube ke MP3 gratis. Download lagu dan podcast dari YouTube.",
    images: ["/og-image.png"],
  },
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova YouTube MP3 Converter",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  description: "Konversi video YouTube ke MP3 gratis. Download audio, lagu, podcast dari YouTube dalam format MP3 berkualitas tinggi. Cepat, gratis, tanpa batas.",
  url: "https://getmova.my.id/youtube-mp3",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "25400",
    bestRating: "5",
    worstRating: "1",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
    { "@type": "ListItem", position: 2, name: "YouTube MP3 Converter", item: "https://getmova.my.id/youtube-mp3" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara download MP3 dari YouTube?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Salin link video YouTube yang ingin dikonversi, tempel link tersebut di kolom input Mova, klik Download, lalu pilih format MP3. Audio akan otomatis diekstrak dan tersimpan di perangkat kamu.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah konversi YouTube ke MP3 di Mova gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, 100% gratis tanpa batas. Tidak perlu registrasi, tidak ada biaya tersembunyi, dan tidak ada batasan jumlah konversi per hari.",
      },
    },
    {
      "@type": "Question",
      name: "Kualitas MP3 apa yang dihasilkan Mova?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mova mendukung konversi YouTube ke MP3 dalam berbagai kualitas, mulai dari 128kbps hingga 320kbps. Semakin tinggi kualitas yang dipilih, semakin baik kualitas audio yang dihasilkan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Mova bisa download lagu dari YouTube yang berdurasi panjang?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova mendukung konversi audio dari video YouTube berdurasi panjang seperti podcast, mix DJ, dan konser. Pastikan koneksi internet stabil saat mengkonversi file yang panjang.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah konversi YouTube ke MP3 di Mova aman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Mova sepenuhnya aman. Kami tidak menyimpan data pribadi pengguna, tidak meminta akses ke akun YouTube, dan tidak mengandung malware atau virus.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara Konversi YouTube ke MP3 dengan Mova",
  description: "Panduan langkah demi langkah untuk mengkonversi video YouTube ke format audio MP3 menggunakan Mova",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Salin Link Video YouTube",
      text: "Buka YouTube, temukan video yang ingin dikonversi ke MP3, salin URL video dari address bar atau tombol Share.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Tempel Link di Mova",
      text: "Buka getmova.my.id di browser, tempel link YouTube yang sudah disalin ke kolom input yang tersedia.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Pilih Format MP3",
      text: "Klik tombol Download, lalu pilih format MP3 dan kualitas audio yang diinginkan (128kbps, 192kbps, atau 320kbps).",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Simpan Audio ke Perangkat",
      text: "Setelah proses konversi selesai, file MP3 akan otomatis tersimpan ke folder download di perangkat kamu. Siap diputar di music player manapun.",
    },
  ],
};

export default function YouTubeMP3Layout({ children }: { children: React.ReactNode }) {
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

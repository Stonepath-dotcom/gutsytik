import type { Metadata } from "next";
import { AudioConverterClient } from "./client";

export const metadata: Metadata = {
  title: "Audio Converter - Konversi Video ke MP3 Gratis",
  description:
    "Konversi video ke MP3 gratis. Ekstrak audio dari video TikTok, Instagram, YouTube, dan platform lainnya. Cepat, gratis, tanpa batas.",
  keywords: [
    "audio converter",
    "video to mp3",
    "konversi video ke mp3",
    "ekstrak audio",
    "convert to mp3",
    "video ke audio",
    "audio extractor",
  ],
  alternates: { canonical: "https://getmova.my.id/tools/audio-converter" },
  openGraph: {
    title: "Audio Converter - Konversi Video ke MP3 Gratis",
    description: "Konversi video ke MP3 gratis. Ekstrak audio dari video.",
    url: "https://getmova.my.id/tools/audio-converter",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Converter - Konversi Video ke MP3 Gratis",
    description: "Konversi video ke MP3 gratis. Ekstrak audio dari video.",
  },
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mova Audio Converter",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  description:
    "Konversi video ke MP3 gratis. Ekstrak audio dari video TikTok, Instagram, YouTube, dan platform lainnya.",
  url: "https://getmova.my.id/tools/audio-converter",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://getmova.my.id",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://getmova.my.id/tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Audio Converter",
      item: "https://getmova.my.id/tools/audio-converter",
    },
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara mengkonversi video ke MP3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cukup tempel link video dari TikTok, Instagram, YouTube, atau platform lainnya ke kolom input di atas, lalu klik tombol Konversi. Mova akan mengekstrak audio dan memberikan link download MP3.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah audio converter ini gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, sepenuhnya gratis tanpa batas. Tidak perlu registrasi atau install aplikasi.",
      },
    },
    {
      "@type": "Question",
      name: "Format audio apa saja yang tersedia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tersedia format MP3 dan M4A dengan berbagai kualitas bitrate tergantung dari sumber video aslinya.",
      },
    },
  ],
};

export default function AudioConverterPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <AudioConverterClient />
    </>
  );
}

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
      {children}
    </>
  );
}

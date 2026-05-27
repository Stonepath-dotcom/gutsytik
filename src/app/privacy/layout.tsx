import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi & Syarat Ketentuan - getmova",
  description:
    "Kebijakan Privasi dan Syarat Ketentuan getmova. Informasi tentang pengumpulan data, penggunaan cookie, Google AdSense, dan hak pengguna.",
  keywords: [
    "kebijakan privasi",
    "syarat ketentuan",
    "privacy policy",
    "getmova privasi",
    "data pengguna",
  ],
  alternates: { canonical: "https://getmova.my.id/privacy" },
  openGraph: {
    title: "Kebijakan Privasi & Syarat Ketentuan - getmova",
    description: "Kebijakan Privasi dan Syarat Ketentuan getmova.",
    url: "https://getmova.my.id/privacy",
    siteName: "getmova",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kebijakan Privasi & Syarat Ketentuan - getmova",
    description: "Kebijakan Privasi dan Syarat Ketentuan getmova.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

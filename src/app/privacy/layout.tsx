import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - GetMova",
  description:
    "Kebijakan privasi GetMova. Pelajari bagaimana kami menangani data pengguna, penggunaan cookie, Google AdSense, dan hak-hak Anda sebagai pengguna. Privasi Anda adalah prioritas kami.",
  keywords: [
    "kebijakan privasi getmova",
    "privacy policy",
    "privasi pengguna",
    "cookie policy",
    "perlindungan data",
    "hak pengguna",
  ],
  alternates: {
    canonical: "https://getmova.my.id/privacy",
  },
  openGraph: {
    title: "Kebijakan Privasi - GetMova",
    description:
      "Kebijakan privasi GetMova. Pelajari bagaimana kami menangani data pengguna dan hak-hak Anda.",
    url: "https://getmova.my.id/privacy",
    siteName: "GetMova",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kebijakan Privasi - GetMova",
    description:
      "Kebijakan privasi GetMova. Pelajari bagaimana kami menangani data pengguna dan hak-hak Anda.",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi & Syarat Ketentuan - Mova",
  description:
    "Kebijakan Privasi dan Syarat Ketentuan Mova. Informasi tentang pengumpulan data, penggunaan cookie, Google AdSense, dan hak pengguna.",
  alternates: { canonical: "https://getmova.my.id/privacy" },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

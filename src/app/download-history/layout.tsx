import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Download",
  description: "Riwayat download kamu tersimpan lokal di browser. Data tidak pernah dikirim ke server.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DownloadHistoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

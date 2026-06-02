import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Download",
  robots: { index: false, follow: false },
};

export default function DownloadHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

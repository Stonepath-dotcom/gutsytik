import Link from "next/link";
import { HeartCrack, Home, Search, ChevronRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090B] relative overflow-hidden px-4">
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.03]" />

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Number */}
        <h1
          className="text-8xl sm:text-9xl font-light tracking-tighter text-[#FAFAFA] select-none"
          style={{ lineHeight: 1 }}
        >
          4<span className="text-[#F97316] font-bold">0</span>4
        </h1>

        {/* Broken heart icon */}
        <div className="flex justify-center my-8">
          <HeartCrack className="h-12 w-12 text-[#F97316]" strokeWidth={1.5} />
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFAFA] mb-3">
          Oops! Page Not Found
        </h2>
        <p className="text-[#A1A1AA] text-base sm:text-lg mb-2">
          Halaman yang kamu cari udah hilang di dunia digital
        </p>
        <p className="text-[#A1A1AA]/70 text-sm mb-10">
          The page you&apos;re looking for got lost in the digital world
        </p>

        {/* Back to homepage button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold text-base transition-all hover:opacity-90 btn-press bg-[#F97316]"
        >
          <Home className="h-5 w-5" />
          Kembali ke Homepage
        </Link>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-[#27272A]">
          <p className="text-xs text-[#A1A1AA] mb-4">Atau coba cari yang kamu butuhkan:</p>
          <div className="grid grid-cols-2 gap-3 text-left">
            <Link href="/tiktok-downloader" className="flex items-center gap-2 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" /> TikTok Downloader
            </Link>
            <Link href="/youtube-downloader" className="flex items-center gap-2 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" /> YouTube Downloader
            </Link>
            <Link href="/instagram-downloader" className="flex items-center gap-2 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" /> Instagram Downloader
            </Link>
            <Link href="/youtube-mp3" className="flex items-center gap-2 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" /> YouTube MP3
            </Link>
            <Link href="/blog" className="flex items-center gap-2 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" /> Blog & Panduan
            </Link>
            <Link href="/faq" className="flex items-center gap-2 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" /> FAQ
            </Link>
            <Link href="/contact" className="flex items-center gap-2 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" /> Hubungi Kami
            </Link>
            <Link href="/facebook-downloader" className="flex items-center gap-2 p-3 rounded-lg bg-[#111113] border border-[#27272A] text-sm text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" /> Facebook Downloader
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

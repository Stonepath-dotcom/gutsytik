import Link from "next/link";
import { HeartCrack, Home, Search } from "lucide-react";

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
          4<span className="text-[#2563EB] font-bold">0</span>4
        </h1>

        {/* Broken heart icon */}
        <div className="flex justify-center my-8">
          <HeartCrack className="h-12 w-12 text-[#2563EB]" strokeWidth={1.5} />
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

        {/* Search icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-[#111113] border border-[#27272A] flex items-center justify-center">
            <Search className="h-6 w-6 text-[#A1A1AA]" />
          </div>
        </div>

        {/* Back to homepage button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold text-base transition-all hover:opacity-90 btn-press bg-[#2563EB]"
        >
          <Home className="h-5 w-5" />
          Kembali ke Homepage
        </Link>
      </div>
    </div>
  );
}

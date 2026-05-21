import Link from "next/link";
import { HeartCrack, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 animate-orb-1"
          style={{ background: "radial-gradient(circle, #FF2D55, transparent)" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full opacity-15 animate-orb-2"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-15 animate-orb-3"
          style={{ background: "radial-gradient(circle, #00E5FF, transparent)" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Number */}
        <h1
          className="text-8xl sm:text-9xl font-black gradient-text-animated select-none"
          style={{ lineHeight: 1 }}
        >
          404
        </h1>

        {/* Animated broken heart icon */}
        <div className="flex justify-center my-6">
          <div className="animate-float">
            <HeartCrack className="h-16 w-16 text-gutsy-pink" strokeWidth={1.5} />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Oops! Page Not Found
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-2">
          Halaman yang kamu cari udah hilang di dunia digital
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          The page you&apos;re looking for got lost in the digital world
        </p>

        {/* Search icon with subtle animation */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground animate-pulse" />
          </div>
        </div>

        {/* Back to homepage button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-gutsy-pink/20"
          style={{ background: "linear-gradient(to right, #FF2D55, #7C3AED)" }}
        >
          <Home className="h-5 w-5" />
          Kembali ke Homepage
        </Link>
      </div>
    </div>
  );
}

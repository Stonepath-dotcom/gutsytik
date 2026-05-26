"use client";

import { useState, useEffect } from "react";
import { Shield, Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "mova_cookie_consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Show after a short delay so page loads first
        const timer = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
        accepted: true,
        timestamp: new Date().toISOString(),
        analytics: true,
        advertising: true,
      }));
    } catch {}
    setShow(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
        accepted: false,
        timestamp: new Date().toISOString(),
        analytics: false,
        advertising: false,
      }));
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-3 md:p-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="mx-auto max-w-4xl rounded-xl bg-[#111113] border border-[#27272A] shadow-2xl shadow-black/50 p-4 md:p-5">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center shrink-0">
              <Cookie className="h-4 w-4 text-[#4F46E5]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#FAFAFA]">
                Kami Menggunakan Cookie
              </h3>
              <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman Anda, menganalisis lalu lintas, dan menayangkan iklan yang relevan.
              </p>
            </div>
            <button
              onClick={handleDecline}
              className="w-6 h-6 rounded flex items-center justify-center text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/10 transition-colors shrink-0 md:hidden"
              aria-label="Tutup"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Info line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#A1A1AA]/70">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Privasi dilindungi
            </span>
            <span>Kami tidak menjual data pribadi Anda</span>
            <a href="/privacy" className="text-[#4F46E5] hover:underline">
              Kebijakan Privasi
            </a>
            <a href="/terms" className="text-[#4F46E5] hover:underline">
              Syarat & Ketentuan
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2 text-xs font-medium rounded-lg border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#3F3F46] transition-colors"
            >
              Tolak Semua
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 text-xs font-semibold rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] active:scale-[0.98] transition-all"
            >
              Terima Semua Cookie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "mova_pwa_dismissed";
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000;

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const promptedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      const ua = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|iphone|ipad|ipod|mobile/i.test(ua);
      setIsMobile(isMobileDevice);
    };
    checkMobile();

    const checkDismissed = () => {
      try {
        const dismissed = localStorage.getItem(DISMISS_KEY);
        if (dismissed) {
          const dismissedTime = parseInt(dismissed, 10);
          if (Date.now() - dismissedTime < DISMISS_DURATION) return true;
          localStorage.removeItem(DISMISS_KEY);
        }
      } catch {}
      return false;
    };

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone || checkDismissed()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      if (!promptedRef.current && !isStandalone) {
        promptedRef.current = true;
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") setShowPrompt(false);
    } catch {}
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try { localStorage.setItem(DISMISS_KEY, Date.now().toString()); } catch {}
  };

  if (!isMobile && !deferredPrompt) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:max-w-sm"
        >
          <div className="bg-[#111113] border border-[#27272A] rounded-xl p-4 shadow-lg shadow-black/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E63946] flex items-center justify-center shrink-0">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#FAFAFA]">
                  Install Mova di HP kamu
                </p>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Akses lebih cepat tanpa browser. Gratis!
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#E63946] hover:bg-[#C5303C] text-white text-sm font-semibold transition-all btn-press"
              >
                <Download className="h-4 w-4" />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2.5 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#A1A1AA] hover:bg-[#18181B] transition-colors"
              >
                Nanti saja
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

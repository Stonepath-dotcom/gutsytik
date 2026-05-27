"use client";

import { useState, useEffect } from "react";
import { Shield, Cookie, X, ExternalLink } from "lucide-react";

const COOKIE_CONSENT_KEY = "mova_cookie_consent";
const GA4_MEASUREMENT_ID = "G-6WV2TT4J0R";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const loadAdSense = () => {
    if (document.querySelector('script[src*="adsbygoogle"]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8487073388720076';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  };

  const loadGA4 = () => {
    if (document.querySelector('script[src*="gtag"]') || document.querySelector('script[src*="google-analytics"]')) return;
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    // Initialize gtag
    const initScript = document.createElement('script');
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
      gtag('config', '${GA4_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(initScript);
  };

  const loadAllScripts = () => {
    loadAdSense();
    loadGA4();
  };

  useEffect(() => {
    // Set default consent mode to denied before user choice
    try {
      if (typeof window !== 'undefined' && !window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) { (window as any).dataLayer.push(args); }
        gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'wait_for_update': 500
        });
      }
    } catch {}

    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Show after a short delay so page loads first
        const timer = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(consent);
        if (parsed.accepted && parsed.advertising) {
          loadAllScripts();
        }
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
    // Load AdSense & GA4 after consent
    loadAllScripts();
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
      <div className="mx-auto max-w-4xl rounded-xl bg-card border border-border shadow-2xl shadow-black/20 dark:shadow-black/50 p-4 md:p-5">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="h-4 w-4 text-[#4F46E5]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">
                Kami Menggunakan Cookie
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                Website ini menggunakan cookie untuk meningkatkan pengalaman Anda, menganalisis lalu lintas melalui <strong className="text-foreground">Google Analytics</strong>, dan menayangkan iklan melalui <strong className="text-foreground">Google AdSense</strong>. Cookie periklanan Google memungkinkan penayangan iklan yang dipersonalisasi berdasarkan kunjungan Anda di situs ini dan situs lain.
              </p>
            </div>
            <button
              onClick={handleDecline}
              className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 md:hidden"
              aria-label="Tutup"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Cookie categories summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border/50">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              <div>
                <span className="font-medium text-foreground">Esensial</span>
                <span className="text-muted-foreground ml-1">Selalu aktif</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border/50">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              <div>
                <span className="font-medium text-foreground">Analitik</span>
                <span className="text-muted-foreground ml-1">Google Analytics</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border/50">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <div>
                <span className="font-medium text-foreground">Periklanan</span>
                <span className="text-muted-foreground ml-1">Google AdSense</span>
              </div>
            </div>
          </div>

          {/* Expandable details */}
          {showDetails && (
            <div className="text-[11px] text-muted-foreground space-y-2 bg-muted/30 p-3 rounded-lg border border-border/50">
              <div>
                <strong className="text-foreground">Cookie Esensial:</strong> Diperlukan untuk operasi dasar website (preferensi tema, cookie consent). Tidak dapat dinonaktifkan.
              </div>
              <div>
                <strong className="text-foreground">Cookie Analitik (Google Analytics):</strong> Mengumpulkan data anonim tentang penggunaan website untuk membantu kami meningkatkan layanan. Data dilaporkan secara agregat. Cookie yang digunakan termasuk _ga, _ga_* untuk mengidentifikasi sesi dan pengguna secara anonim.
              </div>
              <div>
                <strong className="text-foreground">Cookie Periklanan (Google AdSense):</strong> Digunakan oleh Google dan mitranya untuk menampilkan iklan yang relevan. Cookie ini dapat melacak kunjungan Anda di berbagai website untuk penargetan iklan. Anda dapat mengelola preferensi iklan di{" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] hover:underline inline-flex items-center gap-0.5">
                  Pengaturan Iklan Google <ExternalLink className="h-2.5 w-2.5" />
                </a>.
              </div>
            </div>
          )}

          {/* Info line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground/70">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Privasi dilindungi
            </span>
            <span>Kami tidak menjual data pribadi Anda</span>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-[#4F46E5] hover:underline"
            >
              {showDetails ? "Sembunyikan detail" : "Lihat detail cookie"}
            </button>
            <a href="/cookie-policy" className="text-[#4F46E5] hover:underline">
              Kebijakan Cookie
            </a>
            <a href="/privacy" className="text-[#4F46E5] hover:underline">
              Kebijakan Privasi
            </a>
            <a href="/terms" className="text-[#4F46E5] hover:underline">
              Syarat &amp; Ketentuan
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2 text-xs font-medium rounded-lg border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition-colors"
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

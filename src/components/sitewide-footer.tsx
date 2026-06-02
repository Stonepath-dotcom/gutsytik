import Link from "next/link";
import { MovaLogo } from "@/components/mova-logo";

const PLATFORMS = [
  { name: "TikTok Downloader", href: "/tiktok-downloader" },
  { name: "TikTok Photo Slide", href: "/tiktok-photo-slide" },
  { name: "Instagram Downloader", href: "/instagram-downloader" },
  { name: "Facebook Downloader", href: "/facebook-downloader" },
  { name: "Twitter/X Downloader", href: "/twitter-downloader" },
  { name: "Pinterest Downloader", href: "/pinterest-downloader" },
  { name: "Reddit Downloader", href: "/reddit-downloader" },
];

const LEGAL = [
  { name: "Kebijakan Privasi", href: "/privacy" },
  { name: "Ketentuan Layanan", href: "/terms" },
  { name: "DMCA", href: "/dmca" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Kebijakan Cookie", href: "/cookie-policy" },
];

const RESOURCES = [
  { name: "Blog & Panduan", href: "/blog" },
  { name: "Cara Kerja", href: "/how-it-works" },
  { name: "Tools Video", href: "/tools" },
  { name: "Perbandingan Format", href: "/tools/format-comparison" },
  { name: "Kalkulator Ukuran", href: "/tools/file-size-calculator" },
  { name: "Komparator Resolusi", href: "/tools/resolution-comparator" },
  { name: "Kalkulator Bitrate", href: "/tools/bitrate-calculator" },
  { name: "Audio Converter", href: "/tools/audio-converter" },
  { name: "Trim Video", href: "/tools/trim-video" },
  { name: "Convert ke GIF", href: "/tools/convert-gif" },
  { name: "Mova vs Kompetitor", href: "/compare" },
  { name: "FAQ", href: "/faq" },
  { name: "Changelog", href: "/changelog" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Kontak", href: "/contact" },
];

export function SitewideFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/20" role="contentinfo">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-3">
              <MovaLogo size={22} showText={true} />
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3">
              Download video tanpa watermark dari TikTok, Instagram, YouTube, dan platform populer lainnya. Gratis, cepat, dan aman.
            </p>
            <a
              href="mailto:admin@getmova.my.id"
              className="text-xs text-muted-foreground hover:text-[#E52222] transition-colors"
            >
              admin@getmova.my.id
            </a>
          </div>

          {/* Platform Downloader Links */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              Downloader
            </h4>
            <ul className="space-y-1.5">
              {PLATFORMS.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-xs md:text-sm text-muted-foreground hover:text-[#E52222] transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              Panduan
            </h4>
            <ul className="space-y-1.5">
              {RESOURCES.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-xs md:text-sm text-muted-foreground hover:text-[#E52222] transition-colors"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              Legal
            </h4>
            <ul className="space-y-1.5">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs md:text-sm text-muted-foreground hover:text-[#E52222] transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} getmova. Dibuat di Indonesia.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-[#E52222] transition-colors">Privasi</Link>
            <Link href="/terms" className="hover:text-[#E52222] transition-colors">Ketentuan</Link>
            <Link href="/dmca" className="hover:text-[#E52222] transition-colors">DMCA</Link>
            <Link href="/blog" className="hover:text-[#E52222] transition-colors">Blog</Link>
            <Link href="/tools" className="hover:text-[#E52222] transition-colors">Tools</Link>
            <Link href="/changelog" className="hover:text-[#E52222] transition-colors">Changelog</Link>
            <Link href="/sitemap.xml" className="hover:text-[#E52222] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

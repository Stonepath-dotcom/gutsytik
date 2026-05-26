import type { Metadata } from "next";
import {
  Home, ChevronRight, Clock, User, Calendar, ArrowRight
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

export const metadata: Metadata = {
  title: "Download Video Instagram Story dan Reels Tanpa Aplikasi | Mova Blog",
  description: "Cara download video Instagram Story dan Reels tanpa aplikasi tambahan. Simpan Story dan Reels IG langsung ke galeri HP dengan mudah menggunakan Mova.",
  keywords: ["download instagram story", "instagram reels downloader", "download story ig", "cara download story instagram", "download reels ig tanpa aplikasi"],
  openGraph: {
    title: "Download Video Instagram Story dan Reels Tanpa Aplikasi | Mova Blog",
    description: "Cara download video Instagram Story dan Reels tanpa aplikasi tambahan. Simpan Story dan Reels IG langsung ke galeri HP dengan mudah menggunakan Mova.",
    url: "https://getmova.my.id/blog/download-video-instagram-story-dan-reels",
    siteName: "Mova",
    type: "article",
    publishedTime: "2026-05-26",
    modifiedTime: "2026-05-26",
    authors: ["Mova"],
  },
};

export default function DownloadVideoInstagramStoryDanReels() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Download Video Instagram Story dan Reels Tanpa Aplikasi",
    description: "Cara download video Instagram Story dan Reels tanpa aplikasi tambahan. Simpan Story dan Reels IG langsung ke galeri HP dengan mudah menggunakan Mova.",
    url: "https://getmova.my.id/blog/download-video-instagram-story-dan-reels",
    datePublished: "2026-05-26",
    dateModified: "2026-05-26",
    author: { "@type": "Organization", name: "Mova" },
    publisher: {
      "@type": "Organization",
      name: "Mova",
      logo: { "@type": "ImageObject", url: "https://getmova.my.id/mova-logo.png" },
    },
    mainEntityOfPage: "https://getmova.my.id/blog/download-video-instagram-story-dan-reels",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://getmova.my.id/blog" },
      { "@type": "ListItem", position: 3, name: "Download IG Story & Reels", item: "https://getmova.my.id/blog/download-video-instagram-story-dan-reels" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
        <header className="border-b border-[#27272A] bg-[#111113]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2"><MovaLogo size={32} showText /></a>
              <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors">
                <Home className="h-4 w-4" />Beranda
              </a>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
                <li><a href="/" className="hover:text-[#4F46E5] transition-colors">Beranda</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><a href="/blog" className="hover:text-[#4F46E5] transition-colors">Blog</a></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-[#4F46E5] font-medium">Download IG Story & Reels</li>
              </ol>
            </nav>

            {/* Article Header */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[#A1A1AA]">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />26 Mei 2026</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />6 menit baca</span>
                <span className="flex items-center gap-1"><User className="h-3 w-3" />Tim Mova</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Download Video Instagram Story dan Reels Tanpa Aplikasi
              </h1>
              <p className="text-[#A1A1AA] text-base leading-relaxed">
                Instagram Story dan Reels sering banget berisi konten menarik yang pengen kita simpan. Tapi Instagram nggak kasih tombol download buat kedua fitur itu. Tenang, di artikel ini kita bakal bahas cara download video Instagram Story dan Reels tanpa install aplikasi apapun — cukup pakai browser dan Mova.
              </p>
            </div>

            {/* Article Content */}
            <article className="max-w-none space-y-8">
              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Perbedaan Instagram Story dan Reels
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Sebelum masuk ke tutorial, penting untuk memahami perbedaan antara Story dan Reels, karena cara mendownloadnya sedikit berbeda:
              </p>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Instagram Story</strong> — Video pendek maksimal 60 detik yang muncul di bagian atas feed. Story otomatis hilang setelah 24 jam, sehingga makin penting untuk segera disimpan kalau ada yang menarik.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Instagram Reels</strong> — Video pendek (15–90 detik) yang mirip TikTok, tersedia di tab Reels dan bisa diakses kapan saja. Reels punya URL permanen yang bisa di-copy.</span>
                </li>
              </ul>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Cara Download Instagram Reels dengan Mova
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Download Reels jauh lebih mudah karena setiap Reels punya URL yang bisa di-copy. Berikut langkah-langkahnya menggunakan <a href="/" className="text-[#4F46E5] hover:underline">Mova</a>:
              </p>
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Buka Instagram dan cari Reels</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Buka tab Reels di Instagram, cari video yang ingin kamu download. Tap ikon tiga titik di pojok kanan bawah, lalu pilih &quot;Link&quot; atau &quot;Salin tautan&quot;.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Buka Mova di browser</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Kunjungi <a href="/" className="text-[#4F46E5] hover:underline">getmova.my.id</a> dari browser HP atau laptop kamu.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Paste link Reels dan download</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Tempel link Reels ke kolom input Mova, klik Download, pilih kualitas yang kamu mau, dan video langsung tersimpan di galeri!</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Cara Download Instagram Story dengan Mova
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Download Story sedikit lebih tricky karena Story nggak punya URL yang bisa langsung di-copy dari aplikasi Instagram. Tapi jangan khawatir, ada cara mudahnya:
              </p>
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Copy username Instagram</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Buka profil Instagram orang yang Story-nya ingin kamu download. Copy username mereka (tanpa tanda @).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Masukkan username ke Mova</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Buka <a href="/" className="text-[#4F46E5] hover:underline">Mova</a>, masukkan username Instagram ke kolom input, lalu klik Download. Mova akan mendeteksi Story yang sedang aktif dari akun tersebut.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#111113] border border-[#27272A]">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4F46E5] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium">Pilih Story dan download</p>
                    <p className="text-sm text-[#A1A1AA] mt-1">Mova akan menampilkan daftar Story yang sedang aktif. Pilih Story yang ingin kamu simpan, lalu klik download. Selesai!</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#4F46E5]/10 border border-[#4F46E5]/20 mt-4">
                <p className="text-sm text-[#A1A1AA]">
                  💡 <strong className="text-[#FAFAFA]">Tips Penting:</strong> Story Instagram hanya bertahan 24 jam. Kalau kamu mau download Story seseorang, lakukan sebelum Story-nya hilang. Setelah 24 jam, Story nggak bisa diakses lagi kecuali disimpan sebagai Highlight.
                </p>
              </div>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Kenapa Nggak Perlu Aplikasi Tambahan?
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Banyak orang yang masih mengira harus install aplikasi khusus untuk download Story dan Reels Instagram. Padahal, menggunakan tool online seperti Mova jauh lebih praktis:
              </p>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Nggak makan ruang penyimpanan</strong> — Aplikasi downloader bisa berukuran 20–50 MB. Tool online nggak perlu di-install sama sekali.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Lebih aman</strong> — Aplikasi pihak ketiga sering meminta permission yang nggak perlu dan bisa mengandung malware. Tool online di browser jauh lebih aman.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Selalu up-to-date</strong> — Tool online otomatis mengikuti perubahan API Instagram. Aplikasi harus di-update manual dan sering nggak kompatibel setelah update Instagram.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Bisa dipakai di semua perangkat</strong> — Mova bisa diakses dari Android, iPhone, iPad, laptop, dan PC. Nggak terbatas pada satu OS.</span>
                </li>
              </ul>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Hal yang Perlu Diperhatikan Saat Download Story & Reels
              </h2>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Akun harus publik</strong> — Mova hanya bisa mengakses Story dan Reels dari akun Instagram yang bersifat publik. Akun private tidak bisa di-download.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Story bertahan 24 jam</strong> — Buruan download sebelum Story-nya hilang. Setelah 24 jam, konten sudah nggak bisa diakses.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Hormati privasi</strong> — Nggak semua orang senang kalau konten Story-nya di-download tanpa izin. Gunakan secara bertanggung jawab.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                  <span className="text-[#4F46E5] mt-1">&#8226;</span>
                  <span><strong className="text-[#FAFAFA]">Jangan repost tanpa izin</strong> — Download untuk penggunaan pribadi saja. Repost konten orang lain tanpa kredit bisa melanggar hak cipta.</span>
                </li>
              </ul>

              <h2 className="text-xl font-bold text-[#FAFAFA] mt-8 mb-3" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Kenapa Mova Pilihan Terbaik untuk Download Instagram?
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Dari semua tool yang ada, <a href="/" className="text-[#4F46E5] hover:underline">Mova</a> adalah pilihan paling lengkap untuk download konten Instagram. Bukan cuma Story dan Reels, Mova juga bisa download foto, video feed, dan IGTV. Selain itu, Mova juga mendukung <a href="/tiktok-downloader" className="text-[#4F46E5] hover:underline">download TikTok</a>, <a href="/youtube-downloader" className="text-[#4F46E5] hover:underline">YouTube</a>, dan platform lainnya. Semua dalam satu situs, tanpa perlu install apapun, dan 100% gratis.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Untuk informasi lebih lanjut, kamu juga bisa membaca panduan <a href="/blog/download-video-tanpa-watermark-terbaik" className="text-[#4F46E5] hover:underline">situs download video terbaik</a> dan <a href="/blog/cara-download-video-pinterest" className="text-[#4F46E5] hover:underline">cara download video Pinterest</a> di blog kami. Jangan lupa juga untuk membaca <a href="/privacy" className="text-[#4F46E5] hover:underline">kebijakan privasi</a> kami.
              </p>
            </article>

            {/* CTA */}
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-[#4F46E5]/20 to-[#7C3AED]/10 border border-[#4F46E5]/30 text-center">
              <h3 className="text-lg font-bold text-[#FAFAFA] mb-2">Coba Mova Sekarang — Gratis!</h3>
              <p className="text-sm text-[#A1A1AA] mb-4">Download video tanpa watermark dari berbagai platform populer dengan cepat dan mudah.</p>
              <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors">
                Mulai Download <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Related articles */}
            <div className="mt-12 p-6 rounded-xl bg-[#111113] border border-[#27272A]">
              <h3 className="text-sm font-bold text-[#FAFAFA] mb-4" style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}>
                Artikel Terkait
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="/blog/download-video-tanpa-watermark-terbaik" className="p-3 rounded-lg border border-[#27272A] hover:border-[#4F46E5]/50 transition-colors">
                  <p className="text-sm font-medium text-[#FAFAFA] hover:text-[#4F46E5]">10 Situs Download Video Tanpa Watermark Terbaik 2026</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">Perbandingan situs downloader terbaik.</p>
                </a>
                <a href="/blog/perbandingan-tiktok-downloader" className="p-3 rounded-lg border border-[#27272A] hover:border-[#4F46E5]/50 transition-colors">
                  <p className="text-sm font-medium text-[#FAFAFA] hover:text-[#4F46E5]">Perbandingan TikTok Downloader Terbaik 2026</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">Mana TikTok downloader yang paling bagus?</p>
                </a>
                <a href="/blog/cara-download-video-pinterest" className="p-3 rounded-lg border border-[#27272A] hover:border-[#4F46E5]/50 transition-colors">
                  <p className="text-sm font-medium text-[#FAFAFA] hover:text-[#4F46E5]">Cara Download Video Pinterest ke Galeri HP</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">Panduan download video Pinterest dengan mudah.</p>
                </a>
                <a href="/blog/cara-download-video-dari-telegram" className="p-3 rounded-lg border border-[#27272A] hover:border-[#4F46E5]/50 transition-colors">
                  <p className="text-sm font-medium text-[#FAFAFA] hover:text-[#4F46E5]">Cara Download Video dari Telegram dengan Cepat</p>
                  <p className="text-xs text-[#A1A1AA] mt-1">Panduan download video Telegram ke galeri HP.</p>
                </a>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#27272A] text-center">
              <p className="text-xs text-[#A1A1AA]">&copy; 2026 Mova. Dibuat dengan ❤️ di Indonesia.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

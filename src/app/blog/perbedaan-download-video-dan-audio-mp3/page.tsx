import { Home, ArrowLeft, Clock, Calendar, User, ArrowRight, Film, Music } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perbedaan Download Video MP4 dan Audio MP3 - Mana yang Lebih Baik? - Mova",
  description: "Perbandingan lengkap antara download video MP4 dan audio MP3. Temukan mana yang lebih cocok untuk kebutuhanmu.",
  keywords: [
    "download video vs audio mp3",
    "mp4 vs mp3",
    "perbedaan video dan audio",
    "download video mp4",
    "download audio mp3",
    "video atau audio",
  ],
  alternates: { canonical: "https://getmova.my.id/blog/perbedaan-download-video-dan-audio-mp3" },
  openGraph: {
    title: "Perbedaan Download Video MP4 dan Audio MP3 - Mana yang Lebih Baik?",
    description: "Perbandingan lengkap antara download video MP4 dan audio MP3. Temukan mana yang lebih cocok untuk kebutuhanmu.",
    url: "https://getmova.my.id/blog/perbedaan-download-video-dan-audio-mp3",
    siteName: "Mova",
    type: "article",
  },
};

export default function PerbedaanVideoAudioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Perbedaan Download Video MP4 dan Audio MP3 - Mana yang Lebih Baik?",
            description: "Perbandingan lengkap antara download video MP4 dan audio MP3 untuk membantu kamu memilih format yang tepat.",
            author: { "@type": "Organization", name: "Mova" },
            publisher: { "@type": "Organization", name: "Mova", logo: { "@type": "ImageObject", url: "https://getmova.my.id/mova-logo.png" } },
            datePublished: "2026-05-03",
            dateModified: "2026-05-03",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://getmova.my.id/blog/perbedaan-download-video-dan-audio-mp3" },
          }),
        }}
      />

      <header className="border-b border-[#27272A] bg-[#111113]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2"><MovaLogo size={32} showText /></a>
            <a href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors">
              <ArrowLeft className="h-4 w-4" />Kembali ke Blog
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-[#A1A1AA] mb-6">
            <a href="/" className="hover:text-[#2563EB] transition-colors">Home</a>
            <span>/</span>
            <a href="/blog" className="hover:text-[#2563EB] transition-colors">Blog</a>
            <span>/</span>
            <span className="text-[#FAFAFA]">Video MP4 vs Audio MP3</span>
          </nav>

          <div className="mb-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#27272A] text-white mb-4">Perbandingan</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] mb-4 leading-tight">Perbedaan Download Video MP4 dan Audio MP3 — Mana yang Lebih Baik?</h1>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">Panduan lengkap untuk memahami perbedaan antara format video MP4 dan audio MP3, serta kapan sebaiknya menggunakan masing-masing.</p>
            <div className="flex items-center gap-4 text-xs text-[#A1A1AA]/60">
              <span className="flex items-center gap-1"><User className="h-3 w-3" />Mova</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />3 Mei 2026</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />8 menit baca</span>
            </div>
          </div>

          <div className="prose-sm space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Apa Itu MP4 dan MP3?</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">Sebelum membahas mana yang lebih baik, penting untuk memahami dasar-dasar kedua format ini. MP4 (MPEG-4 Part 14) adalah format kontainer multimedia yang bisa menyimpan video, audio, subtitle, dan gambar dalam satu file. MP3 (MPEG-1 Audio Layer III) adalah format khusus untuk audio yang hanya menyimpan suara tanpa komponen visual.</p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3">Perbedaan paling mendasar adalah: MP4 mengandung video + audio, sedangkan MP3 hanya mengandung audio. Keduanya sangat populer dan didukung oleh hampir semua perangkat modern, tetapi penggunaannya sangat berbeda tergantung kebutuhanmu.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Perbandingan Detail: MP4 vs MP3</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#27272A]">
                      <th className="text-left py-3 px-3 text-[#FAFAFA] font-semibold">Aspek</th>
                      <th className="text-left py-3 px-3 text-[#2563EB] font-semibold">MP4 (Video)</th>
                      <th className="text-left py-3 px-3 text-[#A1A1AA] font-semibold">MP3 (Audio)</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#A1A1AA]">
                    <tr className="border-b border-[#27272A]/50"><td className="py-2.5 px-3">Konten</td><td className="py-2.5 px-3">Video + Audio</td><td className="py-2.5 px-3">Audio saja</td></tr>
                    <tr className="border-b border-[#27272A]/50"><td className="py-2.5 px-3">Ukuran File</td><td className="py-2.5 px-3">Besar (20-300 MB)</td><td className="py-2.5 px-3">Kecil (3-15 MB)</td></tr>
                    <tr className="border-b border-[#27272A]/50"><td className="py-2.5 px-3">Kualitas Visual</td><td className="py-2.5 px-3">Ada (360p-1080p)</td><td className="py-2.5 px-3">Tidak ada</td></tr>
                    <tr className="border-b border-[#27272A]/50"><td className="py-2.5 px-3">Kualitas Audio</td><td className="py-2.5 px-3">Bervariasi</td><td className="py-2.5 px-3">128-320kbps</td></tr>
                    <tr className="border-b border-[#27272A]/50"><td className="py-2.5 px-3">Pemakaian Data</td><td className="py-2.5 px-3">Tinggi</td><td className="py-2.5 px-3">Rendah</td></tr>
                    <tr><td className="py-2.5 px-3">Cocok Untuk</td><td className="py-2.5 px-3">Nonton video</td><td className="py-2.5 px-3">Dengarkan musik</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Kapan Sebaiknya Download Video MP4?</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">Pilih format video MP4 ketika:</p>
              <ul className="space-y-2">
                {[
                  { title: "Konten visual penting", desc: "Jika video mengandung elemen visual yang perlu dilihat, seperti tutorial, vlog, atau video tutorial memasak, maka MP4 adalah pilihan yang tepat." },
                  { title: "Ingin menonton offline", desc: "MP4 bisa diputar di hampir semua pemutar video dan perangkat. Cocok untuk menonton di perjalanan tanpa koneksi internet." },
                  { title: "Ingin membagikan ke orang lain", desc: "Video MP4 lebih mudah dibagikan dan dipahami oleh penerima karena mengandung visual dan audio." },
                  { title: "Konten edukasi dan presentasi", desc: "Untuk konten pembelajaran yang memerlukan visualisasi, MP4 adalah format yang harus kamu pilih." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                    <Film className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                    <span><strong className="text-[#FAFAFA]">{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Kapan Sebaiknya Download Audio MP3?</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">Pilih format audio MP3 ketika:</p>
              <ul className="space-y-2">
                {[
                  { title: "Hanya butuh suara", desc: "Jika kamu hanya ingin mendengarkan musik, podcast, atau ceramah, MP3 sudah cukup. Tidak perlu menyimpan bagian visual yang tidak kamu butuhkan." },
                  { title: "Hemat penyimpanan", desc: "File MP3 jauh lebih kecil dari MP4. Untuk konten audio-only, kamu bisa menghemat hingga 90% ruang penyimpanan." },
                  { title: "Dengarkan sambil beraktivitas", desc: "MP3 cocok untuk didengarkan saat berolahraga, berkendara, atau bekerja — saat kamu tidak bisa melihat layar." },
                  { title: "Koleksi musik", desc: "Untuk membangun koleksi musik dari YouTube atau platform lain, MP3 adalah format standar yang didukung semua music player." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                    <Music className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                    <span><strong className="text-[#FAFAFA]">{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Bagaimana Mova Bisa Membantu?</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">Mova mendukung kedua format ini. Di halaman utama Mova, kamu bisa memilih mode Video (untuk MP4) atau mode Audio (untuk MP3). Cukup tempel link video dari YouTube, TikTok, atau platform lainnya, lalu pilih format yang kamu inginkan. Mova akan memproses video dan menyediakan pilihan kualitas untuk kedua format.</p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3">Untuk YouTube khususnya, Mova bisa mengekstrak audio dalam kualitas hingga 320kbps — kualitas audio terbaik yang tersedia di YouTube. Ini sangat cocok untuk kamu yang ingin membangun koleksi musik berkualitas tinggi.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#FAFAFA] mb-3">Kesimpulan</h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">Tidak ada jawaban mutlak mana yang lebih baik — semuanya tergantung kebutuhanmu. Jika kamu perlu melihat konten visual, pilih MP4. Jika kamu hanya butuh suara dan ingin hemat penyimpanan, pilih MP3. Yang terbaik, Mova mendukung keduanya sehingga kamu bisa memilih sesuai situasi.</p>
              <div className="mt-8 p-6 rounded-xl bg-[#111113] border border-[#2563EB]/30 text-center">
                <h3 className="text-base font-bold text-[#FAFAFA] mb-2">Download Video MP4 atau Audio MP3 dengan Mova!</h3>
                <p className="text-xs text-[#A1A1AA] mb-4">Gratis, cepat, dan mendukung kedua format.</p>
                <a href="/youtube-downloader" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors">Coba Mova Sekarang <ArrowRight className="h-4 w-4" /></a>
              </div>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-[#27272A]">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">Artikel Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="/blog/download-youtube-mp3" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Download YouTube ke MP3</span><ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
              </a>
              <a href="/blog/download-video-tanpa-aplikasi" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Download Video Tanpa Aplikasi</span><ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/blog" className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:underline"><ArrowLeft className="h-4 w-4" />Kembali ke Blog</a>
          </div>
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center"><p className="text-xs text-[#A1A1AA]">&copy; 2026 Mova. All rights reserved.</p></div>
        </article>
      </main>
    </div>
  );
}

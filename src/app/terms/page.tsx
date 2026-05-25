import { Home, FileText, AlertTriangle, Shield, Globe, Scale, RefreshCw, Gavel, Mail, ArrowRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - Mova",
  description:
    "Syarat dan ketentuan penggunaan layanan Mova. Baca ketentuan yang berlaku saat menggunakan layanan download video tanpa watermark dari Mova.",
  openGraph: {
    title: "Syarat & Ketentuan - Mova",
    description:
      "Syarat dan ketentuan penggunaan layanan Mova.",
    url: "https://getmova.my.id/terms",
    siteName: "Mova",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Syarat & Ketentuan - Mova",
            description: "Syarat dan ketentuan penggunaan layanan Mova.",
            url: "https://getmova.my.id/terms",
            publisher: {
              "@type": "Organization",
              name: "Mova",
              logo: {
                "@type": "ImageObject",
                url: "https://getmova.my.id/mova-logo.png",
              },
            },
          }),
        }}
      />

      {/* Header */}
      <header className="border-b border-[#27272A] bg-[#111113]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <MovaLogo size={32} showText />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[#27272A] bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
            >
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Title section */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-[#27272A] text-[#A1A1AA] mb-6">
              <FileText className="h-3 w-3 text-[#F97316]" />
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Syarat &{" "}
              <span className="font-bold text-[#F97316]">Ketentuan</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Dengan menggunakan Mova, Anda menyetujui syarat dan ketentuan berikut. Harap baca dengan seksama.
            </p>
            <p className="text-xs text-[#A1A1AA]/60 mt-3">
              Terakhir diperbarui: Mei 2026
            </p>
          </div>

          {/* Important notice */}
          <div className="mb-12 p-6 rounded-xl bg-[#111113] border-l-4 border-[#F97316]">
            <p className="text-sm text-[#FAFAFA] font-medium">
              Dengan mengakses dan menggunakan layanan Mova, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh syarat dan ketentuan ini.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Ketentuan Umum */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                  <Scale className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2 className="text-lg font-bold text-[#FAFAFA]">1. Ketentuan Umum</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Dengan menggunakan layanan Mova (&quot;Layanan&quot;), Anda (&quot;Pengguna&quot;) menyetujui untuk mematuhi dan terikat oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui syarat dan ketentuan ini, harap tidak menggunakan Layanan.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Mova berhak untuk mengubah syarat dan ketentuan ini kapan saja tanpa pemberitahuan terlebih dahulu. Penggunaan Layanan secara berkelanjutan setelah perubahan tersebut merupakan penerimaan Anda terhadap syarat dan ketentuan yang baru.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Layanan ini ditujukan untuk pengguna yang berusia minimal 13 tahun. Jika Anda berusia di bawah 13 tahun, Anda tidak diperkenankan menggunakan Layanan ini.
                </p>
              </div>
            </section>

            {/* Penggunaan Layanan */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                  <Globe className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2 className="text-lg font-bold text-[#FAFAFA]">2. Penggunaan Layanan</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Mova menyediakan layanan untuk mengunduh video dari berbagai platform sosial media tanpa watermark. Pengguna diperbolehkan menggunakan Layanan untuk keperluan pribadi yang sah.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed font-medium">Anda TIDAK diperbolehkan:</p>
                <ul className="space-y-2">
                  {[
                    "Menggunakan Layanan untuk tujuan ilegal atau yang melanggar hukum",
                    "Mengunduh konten yang dilindungi hak cipta tanpa izin dari pemilik hak cipta",
                    "Menggunakan Layanan untuk mendistribusikan ulang konten tanpa izin",
                    "Mencoba mengganggu, merusak, atau mengakses secara tidak sah sistem atau jaringan Mova",
                    "Menggunakan robot, spider, atau alat otomatis lainnya untuk mengakses Layanan",
                    "Menggunakan Layanan dengan cara yang dapat merusak, menonaktifkan, membebani, atau mengganggu server Mova",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                      <span className="text-red-400 mt-1 shrink-0">&#10007;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Konten & Hak Cipta */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                  <Shield className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2 className="text-lg font-bold text-[#FAFAFA]">3. Konten & Hak Cipta</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Mova tidak menyimpan, meng-host, atau mendistribusikan konten berhak cipta manapun. Layanan kami hanya berfungsi sebagai alat untuk mengunduh konten yang sudah tersedia secara publik di platform sumber.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Pengguna bertanggung jawab penuh atas konten yang diunduh melalui Layanan. Pastikan Anda memiliki hak atau izin yang diperlukan untuk mengunduh dan menggunakan konten tersebut. Penggunaan konten yang diunduh harus mematuhi hukum hak cipta yang berlaku dan ketentuan layanan dari platform sumber.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Mova berkomitmen untuk menghormati hak kekayaan intelektual. Jika Anda adalah pemilik hak cipta dan percaya bahwa konten Anda diakses melalui Layanan kami secara melanggar hukum, silakan hubungi kami di support@getmova.my.id dengan menyertakan URL konten yang bersangkutan dan bukti kepemilikan hak cipta. Kami akan meninjau dan menindaklanjuti laporan sesuai dengan prosedur DMCA yang berlaku.
                </p>
              </div>
            </section>

            {/* Batasan Tanggung Jawab */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                  <AlertTriangle className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2 className="text-lg font-bold text-[#FAFAFA]">4. Batasan Tanggung Jawab</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Layanan disediakan &quot;sebagaimana adanya&quot; tanpa jaminan apapun, baik tersurat maupun tersirat, termasuk namun tidak terbatas pada jaminan kelayakan untuk diperdagangkan, kesesuaian untuk tujuan tertentu, dan tidak adanya pelanggaran.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Mova tidak menjamin bahwa Layanan akan selalu tersedia, bebas dari kesalahan, atau aman. Kami tidak bertanggung jawab atas kerugian apapun yang timbul dari penggunaan atau ketidakmampuan menggunakan Layanan, termasuk namun tidak terbatas pada kerugian data, kerugian keuntungan, atau kerugian bisnis.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Mova tidak bertanggung jawab atas tindakan pengguna terhadap konten yang diunduh melalui Layanan. Pengguna bertanggung jawab penuh atas penggunaan konten yang diunduh.
                </p>
              </div>
            </section>

            {/* Perubahan Layanan */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                  <RefreshCw className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2 className="text-lg font-bold text-[#FAFAFA]">5. Perubahan Layanan</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Mova berhak untuk memodifikasi, menangguhkan, atau menghentikan Layanan (atau bagian daripadanya) kapan saja dengan atau tanpa pemberitahuan. Kami tidak bertanggung jawab kepada Anda atau pihak manapun atas modifikasi, penangguhan, atau penghentian Layanan.
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Kami juga berhak untuk menambahkan fitur baru, mengubah fitur yang ada, atau menghapus fitur dari Layanan kapan saja. Perubahan pada Layanan mungkin diperlukan karena perubahan regulasi, teknologi, atau kebijakan platform pihak ketiga.
                </p>
              </div>
            </section>

            {/* Hukum yang Berlaku */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                  <Gavel className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2 className="text-lg font-bold text-[#FAFAFA]">6. Hukum yang Berlaku</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap perselisihan yang timbul dari atau sehubungan dengan syarat dan ketentuan ini akan diselesaikan secara damai terlebih dahulu, dan apabila tidak tercapai kesepakatan, akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
                </p>
              </div>
            </section>

            {/* Kontak */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                  <Mail className="h-5 w-5 text-[#F97316]" />
                </div>
                <h2 className="text-lg font-bold text-[#FAFAFA]">7. Kontak</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami:
                </p>
                <ul className="space-y-2">
                  <li className="text-sm text-[#A1A1AA]">
                    <span className="text-[#FAFAFA] font-medium">Email:</span>{" "}
                    <a href="mailto:support@getmova.my.id" className="text-[#F97316] hover:underline">
                      support@getmova.my.id
                    </a>
                  </li>
                  <li className="text-sm text-[#A1A1AA]">
                    <span className="text-[#FAFAFA] font-medium">TikTok:</span>{" "}
                    <a href="https://tiktok.com/@abbbuw" target="_blank" rel="noopener noreferrer" className="text-[#F97316] hover:underline">
                      @abbbuw
                    </a>
                  </li>
                  <li className="text-sm text-[#A1A1AA]">
                    <span className="text-[#FAFAFA] font-medium">Telegram:</span>{" "}
                    <a href="https://t.me/sixte3nnn" target="_blank" rel="noopener noreferrer" className="text-[#F97316] hover:underline">
                      @sixte3nnn
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Internal Links */}
          <div className="mt-16 pt-8 border-t border-[#27272A]">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">Halaman Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="/privacy" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Kebijakan Privasi</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
              <a href="/about" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Tentang Kami</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
              <a href="/contact" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Hubungi Kami</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved. Syarat dan ketentuan ini dapat diperbarui dari waktu ke waktu.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

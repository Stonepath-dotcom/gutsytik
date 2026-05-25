import { Home, Users, Target, Cpu, Mail, ArrowRight, Scale, ShieldCheck } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - Mova",
  description:
    "Kenali lebih dekat Mova, layanan download video tanpa watermark gratis. Didirikan pada tahun 2025 dengan misi membuat download video mudah dan cepat untuk semua orang.",
  openGraph: {
    title: "Tentang Kami - Mova",
    description:
      "Kenali lebih dekat Mova, layanan download video tanpa watermark gratis.",
    url: "https://getmova.my.id/about",
    siteName: "Mova",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Mova",
            url: "https://getmova.my.id",
            logo: "https://getmova.my.id/mova-logo.png",
            description:
              "Layanan download video tanpa watermark gratis dari berbagai platform populer.",
            foundingDate: "2025",
            contactPoint: {
              "@type": "ContactPoint",
              email: "support@getmova.my.id",
              contactType: "customer support",
            },
            sameAs: [
              "https://tiktok.com/@abbbuw",
              "https://t.me/sixte3nnn",
            ],
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
              <Users className="h-3 w-3 text-[#F97316]" />
              Tentang Kami
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Kenali{" "}
              <span className="font-bold text-[#F97316]">Mova</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Layanan download video tanpa watermark yang gratis dan mudah digunakan oleh siapa saja.
            </p>
          </div>

          {/* About Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Users className="h-5 w-5 text-[#F97316]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Tentang Mova</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mova adalah layanan download video tanpa watermark yang didirikan pada tahun 2025. Kami percaya bahwa setiap orang berhak mengunduh video dari platform sosial media favorit mereka dengan mudah, cepat, dan tanpa batasan.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Sejak awal, Mova dirancang dengan prinsip kesederhanaan — cukup tempel link video, dan kami akan menangani sisanya. Tidak perlu registrasi, tidak perlu instalasi, dan yang terpenting — tidak ada watermark yang mengganggu pada video yang kamu unduh.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Target className="h-5 w-5 text-[#F97316]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Misi Kami</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Misi kami sederhana: membuat download video dapat diakses oleh semua orang, tanpa biaya, tanpa watermark, dan dengan kecepatan yang optimal. Kami ingin menghilangkan hambatan yang sering dihadapi pengguna saat ingin menyimpan video dari internet.
              </p>
              <ul className="space-y-2 mt-3">
                {[
                  "Menyediakan layanan download video yang 100% gratis",
                  "Menghapus watermark dari video yang diunduh",
                  "Mendukung berbagai platform populer (TikTok, YouTube, Instagram, dll.)",
                  "Memastikan proses download cepat dan mudah",
                  "Melindungi privasi pengguna — tidak ada data yang disimpan",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                    <span className="text-[#F97316] mt-1 shrink-0">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Technology Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Cpu className="h-5 w-5 text-[#F97316]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Teknologi</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mova dibangun menggunakan teknologi modern untuk memastikan performa dan keamanan terbaik. Kami menggunakan Next.js sebagai framework utama, yang memungkinkan kami memberikan pengalaman pengguna yang cepat dan responsif.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Privasi pengguna adalah prioritas utama kami. Mova tidak menyimpan data pribadi pengguna, tidak menggunakan cookie pelacakan, dan semua proses download dilakukan langsung dari platform sumber. Data preferensi yang disimpan di browser kamu (seperti riwayat download dan bookmark) hanya tersedia secara lokal dan tidak pernah dikirim ke server kami.
              </p>
            </div>
          </section>

          {/* Fair Use Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Scale className="h-5 w-5 text-[#F97316]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Komitmen terhadap Penggunaan Wajar</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mova berkomitmen untuk mendukung prinsip penggunaan wajar (fair use) dan menghormati hak kekayaan intelektual setiap kreator konten. Layanan kami dirancang untuk membantu pengguna mengakses konten yang sudah tersedia secara publik untuk keperluan yang sah.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Kami mendorong semua pengguna untuk menggunakan konten yang diunduh secara bertanggung jawab: memberikan atribusi kepada kreator asli, tidak mendistribusikan ulang konten tanpa izin, dan mematuhi ketentuan layanan dari platform sumber. Mova tidak menyimpan, meng-host, atau mendistribusikan konten berhak cipta apapun.
              </p>
            </div>
          </section>

          {/* Transparency Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <ShieldCheck className="h-5 w-5 text-[#F97316]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Transparansi & Keamanan</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Transparansi adalah salah satu nilai utama kami. Mova tidak menyimpan data pribadi pengguna, tidak menggunakan cookie pelacakan, dan tidak menjual informasi ke pihak ketiga. Semua proses unduhan dilakukan langsung dari platform sumber tanpa melalui server kami.
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Jika Anda memiliki kekhawatiran tentang hak cipta atau ingin melaporkan pelanggaran, kami memiliki prosedur DMCA yang jelas. Silakan hubungi kami melalui email dan kami akan merespons dengan segera.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Users className="h-5 w-5 text-[#F97316]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Tim Kami</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Mova dikembangkan oleh tim kecil dari Indonesia yang passionate tentang membuat alat-alat digital yang gratis dan bermanfaat untuk semua orang. Kami percaya bahwa teknologi harus dapat diakses oleh siapa saja, tanpa harus membayar atau menyerahkan data pribadi.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                <Mail className="h-5 w-5 text-[#F97316]" />
              </div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Kontak</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Jika kamu memiliki pertanyaan, saran, atau ingin melaporkan masalah, jangan ragu untuk menghubungi kami:
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

          {/* Internal Links */}
          <div className="mt-16 pt-8 border-t border-[#27272A]">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">Halaman Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="/privacy" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Kebijakan Privasi</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
              <a href="/terms" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Syarat & Ketentuan</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
              <a href="/disclaimer" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#F97316]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Disclaimer</span>
                <ArrowRight className="h-4 w-4 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors" />
              </a>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

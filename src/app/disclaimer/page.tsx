import { Home, Shield, Scale, AlertTriangle, FileText, Mail, ArrowRight, Gavel, BookOpen, Users } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - Mova",
  description:
    "Disclaimer dan ketentuan penggunaan layanan Mova. Informasi tentang fair use, hak cipta, DMCA, dan tanggung jawab pengguna.",
  alternates: { canonical: "https://getmova.my.id/disclaimer" },
  openGraph: {
    title: "Disclaimer - Mova",
    description:
      "Disclaimer dan ketentuan penggunaan layanan Mova. Fair use, hak cipta, dan DMCA.",
    url: "https://getmova.my.id/disclaimer",
    siteName: "Mova",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090B] text-foreground dark:text-[#FAFAFA]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Disclaimer - Mova",
            description: "Disclaimer dan ketentuan penggunaan layanan Mova",
            url: "https://getmova.my.id/disclaimer",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
              { "@type": "ListItem", position: 2, name: "Disclaimer", item: "https://getmova.my.id/disclaimer" },
            ],
          }),
        }}
      />

      {/* Header */}
      <header className="border-b border-border dark:border-[#27272A] bg-card dark:bg-[#111113]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <MovaLogo size={32} showText />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border dark:border-[#27272A] bg-card dark:bg-[#111113] text-foreground dark:text-[#FAFAFA] hover:bg-muted/50 dark:hover:bg-[#18181B] transition-colors"
            >
              <Home className="h-4 w-4" />
              Beranda
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Title */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border dark:border-[#27272A] text-muted-foreground dark:text-[#A1A1AA] mb-6">
              <Shield className="h-3 w-3 text-[#10B981]" />
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-foreground dark:text-[#FAFAFA] mb-4 mt-4">
              <span className="font-bold text-[#10B981]">Disclaimer</span>
            </h1>
            <p className="text-muted-foreground dark:text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Informasi penting tentang penggunaan layanan Mova, hak cipta, dan tanggung jawab pengguna.
            </p>
            <p className="text-xs text-muted-foreground/60 dark:text-[#A1A1AA]/60 mt-3">
              Terakhir diperbarui: 27 Mei 2026
            </p>
          </div>

          {/* Important notice */}
          <div className="mb-12 p-6 rounded-xl bg-card dark:bg-[#111113] border-l-4 border-[#10B981]">
            <p className="text-sm text-foreground dark:text-[#FAFAFA] font-medium">
              Mova adalah alat bantu yang memfasilitasi pengunduhan konten yang tersedia secara publik. Mova tidak menyimpan, mendistribusikan, atau menjadi tuan rumah atas konten berhak cipta apapun. Pengguna bertanggung jawab penuh atas penggunaan konten yang diunduh.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Tujuan Layanan */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
                  <BookOpen className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2 className="text-lg font-bold text-foreground dark:text-[#FAFAFA]">Tujuan Layanan</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Mova dirancang sebagai alat bantu untuk mengunduh konten video yang sudah tersedia secara publik di platform media sosial. Tujuan utama Mova adalah membantu pengguna menyimpan konten untuk keperluan pribadi seperti pengarsipan, tontonan offline, dan referensi edukatif.
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Mova tidak mendorong, mendukung, atau memfasilitasi pelanggaran hak cipta. Pengguna disarankan untuk selalu menghormati hak kekayaan intelektual kreator konten dan mematuhi ketentuan layanan dari platform sumber.
                </p>
              </div>
            </section>

            {/* Fair Use / Penggunaan Wajar */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
                  <Scale className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2 className="text-lg font-bold text-foreground dark:text-[#FAFAFA]">Penggunaan Wajar (Fair Use)</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Konsep penggunaan wajar (fair use) memungkinkan penggunaan konten berhak cipta secara terbatas tanpa izin dari pemilik hak cipta, untuk tujuan tertentu seperti kritik, komentar, pelaporan berita, pengajaran, ilmu pengetahuan, atau penelitian.
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Mova mendukung prinsip penggunaan wajar dan mendorong pengguna untuk menggunakan konten yang diunduh secara bertanggung jawab. Berikut contoh penggunaan yang sesuai dengan prinsip fair use:
                </p>
                <ul className="space-y-2 mt-3">
                  {[
                    "Menyimpan video untuk tontonan offline pribadi",
                    "Menggunakan sebagian kecil konten untuk keperluan pendidikan dan pengajaran",
                    "Mengutip konten untuk keperluan kritik, review, atau komentar",
                    "Menggunakan konten untuk keperluan berita dan pelaporan",
                    "Menyimpan konten sebagai referensi penelitian atau ilmu pengetahuan",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-[#A1A1AA]">
                      <span className="text-[#10B981] mt-1 shrink-0">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Hak Cipta */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
                  <Gavel className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2 className="text-lg font-bold text-foreground dark:text-[#FAFAFA]">Hak Cipta</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Semua konten yang dapat diakses melalui Mova tetap merupakan milik dari kreator dan pemilik hak cipta aslinya. Mova tidak mengklaim kepemilikan atas konten apapun yang diunduh melalui layanan kami.
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Pengguna Mova wajib mematuhi hukum hak cipta yang berlaku di wilayah masing-masing. Mengunduh konten untuk keperluan pribadi umumnya diperbolehkan, namun mendistribusikan ulang, menjual, atau menggunakan konten secara komersial tanpa izin dari pemilik hak cipta merupakan pelanggaran hukum.
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Mova tidak menyimpan salinan konten apapun di server kami. Semua proses unduhan dilakukan langsung dari platform sumber. Mova hanya berfungsi sebagai perantara teknis yang memfasilitasi akses terhadap konten yang sudah tersedia secara publik.
                </p>
              </div>
            </section>

            {/* DMCA */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
                  <FileText className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2 className="text-lg font-bold text-foreground dark:text-[#FAFAFA]">DMCA & Takedown Notice</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Mova menghormati hak kekayaan intelektual dan berkomitmen untuk menangani laporan pelanggaran hak cipta secara serius. Jika Anda adalah pemilik hak cipta dan meyakini bahwa konten Anda diakses melalui Mova secara melanggar hak Anda, Anda dapat mengirimkan pemberitahuan DMCA kepada kami.
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Untuk mengirimkan DMCA takedown notice, silakan kirim email ke alamat di bawah ini dengan menyertakan informasi berikut:
                </p>
                <ul className="space-y-2 mt-3">
                  {[
                    "Identifikasi konten yang dilanggar (URL atau deskripsi spesifik)",
                    "Bukti kepemilikan hak cipta",
                    "Informasi kontak Anda (nama, email, nomor telepon)",
                    "Pernyataan bahwa Anda yakin penggunaan konten tersebut tidak diizinkan",
                    "Pernyataan di bawah sumpah bahwa informasi yang diberikan adalah benar",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-[#A1A1AA]">
                      <span className="text-[#10B981] mt-1 shrink-0">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Batasan Tanggung Jawab */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
                  <AlertTriangle className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2 className="text-lg font-bold text-foreground dark:text-[#FAFAFA]">Batasan Tanggung Jawab</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Mova disediakan secara gratis tanpa jaminan apapun, baik tersurat maupun tersirat. Kami tidak menjamin ketersediaan, akurasi, atau keandalan layanan ini setiap saat.
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Mova tidak bertanggung jawab atas penyalahgunaan konten yang diunduh oleh pengguna. Setiap pengguna bertanggung jawab penuh atas tindakannya sendiri dan harus memastikan bahwa penggunaan konten yang diunduh mematuhi hukum yang berlaku dan ketentuan layanan platform sumber.
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Kami berhak untuk memodifikasi atau menghentikan layanan ini kapan saja tanpa pemberitahuan sebelumnya. Kami juga berhak menolak layanan kepada siapa saja atas alasan apapun.
                </p>
              </div>
            </section>

            {/* Tanggung Jawab Pengguna */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
                  <Users className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2 className="text-lg font-bold text-foreground dark:text-[#FAFAFA]">Tanggung Jawab Pengguna</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Dengan menggunakan layanan Mova, Anda menyatakan bahwa Anda memahami dan menyetujui hal-hal berikut:
                </p>
                <ul className="space-y-2 mt-3">
                  {[
                    "Anda akan menggunakan Mova hanya untuk keperluan yang sah dan sesuai hukum",
                    "Anda tidak akan menggunakan konten yang diunduh untuk tujuan komersial tanpa izin dari pemilik hak cipta",
                    "Anda akan memberikan atribusi yang sesuai kepada kreator asli ketika menggunakan konten mereka",
                    "Anda tidak akan mendistribusikan ulang konten yang dilindungi hak cipta tanpa izin",
                    "Anda memahami bahwa Mova tidak menyimpan atau meng-host konten apapun di server kami",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-[#A1A1AA]">
                      <span className="text-[#10B981] mt-1 shrink-0">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Kontak */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
                  <Mail className="h-5 w-5 text-[#10B981]" />
                </div>
                <h2 className="text-lg font-bold text-foreground dark:text-[#FAFAFA]">Kontak</h2>
              </div>
              <div className="ml-14 space-y-3">
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                  Jika Anda memiliki pertanyaan tentang disclaimer ini, atau ingin mengirimkan DMCA takedown notice, silakan hubungi kami:
                </p>
                <p className="text-sm text-muted-foreground dark:text-[#A1A1AA]">
                  <span className="text-foreground dark:text-[#FAFAFA] font-medium">Email:</span>{" "}
                  <a href="mailto:admin@getmova.my.id" className="text-[#10B981] hover:underline">
                    admin@getmova.my.id
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Internal Links */}
          <div className="mt-16 pt-8 border-t border-border dark:border-[#27272A]">
            <h3 className="text-sm font-semibold text-foreground dark:text-[#FAFAFA] mb-4">Halaman Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="/privacy" className="flex items-center justify-between p-4 rounded-lg border border-border dark:border-[#27272A] bg-card dark:bg-[#111113] hover:border-[#10B981]/50 transition-colors group">
                <span className="text-sm text-muted-foreground dark:text-[#A1A1AA] group-hover:text-foreground dark:group-hover:text-[#FAFAFA]">Kebijakan Privasi</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground dark:text-[#A1A1AA] group-hover:text-[#10B981] transition-colors" />
              </a>
              <a href="/terms" className="flex items-center justify-between p-4 rounded-lg border border-border dark:border-[#27272A] bg-card dark:bg-[#111113] hover:border-[#10B981]/50 transition-colors group">
                <span className="text-sm text-muted-foreground dark:text-[#A1A1AA] group-hover:text-foreground dark:group-hover:text-[#FAFAFA]">Syarat & Ketentuan</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground dark:text-[#A1A1AA] group-hover:text-[#10B981] transition-colors" />
              </a>
              <a href="/about" className="flex items-center justify-between p-4 rounded-lg border border-border dark:border-[#27272A] bg-card dark:bg-[#111113] hover:border-[#10B981]/50 transition-colors group">
                <span className="text-sm text-muted-foreground dark:text-[#A1A1AA] group-hover:text-foreground dark:group-hover:text-[#FAFAFA]">Tentang Kami</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground dark:text-[#A1A1AA] group-hover:text-[#10B981] transition-colors" />
              </a>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-border dark:border-[#27272A] text-center">
            <p className="text-xs text-muted-foreground dark:text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

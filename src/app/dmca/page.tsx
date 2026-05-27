import type { Metadata } from "next";
import {
  Home,
  Shield,
  FileText,
  Mail,
  Scale,
  AlertTriangle,
  ChevronRight,
  Clock,
  ShieldAlert,
  UserX,
  ExternalLink,
} from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

export const metadata: Metadata = {
  title: "DMCA - Pemberitahuan Hak Cipta | Mova",
  description:
    "Kebijakan DMCA Mova - prosedur pengaduan pelanggaran hak cipta dan informasi kontak untuk pemilik hak cipta.",
  alternates: { canonical: "https://getmova.my.id/dmca" },
  keywords: [
    "DMCA mova",
    "hak cipta mova",
    "takedown notice mova",
    "pelanggaran hak cipta",
    "copyright mova",
  ],
  openGraph: {
    title: "DMCA - Pemberitahuan Hak Cipta | Mova",
    description:
      "Kebijakan DMCA Mova - prosedur pengaduan pelanggaran hak cipta dan informasi kontak untuk pemilik hak cipta.",
    url: "https://getmova.my.id/dmca",
    siteName: "Mova",
    type: "website",
  },
};

const sections = [
  {
    icon: Shield,
    title: "Kebijakan DMCA Mova",
    content: [
      "Mova menghormati hak kekayaan intelektual orang lain dan mengharapkan penggunanya untuk melakukan hal yang sama. Kami berkomitmen untuk menanggapi pemberitahuan pelanggaran hak cipta yang jelas sesuai dengan Digital Millennium Copyright Act (DMCA) dan hukum hak cipta yang berlaku di Indonesia dan internasional.",
      "Penting untuk dipahami bahwa Mova adalah alat bantu teknis yang memungkinkan pengguna mengunduh konten yang sudah tersedia secara publik dari platform media sosial. Mova tidak menyimpan, meng-host, atau mendistribusikan konten apapun. Semua konten yang dapat diakses melalui layanan ini berasal langsung dari server platform sumber seperti TikTok, Instagram, YouTube, Facebook, dan lainnya.",
      "Kami tidak memiliki kendali atas konten yang tersedia di platform pihak ketiga, dan kami tidak bertanggung jawab atas konten yang diunduh oleh pengguna melalui layanan kami. Namun, kami berkomitmen untuk merespons setiap laporan pelanggaran hak cipta yang sah secara serius dan profesional.",
    ],
  },
  {
    icon: FileText,
    title: "Prosedur Pengaduan Pelanggaran Hak Cipta",
    content: [
      "Jika Anda adalah pemilik hak cipta atau berwenang atas nama pemilik hak cipta, dan Anda percaya bahwa konten Anda dapat diunduh melalui layanan Mova dengan cara yang melanggar hak cipta Anda, Anda dapat mengajukan pemberitahuan pelanggaran hak cipta dengan mengirimkan email ke alamat di bawah ini. Pemberitahuan harus mencakup informasi berikut:",
    ],
    list: [
      "Tanda tangan fisik atau elektronik dari pemilik hak cipta atau pihak yang berwenang bertindak atas nama mereka",
      "Identifikasi karya yang dilindungi hak cipta yang diklaim telah dilanggar, atau jika ada beberapa karya, daftar representatif dari karya tersebut",
      "Identifikasi materi yang diklaim melanggar atau menjadi objek aktivitas pelanggaran, beserta informasi yang cukup untuk memungkinkan kami menemukan materi tersebut (seperti URL spesifik)",
      "Informasi kontak Anda, termasuk nama lengkap, alamat, nomor telepon, dan alamat email",
      "Pernyataan bahwa Anda memiliki keyakinan yang baik bahwa penggunaan materi tidak diizinkan oleh pemilik hak cipta, agennya, atau hukum",
      "Pernyataan bahwa informasi dalam pemberitahuan tersebut akurat, dan di bawah sumpah, bahwa Anda berwenang bertindak atas nama pemilik hak cipta",
    ],
  },
  {
    icon: Mail,
    title: "Kontak DMCA",
    content: [
      "Silakan kirim pemberitahuan pelanggaran hak cipta ke kontak berikut:",
    ],
    contact: true,
  },
  {
    icon: Clock,
    title: "Tanggapan Kami",
    content: [
      "Setelah menerima pemberitahuan pelanggaran hak cipta yang valid dan lengkap, Mova akan menindaklanjuti sesuai dengan prosedur yang berlaku. Tindakan yang mungkin kami ambil termasuk namun tidak terbatas pada: menghapus akses ke materi yang dilaporkan, memblokir URL tertentu agar tidak dapat diproses oleh layanan kami, atau mengambil langkah teknis lainnya yang diperlukan untuk mencegah akses ke materi yang dilaporkan.",
      "Kami akan berusaha merespons pemberitahuan DMCA yang valid dalam waktu 5-10 hari kerja. Harap dicatat bahwa pemberitahuan yang tidak lengkap atau tidak memenuhi persyaratan di atas mungkin tidak ditindaklanjuti. Kami akan mengirimkan konfirmasi penerimaan kepada pengirim pemberitahuan yang valid.",
    ],
  },
  {
    icon: Scale,
    title: "Pemberitahuan Balasan (Counter-Notice)",
    content: [
      "Jika Anda percaya bahwa materi Anda telah dihapus atau aksesnya dinonaktifkan karena kesalahan atau identifikasi yang salah, Anda dapat mengajukan pemberitahuan balasan (counter-notice). Pemberitahuan balasan harus mencakup identifikasi materi yang telah dihapus, pernyataan di bawah sumpah bahwa penghapusan dilakukan karena kesalahan, persetujuan terhadap yurisdiksi pengadilan, dan informasi kontak Anda yang lengkap.",
      "Kami akan meninjau setiap counter-notice yang diterima dan dapat mengembalikan akses ke materi yang dilaporkan jika ditemukan bahwa penghapusan dilakukan karena kesalahan. Proses peninjauan counter-notice biasanya memakan waktu 10-14 hari kerja.",
    ],
  },
  {
    icon: UserX,
    title: "Kebijakan Pengulangan Pelanggaran",
    content: [
      "Mova akan menghentikan akses pengguna yang berulang kali melanggar hak cipta jika ditemukan bahwa pengguna tersebut telah melanggar hak cipta lebih dari dua kali. Kami menyimpan catatan pemberitahuan DMCA yang valid dan tindakan yang kami ambil untuk memastikan kepatuhan terhadap kebijakan ini.",
      "Kami juga berhak mengambil tindakan pencegahan, seperti memblokir alamat IP atau mengimplementasikan filter teknis, untuk mencegah pelanggaran hak cipta yang berulang di platform kami.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Pernyataan Penting",
    content: [
      "Mova bukan merupakan penyedia hosting konten dan tidak menyimpan salinan konten apapun di server kami. Oleh karena itu, kemampuan kami untuk menghapus konten secara langsung terbatas. Namun, kami dapat memblokir akses ke URL tertentu yang dilaporkan melanggar hak cipta sehingga konten tersebut tidak dapat lagi diproses melalui layanan kami.",
      "Kami mendorong pemilik hak cipta untuk juga menghubungi platform sumber (seperti YouTube, TikTok, Instagram) untuk mengajukan penghapusan konten secara langsung, karena penghapusan dari platform sumber akan otomatis membuat konten tersebut tidak dapat diakses melalui Mova.",
    ],
  },
];

export default function DMCAPage() {
  const lastUpdated = "27 Mei 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "DMCA - Pemberitahuan Hak Cipta | Mova",
    description:
      "Kebijakan DMCA Mova - prosedur pengaduan pelanggaran hak cipta dan informasi kontak untuk pemilik hak cipta.",
    url: "https://getmova.my.id/dmca",
    isPartOf: {
      "@type": "WebSite",
      name: "Mova",
      url: "https://getmova.my.id",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://getmova.my.id",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "DMCA",
          item: "https://getmova.my.id/dmca",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090B] text-foreground dark:text-[#FAFAFA]">
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
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground dark:text-[#A1A1AA]">
                <li>
                  <a href="/" className="hover:text-[#10B981] transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li className="text-[#10B981] font-medium">DMCA</li>
              </ol>
            </nav>

            {/* Title section */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border dark:border-[#27272A] text-muted-foreground dark:text-[#A1A1AA] mb-6">
                <ShieldAlert className="h-3 w-3 text-[#10B981]" />
                Legal
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-foreground dark:text-[#FAFAFA] mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                DMCA - Pemberitahuan{" "}
                <span className="font-bold text-[#10B981]">Hak Cipta</span>
              </h1>
              <p className="text-muted-foreground dark:text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
                Mova menghormati hak kekayaan intelektual dan berkomitmen menangani laporan pelanggaran hak cipta secara serius. Halaman ini menjelaskan prosedur DMCA kami.
              </p>
              <p className="text-xs text-muted-foreground/60 dark:text-[#A1A1AA]/60 mt-3">
                Terakhir diperbarui: {lastUpdated}
              </p>
            </div>

            {/* Important notice */}
            <div className="mb-12 p-6 rounded-xl bg-card dark:bg-[#111113] border-l-4 border-[#10B981]">
              <p className="text-sm text-foreground dark:text-[#FAFAFA] font-medium">
                Mova bukan penyedia hosting konten. Kami tidak menyimpan, mendistribusikan, atau meng-host materi berhak cipta apapun. Semua konten berasal langsung dari platform sumber. Jika Anda menemukan pelanggaran hak cipta, silakan ikuti prosedur di bawah ini atau hubungi platform sumber secara langsung.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <section key={index} className="scroll-mt-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#111113] border border-border dark:border-[#27272A] shrink-0">
                      <section.icon className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <h2
                      className="text-lg font-bold text-foreground dark:text-[#FAFAFA]"
                      style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div className="ml-14 space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    {section.list && (
                      <ul className="space-y-2 mt-3">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-[#A1A1AA]">
                            <span className="text-[#10B981] mt-1 shrink-0">&#8226;</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.contact && (
                      <div className="mt-3 p-5 rounded-xl bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
                        <div className="flex items-center gap-2 mb-3">
                          <Mail className="h-4 w-4 text-[#10B981]" />
                          <p className="font-semibold text-foreground dark:text-[#FAFAFA] text-sm">Email DMCA:</p>
                        </div>
                        <a href="mailto:admin@getmova.my.id" className="text-[#10B981] hover:underline text-sm font-medium">
                          admin@getmova.my.id
                        </a>
                        <p className="mt-3 text-sm text-muted-foreground dark:text-[#A1A1AA]">
                          Subjek email: <span className="font-medium text-foreground dark:text-[#FAFAFA]">&quot;DMCA Takedown Notice - Mova&quot;</span>
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground dark:text-[#A1A1AA]">
                          Waktu respons: 5-10 hari kerja untuk pemberitahuan yang valid dan lengkap
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* Related pages */}
            <div className="mt-16 p-6 rounded-xl bg-card dark:bg-[#111113] border border-border dark:border-[#27272A]">
              <h3
                className="text-sm font-bold text-foreground dark:text-[#FAFAFA] mb-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Halaman Terkait
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Kebijakan Privasi
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                >
                  <ShieldAlert className="h-4 w-4" />
                  Syarat & Ketentuan
                </a>
                <a
                  href="/disclaimer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Disclaimer
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Hubungi Kami
                </a>
              </div>
            </div>

            {/* Footer notice */}
            <div className="mt-12 pt-8 border-t border-border dark:border-[#27272A] text-center">
              <p className="text-xs text-muted-foreground dark:text-[#A1A1AA]">
                &copy; 2026 Mova. Semua hak dilindungi. Kebijakan DMCA ini dapat diperbarui dari waktu ke waktu.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

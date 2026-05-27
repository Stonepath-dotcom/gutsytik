import type { Metadata } from "next";
import { Home, FileText, Scale, Users, ShieldAlert, Ban, RefreshCw, Gavel, Mail, ChevronRight } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - getmova",
  description:
    "Syarat dan ketentuan penggunaan layanan Mova. Baca ketentuan ini sebelum menggunakan layanan download video tanpa watermark kami.",
  alternates: { canonical: "https://getmova.my.id/terms" },
  keywords: [
    "syarat ketentuan mova",
    "terms of service mova",
    "ketentuan penggunaan",
    "syarat layanan download video",
    "legal mova",
  ],
  openGraph: {
    title: "Syarat & Ketentuan - getmova",
    description:
      "Syarat dan ketentuan penggunaan layanan Mova. Baca ketentuan ini sebelum menggunakan layanan download video tanpa watermark kami.",
    url: "https://getmova.my.id/terms",
    siteName: "getmova",
    type: "website",
  },
};

const sections = [
  {
    icon: Users,
    title: "1. Penerimaan Ketentuan",
    content: [
      "Dengan mengakses dan menggunakan layanan Mova (getmova.my.id), Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui ketentuan-ketentuan ini, harap tidak menggunakan layanan kami.",
      "Ketentuan ini berlaku untuk semua pengunjung, pengguna, dan pihak lain yang mengakses atau menggunakan layanan Mova. Dengan menggunakan layanan ini, Anda mengakui bahwa Anda memiliki kapasitas hukum untuk menyetujui ketentuan ini, atau jika Anda berusia di bawah 18 tahun, Anda telah memperoleh persetujuan dari orang tua atau wali Anda.",
      "Mova berhak untuk mengubah, memodifikasi, atau memperbarui Syarat & Ketentuan ini kapan saja tanpa pemberitahuan terlebih dahulu. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini. Penggunaan layanan yang berkelanjutan setelah perubahan tersebut dianggap sebagai penerimaan Anda terhadap ketentuan yang diperbarui.",
    ],
  },
  {
    icon: FileText,
    title: "2. Deskripsi Layanan",
    content: [
      "Mova adalah layanan berbasis web yang memungkinkan pengguna untuk mengunduh video dan audio dari berbagai platform media sosial seperti TikTok, Instagram, YouTube, Facebook, Twitter/X, Pinterest, dan Reddit. Layanan ini memproses URL yang diberikan pengguna dan menyediakan tautan unduhan untuk konten yang tersedia secara publik.",
      "Mova berfungsi sebagai alat bantu teknis dan bukan sebagai penyimpanan atau distributor konten. Kami tidak menyimpan, menghosting, atau mendistribusikan video atau audio yang diunduh melalui layanan kami. Semua konten diproses langsung dari server platform sumber.",
      "Layanan ini disediakan secara gratis. Kami tidak menjamin ketersediaan layanan secara terus-menerus, akurasi hasil, atau kompatibilitas dengan semua platform atau jenis konten. Fitur dan fungsionalitas layanan dapat berubah sewaktu-waktu.",
    ],
  },
  {
    icon: Scale,
    title: "3. Hak Kekayaan Intelektual",
    content: [
      "Mova menghormati hak kekayaan intelektual dari semua pihak. Logo, nama, desain, dan elemen visual Mova merupakan milik kami dan dilindungi oleh hukum hak cipta. Anda tidak diperkenankan menggunakan, menyalin, atau mendistribusikan elemen-elemen tersebut tanpa izin tertulis dari kami.",
      "Konten video dan audio yang diakses melalui Mova tetap menjadi hak milik dari pembuat konten atau pemilik hak cipta asli. Mova tidak mengklaim kepemilikan atas konten yang diunduh melalui layanan ini.",
      "Pengguna bertanggung jawab penuh untuk memastikan bahwa pengunduhan dan penggunaan konten melalui Mova tidak melanggar hak kekayaan intelektual pihak lain. Mova tidak bertanggung jawab atas pelanggaran hak cipta yang dilakukan oleh pengguna.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "4. Tanggung Jawab Pengguna",
    content: [
      "Anda bertanggung jawab untuk menggunakan layanan Mova secara sah dan sesuai dengan hukum yang berlaku. Anda setuju untuk tidak menggunakan layanan ini untuk tujuan ilegal atau yang melanggar hak pihak lain.",
      "Anda wajib mematuhi syarat dan ketentuan dari platform sumber (TikTok, Instagram, YouTube, dll.) saat mengunduh konten dari platform tersebut. Pengunduhan konten yang melanggar syarat layanan platform asal merupakan tanggung jawab Anda sendiri.",
      "Anda dilarang menggunakan layanan Mova untuk: (a) mengunduh konten yang dilindungi hak cipta tanpa izin dari pemilik hak cipta; (b) mendistribusikan ulang konten yang diunduh untuk tujuan komersial tanpa izin yang sesuai; (c) menggunakan layanan ini untuk mengakses konten yang bersifat ilegal, berbahaya, atau melanggar hukum; (d) mencoba mengganggu, merusak, atau mengakses secara tidak sah sistem atau jaringan Mova; (e) menggunakan alat otomatis (bot, scraper) untuk mengakses layanan secara massal tanpa izin.",
      "Anda memahami dan menyetujui bahwa konten yang diunduh melalui Mova hanya boleh digunakan untuk konsumsi pribadi, kecuali jika Anda memiliki izin yang sah dari pemilik konten untuk penggunaan lain.",
    ],
  },
  {
    icon: Ban,
    title: "5. Disclaimer Konten yang Diunduh",
    content: [
      "Mova tidak bertanggung jawab atas konten yang diunduh melalui layanan kami. Konten tersebut berasal dari platform pihak ketiga dan Mova tidak memiliki kendali atas sifat, keakuratan, atau legalitas konten tersebut.",
      "Kami tidak menjamin bahwa konten yang diunduh akan bebas dari malware, virus, atau kode berbahaya lainnya. Pengguna disarankan untuk menggunakan perangkat lunak antivirus yang memadai dan berhati-hati saat mengunduh dan membuka file dari internet.",
      "Mova tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari penggunaan konten yang diunduh melalui layanan ini, termasuk namun tidak terbatas pada kerugian data, kerusakan perangkat, atau klaim hukum dari pihak ketiga.",
      "Pengguna bertanggung jawab untuk memverifikasi legalitas pengunduhan konten di yurisdiksi mereka. Peraturan mengenai pengunduhan konten digital bervariasi di setiap negara, dan kepatuhan terhadap hukum lokal sepenuhnya menjadi tanggung jawab pengguna.",
    ],
  },
  {
    icon: FileText,
    title: "6. Batasan Tanggung Jawab",
    content: [
      "Sejauh diizinkan oleh hukum yang berlaku, Mova tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, konsekuensial, atau punitif yang timbul dari atau terkait dengan penggunaan layanan ini.",
      "Mova tidak bertanggung jawab atas: (a) kerugian yang timbul dari ketidaktersediaan layanan, baik sementara maupun permanen; (b) kerugian yang disebabkan oleh kesalahan, ketidakakuratan, atau kegagalan dalam memproses permintaan unduhan; (c) kerugian yang timbul dari tindakan atau kelalaian pihak ketiga, termasuk platform sumber konten; (d) kerugian yang timbul dari pelanggaran hak kekayaan intelektual oleh pengguna.",
      "Total tanggung jawab Mova terhadap pengguna dalam keadaan apa pun tidak akan melebihi jumlah yang telah Anda bayarkan untuk menggunakan layanan ini. Mengingat layanan Mova disediakan secara gratis, tanggung jawab maksimum kami adalah nol.",
    ],
  },
  {
    icon: RefreshCw,
    title: "7. Perubahan Ketentuan",
    content: [
      "Mova berhak untuk mengubah atau memperbarui Syarat & Ketentuan ini kapan saja sesuai kebijaksanaan kami. Perubahan akan efektif segera setelah dipublikasikan di halaman ini.",
      "Kami akan berusaha untuk mencantumkan tanggal pembaruan terakhir di halaman ini untuk membantu Anda melacak perubahan. Namun, kegagalan kami untuk mencantumkan tanggal pembaruan tidak akan mempengaruhi keberlakukan perubahan tersebut.",
      "Anda disarankan untuk meninjau halaman ini secara berkala untuk mengetahui perubahan terbaru. Penggunaan layanan yang berkelanjutan setelah perubahan dianggap sebagai persetujuan Anda terhadap ketentuan yang diperbarui.",
    ],
  },
  {
    icon: Gavel,
    title: "8. Hukum yang Berlaku",
    content: [
      "Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia. Setiap sengketa yang timbul dari atau terkait dengan ketentuan ini akan diselesaikan sesuai dengan hukum Indonesia.",
      "Anda setuju untuk tunduk pada yurisdiksi eksklusif pengadilan di Indonesia sehubungan dengan sengketa apa pun yang timbul dari ketentuan ini. Namun, hal ini tidak menghalangi Mova untuk mengajukan gugatan di yurisdiksi lain jika diperlukan untuk melindungi hak kami.",
      "Jika ada ketentuan dalam Syarat & Ketentuan ini yang dianggap tidak dapat dilaksanakan atau tidak sah oleh pengadilan yang berwenang, ketentuan tersebut akan dimodifikasi seperlunya agar dapat dilaksanakan, dan ketentuan lainnya akan tetap berlaku sepenuhnya.",
    ],
  },
  {
    icon: Mail,
    title: "9. Informasi Kontak",
    content: [
      "Jika Anda memiliki pertanyaan, keluhan, atau keberatan terkait Syarat & Ketentuan ini atau layanan Mova secara umum, silakan hubungi kami melalui:",
      "Email: admin@getmova.my.id",
      "TikTok: @abbbuw",
      "Telegram: @sixte3nnn",
      "Kami akan berusaha untuk merespons semua pertanyaan dan keluhan dalam waktu 2×24 jam kerja.",
    ],
  },
];

export default function TermsPage() {
  const lastUpdated = "27 Mei 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Syarat & Ketentuan - getmova",
    description:
      "Syarat dan ketentuan penggunaan layanan Mova. Baca ketentuan ini sebelum menggunakan layanan download video tanpa watermark kami.",
    url: "https://getmova.my.id/terms",
    isPartOf: {
      "@type": "WebSite",
      name: "getmova",
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
          name: "Syarat & Ketentuan",
          item: "https://getmova.my.id/terms",
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
                <li className="text-[#10B981] font-medium">Syarat & Ketentuan</li>
              </ol>
            </nav>

            {/* Title section */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border dark:border-[#27272A] text-muted-foreground dark:text-[#A1A1AA] mb-6">
                <FileText className="h-3 w-3 text-[#10B981]" />
                Legal
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-foreground dark:text-[#FAFAFA] mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Syarat &{" "}
                <span className="font-bold text-[#10B981]">Ketentuan</span>
              </h1>
              <p className="text-muted-foreground dark:text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
                Harap baca syarat dan ketentuan ini dengan saksama sebelum menggunakan layanan Mova. Dengan menggunakan layanan kami, Anda menyetujui ketentuan ini.
              </p>
              <p className="text-xs text-muted-foreground/60 dark:text-[#A1A1AA]/60 mt-3">
                Terakhir diperbarui: {lastUpdated}
              </p>
            </div>

            {/* Important notice */}
            <div className="mb-12 p-6 rounded-xl bg-card dark:bg-[#111113] border-l-4 border-[#10B981]">
              <p className="text-sm text-foreground dark:text-[#FAFAFA] font-medium">
                Dengan mengakses dan menggunakan Mova, Anda menyatakan telah membaca dan menyetujui seluruh Syarat & Ketentuan yang tercantum di halaman ini. Jika Anda tidak setuju, harap tidak menggunakan layanan ini.
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
                  <ShieldAlert className="h-4 w-4" />
                  Kebijakan Privasi
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  Tentang Kami
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
                &copy; 2026 Mova. Semua hak dilindungi. Syarat & Ketentuan ini dapat diperbarui dari waktu ke waktu.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Cookie, Shield, Settings, BarChart3, Megaphone, Globe, Clock, Mail, ExternalLink, ChevronRight, Home } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

export const metadata: Metadata = {
  title: "Kebijakan Cookie - getmova",
  description:
    "Kebijakan Cookie Mova (getmova.my.id). Pelajari bagaimana kami menggunakan cookie, termasuk Google Analytics dan Google AdSense, serta cara mengelola preferensi cookie Anda.",
  alternates: { canonical: "https://getmova.my.id/cookie-policy" },
  keywords: [
    "kebijakan cookie mova",
    "cookie policy mova",
    "cookie mova",
    "google adsense cookie",
    "google analytics cookie",
    "pengelolaan cookie",
    "privasi cookie",
    "cookie periklanan",
    "cookie analitik",
  ],
  openGraph: {
    title: "Kebijakan Cookie - getmova",
    description:
      "Kebijakan Cookie Mova (getmova.my.id). Pelajari bagaimana kami menggunakan cookie, termasuk Google Analytics dan Google AdSense, serta cara mengelola preferensi cookie Anda.",
    url: "https://getmova.my.id/cookie-policy",
    siteName: "getmova",
    type: "website",
  },
};

const essentialCookies = [
  {
    name: "mova_cookie_consent",
    purpose: "Menyimpan preferensi persetujuan cookie Anda",
    duration: "1 tahun",
    description:
      "Cookie ini mencatat apakah Anda telah menyetujui penggunaan cookie di website kami. Tanpa cookie ini, kami tidak dapat mengingat pilihan Anda dan banner cookie consent akan terus ditampilkan pada setiap kunjungan.",
  },
  {
    name: "mova_theme",
    purpose: "Menyimpan preferensi tema tampilan (light/dark mode)",
    duration: "1 tahun",
    description:
      "Cookie ini menyimpan pilihan tema antarmuka Anda agar website kami tampil sesuai preferensi Anda pada setiap kunjungan. Tanpa cookie ini, tema akan diatur ulang ke default setiap kali Anda membuka website.",
  },
  {
    name: "mova_lang",
    purpose: "Menyimpan preferensi bahasa",
    duration: "1 tahun",
    description:
      "Cookie ini menyimpan pilihan bahasa antarmuka Anda agar website kami selalu menampilkan konten dalam bahasa yang Anda pilih. Tanpa cookie ini, bahasa akan diatur ulang ke default setiap kali Anda mengunjungi website.",
  },
];

const analyticsCookies = [
  {
    name: "_ga",
    purpose: "Mengidentifikasi pengunjung secara anonim (Google Analytics)",
    duration: "2 tahun",
    description:
      "Cookie ini digunakan oleh Google Analytics untuk membedakan pengunjung satu dengan yang lain. Cookie ini menghasilkan ID unik yang bersifat anonim dan tidak dapat digunakan untuk mengidentifikasi individu secara langsung.",
  },
  {
    name: "_ga_*",
    purpose: "Mempertahankan status sesi (Google Analytics)",
    duration: "2 tahun",
    description:
      "Cookie ini digunakan oleh Google Analytics untuk mempertahankan status sesi Anda. Setiap properti Google Analytics yang digunakan di website kami akan memiliki cookie _ga_* tersendiri dengan ID properti yang unik.",
  },
];

const advertisingCookies = [
  {
    name: "__gads",
    purpose: "Menampilkan iklan yang relevan (Google AdSense)",
    duration: "13 bulan",
    description:
      "Cookie ini ditetapkan oleh Google AdSense untuk menampilkan iklan yang relevan kepada pengguna. Cookie ini membantu Google memahami minat pengguna berdasarkan riwayat browsing mereka.",
  },
  {
    name: "__gpi",
    purpose: "Identifikasi penayang iklan (Google AdSense)",
    duration: "13 bulan",
    description:
      "Cookie ini ditetapkan oleh Google AdSense dan berfungsi mirip dengan __gads. Cookie ini membantu Google mengidentifikasi penayang iklan dan meningkatkan relevansi iklan yang ditampilkan.",
  },
  {
    name: "IDE",
    purpose: "Menampilkan iklan yang dipersonalisasi (DoubleClick)",
    duration: "1 tahun",
    description:
      "Cookie ini digunakan oleh Google DoubleClick untuk mendaftarkan dan melaporkan tindakan pengguna di website setelah melihat atau mengklik iklan. Tujuannya adalah untuk mengukur efektivitas iklan dan menampilkan iklan yang ditargetkan.",
  },
  {
    name: "NID",
    purpose: "Menyimpan preferensi pengguna untuk iklan Google",
    duration: "6 bulan",
    description:
      "Cookie ini ditetapkan oleh Google dan digunakan untuk menyimpan preferensi pengguna seperti bahasa yang dipilih, jumlah hasil pencarian per halaman, dan pengaturan lain yang terkait dengan penayangan iklan Google.",
  },
];

const sections = [
  {
    icon: Cookie,
    title: "1. Pendahuluan",
    content: [
      "Selamat datang di Kebijakan Cookie Mova (getmova.my.id). Kebijakan ini menjelaskan jenis cookie yang digunakan di website kami, tujuan penggunaannya, dan bagaimana Anda dapat mengelola preferensi cookie Anda. Kami berkomitmen untuk memberikan transparansi penuh mengenai penggunaan cookie di platform kami.",
      "Cookie adalah file teks kecil yang disimpan di perangkat Anda (komputer, tablet, atau ponsel) saat Anda mengunjungi sebuah website. Cookie membantu website mengingat tindakan dan preferensi Anda selama periode waktu tertentu, sehingga Anda tidak perlu mengatur ulang preferensi tersebut setiap kali mengunjungi website yang sama atau menjelajahi halaman yang berbeda.",
      "Mova menggunakan cookie untuk beberapa tujuan penting, termasuk memastikan fungsionalitas dasar website berjalan dengan baik, menganalisis cara pengunjung menggunakan website kami guna meningkatkan pengalaman pengguna, dan menampilkan iklan yang relevan melalui mitra periklanan kami seperti Google AdSense. Penggunaan cookie ini penting untuk menjaga layanan kami tetap gratis dan berkualitas.",
      "Dengan melanjutkan penggunaan website Mova, Anda menyetujui penggunaan cookie sesuai dengan kebijakan ini. Jika Anda tidak setuju dengan penggunaan cookie tertentu, Anda dapat mengelola preferensi cookie Anda melalui pengaturan browser atau banner cookie consent kami yang akan dijelaskan lebih lanjut di bawah.",
    ],
  },
  {
    icon: Shield,
    title: "2. Jenis Cookie yang Kami Gunakan",
    content: [
      "Mova menggunakan tiga kategori utama cookie: Cookie Esensial, Cookie Analitik, dan Cookie Periklanan. Setiap kategori memiliki tujuan yang berbeda dan tingkat keperluan yang berbeda pula. Berikut adalah penjelasan detail untuk masing-masing kategori.",
    ],
  },
  {
    icon: Settings,
    title: "2a. Cookie Esensial (Selalu Aktif)",
    content: [
      "Cookie esensial adalah cookie yang diperlukan untuk operasi dasar website Mova. Cookie ini tidak dapat dinonaktifkan karena website kami tidak akan berfungsi dengan baik tanpanya. Cookie esensial tidak mengumpulkan informasi pribadi yang dapat mengidentifikasi Anda dan hanya digunakan untuk menyimpan preferensi dasar Anda.",
      "Kami menggunakan cookie esensial untuk mengingat pilihan persetujuan cookie Anda (mova_cookie_consent), sehingga banner cookie consent tidak terus-menerus ditampilkan pada setiap kunjungan Anda. Cookie ini memastikan bahwa pilihan Anda dihormati dan diterapkan secara konsisten selama masa berlaku cookie.",
      "Selain itu, kami menggunakan cookie esensial untuk menyimpan preferensi tema tampilan Anda (mova_theme), apakah Anda memilih mode terang atau mode gelap. Tanpa cookie ini, tampilan website akan kembali ke pengaturan default setiap kali Anda membuka halaman baru.",
      "Kami juga menggunakan cookie esensial untuk menyimpan preferensi bahasa Anda (mova_lang), sehingga website kami selalu menampilkan konten dalam bahasa yang Anda pilih tanpa perlu mengatur ulang setiap kali Anda mengunjungi website.",
    ],
  },
  {
    icon: BarChart3,
    title: "2b. Cookie Analitik",
    content: [
      "Cookie analitik digunakan untuk mengumpulkan informasi tentang bagaimana pengunjung menggunakan website Mova. Data ini dilaporkan secara agregat dan anonim, yang berarti tidak dapat digunakan untuk mengidentifikasi individu secara langsung. Informasi ini sangat berharga bagi kami untuk memahami pola penggunaan dan terus meningkatkan pengalaman pengguna.",
      "Kami menggunakan Google Analytics sebagai layanan analitik utama di website kami. Google Analytics menggunakan cookie seperti _ga dan _ga_* untuk mengumpulkan data tentang interaksi pengunjung dengan website, termasuk halaman yang dikunjungi, waktu yang dihabiskan di setiap halaman, dan jalur navigasi yang diambil pengunjung.",
      "Data yang dikumpulkan oleh Google Analytics mencakup informasi seperti jumlah pengunjung, lokasi geografis secara umum (negara/kota), jenis browser dan perangkat yang digunakan, serta sumber rujukan (dari mana pengunjung berasal). Semua data ini dilaporkan secara agregat dan tidak terkait dengan individu tertentu.",
      "Cookie analitik hanya akan diaktifkan jika Anda memberikan persetujuan melalui banner cookie consent kami. Anda dapat menarik persetujuan Anda kapan saja dengan mengubah preferensi cookie Anda atau menghapus cookie yang ada di browser Anda.",
    ],
  },
  {
    icon: Megaphone,
    title: "2c. Cookie Periklanan",
    content: [
      "Cookie periklanan digunakan oleh Google AdSense dan mitra periklanan kami untuk menampilkan iklan yang relevan dan dipersonalisasi kepada Anda. Cookie ini memungkinkan pelacakan aktivitas browsing Anda di berbagai website untuk keperluan penargetan iklan, sehingga iklan yang Anda lihat lebih sesuai dengan minat dan kebutuhan Anda.",
      "Google AdSense menggunakan cookie seperti __gads dan __gpi untuk menampilkan iklan berdasarkan kunjungan sebelumnya Anda ke website ini atau website lain di internet. Cookie ini membantu Google dan mitranya menayangkan iklan yang lebih relevan berdasarkan profil minat yang dibangun dari data browsing Anda.",
      "Selain itu, Google DoubleClick menggunakan cookie seperti IDE dan NID untuk mendaftarkan dan melaporkan tindakan pengguna di website setelah melihat atau mengklik iklan. Tujuannya adalah untuk mengukur efektivitas kampanye iklan dan menampilkan iklan yang ditargetkan kepada audiens yang tepat.",
      "Cookie periklanan juga digunakan oleh jaringan periklanan pihak ketiga lainnya yang mungkin bekerja sama dengan Google AdSense untuk menayangkan iklan di website kami. Jaringan ini mungkin menetapkan cookie mereka sendiri untuk melacak respons Anda terhadap iklan dan mengoptimalkan penayangan iklan di masa mendatang.",
      "Cookie periklanan hanya akan diaktifkan jika Anda memberikan persetujuan melalui banner cookie consent kami. Jika Anda menolak cookie periklanan, Anda masih akan melihat iklan di website kami, namun iklan tersebut tidak akan dipersonalisasi berdasarkan perilaku browsing Anda.",
    ],
  },
  {
    icon: Globe,
    title: "3. Bagaimana Kami Menggunakan Cookie",
    content: [
      "Kami menggunakan cookie untuk memastikan website Mova berfungsi dengan baik dan memberikan pengalaman pengguna yang optimal. Cookie esensial memungkinkan fitur dasar website seperti penyimpanan preferensi tema, bahasa, dan persetujuan cookie agar berjalan dengan lancar tanpa gangguan.",
      "Cookie analitik membantu kami memahami bagaimana pengunjung berinteraksi dengan website kami. Informasi seperti halaman mana yang paling sering dikunjungi, berapa lama pengunjung menghabiskan waktu di setiap halaman, dan jalur navigasi yang paling umum digunakan membantu kami mengidentifikasi area yang perlu ditingkatkan dan mengoptimalkan struktur website.",
      "Cookie periklanan memungkinkan kami untuk menampilkan iklan yang relevan dan menghasilkan pendapatan yang diperlukan untuk menjaga layanan Mova tetap gratis bagi semua pengguna. Tanpa cookie periklanan, kami tidak akan dapat menayangkan iklan yang sesuai dengan minat Anda, yang dapat mempengaruhi pendapatan iklan dan keberlanjutan layanan gratis kami.",
      "Selain tujuan-tujuan tersebut, cookie juga membantu kami mendeteksi dan mencegah penyalahgunaan website, seperti serangan bot atau aktivitas mencurigakan lainnya. Ini merupakan bagian dari upaya kami untuk menjaga keamanan dan integritas platform Mova bagi seluruh pengguna.",
    ],
  },
  {
    icon: Globe,
    title: "4. Cookie Pihak Ketiga",
    content: [
      "Sebagian cookie yang digunakan di website Mova ditetapkan oleh layanan pihak ketiga, bukan oleh Mova secara langsung. Cookie pihak ketiga ini memiliki kebijakan privasi dan penggunaan data mereka sendiri, yang terpisah dari kebijakan kami. Kami mendorong Anda untuk membaca kebijakan privasi setiap layanan pihak ketiga yang kami gunakan.",
      "Google Analytics (https://analytics.google.com) adalah layanan analitik web yang disediakan oleh Google LLC. Cookie yang ditetapkan oleh Google Analytics (_ga, _ga_*) digunakan untuk mengumpulkan data tentang penggunaan website secara anonim dan agregat. Untuk informasi lebih lanjut tentang bagaimana Google Analytics menggunakan data, silakan kunjungi Kebijakan Privasi Google di https://policies.google.com/privacy dan halaman informasi Google Analytics di https://support.google.com/analytics/answer/6004245.",
      "Google AdSense (https://www.google.com/adsense) adalah layanan periklanan yang disediakan oleh Google LLC. Cookie yang ditetapkan oleh Google AdSense (__gads, __gpi, IDE, NID) digunakan untuk menampilkan iklan yang relevan dan dipersonalisasi. Untuk informasi lebih lanjut tentang bagaimana Google menggunakan cookie untuk periklanan, silakan kunjungi https://policies.google.com/technologies/ads.",
      "DoubleClick (https://www.doubleclickbygoogle.com) adalah platform periklanan Google yang menggunakan cookie untuk menayangkan iklan dan mengukur efektivitas kampanye iklan. Cookie seperti IDE dan NID yang ditetapkan oleh DoubleClick membantu mengoptimalkan penayangan iklan di website kami.",
      "Mova tidak memiliki kendali atas cookie yang ditetapkan oleh pihak ketiga. Penggunaan data oleh pihak ketiga diatur oleh kebijakan privasi mereka masing-masing. Kami menyarankan Anda untuk meninjau kebijakan privasi setiap layanan pihak ketiga yang kami sebutkan di atas.",
    ],
  },
  {
    icon: Cookie,
    title: "5. Daftar Cookie",
    content: [
      "Berikut adalah daftar lengkap cookie yang digunakan di website Mova, beserta tujuan dan masa berlaku masing-masing cookie. Daftar ini disusun berdasarkan kategori cookie untuk memudahkan pemahaman Anda.",
    ],
  },
  {
    icon: Settings,
    title: "6. Cara Mengelola Cookie",
    content: [
      "Anda memiliki kendali penuh atas penggunaan cookie di browser Anda. Terdapat beberapa cara untuk mengelola preferensi cookie Anda, baik melalui pengaturan browser, banner cookie consent kami, atau pengaturan iklan Google. Berikut adalah penjelasan detail mengenai masing-masing metode.",
      "Pengaturan Browser: Sebagian besar browser modern memungkinkan Anda mengelola preferensi cookie melalui pengaturan browser. Anda dapat memblokir cookie dari domain tertentu, menghapus cookie yang sudah ada, atau mengatur browser untuk memberitahu Anda setiap kali cookie ditetapkan. Perlu diperhatikan bahwa menonaktifkan semua cookie dapat mempengaruhi fungsionalitas website, termasuk kemampuan untuk menyimpan preferensi Anda.",
      "Banner Cookie Consent: Saat pertama kali mengunjungi website Mova, Anda akan melihat banner cookie consent yang memungkinkan Anda memilih jenis cookie yang ingin Anda izinkan. Anda dapat menerima semua cookie, menolak cookie non-esensial, atau menyesuaikan preferensi Anda secara individual. Anda dapat mengubah preferensi ini kapan saja dengan mengeklik ikon cookie di bagian bawah website.",
      "Pengaturan Iklan Google: Anda dapat mengelola personalisasi iklan Google dengan mengunjungi Pengaturan Iklan Google di https://www.google.com/settings/ads. Di halaman ini, Anda dapat menonaktifkan personalisasi iklan, menghapus profil minat Anda, atau mengelola preferensi iklan Anda secara lebih detail.",
      "Network Advertising Initiative (NAI): Anda juga dapat memilih untuk tidak menggunakan cookie periklanan yang dipersonalisasi dari berbagai jaringan periklanan dengan mengunjungi halaman opt-out NAI di https://www.networkadvertising.org/choices/. Halaman ini memungkinkan Anda menolak pelacakan oleh beberapa jaringan periklanan sekaligus.",
      "Digital Advertising Alliance (DAA): Sebagai alternatif, Anda dapat mengunjungi halaman opt-out DAA di https://optout.aboutads.info/ untuk menolak cookie periklanan yang dipersonalisasi dari peserta DAA. Halaman ini menyediakan cara mudah untuk mengelola preferensi periklanan Anda di berbagai platform.",
    ],
  },
  {
    icon: Clock,
    title: "7. Perubahan Kebijakan",
    content: [
      "Mova berhak untuk mengubah, memperbarui, atau memodifikasi Kebijakan Cookie ini kapan saja sesuai dengan kebutuhan kami. Perubahan dapat dilakukan karena penambahan layanan baru, perubahan regulasi, atau penyesuaian teknis yang diperlukan untuk operasi website.",
      "Setiap perubahan yang kami buat pada Kebijakan Cookie ini akan berlaku segera setelah dipublikasikan di halaman ini. Kami akan mencantumkan tanggal pembaruan terakhir di bagian atas halaman ini agar Anda dapat mengetahui kapan kebijakan ini terakhir diperbarui.",
      "Kami menyarankan Anda untuk meninjau halaman ini secara berkala agar Anda selalu mengetahui informasi terbaru mengenai penggunaan cookie di website kami. Penggunaan website Mova secara berkelanjutan setelah perubahan kebijakan dianggap sebagai penerimaan Anda terhadap perubahan tersebut.",
      "Jika kami melakukan perubahan signifikan pada Kebijakan Cookie ini, kami akan berusaha untuk memberikan pemberitahuan yang lebih jelas, misalnya melalui banner cookie consent yang diperbarui atau notifikasi di website kami.",
    ],
  },
  {
    icon: Mail,
    title: "8. Hubungi Kami",
    content: [
      "Jika Anda memiliki pertanyaan, keluhan, atau keberatan terkait Kebijakan Cookie ini atau praktik penggunaan cookie di website Mova, kami senang untuk membantu Anda. Silakan hubungi kami melalui alamat email di bawah ini.",
      "Email: admin@getmova.my.id — Kami akan berusaha untuk merespons semua pertanyaan dan keluhan dalam waktu 2×24 jam kerja. Harap sertakan detail yang cukup dalam email Anda agar kami dapat menangani pertanyaan atau keluhan Anda dengan tepat.",
      "Jika pertanyaan Anda terkait cookie pihak ketiga seperti Google Analytics atau Google AdSense, kami juga menyarankan Anda untuk menghubungi pihak ketiga tersebut secara langsung melalui tautan yang telah kami sediakan di bagian Cookie Pihak Ketiga di atas.",
      "Terima kasih atas kepercayaan Anda dalam menggunakan Mova. Kami berkomitmen untuk melindungi privasi Anda dan memberikan pengalaman pengguna yang terbaik.",
    ],
  },
];

const relatedPages = [
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/terms", label: "Syarat & Ketentuan" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Hubungi Kami" },
];

export default function CookiePolicyPage() {
  const lastUpdated = "27 Mei 2026";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getmova.my.id" },
      { "@type": "ListItem", position: 2, name: "Kebijakan Cookie", item: "https://getmova.my.id/cookie-policy" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
                <li className="text-[#10B981] font-medium">Kebijakan Cookie</li>
              </ol>
            </nav>

            {/* Title section */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-border dark:border-[#27272A] text-muted-foreground dark:text-[#A1A1AA] mb-6">
                <Cookie className="h-3 w-3 text-[#10B981]" />
                Legal
              </span>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-foreground dark:text-[#FAFAFA] mb-4 mt-4"
                style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
              >
                Kebijakan{" "}
                <span className="font-bold text-[#10B981]">Cookie</span>
              </h1>
              <p className="text-muted-foreground dark:text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
                Kebijakan ini menjelaskan bagaimana Mova menggunakan cookie dan teknologi serupa, termasuk penggunaan Google Analytics dan Google AdSense. Pelajari cara mengelola preferensi cookie Anda.
              </p>
              <p className="text-xs text-muted-foreground/60 dark:text-[#A1A1AA]/60 mt-3">
                Terakhir diperbarui: {lastUpdated}
              </p>
            </div>

            {/* Important notice */}
            <div className="mb-12 p-6 rounded-xl bg-card dark:bg-[#111113] border-l-4 border-[#10B981]">
              <p className="text-sm text-foreground dark:text-[#FAFAFA] font-medium">
                Mova menggunakan Google AdSense untuk menampilkan iklan dan Google Analytics untuk menganalisis lalu lintas website. Kedua layanan ini menggunakan cookie untuk mengumpulkan informasi. Anda dapat mengelola preferensi cookie Anda melalui banner cookie consent yang muncul saat pertama kali mengunjungi website kami, atau melalui pengaturan browser Anda.
              </p>
            </div>

            {/* Google AdSense & Analytics specific notice */}
            <div className="mb-12 p-6 rounded-xl bg-card dark:bg-[#111113] border border-[#10B981]/30">
              <div className="flex items-center gap-3 mb-3">
                <Megaphone className="h-5 w-5 text-[#10B981]" />
                <h2
                  className="text-base font-bold text-foreground dark:text-[#FAFAFA]"
                  style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                >
                  Pemberitahuan Google AdSense & Google Analytics
                </h2>
              </div>
              <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed mb-3">
                Sebagai bagian dari penggunaan Google AdSense, Google dapat menggunakan cookie web untuk menayangkan iklan berdasarkan kunjungan sebelumnya pengguna ke situs web ini atau situs web lain di Internet. Penggunaan cookie iklan oleh Google memungkinkan Google dan mitranya untuk menayangkan iklan kepada pengunjung kami berdasarkan kunjungan mereka ke situs kami dan/atau situs lain di Internet.
              </p>
              <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed mb-3">
                Google Analytics menggunakan cookie untuk menganalisis penggunaan website kami secara anonim dan agregat. Data yang dikumpulkan membantu kami memahami cara pengunjung berinteraksi dengan website dan meningkatkan pengalaman pengguna.
              </p>
              <p className="text-sm text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                Pengguna dapat menolak penggunaan cookie iklan yang dipersonalisasi dengan mengunjungi{" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline inline-flex items-center gap-1">
                  Pengaturan Iklan Google <ExternalLink className="h-3 w-3" />
                </a>
                . Atau, Anda dapat memilih untuk tidak menggunakan cookie pihak ketiga dengan mengunjungi{" "}
                <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline inline-flex items-center gap-1">
                  www.networkadvertising.org/choices <ExternalLink className="h-3 w-3" />
                </a>
                .
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

                  {/* Cookie tables for section 5 (Daftar Cookie) */}
                  {section.title === "5. Daftar Cookie" && (
                    <div className="ml-14 mt-6 space-y-8">
                      {/* Essential Cookies Table */}
                      <div>
                        <h3
                          className="text-sm font-bold text-foreground dark:text-[#FAFAFA] mb-3 flex items-center gap-2"
                          style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                        >
                          <Shield className="h-4 w-4 text-[#10B981]" />
                          Cookie Esensial (Selalu Aktif)
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-border dark:border-[#27272A]">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-card dark:bg-[#111113]">
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Nama Cookie</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Tujuan</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Masa Berlaku</th>
                              </tr>
                            </thead>
                            <tbody>
                              {essentialCookies.map((cookie, cIndex) => (
                                <tr key={cIndex} className="border-b border-border dark:border-[#27272A] last:border-b-0">
                                  <td className="px-4 py-3 font-mono text-xs text-[#10B981] dark:text-[#10B981] whitespace-nowrap">{cookie.name}</td>
                                  <td className="px-4 py-3 text-muted-foreground dark:text-[#A1A1AA]">{cookie.purpose}</td>
                                  <td className="px-4 py-3 text-muted-foreground dark:text-[#A1A1AA] whitespace-nowrap">{cookie.duration}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3 space-y-2">
                          {essentialCookies.map((cookie, cIndex) => (
                            <p key={cIndex} className="text-xs text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                              <span className="font-mono text-[#10B981] dark:text-[#10B981]">{cookie.name}</span> — {cookie.description}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Analytics Cookies Table */}
                      <div>
                        <h3
                          className="text-sm font-bold text-foreground dark:text-[#FAFAFA] mb-3 flex items-center gap-2"
                          style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                        >
                          <BarChart3 className="h-4 w-4 text-[#10B981]" />
                          Cookie Analitik
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-border dark:border-[#27272A]">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-card dark:bg-[#111113]">
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Nama Cookie</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Tujuan</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Masa Berlaku</th>
                              </tr>
                            </thead>
                            <tbody>
                              {analyticsCookies.map((cookie, cIndex) => (
                                <tr key={cIndex} className="border-b border-border dark:border-[#27272A] last:border-b-0">
                                  <td className="px-4 py-3 font-mono text-xs text-[#10B981] dark:text-[#10B981] whitespace-nowrap">{cookie.name}</td>
                                  <td className="px-4 py-3 text-muted-foreground dark:text-[#A1A1AA]">{cookie.purpose}</td>
                                  <td className="px-4 py-3 text-muted-foreground dark:text-[#A1A1AA] whitespace-nowrap">{cookie.duration}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3 space-y-2">
                          {analyticsCookies.map((cookie, cIndex) => (
                            <p key={cIndex} className="text-xs text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                              <span className="font-mono text-[#10B981] dark:text-[#10B981]">{cookie.name}</span> — {cookie.description}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Advertising Cookies Table */}
                      <div>
                        <h3
                          className="text-sm font-bold text-foreground dark:text-[#FAFAFA] mb-3 flex items-center gap-2"
                          style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
                        >
                          <Megaphone className="h-4 w-4 text-[#10B981]" />
                          Cookie Periklanan
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-border dark:border-[#27272A]">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-card dark:bg-[#111113]">
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Nama Cookie</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Tujuan</th>
                                <th className="text-left px-4 py-3 font-medium text-foreground dark:text-[#FAFAFA] border-b border-border dark:border-[#27272A]">Masa Berlaku</th>
                              </tr>
                            </thead>
                            <tbody>
                              {advertisingCookies.map((cookie, cIndex) => (
                                <tr key={cIndex} className="border-b border-border dark:border-[#27272A] last:border-b-0">
                                  <td className="px-4 py-3 font-mono text-xs text-[#10B981] dark:text-[#10B981] whitespace-nowrap">{cookie.name}</td>
                                  <td className="px-4 py-3 text-muted-foreground dark:text-[#A1A1AA]">{cookie.purpose}</td>
                                  <td className="px-4 py-3 text-muted-foreground dark:text-[#A1A1AA] whitespace-nowrap">{cookie.duration}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3 space-y-2">
                          {advertisingCookies.map((cookie, cIndex) => (
                            <p key={cIndex} className="text-xs text-muted-foreground dark:text-[#A1A1AA] leading-relaxed">
                              <span className="font-mono text-[#10B981] dark:text-[#10B981]">{cookie.name}</span> — {cookie.description}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
                {relatedPages.map((page) => (
                  <a
                    key={page.href}
                    href={page.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border dark:border-[#27272A] bg-white dark:bg-[#09090B] text-muted-foreground dark:text-[#A1A1AA] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                    {page.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer notice */}
            <div className="mt-12 pt-8 border-t border-border dark:border-[#27272A] text-center">
              <p className="text-xs text-muted-foreground dark:text-[#A1A1AA]">
                &copy; 2026 Mova. Semua hak dilindungi. Kebijakan Cookie ini dapat diperbarui dari waktu ke waktu.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

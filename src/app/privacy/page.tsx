"use client";

import { Home, Shield, Lock, Eye, Globe, FileText, AlertTriangle, Mail, Scale, Server, UserX, Cookie, Megaphone, Database, ExternalLink } from "lucide-react";
import { MovaLogo } from "@/components/mova-logo";

const sections = [
  {
    icon: Eye,
    title: "Pengumpulan Data",
    content: [
      "Mova tidak mengumpulkan data pribadi dari pengguna kami secara langsung. Kami tidak mewajibkan registrasi, login, atau bentuk identifikasi pribadi apapun untuk menggunakan layanan utama kami.",
      "Saat Anda menggunakan layanan kami, kami hanya memproses URL video yang Anda berikan untuk tujuan mengambil informasi video. URL ini tidak disimpan di server kami setelah proses unduhan selesai.",
      "Kami tidak menyimpan video yang diunduh di server kami. Semua proses unduhan dilakukan langsung dari platform sumber.",
    ],
  },
  {
    icon: Globe,
    title: "Penggunaan Data",
    content: [
      "Karena kami tidak mengumpulkan data pribadi secara langsung, tidak ada penggunaan data pribadi yang perlu dijelaskan dari sisi kami. Aktivitas browsing dan unduhan Anda di Mova tetap privat dan tidak dilacak, dianalisis, atau dijual kepada pihak ketiga oleh Mova.",
      "Statistik unduhan yang disimpan secara lokal di browser Anda (melalui localStorage) hanya digunakan untuk memberikan pengalaman yang dipersonalisasi, seperti menampilkan riwayat unduhan dan video yang disimpan. Data ini tidak pernah meninggalkan perangkat Anda dan sepenuhnya under kendali Anda.",
    ],
  },
  {
    icon: Megaphone,
    title: "Iklan & Google AdSense",
    content: [
      "Mova menggunakan Google AdSense untuk menampilkan iklan di website kami. Google AdSense adalah layanan periklanan yang disediakan oleh Google LLC yang mungkin menggunakan cookie dan teknologi pelacakan serupa untuk menayangkan iklan yang relevan kepada pengunjung.",
      "Google AdSense dapat menggunakan cookie untuk menampilkan iklan berdasarkan kunjungan sebelumnya ke website ini atau website lain di internet. Penggunaan cookie iklan oleh Google memungkinkan Google dan mitranya untuk menayangkan iklan berdasarkan data kunjungan Anda ke situs ini dan/atau situs lain di internet.",
      "Anda dapat memilih untuk tidak menggunakan personalisasi iklan dengan mengunjungi Pengaturan Iklan Google (https://www.google.com/settings/ads). Alternatifnya, Anda dapat memilih untuk tidak menggunakan cookie pihak ketiga dengan mengunjungi halaman opt-out Network Advertising Initiative (https://www.networkadvertising.org/choices/) atau halaman opt-out Digital Advertising Alliance (https://optout.aboutads.info/).",
      "Untuk informasi lebih lanjut tentang bagaimana Google menggunakan data Anda, silakan baca Kebijakan Privasi Google: https://policies.google.com/privacy",
    ],
  },
  {
    icon: Database,
    title: "Vendor Periklanan Pihak Ketiga",
    content: [
      "Beberapa vendor periklanan pihak ketiga, termasuk Google, dapat menggunakan cookie untuk menayangkan iklan berdasarkan penelusuran sebelumnya oleh pengguna. Vendor ini mencakup namun tidak terbatas pada: Google AdSense, Google Analytics, dan layanan periklanan lainnya yang mungkin kami tambahkan di masa depan.",
      "Cookie periklanan ini memungkinkan pelacakan kunjungan Anda di berbagai website dan aplikasi untuk membangun profil minat Anda. Profil ini digunakan untuk menampilkan iklan yang lebih relevan dan dipersonalisasi kepada Anda.",
      "Anda memiliki hak untuk menolak penggunaan cookie periklanan dengan mengkonfigurasi pengaturan browser Anda, atau dengan menggunakan fitur 'Tolak Semua Cookie' pada banner persetujuan cookie kami.",
    ],
  },
  {
    icon: Cookie,
    title: "Cookie & Penyimpanan Lokal",
    content: [
      "Mova menggunakan beberapa jenis cookie dan teknologi penyimpanan lokal untuk memberikan layanan yang lebih baik kepada Anda:",
      "Cookie Esensial: Cookie yang diperlukan untuk operasi dasar website, seperti preferensi cookie consent dan pengaturan tema (dark/light mode). Cookie ini tidak dapat dinonaktifkan.",
      "Cookie Analitik: Cookie yang digunakan oleh Google Analytics untuk mengumpulkan informasi tentang bagaimana pengunjung menggunakan website kami. Data ini dilaporkan secara agregat dan anonim, sehingga tidak dapat mengidentifikasi individu secara langsung. Informasi ini membantu kami memahami pola penggunaan dan meningkatkan pengalaman pengguna.",
      "Cookie Periklanan: Cookie yang digunakan oleh Google AdSense dan mitra periklanan untuk menampilkan iklan yang relevan. Cookie ini dapat melacak aktivitas browsing Anda di berbagai website untuk keperluan penargetan iklan.",
      "Penyimpanan Lokal (localStorage): Mova menggunakan localStorage untuk menyimpan preferensi Anda, termasuk: preferensi bahasa, riwayat unduhan, video yang disimpan (bookmark), statistik unduhan, dan pengaturan tampilan. Data ini tidak pernah dikirim ke server kami dan sepenuhnya tersimpan di perangkat Anda.",
      "Semua data yang disimpan secara lokal di browser Anda dapat dihapus kapan saja melalui pengaturan browser atau dengan menggunakan fitur 'Hapus Semua' di dalam aplikasi.",
    ],
  },
  {
    icon: Server,
    title: "Layanan Pihak Ketiga",
    content: [
      "Mova menggunakan beberapa layanan pihak ketiga untuk menjalankan operasi kami:",
      "Google AdSense: Untuk menampilkan iklan. Kebijakan Privasi: https://policies.google.com/privacy",
      "Google Analytics: Untuk analitik website. Kebijakan Privasi: https://policies.google.com/privacy",
      "Vercel: Untuk hosting website. Kebijakan Privasi: https://vercel.com/legal/privacy-policy",
      "API pihak ketiga: Untuk mengambil informasi video dari platform yang didukung (TikTok, Instagram, YouTube, dll.). Layanan ini memiliki kebijakan privasi sendiri yang mengatur data yang mereka kumpulkan.",
      "Mova tidak bertanggung jawab atas praktik privasi situs web pihak ketiga ini. Kami mendorong Anda untuk membaca kebijakan privasi setiap situs web yang Anda kunjungi.",
    ],
  },
  {
    icon: UserX,
    title: "Hak Pengguna",
    content: [
      "Anda memiliki kendali penuh atas data Anda. Karena data pribadi yang kami kumpulkan secara langsung sangat minimal, Anda memiliki hak-hak berikut:",
      "Melihat dan mengelola data lokal Anda kapan saja melalui antarmuka aplikasi (riwayat, bookmark, statistik).",
      "Menghapus data lokal Anda dengan membersihkan localStorage browser atau menggunakan fitur 'Hapus Semua' di dalam aplikasi.",
      "Menolak cookie periklanan dan personalisasi iklan melalui banner cookie consent kami atau Pengaturan Iklan Google.",
      "Menonaktifkan cookie di pengaturan browser Anda (perhatikan bahwa ini dapat mempengaruhi fungsionalitas website).",
      "Meminta informasi tentang data yang mungkin dikumpulkan oleh pihak ketiga seperti Google dengan menghubungi mereka langsung.",
    ],
  },
  {
    icon: FileText,
    title: "DMCA & Hak Cipta",
    content: [
      "Mova adalah alat bantu yang memfasilitasi pengunduhan konten yang tersedia secara publik. Kami tidak menyimpan, mendistribusikan, atau menjadi tuan rumah atas materi berhak cipta apapun.",
      "Pengguna bertanggung jawab sepenuhnya untuk memastikan bahwa mereka memiliki hak untuk mengunduh dan menggunakan konten apapun yang diakses melalui layanan kami.",
      "Jika Anda meyakini bahwa konten berhak cipta Anda diakses secara melanggar hak Anda, silakan hubungi kami di support@getmova.my.id dengan menyertakan URL yang bersangkutan dan bukti kepemilikan. Untuk detail lebih lanjut, kunjungi halaman DMCA kami.",
    ],
  },
  {
    icon: Scale,
    title: "Disclaimer",
    content: [
      "Mova adalah alat gratis yang disediakan 'sebagaimana adanya' tanpa jaminan apapun, baik tersurat maupun tersirat. Kami tidak menjamin ketersediaan, akurasi, atau keandalan layanan ini.",
      "Kami tidak bertanggung jawab atas penyalahgunaan konten yang diunduh. Pengguna harus mematuhi ketentuan layanan dari platform asli dan hukum hak cipta yang berlaku.",
      "Mova tidak menyimpan video yang diunduh. Semua proses unduhan dilakukan langsung dari platform sumber.",
      "Kami berhak memodifikasi atau menghentikan layanan ini kapan saja tanpa pemberitahuan sebelumnya.",
    ],
  },
  {
    icon: Mail,
    title: "Hubungi Kami",
    content: [
      "Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, praktik data kami, atau ingin menggunakan hak-hak Anda terkait data pribadi, silakan hubungi kami di:",
      "Email: support@getmova.my.id",
      "TikTok: @abbbuw",
      "Telegram: @sixte3nnn",
      "Untuk pertanyaan terkait DMCA dan hak cipta, silakan kunjungi halaman DMCA kami di https://getmova.my.id/dmca",
    ],
  },
];

export default function PrivacyPage() {
  const lastUpdated = "26 Mei 2026";

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA]">
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
              Beranda
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
              <Shield className="h-3 w-3 text-[#2563EB]" />
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#FAFAFA] mb-4 mt-4">
              Kebijakan Privasi &{" "}
              <span className="font-bold text-[#2563EB]">Syarat Ketentuan</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm max-w-xl mx-auto leading-relaxed">
              Privasi Anda penting bagi kami. Mova dirancang sebagai alat yang mengutamakan privasi. Kebijakan ini menjelaskan bagaimana kami dan mitra kami (termasuk Google AdSense) menangani data.
            </p>
            <p className="text-xs text-[#A1A1AA]/60 mt-3">
              Terakhir diperbarui: {lastUpdated}
            </p>
          </div>

          {/* Important notice */}
          <div className="mb-12 p-6 rounded-xl bg-[#111113] border-l-4 border-[#2563EB]">
            <p className="text-sm text-[#FAFAFA] font-medium">
              Mova menggunakan Google AdSense untuk menampilkan iklan. AdSense dapat menggunakan cookie untuk personalisasi iklan. Anda dapat mengelola preferensi cookie Anda melalui banner cookie consent yang muncul saat pertama kali mengunjungi website kami.
            </p>
          </div>

          {/* AdSense specific notice */}
          <div className="mb-12 p-6 rounded-xl bg-[#111113] border border-[#4F46E5]/30">
            <div className="flex items-center gap-3 mb-3">
              <Megaphone className="h-5 w-5 text-[#4F46E5]" />
              <h2 className="text-base font-bold text-[#FAFAFA]">Pemberitahuan Google AdSense</h2>
            </div>
            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">
              Sebagai bagian dari penggunaan Google AdSense, Google dapat menggunakan cookie web untuk menayangkan iklan berdasarkan kunjungan sebelumnya pengguna ke situs web ini atau situs web lain di Internet. Penggunaan cookie iklan oleh Google memungkinkan Google dan mitranya untuk menayangkan iklan kepada pengunjung kami berdasarkan kunjungan mereka ke situs kami dan/atau situs lain di Internet.
            </p>
            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">
              Pengguna dapat menolak penggunaan cookie iklan yang dipersonalisasi dengan mengunjungi{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] hover:underline inline-flex items-center gap-1">
                Pengaturan Iklan Google <ExternalLink className="h-3 w-3" />
              </a>
              . Atau, Anda dapat memilih untuk tidak menggunakan cookie pihak ketiga dengan mengunjungi{" "}
              <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] hover:underline inline-flex items-center gap-1">
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
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111113] border border-[#27272A]">
                    <section.icon className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <h2 className="text-lg font-bold text-[#FAFAFA]">{section.title}</h2>
                </div>
                <div className="ml-14 space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm text-[#A1A1AA] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Internal Links */}
          <div className="mt-16 pt-8 border-t border-[#27272A]">
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">Halaman Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="/terms" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Syarat & Ketentuan</span>
                <span className="text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors">&rarr;</span>
              </a>
              <a href="/about" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Tentang Kami</span>
                <span className="text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors">&rarr;</span>
              </a>
              <a href="/disclaimer" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">Disclaimer</span>
                <span className="text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors">&rarr;</span>
              </a>
              <a href="/dmca" className="flex items-center justify-between p-4 rounded-lg border border-[#27272A] bg-[#111113] hover:border-[#2563EB]/50 transition-colors group">
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA]">DMCA</span>
                <span className="text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-8 pt-6 border-t border-[#27272A] text-center">
            <p className="text-xs text-[#A1A1AA]">
              &copy; 2026 Mova. All rights reserved. Kebijakan ini dapat diperbarui dari waktu ke waktu.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

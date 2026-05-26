import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA - Pemberitahuan Hak Cipta",
  description: "Kebijakan DMCA Mova - prosedur pengaduan pelanggaran hak cipta dan informasi kontak untuk pemilik hak cipta.",
  alternates: { canonical: "https://getmova.my.id/dmca" },
};

export default function DMCAPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-foreground mb-2">DMCA - Pemberitahuan Hak Cipta</h1>
          <p className="text-sm text-muted-foreground mb-8">Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">Kebijakan DMCA Mova</h2>
              <p>Mova menghormati hak kekayaan intelektual orang lain dan mengharapkan penggunanya untuk melakukan hal yang sama. Kami berkomitmen untuk menanggapi pemberitahuan pelanggaran hak cipta yang jelas sesuai dengan Digital Millennium Copyright Act (DMCA) dan hukum hak cipta yang berlaku.</p>
              <p className="mt-3">Penting untuk dipahami bahwa Mova adalah alat bantu teknis yang memungkinkan pengguna mengunduh konten yang sudah tersedia secara publik dari platform media sosial. Mova tidak menyimpan, meng-host, atau mendistribusikan konten apapun. Semua konten yang dapat diakses melalui layanan ini berasal langsung dari server platform sumber.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">Prosedur Pengaduan Pelanggaran Hak Cipta</h2>
              <p>Jika Anda adalah pemilik hak cipta atau berwenang atas nama pemilik hak cipta, dan Anda percaya bahwa konten Anda dapat diunduh melalui layanan Mova dengan cara yang melanggar hak cipta Anda, Anda dapat mengajukan pemberitahuan pelanggaran hak cipta dengan mengirimkan email ke alamat di bawah ini. Pemberitahuan harus mencakup informasi berikut:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>Tanda tangan fisik atau elektronik dari pemilik hak cipta atau pihak yang berwenang bertindak atas nama mereka</li>
                <li>Identifikasi karya yang dilindungi hak cipta yang diklaim telah dilanggar, atau jika ada beberapa karya, daftar representatif dari karya tersebut</li>
                <li>Identifikasi materi yang diklaim melanggar atau menjadi objek aktivitas pelanggaran, beserta informasi yang cukup untuk memungkinkan kami menemukan materi tersebut</li>
                <li>Informasi kontak Anda, termasuk alamat, nomor telepon, dan alamat email</li>
                <li>Pernyataan bahwa Anda memiliki keyakinan yang baik bahwa penggunaan materi tidak diizinkan oleh pemilik hak cipta, agennya, atau hukum</li>
                <li>Pernyataan bahwa informasi dalam pemberitahuan tersebut akurat, dan di bawah sumpah, bahwa Anda berwenang bertindak atas nama pemilik hak cipta</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">Kontak DMCA</h2>
              <p>Silakan kirim pemberitahuan pelanggaran hak cipta ke:</p>
              <div className="mt-3 p-4 bg-card border border-border rounded-lg">
                <p className="font-medium text-foreground">Email DMCA:</p>
                <a href="mailto:admin@getmova.my.id" className="text-primary hover:underline">admin@getmova.my.id</a>
                <p className="mt-2 text-muted-foreground">Subjek email: &quot;DMCA Takedown Notice - Mova&quot;</p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">Tanggapan Kami</h2>
              <p>Setelah menerima pemberitahuan pelanggaran hak cipta yang valid dan lengkap, Mova akan menindaklanjuti sesuai dengan prosedur yang berlaku. Tindakan yang mungkin kami ambil termasuk namun tidak terbatas pada: menghapus akses ke materi yang dilaporkan, memblokir URL tertentu agar tidak dapat diproses oleh layanan kami, atau mengambil langkah teknis lainnya yang diperlukan untuk mencegah akses ke materi yang dilaporkan.</p>
              <p className="mt-3">Kami akan berusaha merespons pemberitahuan DMCA yang valid dalam waktu 5-10 hari kerja. Harap dicatat bahwa pemberitahuan yang tidak lengkap atau tidak memenuhi persyaratan di atas mungkin tidak ditindaklanjuti.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">Pemberitahuan Balasan (Counter-Notice)</h2>
              <p>Jika Anda percaya bahwa materi Anda telah dihapus atau aksesnya dinonaktifkan karena kesalahan atau identifikasi yang salah, Anda dapat mengajukan pemberitahuan balasan. Pemberitahuan balasan harus mencakup identifikasi materi yang telah dihapus, pernyataan di bawah sumpah bahwa penghapusan dilakukan karena kesalahan, persetujuan terhadap yurisdiksi pengadilan, dan informasi kontak Anda.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-2">Kebijakan Pengulangan Pelanggaran</h2>
              <p>Mova akan menghentikan akses pengguna yang berulang kali melanggar hak cipta jika ditemukan bahwa pengguna tersebut telah melanggar hak cipta lebih dari dua kali. Kami menyimpan catatan pemberitahuan DMCA yang valid dan tindakan yang kami ambil untuk memastikan kepatuhan terhadap kebijakan ini.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

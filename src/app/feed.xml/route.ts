export async function GET() {
  const baseUrl = "https://getmova.my.id";
  const posts = [
    { title: "Cara Download Video TikTok Tanpa Watermark 2026", slug: "download-tiktok-tanpa-watermark", date: "2026-05-25", excerpt: "Panduan lengkap cara download video TikTok tanpa watermark menggunakan Mova. Langkah mudah, cepat, dan gratis." },
    { title: "Cara Download YouTube ke MP3 Gratis dan Cepat", slug: "download-youtube-mp3", date: "2026-05-20", excerpt: "Tutorial cara mengunduh video YouTube menjadi file MP3 berkualitas tinggi. Bandingkan kualitas audio 128kbps vs 320kbps." },
    { title: "Download Video Instagram Reels Tanpa Watermark", slug: "download-instagram-reels", date: "2026-05-15", excerpt: "Langkah mudah untuk download Instagram Reels tanpa watermark. Dapatkan video Reels berkualitas tinggi." },
    { title: "Cara Download Video Facebook HD Gratis 2026", slug: "download-video-facebook-hd", date: "2026-05-10", excerpt: "Panduan lengkap cara download video Facebook HD gratis. Simpan video Facebook berkualitas tinggi dengan Mova." },
    { title: "Cara Download Video Twitter X (Twitter) Gratis 2026", slug: "download-video-twitter-x", date: "2026-05-08", excerpt: "Panduan cara download video dari Twitter/X gratis dan cepat. Simpan video tweet favorit kamu tanpa watermark." },
    { title: "Cara Download Video Tanpa Aplikasi Tambahan 2026", slug: "download-video-tanpa-aplikasi", date: "2026-05-05", excerpt: "Download video langsung dari browser tanpa install aplikasi. Lebih aman, hemat storage, dan bebas malware." },
    { title: "Perbedaan Download Video MP4 dan Audio MP3 — Mana yang Lebih Baik?", slug: "perbedaan-download-video-dan-audio-mp3", date: "2026-05-03", excerpt: "Perbandingan lengkap antara format video MP4 dan audio MP3. Temukan mana yang lebih cocok untuk kebutuhanmu." },
    { title: "Tips Aman Download Video Online Tanpa Virus 2026", slug: "tips-aman-download-video-online", date: "2026-05-01", excerpt: "Tips dan panduan lengkap untuk download video online dengan aman tanpa virus, malware, dan ancaman keamanan." },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mova Blog - Tips &amp; Tutorial Download Video</title>
    <link>${baseUrl}/blog</link>
    <description>Tips dan tutorial download video dari TikTok, YouTube, Instagram, dan platform lainnya tanpa watermark</description>
    <language>id</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `<item><title>${post.title}</title><link>${baseUrl}/blog/${post.slug}</link><description>${post.excerpt}</description><pubDate>${new Date(post.date).toUTCString()}</pubDate><guid>${baseUrl}/blog/${post.slug}</guid></item>`).join("\n    ")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export async function GET() {
  const baseUrl = "https://getmova.my.id";
  const posts = [
    { title: "Cara Download Video TikTok Tanpa Watermark 2026", slug: "download-tiktok-tanpa-watermark", date: "2026-05-25", excerpt: "Panduan lengkap cara download video TikTok tanpa watermark menggunakan GetMova. Langkah mudah, cepat, dan gratis." },
    { title: "Download Video Instagram Reels Tanpa Watermark", slug: "download-instagram-reels", date: "2026-05-23", excerpt: "Langkah mudah untuk download Instagram Reels tanpa watermark. Dapatkan video Reels berkualitas tinggi." },
    { title: "Cara Download Video Facebook HD Gratis 2026", slug: "download-video-facebook-hd", date: "2026-05-22", excerpt: "Panduan lengkap cara download video Facebook HD gratis. Simpan video Facebook berkualitas tinggi dengan GetMova." },
    { title: "Cara Download Video Twitter X (Twitter) Gratis 2026", slug: "download-video-twitter-x", date: "2026-05-21", excerpt: "Panduan cara download video dari Twitter/X gratis dan cepat. Simpan video tweet favorit kamu tanpa watermark." },
    { title: "Cara Download Video Tanpa Aplikasi Tambahan 2026", slug: "download-video-tanpa-aplikasi", date: "2026-05-20", excerpt: "Download video langsung dari browser tanpa install aplikasi. Lebih aman, hemat storage, dan bebas malware." },
    { title: "Perbedaan Download Video MP4 dan Audio MP3 — Mana yang Lebih Baik?", slug: "perbedaan-download-video-dan-audio-mp3", date: "2026-05-19", excerpt: "Perbandingan lengkap antara format video MP4 dan audio MP3. Temukan mana yang lebih cocok untuk kebutuhanmu." },
    { title: "Tips Aman Download Video Online Tanpa Virus 2026", slug: "tips-aman-download-video-online", date: "2026-05-18", excerpt: "Tips dan panduan lengkap untuk download video online dengan aman tanpa virus, malware, dan ancaman keamanan." },
    { title: "Cara Download Video Pinterest Dengan Mudah", slug: "cara-download-video-pinterest", date: "2026-05-17", excerpt: "Tutorial lengkap download video dan gambar Pinterest dengan GetMova. Simpan konten favorit dari Pinterest dengan cepat." },
    { title: "Cara Download Video Dari Telegram", slug: "cara-download-video-dari-telegram", date: "2026-05-16", excerpt: "Panduan download video dari Telegram dengan mudah dan cepat menggunakan GetMova. Tanpa batas dan gratis." },
    { title: "Cara Download Reddit Video Dengan Audio", slug: "cara-download-reddit-video-dengan-audio", date: "2026-05-15", excerpt: "Tutorial download video Reddit dengan audio utuh. Solusi untuk masalah video Reddit yang sering kehilangan audio." },
    { title: "Perbandingan TikTok Downloader Terbaik 2026", slug: "perbandingan-tiktok-downloader", date: "2026-05-14", excerpt: "Review dan perbandingan fitur TikTok downloader terbaik tahun 2026. Mana yang paling worth it?" },
    { title: "Download Video Instagram Story dan Reels", slug: "download-video-instagram-story-dan-reels", date: "2026-05-11", excerpt: "Cara download Instagram Story dan Reels tanpa watermark. Simpan momen favorit dari Instagram." },
    { title: "Cara Download Video Dari Story Instagram", slug: "cara-download-video-dari-story-instagram", date: "2026-05-11", excerpt: "Panduan download video dari Instagram Story tanpa diketahui pemiliknya. Privasi terjaga." },
    { title: "Download Video Twitter X Tanpa Watermark", slug: "download-video-twitter-x-tanpa-watermark", date: "2026-05-10", excerpt: "Tutorial download video Twitter/X tanpa watermark dan kualitas terbaik menggunakan GetMova." },
    { title: "Download Video Tanpa Watermark Gratis — Panduan Lengkap", slug: "download-video-tanpa-watermark-gratis", date: "2026-05-09", excerpt: "Kumpulan cara download video tanpa watermark dari berbagai platform. Panduan lengkap dan gratis." },
    { title: "Download Video Tanpa Watermark Terbaik 2026", slug: "download-video-tanpa-watermark-terbaik", date: "2026-05-04", excerpt: "Rekomendasi situs download video tanpa watermark terbaik tahun 2026. Review lengkap." },
    { title: "Cara Download Video Facebook HD Terbaru", slug: "cara-download-video-facebook-hd", date: "2026-05-03", excerpt: "Panduan download video Facebook dalam kualitas HD terbaik. Update metode terbaru 2026." },
    { title: "Perbedaan Download Video HD dan SD — Mana yang Lebih Baik?", slug: "perbedaan-download-video-hd-dan-sd", date: "2026-05-02", excerpt: "Perbandingan kualitas video HD vs SD. Temukan mana yang lebih cocok untuk kebutuhanmu." },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GetMova Blog - Tips &amp; Tutorial Download Video</title>
    <link>${baseUrl}/blog</link>
    <description>Tips dan tutorial download video dari TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit dan platform lainnya tanpa watermark</description>
    <language>id</language>
    <managingEditor>admin@getmova.my.id (GetMova Admin)</managingEditor>
    <webMaster>admin@getmova.my.id (GetMova Admin)</webMaster>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${baseUrl}/mova-logo-new.png</url>
      <title>GetMova</title>
      <link>${baseUrl}</link>
      <width>512</width>
      <height>512</height>
    </image>
    ${posts.map(post => `<item><title>${post.title}</title><link>${baseUrl}/blog/${post.slug}</link><description>${post.excerpt}</description><pubDate>${new Date(post.date).toUTCString()}</pubDate><guid>${baseUrl}/blog/${post.slug}</guid><category>Download Video</category></item>`).join("\n    ")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

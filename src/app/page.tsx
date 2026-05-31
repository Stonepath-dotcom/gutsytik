"use client";

import React, { useState, useCallback, useRef, useEffect, createContext, useContext, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Download, Zap, Shield, Smartphone, CheckCircle,
  Menu, X, ChevronDown, Play, Clock, User, Loader2,
  AlertCircle, Film, Sun, Moon,
  Share2, Bookmark, Copy, Eye, EyeOff,
  Link as LinkIcon, Search, ArrowRight, Globe,
  ArrowUp, Star, Mail, MessageCircle, Music, Video, Monitor, Award, Headphones,
  ShieldCheck, Database, History, FileText, Trash2,
  Wrench, ArrowRightLeft, HardDrive, Scissors, Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MovaLogo } from "@/components/mova-logo";
import { useToast } from "@/hooks/use-toast";
import { PhotoCarousel } from "@/components/photo-carousel";
import Image from "next/image";

/* ──────── Types ──────── */
interface QualityOption { label: string; resolution: string; url: string; originalUrl?: string; }
interface DownloadResult {
  title: string; thumbnail: string; duration: string;
  author: string; platform: string; downloadUrl: string; originalDownloadUrl?: string;
  qualityOptions: QualityOption[]; filename: string;
  isPhotoSlide?: boolean; images?: string[]; originalImages?: string[]; imageCount?: number;
}
interface HistoryItem {
  id: string; title: string; platform: string; author: string;
  thumbnail: string; duration: string; url: string;
  downloadUrl: string; timestamp: number;
}
interface BookmarkItem {
  id: string; title: string; platform: string; author: string;
  thumbnail: string; duration: string; url: string; timestamp: number;
}

/* ──────── FEATURE 1: Scroll Reveal Hook ──────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Check for reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("revealed");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay for smoother cascade feel
          requestAnimationFrame(() => {
            el.classList.add("revealed");
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ──────── Platform SVG Icons ──────── */
function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/>
    </svg>
  );
}
function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function TwitterXIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function PinterestIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/>
    </svg>
  );
}
function RedditIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  );
}

/* ──────── Platform Data (NO YouTube) ──────── */
interface PlatformDef {
  name: string;
  color: string;
  gradient?: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const PLATFORMS: PlatformDef[] = [
  { name: "TikTok", color: "#010101", Icon: TikTokIcon },
  { name: "Instagram", color: "#E1306C", gradient: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)", Icon: InstagramIcon },
  { name: "Facebook", color: "#1877F2", Icon: FacebookIcon },
  { name: "Twitter/X", color: "#14171A", Icon: TwitterXIcon },
  { name: "Pinterest", color: "#E60023", Icon: PinterestIcon },
  { name: "Reddit", color: "#FF4500", Icon: RedditIcon },
];

function getPlatformDef(name: string): PlatformDef {
  return PLATFORMS.find(p => p.name === name) || { name, color: "#6B7280", Icon: Play };
}

/* ──────── Constants ──────── */
const HISTORY_KEY = "mova_history";
const BOOKMARK_KEY = "mova_bookmarks";
const LANG_KEY = "mova_lang";
const ONBOARD_KEY = "mova_onboarded";
const MAX_HISTORY = 20;
const RED = "#E52222";

/* ──────── Translations (ID/EN) — No YouTube ──────── */
const translations: Record<string, Record<string, string>> = {
  id: {
    "nav.download": "Download",
    "hero.small": "Online Video",
    "hero.big": "Downloader",
    "hero.subtitle": "Jangan Lewatkan! Coba GetMova Video Downloader, Solusi Gratis Untuk Download Video Dari Berbagai Platform Dengan Cepat Dan Mudah!",
    "input.placeholder": "Masukkan Link Video Di Sini...",
    "btn.download": "Download",
    "result.found": "Video berhasil ditemukan!",
    "result.selectQuality": "Pilih kualitas:",
    "result.preview": "Preview", "result.share": "Bagikan",
    "result.bookmark": "Bookmark", "result.bookmarked": "Tersimpan",
    "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Salin Caption", "result.captionCopied": "Caption disalin!",
    "platforms.label": "Platform Yang Didukung",
    "free.badge": "Gratis",
    "free.title1": "Video",
    "free.titleRed": "Downloader",
    "free.desc": "Dengan Platform Ini, Kamu Bisa Dengan Mudah Download Video Dari Berbagai Platform Sosial Media Secara Gratis Tanpa Watermark!",
    "free.btn": "Pelajari Lebih Lanjut",
    "how.title": "Cara Menggunakan GetMova",
    "how.step1.title": "Cari Video",
    "how.step1.desc": "Temukan video yang kamu inginkan dari platform yang tersedia dan salin link-nya.",
    "how.step2.title": "Tempel Link",
    "how.step2.desc": "Tempel link yang sudah disalin di kolom input di atas lalu tunggu sistem menampilkan link download.",
    "how.step3.title": "Download Video",
    "how.step3.desc": "Pilih kualitas yang diinginkan dan klik tombol download untuk menyimpan video ke perangkatmu.",
    "feat1.title": "Download Cepat",
    "feat1.desc": "Proses download super cepat dengan server yang handal. Tidak perlu menunggu lama untuk mendapatkan video favoritmu.",
    "feat2.title": "Kualitas HD",
    "feat2.desc": "Download video dalam kualitas tinggi hingga Full HD. Nikmati video dengan resolusi terbaik tanpa kompromi.",
    "feat3.title": "Tanpa Watermark",
    "feat3.desc": "Semua video yang didownload bebas watermark. Dapatkan video asli tanpa logo atau tanda air yang mengganggu.",
    "why.title": "Kenapa Harus GetMova?",
    "why.1.title": "100% Gratis",
    "why.1.desc": "Download video sepuasnya tanpa biaya apapun. Tidak ada biaya tersembunyi atau langganan.",
    "why.2.title": "Tanpa Registrasi",
    "why.2.desc": "Tidak perlu daftar atau login. Langsung paste link dan download video secara instan.",
    "why.3.title": "Multi-Platform",
    "why.3.desc": "Support TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit dan masih banyak lagi.",
    "why.4.title": "Aman & Privat",
    "why.4.desc": "Tidak ada data pribadi yang disimpan. Semua proses dilakukan secara aman dan terenkripsi.",
    "faq.title": "Pertanyaan Yang Sering",
    "faq.titleRed": "Diajukan",
    "faq.subtitle": "Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang GetMova",
    "faq.1.q": "Apakah GetMova benar-benar gratis?",
    "faq.1.a": "Ya, GetMova 100% gratis tanpa biaya tersembunyi. Kamu bisa download video sepuasnya tanpa perlu mendaftar atau membayar apapun. Semua fitur bisa kamu gunakan secara penuh tanpa batasan.",
    "faq.2.q": "Apakah ada batasan jumlah download?",
    "faq.2.a": "Tidak ada batasan! Kamu bisa mendownload video sebanyak yang kamu mau tanpa batas harian atau bulanan. Download sepuasnya kapan saja dan di mana saja.",
    "faq.3.q": "Di mana video yang didownload disimpan?",
    "faq.3.a": "Video akan otomatis tersimpan di folder download perangkatmu, baik di HP maupun komputer. Kalau di HP biasanya ada di folder Download, kalau di komputer ada di folder Downloads.",
    "faq.4.q": "Platform apa saja yang didukung?",
    "faq.4.a": "GetMova mendukung berbagai platform populer seperti TikTok, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit. Kami terus menambahkan platform baru secara berkala.",
    "faq.5.q": "Apakah video yang didownload bebas watermark?",
    "faq.5.a": "Ya! Semua video yang didownload melalui GetMova bebas watermark. Kamu akan mendapatkan video asli tanpa logo atau tanda air yang mengganggu.",
    "faq.6.q": "Apakah GetMova aman digunakan?",
    "faq.6.a": "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu. Semua proses dilakukan secara aman dengan enkripsi. Privasi kamu adalah prioritas kami.",
    "faq.cta.title": "Masih punya pertanyaan?",
    "faq.cta.desc": "Hubungi kami jika kamu punya pertanyaan lain yang belum terjawab",
    "faq.cta.btn": "Hubungi Kami",
    "faq.search": "Cari pertanyaan...",
    "faq.noresults": "Tidak ada pertanyaan yang cocok",
    "footer.desc": "Download video tanpa watermark dari berbagai platform populer. Cepat, gratis, dan mudah.",
    "error.emptyUrl": "Masukkan link video terlebih dahulu!",
    "error.invalidUrl": "URL tidak valid. Pastikan link yang dimasukkan benar.",
    "error.server": "Gagal terhubung ke server. Silakan coba lagi.",
    "error.downloadFail": "Gagal mengunduh video. Coba klik kanan pada tombol download dan pilih 'Save link as...'",
    "toast.videoFound": "Video ditemukan!",
    "toast.selectQuality": "Pilih kualitas dan download.",
    "toast.downloadStart": "Download dimulai!",
    "toast.linkCopied": "Link berhasil disalin!",
    "toast.bookmarkAdded": "Video disimpan ke bookmark!",
    "toast.bookmarkRemoved": "Bookmark dihapus.",
    "toast.autoPaste": "Link otomatis ditempel!",
    "fmt.title": "Format Yang Didukung",
    "fmt.subtitle": "Download video dalam berbagai format dan kualitas sesuai kebutuhanmu",
    "fmt.mp4": "MP4", "fmt.mp3": "MP3", "fmt.webm": "WEBM", "fmt.avi": "AVI",
    "fmt.360p": "360p", "fmt.480p": "480p", "fmt.720p": "720p", "fmt.1080p": "1080p", "fmt.4k": "4K", "fmt.audio": "Audio Only",
    "stats.1.num": "10M+", "stats.1.label": "Download",
    "stats.2.num": "6+", "stats.2.label": "Platform",
    "stats.3.num": "100%", "stats.3.label": "Gratis",
    "stats.4.num": "4.9", "stats.4.label": "Rating",
    "compare.title": "Perbandingan GetMova",
    "compare.subtitle": "Bandingkan GetMova dengan downloader lainnya",
    "compare.feature": "Fitur", "compare.getmova": "GetMova", "compare.snaptik": "SnapTik", "compare.savefrom": "SaveFrom", "compare.y2mate": "Y2Mate",
    "compare.nowatermark": "Tanpa Watermark", "compare.free": "Gratis", "compare.noads": "Tanpa Iklan", "compare.noreg": "Tanpa Registrasi", "compare.hdquality": "Kualitas HD", "compare.multiplatform": "Multi-Platform",
    "testi.title": "Apa Kata Mereka?",
    "testi.subtitle": "Dengarkan pengalaman pengguna GetMova",
    "testi.1.name": "Rina S.", "testi.1.role": "Pengguna TikTok",
    "testi.1.text": "GetMova bikin download video TikTok jadi gampang banget! Hasilnya jernih, tanpa watermark, dan prosesnya super cepat. Recommended banget!",
    "testi.2.name": "Andi P.", "testi.2.role": "Content Creator",
    "testi.2.text": "Akhirnya nemu downloader yang bener-bener gratis tanpa watermark. Dari dulu cari-cari, sekarang cuma pakai GetMova. Top!",
    "testi.3.name": "Sarah M.", "testi.3.role": "Mahasiswa",
    "testi.3.text": "Interface-nya clean dan prosesnya super cepat. Gak ribet, tinggal paste link langsung download. Paling enak dipakai!",
    "nl.title": "Dapatkan Update Terbaru",
    "nl.subtitle": "Daftar newsletter kami untuk mendapatkan info fitur baru dan platform yang didukung",
    "nl.placeholder": "Masukkan email kamu...",
    "nl.btn": "Berlangganan",
    "nl.disclaimer": "Kami tidak akan mengirim spam",
    "wa.tooltip": "Butuh bantuan?",
    "float.download": "Download",
    "loading.finding": "Mencari video...",
    "loading.getting": "Mendapatkan link download...",
    "loading.almost": "Hampir selesai...",
    "trust.ssl": "SSL Secured",
    "trust.novirus": "No Virus",
    "trust.nodata": "No Data Stored",
    "trust.safe": "100% Safe",
    "history.title": "Riwayat Download",
    "history.clear": "Hapus Semua",
    "history.empty": "Belum ada riwayat download",
    "history.clearConfirm": "Yakin ingin menghapus semua riwayat?",
    "platforms.title": "Download dari Platform Favorit",
    "platforms.subtitle": "Pilih platform dan mulai download video favoritmu",
    "platforms.tiktok.desc": "Download video TikTok tanpa watermark dengan cepat",
    "platforms.ig.desc": "Download video Instagram Reels dan Stories",
    "platforms.fb.desc": "Download video Facebook dengan kualitas HD",
    "platforms.twitter.desc": "Download video Twitter/X dengan mudah",
    "platforms.pinterest.desc": "Download video dan gambar Pinterest",
    "platforms.reddit.desc": "Download video Reddit dalam kualitas tinggi",
    "blog.title": "Tips & Artikel Terbaru",
    "blog.subtitle": "Baca panduan dan tips terbaru seputar download video",
    "blog.1.title": "Cara Download Video TikTok Tanpa Watermark",
    "blog.2.title": "Tips Download Video Instagram Reels",
    "blog.3.title": "Mengapa GetMova Pilihan Terbaik?",
    "blog.readmore": "Baca Selengkapnya",
    "blog.minread": "min baca",
    "hero.liveCount": "🔥 {count} orang sedang download hari ini",
    "hero.shortcutHint": "Ctrl+V to paste",
    "onboard.tooltip": "Tempel link video di sini!",
  },
  en: {
    "nav.download": "Download",
    "hero.small": "Online Video",
    "hero.big": "Downloader",
    "hero.subtitle": "Do Not Look Below! Explore Our GetMova Video Downloader, A Free Solution To Quickly Download Videos Or Music With Just One Click!",
    "input.placeholder": "Insert Video Link Here...",
    "btn.download": "Download",
    "result.found": "Video found successfully!",
    "result.selectQuality": "Select quality:",
    "result.preview": "Preview", "result.share": "Share",
    "result.bookmark": "Bookmark", "result.bookmarked": "Saved",
    "result.downloadThumb": "Thumbnail",
    "result.copyCaption": "Copy Caption", "result.captionCopied": "Caption copied!",
    "platforms.label": "Supported Platforms",
    "free.badge": "Free",
    "free.title1": "Video",
    "free.titleRed": "Downloader",
    "free.desc": "With This Platform, You Can Easily Download Any Video From Various Social Media Platforms For Free Without Watermark!",
    "free.btn": "Learn More",
    "how.title": "How To Use GetMova",
    "how.step1.title": "Find Video",
    "how.step1.desc": "Find the video you want from the available platforms and copy its link.",
    "how.step2.title": "Paste Link",
    "how.step2.desc": "Paste the copied link in the input field above and wait for the system to display the download links.",
    "how.step3.title": "Download Video",
    "how.step3.desc": "Select the desired quality and click the download button to save the video to your device.",
    "feat1.title": "Fast Download",
    "feat1.desc": "Super fast download process with reliable servers. No need to wait long to get your favorite videos.",
    "feat2.title": "HD Quality",
    "feat2.desc": "Download videos in high quality up to Full HD. Enjoy videos with the best resolution without compromise.",
    "feat3.title": "No Watermark",
    "feat3.desc": "All downloaded videos are watermark-free. Get original videos without annoying logos or watermarks.",
    "why.title": "Why Choose GetMova?",
    "why.1.title": "100% Free",
    "why.1.desc": "Download as many videos as you want without any cost. No hidden fees or subscriptions.",
    "why.2.title": "No Registration",
    "why.2.desc": "No need to sign up or login. Just paste the link and download videos instantly.",
    "why.3.title": "Multi-Platform",
    "why.3.desc": "Support TikTok, Instagram, Facebook, Twitter/X, Pinterest, Reddit and many more.",
    "why.4.title": "Safe & Private",
    "why.4.desc": "No personal data stored. All processes are done securely and encrypted.",
    "faq.title": "Frequently Asked",
    "faq.titleRed": "Questions",
    "faq.subtitle": "Find answers to the most commonly asked questions about GetMova",
    "faq.1.q": "Is GetMova really free?",
    "faq.1.a": "Yes, GetMova is 100% free with no hidden costs. You can download as many videos as you want without registering or paying anything. All features are fully available without limitations.",
    "faq.2.q": "Is there a download limit?",
    "faq.2.a": "No limits! You can download as many videos as you want without daily or monthly restrictions. Download as much as you want, anytime and anywhere.",
    "faq.3.q": "Where are the downloaded videos stored?",
    "faq.3.a": "Videos will automatically be saved to your device's download folder, whether on phone or computer. On mobile, check the Download folder. On desktop, look in the Downloads folder.",
    "faq.4.q": "What platforms are supported?",
    "faq.4.a": "GetMova supports various popular platforms including TikTok, Instagram, Facebook, Twitter/X, Pinterest, and Reddit. We continue to add new platforms regularly.",
    "faq.5.q": "Are downloaded videos watermark-free?",
    "faq.5.a": "Yes! All videos downloaded through GetMova are watermark-free. You'll get the original video without any annoying logos or watermarks.",
    "faq.6.q": "Is GetMova safe to use?",
    "faq.6.a": "Absolutely safe! We don't store any personal data or download history. All processes are done securely with encryption. Your privacy is our priority.",
    "faq.cta.title": "Still have questions?",
    "faq.cta.desc": "Contact us if you have any other unanswered questions",
    "faq.cta.btn": "Contact Us",
    "faq.search": "Search questions...",
    "faq.noresults": "No matching questions",
    "footer.desc": "Download videos without watermark from popular platforms. Fast, free, and easy.",
    "error.emptyUrl": "Please enter a video link first!",
    "error.invalidUrl": "Invalid URL. Make sure the link is correct.",
    "error.server": "Failed to connect to server. Please try again.",
    "error.downloadFail": "Failed to download video. Try right-clicking the download button and select 'Save link as...'",
    "toast.videoFound": "Video found!",
    "toast.selectQuality": "Select quality and download.",
    "toast.downloadStart": "Download started!",
    "toast.linkCopied": "Link copied successfully!",
    "toast.bookmarkAdded": "Video saved to bookmarks!",
    "toast.bookmarkRemoved": "Bookmark removed.",
    "toast.autoPaste": "Link auto-pasted!",
    "fmt.title": "Supported Formats",
    "fmt.subtitle": "Download videos in various formats and qualities to suit your needs",
    "fmt.mp4": "MP4", "fmt.mp3": "MP3", "fmt.webm": "WEBM", "fmt.avi": "AVI",
    "fmt.360p": "360p", "fmt.480p": "480p", "fmt.720p": "720p", "fmt.1080p": "1080p", "fmt.4k": "4K", "fmt.audio": "Audio Only",
    "stats.1.num": "10M+", "stats.1.label": "Downloads",
    "stats.2.num": "6+", "stats.2.label": "Platforms",
    "stats.3.num": "100%", "stats.3.label": "Free",
    "stats.4.num": "4.9", "stats.4.label": "Rating",
    "compare.title": "GetMova Comparison",
    "compare.subtitle": "Compare GetMova with other downloaders",
    "compare.feature": "Feature", "compare.getmova": "GetMova", "compare.snaptik": "SnapTik", "compare.savefrom": "SaveFrom", "compare.y2mate": "Y2Mate",
    "compare.nowatermark": "No Watermark", "compare.free": "Free", "compare.noads": "No Ads", "compare.noreg": "No Registration", "compare.hdquality": "HD Quality", "compare.multiplatform": "Multi-Platform",
    "testi.title": "What They Say?",
    "testi.subtitle": "Hear what GetMova users have to say",
    "testi.1.name": "Rina S.", "testi.1.role": "TikTok User",
    "testi.1.text": "GetMova makes downloading TikTok videos super easy! The results are clear, no watermark, and the process is super fast. Highly recommended!",
    "testi.2.name": "Andi P.", "testi.2.role": "Content Creator",
    "testi.2.text": "Finally found a downloader that's truly free without watermarks. After searching for so long, now I only use GetMova. Top notch!",
    "testi.3.name": "Sarah M.", "testi.3.role": "Student",
    "testi.3.text": "The interface is clean and the process is super fast. No hassle, just paste the link and download. Best one to use!",
    "nl.title": "Get Latest Updates",
    "nl.subtitle": "Subscribe to our newsletter to get info about new features and supported platforms",
    "nl.placeholder": "Enter your email...",
    "nl.btn": "Subscribe",
    "nl.disclaimer": "We won't send spam",
    "wa.tooltip": "Need help?",
    "float.download": "Download",
    "loading.finding": "Finding video...",
    "loading.getting": "Getting download link...",
    "loading.almost": "Almost done...",
    "trust.ssl": "SSL Secured",
    "trust.novirus": "No Virus",
    "trust.nodata": "No Data Stored",
    "trust.safe": "100% Safe",
    "history.title": "Download History",
    "history.clear": "Clear All",
    "history.empty": "No download history yet",
    "history.clearConfirm": "Are you sure you want to clear all history?",
    "platforms.title": "Download from Your Favorite Platform",
    "platforms.subtitle": "Choose a platform and start downloading your favorite videos",
    "platforms.tiktok.desc": "Download TikTok videos without watermark fast",
    "platforms.ig.desc": "Download Instagram Reels and Stories",
    "platforms.fb.desc": "Download Facebook videos in HD quality",
    "platforms.twitter.desc": "Download Twitter/X videos easily",
    "platforms.pinterest.desc": "Download Pinterest videos and images",
    "platforms.reddit.desc": "Download Reddit videos in high quality",
    "blog.title": "Latest Tips & Articles",
    "blog.subtitle": "Read the latest guides and tips about video downloading",
    "blog.1.title": "How to Download TikTok Videos Without Watermark",
    "blog.2.title": "Tips for Downloading Instagram Reels",
    "blog.3.title": "Why GetMova Is the Best Choice?",
    "blog.readmore": "Read More",
    "blog.minread": "min read",
    "hero.liveCount": "🔥 {count} people downloading today",
    "hero.shortcutHint": "Ctrl+V to paste",
    "onboard.tooltip": "Paste your video link here!",
  },
};

/* ──────── Language Context ──────── */
type Lang = "id" | "en";
const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }>({
  lang: "id", setLang: () => {}, t: (k) => k,
});
function useLanguage() { return useContext(LanguageContext); }

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "id";
  try { const s = localStorage.getItem(LANG_KEY) as Lang | null; if (s === "id" || s === "en") return s; } catch {}
  return "id";
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const setLang = useCallback((l: Lang) => { setLangState(l); try { localStorage.setItem(LANG_KEY, l); } catch {} }, []);
  const t = useCallback((key: string) => translations[lang]?.[key] || translations.id[key] || key, [lang]);
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

/* ──────── Utility Functions ──────── */
function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try { const d = localStorage.getItem(HISTORY_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveToHistory(item: HistoryItem) {
  try {
    const h = getHistory().filter(x => x.url !== item.url);
    h.unshift(item);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, MAX_HISTORY)));
    window.dispatchEvent(new Event("mova:history-changed"));
  } catch {}
}
function getBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try { const d = localStorage.getItem(BOOKMARK_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveBookmark(item: BookmarkItem) {
  try {
    const b = getBookmarks();
    if (b.some(x => x.url === item.url)) return;
    b.unshift(item);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(b));
    window.dispatchEvent(new Event("mova:bookmarks-changed"));
  } catch {}
}
function removeBookmark(url: string) {
  try {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(getBookmarks().filter(b => b.url !== url)));
    window.dispatchEvent(new Event("mova:bookmarks-changed"));
  } catch {}
}
function isBookmarked(url: string): boolean { return getBookmarks().some(b => b.url === url); }

function detectPlatform(urlStr: string): string {
  try {
    const h = new URL(urlStr).hostname.toLowerCase();
    if (h.includes("tiktok") || h.includes("vm.tiktok")) return "TikTok";
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("twitter") || h.includes("x.com")) return "Twitter/X";
    if (h.includes("facebook") || h.includes("fb.watch") || h.includes("fb.com")) return "Facebook";
    if (h.includes("pinterest")) return "Pinterest";
    if (h.includes("reddit")) return "Reddit";
  } catch {}
  return "Unknown";
}

function relativeTime(ts: number, lang: Lang): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return lang === "id" ? "Baru saja" : "Just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

/* ══════════════════════════════════════════════════
   NAVBAR — Solid white bg, logo left, center links, controls right
   ══════════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);
  const revealRef = useScrollReveal();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: Event) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler as EventListener);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler as EventListener); };
  }, [open]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: lang === "id" ? "Cara Pakai" : "How to Use", href: "#how" },
    { label: lang === "id" ? "Fitur" : "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header ref={revealRef} className="section-reveal fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-white/10" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-8xl h-16 lg:h-18 flex items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-1.5 shrink-0" aria-label="GetMova - Home">
          <MovaLogo size={28} showText={true} />
        </a>
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link-desktop text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#E52222] dark:hover:text-[#E52222] transition-colors">{link.label}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors" aria-label="Toggle language">
            <Globe className="h-4 w-4" />{lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" aria-label="Toggle theme">
            {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <Sun className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="flex items-center gap-1 h-8 px-2 text-gray-500 dark:text-gray-400 text-xs font-bold">
            <Globe className="h-3.5 w-3.5" />{lang === "id" ? "EN" : "ID"}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:text-foreground hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" aria-label="Toggle theme">
            {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <Sun className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen(!open)} className="h-8 w-8 flex items-center justify-center text-gray-500 dark:text-gray-400" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div ref={menuRef} className="md:hidden border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#E52222] dark:hover:text-[#E52222] rounded-lg">{link.label}</a>
            ))}
            <button onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); }} className="block w-full text-left px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#E52222] rounded-lg">
              {mounted && theme === "dark" ? (lang === "id" ? "Mode Terang" : "Light Mode") : (lang === "id" ? "Mode Gelap" : "Dark Mode")}
            </button>
            <a href="#hero" onClick={() => setOpen(false)} className="block pt-1">
              <Button className="w-full bg-[#E52222] text-white font-semibold rounded-lg hover:bg-[#C91C1C]"><Download className="mr-2 h-4 w-4" />{t("nav.download")}</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════
   HERO — White bg, grayscale people image, centered text
   ══════════════════════════════════════════════════ */
function HeroSection() {
  const { lang, t } = useLanguage();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const [selectedQuality, setSelectedQuality] = useState(0);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [liveCount, setLiveCount] = useState(() => Math.floor(Math.random() * 1600) + 1200);
  const [showOnboard, setShowOnboard] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast, dismiss } = useToast();

  const showToast = useCallback((title: string, desc: string, variant: "default" | "destructive" = "default") => {
    const id = toast({ title, description: desc, variant });
    setTimeout(() => dismiss(id), 3000);
  }, [toast, dismiss]);

  useEffect(() => {
    if (result) setIsBookmarkedState(isBookmarked(result.downloadUrl));
  }, [result]);

  // FEATURE 10: Live download counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => {
        const delta = Math.floor(Math.random() * 21) - 10;
        return Math.max(1200, Math.min(2800, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // FEATURE 14: Onboarding tooltip
  useEffect(() => {
    try {
      if (!localStorage.getItem(ONBOARD_KEY)) {
        const timer = setTimeout(() => setShowOnboard(true), 1500);
        const hide = () => { setShowOnboard(false); try { localStorage.setItem(ONBOARD_KEY, "1"); } catch {} };
        const clickHandler = () => { hide(); document.removeEventListener("click", clickHandler); };
        document.addEventListener("click", clickHandler);
        setTimeout(() => { hide(); document.removeEventListener("click", clickHandler); }, 6000);
        return () => { clearTimeout(timer); document.removeEventListener("click", clickHandler); };
      }
    } catch {}
  }, []);

  // FEATURE 12: Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setShowHistory(false); return; }
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        if (document.activeElement !== inputRef.current) {
          e.preventDefault();
          inputRef.current?.focus();
          navigator.clipboard.readText().then(text => {
            if (text && (text.startsWith("http") || text.startsWith("www"))) {
              setUrl(text);
              showToast(t("toast.autoPaste"), "");
            }
          }).catch(() => {});
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [t, showToast]);

  // History sync
  useEffect(() => {
    const sync = () => setHistoryItems(getHistory());
    sync();
    window.addEventListener("mova:history-changed", sync);
    return () => window.removeEventListener("mova:history-changed", sync);
  }, [showHistory]);

  // FEATURE 2: Auto-paste on focus
  const handleInputFocus = useCallback(() => {
    if (url.trim()) return;
    try {
      navigator.clipboard.readText().then(text => {
        if (text && (text.startsWith("http") || text.startsWith("www")) && !url.trim()) {
          setUrl(text);
          showToast(t("toast.autoPaste"), "");
        }
      }).catch(() => {});
    } catch {}
  }, [url, t, showToast]);

  const handleAnalyze = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) { setError(t("error.emptyUrl")); return; }
    try { new URL(trimmed.startsWith("www.") ? "https://" + trimmed : trimmed); } catch { setError(t("error.invalidUrl")); return; }
    setLoading(true); setError(""); setResult(null); setLoadingMsg(t("loading.finding"));
    const msgs = [t("loading.finding"), t("loading.getting"), t("loading.almost")];
    let msgIdx = 0;
    const msgInterval = setInterval(() => { msgIdx = Math.min(msgIdx + 1, msgs.length - 1); setLoadingMsg(msgs[msgIdx]); }, 5000);
    try {
      const res = await fetch("/api/download", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: trimmed }) });
      const data = await res.json();
      if (res.ok) {
        setResult(data); setSelectedQuality(0); setShowPreview(false); setPreviewError(false);
        showToast(t("toast.videoFound"), t("toast.selectQuality"));
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
      } else { setError(data.error || t("error.server")); }
    } catch { setError(t("error.server")); }
    finally { clearInterval(msgInterval); setLoading(false); setLoadingMsg(""); }
  }, [url, t, showToast]);

  const handleDownload = useCallback(async () => {
    if (!result || downloading) return;
    const q = result.qualityOptions[selectedQuality];
    if (!q) { showToast(t("error.downloadFail"), "", "destructive"); return; }
    const ext = q.resolution === "MP3" ? ".mp3" : ".mp4";
    const downloadName = (result.filename || `getmova_${Date.now()}`) + `_${q.label}${ext}`;
    const isAudio = q.resolution === "MP3" || q.label === "Audio" || q.label === "Audio (Low)";
    const downloadUrl = q.url;
    const fallbackUrl = q.originalUrl || q.url;
    setDownloading(true);
    const saveHist = () => {
      saveToHistory({ id: Date.now().toString(), title: result.title, platform: result.platform, author: result.author, thumbnail: result.thumbnail, duration: result.duration, url: url.trim(), downloadUrl: fallbackUrl, timestamp: Date.now() });
    };
    try {
      if (isAudio || downloadUrl.startsWith("/api/proxy") || downloadUrl.startsWith("/api/yt-download")) {
        try {
          const res = await fetch(downloadUrl);
          if (res.ok) { const blob = await res.blob(); if (blob.size > 1000) { const blobUrl = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = blobUrl; a.download = downloadName; a.style.display = "none"; document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(() => URL.revokeObjectURL(blobUrl), 10000); saveHist(); showToast(t("toast.downloadStart"), isAudio ? "MP3" : ""); setDownloading(false); return; } }
        } catch (e) { console.log("Proxy fetch+blob failed", e); }
      }
      try {
        const a = document.createElement("a"); a.href = downloadUrl; a.download = downloadName; a.style.display = "none"; document.body.appendChild(a); a.click(); document.body.removeChild(a); saveHist(); showToast(t("toast.downloadStart"), "");
        // FEATURE 4: Confetti on successful download
        setShowConfetti(true); setTimeout(() => setShowConfetti(false), 3000);
      } catch (e) {
        console.log("<a> tag approach failed", e);
        try { window.open(fallbackUrl, "_blank"); saveHist(); } catch { showToast(t("error.downloadFail"), "", "destructive"); }
      }
    } catch (e) {
      console.error("Download failed:", e);
      try { window.open(fallbackUrl, "_blank"); } catch { showToast(t("error.downloadFail"), "", "destructive"); }
    } finally { setDownloading(false); }
  }, [result, selectedQuality, url, t, showToast, downloading]);

  const handleShare = useCallback(async () => {
    if (!result) return;
    try { await navigator.share({ title: result.title, url }); } catch { try { await navigator.clipboard.writeText(url); showToast(t("toast.linkCopied"), ""); } catch {} }
  }, [result, url, t, showToast]);

  const handleToggleBookmark = useCallback(() => {
    if (!result) return;
    if (isBookmarkedState) { removeBookmark(result.downloadUrl); setIsBookmarkedState(false); showToast(t("toast.bookmarkRemoved"), ""); }
    else { saveBookmark({ id: Date.now().toString(), title: result.title, platform: result.platform, author: result.author, thumbnail: result.thumbnail, duration: result.duration, url: url.trim(), timestamp: Date.now() }); setIsBookmarkedState(true); showToast(t("toast.bookmarkAdded"), ""); }
  }, [result, isBookmarkedState, url, t, showToast]);

  const handleCopyCaption = useCallback(async () => {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.title); showToast(t("result.captionCopied"), ""); } catch {}
  }, [result, t, showToast]);

  // FEATURE 8: Drag & Drop
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragOver(false), []);
  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); const text = e.dataTransfer.getData("text/plain"); if (text && (text.startsWith("http") || text.startsWith("www"))) setUrl(text); }, []);

  // FEATURE 4: Confetti particles
  const confettiColors = ["#E52222", "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"];
  const confettiParticles = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    id: i, color: confettiColors[i % confettiColors.length],
    left: `${Math.random() * 100}%`, delay: `${Math.random() * 0.5}s`,
    size: Math.random() * 6 + 5,
  })), []);

  const detectedPlatform = result ? detectPlatform(url) : url.trim() ? detectPlatform(url) : null;

  return (
    <section id="hero" className="hero-bg relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6" style={{ minHeight: "70vh", maxHeight: "900px" }}>
      <div className="absolute inset-0 z-0">
        <Image src="/hero-people.png" alt="" fill className="object-cover object-center md:object-[center_30%] grayscale" priority />
      </div>

      {/* FEATURE 4: Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="relative w-full h-full">
            {confettiParticles.map(p => (
              <div key={p.id} className="confetti-particle" style={{ left: p.left, top: "30%", backgroundColor: p.color, animationDelay: p.delay, width: p.size, height: p.size }} />
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl lg:max-w-5xl flex flex-col items-center text-center">
        {/* FEATURE 11: Gradient text on "Downloader" */}
        <h1 className="hero-title text-[28px] sm:text-[36px] md:text-[42px] lg:text-[56px] font-extrabold text-[#333333] dark:text-white mb-3 md:mb-4 font-[family-name:var(--font-montserrat)] leading-tight tracking-tight">
          {t("hero.small")} <span className="animated-gradient">{t("hero.big")}</span>
        </h1>
        <p className="hero-subtitle text-[#666666] dark:text-gray-400 text-sm md:text-base lg:text-lg max-w-lg md:max-w-xl lg:max-w-2xl leading-relaxed mb-6 md:mb-8">{t("hero.subtitle")}</p>

        {/* Input area with drag-drop, auto-paste, history button */}
        <div className="w-full max-w-xl lg:max-w-2xl relative">
          {/* FEATURE 14: Onboarding tooltip */}
          {showOnboard && (
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-[#2D2D2D] text-[#333] dark:text-white text-xs font-medium px-4 py-2 rounded-lg shadow-lg border border-[#E52222]/30 whitespace-nowrap">
              {t("onboard.tooltip")}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#2D2D2D] rotate-45 border-l border-t border-[#E52222]/30" />
            </div>
          )}
          <div
            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            className={`rounded-lg overflow-hidden shadow-xl flex border-2 transition-colors dark-glow-input ${isDragOver ? "border-[#E52222] bg-red-50/50 dark:bg-[#E52222]/5" : "border-gray-200 dark:border-white/10"}`}
          >
            <div className="flex-1 relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <input ref={inputRef} type="text" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAnalyze()} onFocus={handleInputFocus} placeholder={t("input.placeholder")} className="download-input-desktop h-14 w-full bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-white text-sm md:text-base lg:text-lg pl-11 pr-4 border-0 outline-none placeholder:text-gray-400" />
            </div>
            <button onClick={handleAnalyze} disabled={loading} className="download-btn-desktop h-14 px-6 md:px-8 lg:px-10 bg-[#E52222] text-white font-bold text-sm md:text-base lg:text-lg hover:bg-[#C91C1C] shrink-0 transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              <span>{loading ? (loadingMsg || t("btn.download")) : t("btn.download")}</span>
            </button>
          </div>
          {/* FEATURE 12: Shortcut hint + History button */}
          <div className="flex items-center justify-between mt-1.5 px-1">
            <span className="text-[10px] md:text-xs lg:text-sm text-[#333]/40 dark:text-white/40">{t("hero.shortcutHint")}</span>
            <button onClick={() => setShowHistory(true)} className="flex items-center gap-1 text-[10px] md:text-xs text-[#333]/40 dark:text-white/40 hover:text-[#333]/70 dark:hover:text-white/70 transition-colors" aria-label="Download History">
              <History className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Platform support bar */}
        <div className="w-full max-w-xl lg:max-w-2xl mt-3 bg-[#333333] dark:bg-[#444444] rounded-lg px-4 py-2.5 flex items-center justify-center gap-3 md:gap-4">
          <span className="text-white text-xs lg:text-base font-medium shrink-0">{t("platforms.label")}</span>
          <div className="flex items-center gap-3 md:gap-4">
            {PLATFORMS.map(p => (<span key={p.name} className="text-white/90 hover:text-white transition-colors"><p.Icon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" /></span>))}
          </div>
        </div>

        {/* FEATURE 3: Trust Badges Bar */}
        <div className="w-full max-w-xl lg:max-w-2xl mt-3 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {[
            { icon: Shield, label: t("trust.ssl") },
            { icon: ShieldCheck, label: t("trust.novirus") },
            { icon: Database, label: t("trust.nodata") },
            { icon: CheckCircle, label: t("trust.safe") },
          ].map((b, i) => (
            <span key={i} className="trust-badge-text flex items-center gap-1.5 text-[#333]/60 dark:text-white/60 text-[11px] md:text-xs lg:text-sm">
              <b.icon className="h-3.5 w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5" />{b.label}
            </span>
          ))}
        </div>

        {/* FEATURE 10: Recent Downloads Counter */}
        <div className="mt-2">
          <span className="text-[#333]/50 dark:text-white/50 text-[11px] md:text-xs lg:text-base">{t("hero.liveCount").replace("{count}", liveCount.toLocaleString())}</span>
        </div>

        {/* FEATURE 15: Skeleton Loading */}
        {loading && !error && (
          <div className="max-w-lg md:max-w-2xl mt-5 p-4 rounded-lg bg-white/80 dark:bg-[#2D2D2D]/80 backdrop-blur">
            <div className="flex gap-3 mb-3">
              <div className="w-20 h-14 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-gray-200 dark:bg-white/10 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded animate-pulse w-1/2" />
              </div>
            </div>
            <div className="flex gap-1.5 mb-3">
              {[1,2,3].map(i => <div key={i} className="h-7 w-16 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />)}
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#E52222] rounded-full transition-all duration-1000 ease-out animate-pulse" style={{ width: loadingMsg === t("loading.finding") ? "30%" : loadingMsg === t("loading.getting") ? "65%" : "90%" }} />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-lg md:max-w-2xl mt-5 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#E52222] mt-0.5 shrink-0" />
            <p className="text-[#E52222] dark:text-red-300 text-sm text-left">{error}</p>
          </div>
        )}

        {/* Result card */}
        {result && (
          <div ref={resultRef} className="max-w-lg md:max-w-2xl mt-5 rounded-xl bg-white dark:bg-[#2D2D2D] overflow-hidden text-left shadow-xl border border-gray-100 dark:border-white/10">
            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-white/10 flex items-center gap-2 bg-gray-50 dark:bg-[#333]">
              <CheckCircle className="h-4 w-4 text-[#E52222] shrink-0" />
              <span className="text-sm text-[#E52222] font-medium">{result.isPhotoSlide ? "Slide foto ditemukan!" : t("result.found")}</span>
              {result.isPhotoSlide && result.imageCount && (
                <span className="text-xs bg-[#E52222]/10 text-[#E52222] px-2 py-0.5 rounded-full font-medium">{result.imageCount} foto</span>
              )}
              <div className="ml-auto flex items-center gap-1.5">
                {(() => { const pd = getPlatformDef(result.platform); return (<div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: pd.gradient || pd.color }}><pd.Icon className="h-2.5 w-2.5 text-white" /></div>); })()}
                <span className="text-xs text-gray-500 dark:text-gray-400">{result.platform}</span>
              </div>
            </div>
            <div className="p-4">
              {/* Photo Slide Carousel */}
              {result.isPhotoSlide && result.images && result.images.length > 0 ? (
                <PhotoCarousel
                  images={result.images}
                  originalImages={result.originalImages}
                  imageCount={result.imageCount}
                  filename={result.filename}
                  qualityOptions={result.qualityOptions}
                  selectedQuality={selectedQuality}
                  downloading={downloading}
                  onDownloadAudio={handleDownload}
                  onSelectQuality={setSelectedQuality}
                  onToast={showToast}
                  accent="#E52222"
                />
              ) : (
                <>
                  {/* Regular Video Result */}
                  {showPreview && !previewError ? (
                    <div className="w-full rounded-md overflow-hidden bg-gray-100 dark:bg-[#444] mb-3"><video src={result.qualityOptions[0]?.originalUrl || result.qualityOptions[0]?.url} controls muted className="w-full object-contain" style={{ maxHeight: "200px" }} onError={() => setPreviewError(true)} /></div>
                  ) : (
                    <div className="flex gap-3 mb-3">
                      <div className="w-20 h-14 rounded-md bg-gray-100 dark:bg-[#444] flex items-center justify-center shrink-0 overflow-hidden relative">
                        {result.thumbnail && <Image src={result.thumbnail} alt={result.title} width={80} height={56} className="w-full h-full object-cover" unoptimized />}
                        <Play className="h-4 w-4 absolute text-[#E52222]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">{result.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {result.duration !== "--:--" && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{result.duration}</span>}
                          <span className="flex items-center gap-1"><User className="h-3 w-3" />{result.author}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-0.5 mb-3">
                    <Button variant="ghost" size="sm" onClick={() => { setShowPreview(!showPreview); setPreviewError(false); }} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white h-7">{showPreview ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}{t("result.preview")}</Button>
                    <Button variant="ghost" size="sm" onClick={handleShare} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white h-7"><Share2 className="h-3 w-3 mr-1" />{t("result.share")}</Button>
                    <Button variant="ghost" size="sm" onClick={handleToggleBookmark} className="text-xs h-7" style={{ color: isBookmarkedState ? RED : "#999" }}><Bookmark className={`h-3 w-3 mr-1 ${isBookmarkedState ? "fill-current" : ""}`} />{isBookmarkedState ? t("result.bookmarked") : t("result.bookmark")}</Button>
                    <Button variant="ghost" size="sm" onClick={handleCopyCaption} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white h-7"><Copy className="h-3 w-3 mr-1" />{t("result.copyCaption")}</Button>
                  </div>
                  {result.qualityOptions.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5"><Film className="h-3 w-3 text-[#E52222]" />{t("result.selectQuality")}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.qualityOptions.map((q, i) => {
                          const isSelected = selectedQuality === i;
                          return (<button key={i} onClick={() => setSelectedQuality(i)} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${isSelected ? "text-white bg-[#E52222] border-[#E52222]" : "bg-white dark:bg-[#333] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#E52222]/30"}`}><span>{q.label}</span><span className="opacity-70">{q.resolution}</span></button>);
                        })}
                      </div>
                    </div>
                  )}
                  <Button onClick={handleDownload} disabled={downloading} className="w-full h-11 bg-[#E52222] text-white font-bold rounded-lg hover:bg-[#C91C1C] text-sm">
                    {downloading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Downloading...</> : <><Download className="mr-2 h-4 w-4" />{t("btn.download")}</>}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FEATURE 5: History Panel */}
      {showHistory && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-500" onClick={() => setShowHistory(false)} />
          <div className="fixed right-0 top-0 h-full w-80 lg:w-96 bg-white dark:bg-[#2D2D2D] shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-out">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-white/10">
              <h3 className="font-bold text-[#333] dark:text-white text-sm font-[family-name:var(--font-montserrat)]">{t("history.title")}</h3>
              <button onClick={() => setShowHistory(false)} className="h-7 w-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {historyItems.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">{t("history.empty")}</p>
              ) : (
                <div className="space-y-3">
                  {historyItems.map(item => {
                    const pd = getPlatformDef(item.platform);
                    return (
                      <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="w-12 h-9 rounded bg-gray-100 dark:bg-[#444] flex items-center justify-center shrink-0 overflow-hidden">
                          {item.thumbnail ? <Image src={item.thumbnail} alt="" width={48} height={36} className="w-full h-full object-cover" unoptimized /> : <Play className="h-3 w-3 text-gray-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 line-clamp-1">{item.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-400">{item.platform}</span>
                            <span className="text-[10px] text-gray-400">{relativeTime(item.timestamp, lang)}</span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            {historyItems.length > 0 && (
              <div className="p-4 border-t border-gray-100 dark:border-white/10">
                <button onClick={() => { if (confirm(t("history.clearConfirm"))) { localStorage.removeItem(HISTORY_KEY); setHistoryItems([]); window.dispatchEvent(new Event("mova:history-changed")); } }} className="w-full flex items-center justify-center gap-2 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"><Trash2 className="h-3.5 w-3.5" />{t("history.clear")}</button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FREE VIDEO DOWNLOADER — White bg, two columns, red circle decoration
   ══════════════════════════════════════════════════ */
function FreeDownloaderSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-white dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="bg-[#E52222] text-white text-[10px] md:text-xs lg:text-base font-bold px-4 py-1 rounded-full uppercase tracking-wider">{t("free.badge")}</span>
            </div>
            <h2 className="section-heading text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] font-extrabold text-[#333333] dark:text-white mb-4 font-[family-name:var(--font-montserrat)] leading-tight">{t("free.title1")} <span className="text-[#E52222]">{t("free.titleRed")}</span></h2>
            <p className="section-body-text text-sm md:text-base lg:text-lg text-[#666666] dark:text-gray-400 leading-relaxed mb-6 max-w-md mx-auto md:mx-0">{t("free.desc")}</p>
            <a href="#hero"><Button className="bg-[#333333] dark:bg-white dark:text-[#333333] text-white font-semibold rounded-full hover:bg-[#555] dark:hover:bg-gray-100 px-6 h-11 lg:h-12 text-sm lg:text-lg">{t("free.btn")} <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" /></Button></a>
          </div>
          <div className="flex-shrink-0">
            <div className="w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-[#E52222]/10 flex items-center justify-center"><div className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-[#E52222]/20 flex items-center justify-center"><div className="float-animation w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-[#E52222] flex items-center justify-center shadow-lg"><Play className="h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 text-white ml-1" /></div></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   HOW TO USE — White bg, left person image + red circle, right 3 steps
   ══════════════════════════════════════════════════ */
function HowToUseSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const steps = [
    { num: "01", title: t("how.step1.title"), desc: t("how.step1.desc"), filled: true },
    { num: "02", title: t("how.step2.title"), desc: t("how.step2.desc"), filled: true },
    { num: "03", title: t("how.step3.title"), desc: t("how.step3.desc"), filled: false },
  ];
  return (
    <section id="how" ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-white dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#333333] dark:text-white text-center mb-10 md:mb-14 font-[family-name:var(--font-montserrat)]">{t("how.title")}</h2>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-shrink-0 relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#E52222]/10 z-0" />
            <div className="relative z-10 w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden"><Image src="/how-person.png" alt="Person using phone" fill className="object-cover object-center" /></div>
          </div>
          <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                {s.filled ? (<div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#E52222] flex items-center justify-center shrink-0"><span className="text-white font-bold text-sm lg:text-lg">{s.num}</span></div>) : (<div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-[#E52222] flex items-center justify-center shrink-0"><span className="text-[#E52222] font-bold text-sm lg:text-lg">{s.num}</span></div>)}
                <div><h3 className="feature-card-title text-base md:text-lg lg:text-2xl font-bold text-[#333333] dark:text-white mb-1">{s.title}</h3><p className="feature-card-desc text-sm md:text-base lg:text-lg text-[#666666] dark:text-gray-400 leading-relaxed">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE 6: Platform Quick-Access Cards
   ══════════════════════════════════════════════════ */
function PlatformQuickAccessSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const platformCards = [
    { name: "TikTok", desc: t("platforms.tiktok.desc"), slug: "tiktok", color: "#010101", Icon: TikTokIcon },
    { name: "Instagram", desc: t("platforms.ig.desc"), slug: "instagram", color: "#E1306C", Icon: InstagramIcon },
    { name: "Facebook", desc: t("platforms.fb.desc"), slug: "facebook", color: "#1877F2", Icon: FacebookIcon },
    { name: "Twitter/X", desc: t("platforms.twitter.desc"), slug: "twitter", color: "#14171A", Icon: TwitterXIcon },
    { name: "Pinterest", desc: t("platforms.pinterest.desc"), slug: "pinterest", color: "#E60023", Icon: PinterestIcon },
    { name: "Reddit", desc: t("platforms.reddit.desc"), slug: "reddit", color: "#FF4500", Icon: RedditIcon },
  ];
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl lg:max-w-6xl text-center">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#333333] dark:text-white mb-3 font-[family-name:var(--font-montserrat)]">{t("platforms.title")}</h2>
        <p className="section-body-text text-sm md:text-base lg:text-lg text-[#666666] dark:text-gray-400 mb-10 md:mb-14 max-w-lg mx-auto leading-relaxed">{t("platforms.subtitle")}</p>
        <div className="reveal-stagger grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {platformCards.map(p => (
            <a key={p.slug} href={`/${p.slug}-downloader`} className="smooth-hover bg-white dark:bg-[#2D2D2D] rounded-xl border border-gray-200 dark:border-white/10 p-5 md:p-6 lg:p-8 text-left hover:shadow-lg transition-all duration-300 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3" style={{ background: `${p.color}15` }}><p.Icon className="h-5 w-5 lg:h-6 lg:w-6" style={{ color: p.color }} /></div>
              <h3 className="platform-card-title font-bold text-sm lg:text-xl text-[#333] dark:text-white mb-1 group-hover:text-[#E52222] transition-colors">{p.name}</h3>
              <p className="platform-card-desc text-xs lg:text-base text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE CARDS (01, 02, 03) — Dark gray bg, white text
   ══════════════════════════════════════════════════ */
function FeatureCardsSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const features = [
    { num: "01", icon: Zap, title: t("feat1.title"), desc: t("feat1.desc") },
    { num: "02", icon: Film, title: t("feat2.title"), desc: t("feat2.desc") },
    { num: "03", icon: CheckCircle, title: t("feat3.title"), desc: t("feat3.desc") },
  ];
  return (
    <section id="features" ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#333333] dark:bg-[#2D2D2D]">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => { const Icon = f.icon; return (
            <div key={i} className="smooth-hover bg-[#333333] dark:bg-[#333] rounded-lg p-8 lg:p-10 border border-white/10 hover:border-white/20 transition-all duration-300 dark-glow-card">
              <span className="text-white/20 text-4xl md:text-5xl lg:text-7xl font-extrabold font-[family-name:var(--font-montserrat)]">{f.num}</span>
              <div className="mt-4 mb-3"><Icon className="h-6 w-6 lg:h-9 lg:w-9 text-white" /></div>
              <h3 className="feature-card-title text-white text-lg lg:text-2xl font-bold mb-2">{f.title}</h3>
              <p className="feature-card-desc text-gray-400 text-sm lg:text-lg leading-relaxed">{f.desc}</p>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SUPPORTED FORMATS — Light bg, format badges grid
   ══════════════════════════════════════════════════ */
function SupportedFormatsSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const formats = [
    { key: "mp4", icon: Video }, { key: "mp3", icon: Music }, { key: "webm", icon: Film }, { key: "avi", icon: Monitor },
    { key: "360p", icon: Smartphone }, { key: "480p", icon: Smartphone }, { key: "720p", icon: Award }, { key: "1080p", icon: Award }, { key: "4k", icon: Award }, { key: "audio", icon: Headphones },
  ];
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#F5F5F5] dark:bg-[#1A1A1A] transition-colors duration-300">
      <div className="mx-auto max-w-5xl lg:max-w-6xl text-center">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#333333] dark:text-white mb-3 font-[family-name:var(--font-montserrat)]">{t("fmt.title")}</h2>
        <p className="section-body-text text-sm md:text-base lg:text-lg text-[#666666] dark:text-gray-400 mb-10 md:mb-14 max-w-lg mx-auto leading-relaxed">{t("fmt.subtitle")}</p>
        <div className="reveal-stagger flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-5">
          {formats.map((f) => { const Icon = f.icon; return (<div key={f.key} className="smooth-hover flex items-center gap-2 bg-white dark:bg-[#2D2D2D] border border-gray-200 dark:border-white/10 rounded-full px-5 py-2.5 lg:px-6 lg:py-3 shadow-sm hover:shadow-md hover:border-[#E52222]/30 transition-all duration-300 cursor-default"><Icon className="h-4 w-4 lg:h-5 lg:w-5 text-[#E52222]" /><span className="format-pill text-sm lg:text-base font-semibold text-[#333333] dark:text-white">{t(`fmt.${f.key}`)}</span></div>); })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   STATISTICS — Dark bg, 4 counters with animated count-up
   ══════════════════════════════════════════════════ */
function useCountUp(target: number, duration: number = 2000, startOnMount: boolean = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => { if (!startOnMount) return; setStarted(true); }, [startOnMount]);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null; let rafId: number;
    const step = (timestamp: number) => { if (!startTime) startTime = timestamp; const progress = Math.min((timestamp - startTime) / duration, 1); setCount(Math.floor(progress * target)); if (progress < 1) rafId = requestAnimationFrame(step); };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);
  return count;
}

function StatisticsSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const count1 = useCountUp(10, 2000); const count2 = useCountUp(6, 1500); const count3 = useCountUp(100, 1800); const count4 = useCountUp(49, 2000);
  const stats = [
    { display: `${count1}M+`, labelKey: "stats.1.label" },
    { display: `${count2}+`, labelKey: "stats.2.label" },
    { display: `${count3}%`, labelKey: "stats.3.label" },
    { display: `${(count4 / 10).toFixed(1)}`, labelKey: "stats.4.label" },
  ];
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#333333] dark:bg-[#2D2D2D] transition-colors duration-300">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="stat-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-[family-name:var(--font-montserrat)] mb-2 dark-glow-text">{s.display}</div>
              <div className="stat-label text-white/60 text-sm md:text-base lg:text-lg">{t(s.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   WHY CHOOSE GETMOVA — Light gray bg, black icons, clean minimal
   ══════════════════════════════════════════════════ */
function WhyChooseSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const benefits = [
    { icon: Zap, title: t("why.1.title"), desc: t("why.1.desc") },
    { icon: Smartphone, title: t("why.2.title"), desc: t("why.2.desc") },
    { icon: Share2, title: t("why.3.title"), desc: t("why.3.desc") },
    { icon: Shield, title: t("why.4.title"), desc: t("why.4.desc") },
  ];
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#333333] dark:text-white text-center mb-10 md:mb-14 font-[family-name:var(--font-montserrat)]">{t("why.title")}</h2>
        <div className="reveal-stagger grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {benefits.map((b, i) => { const Icon = b.icon; return (<div key={i} className="smooth-hover text-center p-4 md:p-6 lg:p-8 rounded-xl transition-all duration-300"><div className="flex items-center justify-center mb-4"><Icon className="h-8 w-8 md:h-10 md:w-10 lg:h-14 lg:w-14 text-[#333333] dark:text-white" /></div><h3 className="why-title text-sm md:text-base lg:text-xl font-bold text-[#333333] dark:text-white mb-2">{b.title}</h3><p className="why-desc text-xs md:text-sm lg:text-base text-[#999999] dark:text-gray-500 leading-relaxed">{b.desc}</p></div>); })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   COMPARISON TABLE — Light bg, GetMova vs competitors
   ══════════════════════════════════════════════════ */
function ComparisonSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const features = [
    { key: "nowatermark", getmova: true, snaptik: true, savefrom: false, y2mate: false },
    { key: "free", getmova: true, snaptik: false, savefrom: false, y2mate: false },
    { key: "noads", getmova: true, snaptik: false, savefrom: false, y2mate: false },
    { key: "noreg", getmova: true, snaptik: true, savefrom: true, y2mate: false },
    { key: "hdquality", getmova: true, snaptik: true, savefrom: "partial", y2mate: true },
    { key: "multiplatform", getmova: true, snaptik: false, savefrom: true, y2mate: false },
  ];
  const CheckMark = () => <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/15"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>;
  const XMark = () => <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/15"><svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></span>;
  const PartialMark = () => <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/15"><svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" /><circle cx="12" cy="12" r="9" strokeWidth={2} /></svg></span>;
  const renderMark = (val: boolean | string) => { if (val === true) return <CheckMark />; if (val === "partial") return <PartialMark />; return <XMark />; };
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#F5F5F5] dark:bg-[#1A1A1A] transition-colors duration-300">
      <div className="mx-auto max-w-5xl lg:max-w-6xl text-center">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#333333] dark:text-white mb-3 font-[family-name:var(--font-montserrat)]">{t("compare.title")}</h2>
        <p className="section-body-text text-sm md:text-base lg:text-lg text-[#666666] dark:text-gray-400 mb-10 md:mb-14 max-w-lg mx-auto leading-relaxed">{t("compare.subtitle")}</p>
        <div className="overflow-x-auto scroll-hide -mx-4 px-4">
          <table className="w-full min-w-[520px] md:min-w-0 border-collapse bg-white dark:bg-[#2D2D2D] rounded-xl overflow-hidden shadow-sm">
            <thead><tr className="border-b border-gray-100 dark:border-white/10">
              <th className="compare-header py-4 px-3 md:px-5 text-left text-sm lg:text-base font-semibold text-[#333333] dark:text-white w-[30%] md:w-[25%]">{t("compare.feature")}</th>
              <th className="compare-header py-4 px-3 md:px-5 text-center text-sm lg:text-base font-bold text-white bg-[#E52222]">{t("compare.getmova")}</th>
              <th className="compare-header py-4 px-3 md:px-5 text-center text-sm lg:text-base font-semibold text-[#333333] dark:text-white">{t("compare.snaptik")}</th>
              <th className="compare-header py-4 px-3 md:px-5 text-center text-sm lg:text-base font-semibold text-[#333333] dark:text-white">{t("compare.savefrom")}</th>
              <th className="compare-header py-4 px-3 md:px-5 text-center text-sm lg:text-base font-semibold text-[#333333] dark:text-white">{t("compare.y2mate")}</th>
            </tr></thead>
            <tbody>{features.map((f, i) => (<tr key={f.key} className={i < features.length - 1 ? "border-b border-gray-100 dark:border-white/10" : ""}><td className="compare-feature py-3.5 px-3 md:px-5 text-sm lg:text-base text-[#333333] dark:text-gray-300 text-left">{t(`compare.${f.key}`)}</td><td className="py-3.5 px-3 md:px-5 text-center bg-[#E52222]/5 dark:bg-[#E52222]/10">{renderMark(f.getmova)}</td><td className="py-3.5 px-3 md:px-5 text-center">{renderMark(f.snaptik)}</td><td className="py-3.5 px-3 md:px-5 text-center">{renderMark(f.savefrom)}</td><td className="py-3.5 px-3 md:px-5 text-center">{renderMark(f.y2mate)}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   TESTIMONIALS — Dark bg, 3 testimonial cards
   ══════════════════════════════════════════════════ */
function TestimonialsSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const testimonials = [
    { nameKey: "testi.1.name", roleKey: "testi.1.role", textKey: "testi.1.text", initials: "RS", color: "#E52222" },
    { nameKey: "testi.2.name", roleKey: "testi.2.role", textKey: "testi.2.text", initials: "AP", color: "#3B82F6" },
    { nameKey: "testi.3.name", roleKey: "testi.3.role", textKey: "testi.3.text", initials: "SM", color: "#10B981" },
  ];
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#2D2D2D] dark:bg-[#222] transition-colors duration-300">
      <div className="mx-auto max-w-5xl lg:max-w-6xl text-center">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 font-[family-name:var(--font-montserrat)]">{t("testi.title")}</h2>
        <p className="section-body-text text-sm md:text-base lg:text-lg text-white/50 mb-10 md:mb-14 max-w-lg mx-auto leading-relaxed">{t("testi.subtitle")}</p>
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testi, i) => (
            <div key={i} className="smooth-hover bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 text-left min-h-[220px] md:min-h-[240px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-lg shrink-0" style={{ background: testi.color }}>{testi.initials}</div>
                <div><p className="testi-name text-white font-semibold text-sm lg:text-lg">{t(testi.nameKey)}</p><p className="testi-role text-white/40 text-xs lg:text-base">{t(testi.roleKey)}</p></div>
              </div>
              <div className="flex items-center gap-0.5 mb-3">{Array.from({ length: 5 }).map((_, si) => <Star key={si} className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-yellow-400 fill-yellow-400" />)}</div>
              <p className="testi-text text-white/60 text-sm lg:text-lg leading-relaxed flex-1">{t(testi.textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FAQ — Dark gray bg, white text, red numbers, red pill badge
   With FEATURE 9: FAQ Search/Filter
   ══════════════════════════════════════════════════ */
function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState("");
  const revealRef = useScrollReveal();
  const faqItems = [
    { num: "01", q: t("faq.1.q"), a: t("faq.1.a") },
    { num: "02", q: t("faq.2.q"), a: t("faq.2.a") },
    { num: "03", q: t("faq.3.q"), a: t("faq.3.a") },
    { num: "04", q: t("faq.4.q"), a: t("faq.4.a") },
    { num: "05", q: t("faq.5.q"), a: t("faq.5.a") },
    { num: "06", q: t("faq.6.q"), a: t("faq.6.a") },
  ];
  const filteredFaqs = faqSearch.trim()
    ? faqItems.filter(f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase()))
    : faqItems;

  return (
    <section id="faq" ref={revealRef} className="faq-section section-reveal relative py-16 md:py-24 lg:py-28 px-4 md:px-6 bg-[#2D2D2D] dark:bg-[#222] overflow-hidden">
      <div className="absolute top-[-80px] right-[-80px] w-[200px] h-[200px] rounded-full bg-[#E52222]/5 pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[160px] h-[160px] rounded-full bg-[#E52222]/5 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl lg:max-w-6xl">
        <div className="text-center mb-10 md:hidden">
          <span className="inline-block bg-[#E52222] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">FAQ</span>
          <h2 className="section-heading text-2xl font-extrabold text-white font-[family-name:var(--font-montserrat)] leading-tight">{t("faq.title")} <span className="text-[#E52222]">{t("faq.titleRed")}</span></h2>
          <p className="mt-3 text-sm text-white/50 max-w-sm mx-auto leading-relaxed">{t("faq.subtitle")}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <div className="md:w-[35%] shrink-0 md:sticky md:top-24 md:self-start">
            <div className="hidden md:block">
              <span className="inline-block bg-[#E52222] text-white text-xs lg:text-base font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">FAQ</span>
              <h2 className="section-heading text-3xl lg:text-4xl font-extrabold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-4">{t("faq.title")} <span className="text-[#E52222]">{t("faq.titleRed")}</span></h2>
              <p className="section-body-text text-sm md:text-base lg:text-lg text-white/50 leading-relaxed mb-8">{t("faq.subtitle")}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4"><div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-[#E52222]/20 flex items-center justify-center shrink-0"><AlertCircle className="h-5 w-5 lg:h-6 lg:w-6 text-[#E52222]" /></div><h3 className="feature-card-title text-white text-base md:text-lg lg:text-xl font-bold">{t("faq.cta.title")}</h3></div>
              <p className="section-body-text text-white/50 text-sm mb-5 lg:text-base leading-relaxed">{t("faq.cta.desc")}</p>
              <a href="/contact"><Button className="w-full bg-[#E52222] text-white font-semibold rounded-xl hover:bg-[#C91C1C] h-11 lg:h-12 text-sm lg:text-lg">{t("faq.cta.btn")} <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" /></Button></a>
            </div>
          </div>
          <div className="md:w-[65%]">
            {/* FEATURE 9: FAQ Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-white/30" />
              <input type="text" value={faqSearch} onChange={e => setFaqSearch(e.target.value)} placeholder={t("faq.search")} className="w-full h-10 lg:h-12 bg-white/5 border border-white/10 rounded-xl pl-10 lg:pl-12 pr-4 text-white text-sm lg:text-base placeholder:text-white/30 outline-none focus:border-[#E52222]/50 transition-colors" />
            </div>
            {filteredFaqs.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-8">{t("faq.noresults")}</p>
            ) : (
            <div className="space-y-3">
              {filteredFaqs.map((f, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className={`rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-white/10 border border-white/20 shadow-lg shadow-[#E52222]/5" : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/10"}`}>
                    <button onClick={() => setOpenIndex(isOpen ? null : i)} className="flex items-center justify-between w-full py-4 px-5 cursor-pointer text-left group">
                      <span className="flex items-center gap-3 pr-3">
                        <span className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? "bg-[#E52222]" : "bg-white/10 group-hover:bg-[#E52222]/30"}`}><span className={`font-bold text-xs lg:text-base transition-colors duration-300 ${isOpen ? "text-white" : "text-white/60 group-hover:text-[#E52222]"}`}>{f.num}</span></span>
                        <span className={`faq-question text-sm md:text-base font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-white/80 group-hover:text-[#E52222]"}`}>{f.q}</span>
                      </span>
                      <ChevronDown className={`h-4 w-4 shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-[#E52222]" : "text-white/30 group-hover:text-white/60"}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="px-5 pb-5 pl-16 lg:pl-20 text-sm md:text-base lg:text-lg text-white/60 leading-relaxed border-t border-white/5 pt-3">{f.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE 7: Blog Preview Section
   ══════════════════════════════════════════════════ */
function BlogPreviewSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const [autoPosts, setAutoPosts] = useState<{slug: string; title: string; readingTime: string; image?: string}[]>([]);

  useEffect(() => {
    fetch("/api/blog/generate")
      .then(r => r.json())
      .then(data => {
        if (data.posts && data.posts.length > 0) {
          setAutoPosts(data.posts.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  const blogPosts = [
    { titleKey: "blog.1.title", readTime: 5, image: "/blog-tiktok-banner.png", slug: "cara-download-video-tiktok-tanpa-watermark" },
    { titleKey: "blog.2.title", readTime: 4, image: "/blog-instagram-banner.png", slug: "cara-download-video-instagram-reels" },
    { titleKey: "blog.3.title", readTime: 3, image: "/blog-getmova-banner.png", slug: "download-video-tanpa-watermark-terbaik" },
  ];
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#333333] dark:bg-[#2D2D2D]">
      <div className="mx-auto max-w-5xl lg:max-w-6xl text-center">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 font-[family-name:var(--font-montserrat)]">{t("blog.title")}</h2>
        <p className="section-body-text text-sm md:text-base lg:text-lg text-white/50 mb-10 md:mb-14 max-w-lg mx-auto leading-relaxed">{t("blog.subtitle")}</p>

        {/* Auto-generated latest posts */}
        {autoPosts.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="text-[#10B981] text-xs font-semibold px-2 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20">BARU</span>
              <span className="text-white/60 text-sm font-medium">Artikel Terbaru</span>
            </div>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {autoPosts.map((post, i) => (
                <a key={`auto-${i}`} href={`/blog/${post.slug}`} className="smooth-hover rounded-xl overflow-hidden bg-white/5 border border-[#10B981]/20 hover:border-[#10B981]/40 transition-all duration-300 group text-left hover:shadow-lg hover:shadow-[#10B981]/10">
                  <div className="relative h-32 md:h-40 overflow-hidden">
                    {post.image ? (
                      <>
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-transparent to-transparent dark:from-[#2D2D2D]" />
                      </>
                    ) : (
                      <div className="h-full bg-gradient-to-br from-[#10B981]/20 via-[#34D399]/15 to-[#10B981]/10 flex items-center justify-center">
                        <span className="text-3xl opacity-60">🎬</span>
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#10B981] text-[8px] font-bold text-white z-10">BARU</span>
                  </div>
                  <div className="p-4 lg:p-5">
                    <h3 className="text-white font-bold text-xs lg:text-base mb-2 group-hover:text-[#10B981] transition-colors line-clamp-2">{post.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-[10px] lg:text-sm">{post.readingTime}</span>
                      <span className="text-[#10B981] text-xs lg:text-sm font-medium group-hover:underline">Baca →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, i) => (
            <a key={i} href={`/blog/${post.slug}`} className="smooth-hover rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#E52222]/30 transition-all duration-300 group text-left hover:shadow-lg hover:shadow-[#E52222]/10">
              <div className="relative h-44 md:h-52 lg:h-56 overflow-hidden">
                <Image src={post.image} alt={t(post.titleKey)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-transparent to-transparent dark:from-[#2D2D2D]" />
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="blog-card-title text-white font-bold text-sm lg:text-lg mb-2 group-hover:text-[#E52222] transition-colors line-clamp-2">{t(post.titleKey)}</h3>
                <div className="flex items-center justify-between">
                  <span className="blog-card-meta text-white/30 text-xs lg:text-base">{post.readTime} {t("blog.minread")}</span>
                  <span className="text-[#E52222] text-xs lg:text-base font-medium group-hover:underline">{t("blog.readmore")} →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   TOOLS SECTION — Links to interactive tools
   ══════════════════════════════════════════════════ */
function ToolsSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const tools = [
    { icon: ArrowRightLeft, title: "Perbandingan Format", titleEn: "Format Comparison", desc: "Bandingkan MP4, WEBM, AVI, MKV dan temukan format terbaik.", descEn: "Compare MP4, WEBM, AVI, MKV and find the best format.", href: "/tools/format-comparison", color: "text-blue-500" },
    { icon: HardDrive, title: "Kalkulator Ukuran File", titleEn: "File Size Calculator", desc: "Estimasi ukuran file video berdasarkan format, resolusi, dan durasi.", descEn: "Estimate video file size by format, resolution, and duration.", href: "/tools/file-size-calculator", color: "text-green-500" },
    { icon: Scissors, title: "Trim Video", titleEn: "Trim Video", desc: "Potong bagian video yang kamu butuhkan tanpa install aplikasi.", descEn: "Cut the video part you need without installing any app.", href: "/tools/trim-video", color: "text-amber-500" },
    { icon: ImageIcon, title: "Convert ke GIF", titleEn: "Convert to GIF", desc: "Ubah video jadi GIF animasi yang bisa di-share ke mana saja.", descEn: "Convert video to shareable animated GIF.", href: "/tools/convert-gif", color: "text-purple-500" },
  ];
  const isEn = t("nav.home") === "Home";
  return (
    <section ref={revealRef} className="section-reveal py-12 md:py-16 lg:py-20 px-4 md:px-6 transition-colors duration-300">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E52222]/10 border border-[#E52222]/20 mb-4">
            <Wrench className="h-3.5 w-3.5 text-[#E52222]" />
            <span className="text-[10px] font-bold text-[#E52222] uppercase tracking-wider">Tools</span>
          </div>
          <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-3 font-[family-name:var(--font-montserrat)]">
            {isEn ? "Video " : ""}<span className="gradient-text">{isEn ? "Tools" : "Tools Video"}</span>
          </h2>
          <p className="section-body-text text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {isEn ? "Free interactive tools to help you choose the right format and manage your downloads." : "Tools interaktif gratis untuk bantu kamu pilih format yang tepat dan kelola download kamu."}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <a key={tool.href} href={tool.href} className="group p-5 rounded-2xl bg-card border border-border hover:border-[#E52222]/30 transition-all duration-200 hover:shadow-lg hover:shadow-[#E52222]/5">
              <div className={`w-10 h-10 rounded-xl ${tool.color}/10 bg-opacity-10 flex items-center justify-center mb-3`} style={{ backgroundColor: `color-mix(in srgb, var(--foreground) 5%, transparent)` }}>
                <tool.icon className={`h-5 w-5 ${tool.color}`} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1.5 group-hover:text-[#E52222] transition-colors font-[family-name:var(--font-montserrat)]">
                {isEn ? tool.titleEn : tool.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {isEn ? tool.descEn : tool.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#E52222] mt-3 group-hover:gap-2 transition-all">
                {isEn ? "Try Now" : "Coba Sekarang"} <ArrowRight className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   NEWSLETTER
   ══════════════════════════════════════════════════ */
function NewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const revealRef = useScrollReveal();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 6000);
      } else {
        setError(data.error || "Terjadi kesalahan. Coba lagi.");
      }
    } catch {
      setError("Gagal terhubung. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section ref={revealRef} className="section-reveal py-14 md:py-20 lg:py-24 px-4 md:px-6 bg-[#2D2D2D] dark:bg-[#1A1A1A] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E52222]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E52222]/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="relative mx-auto max-w-xl md:max-w-2xl lg:max-w-3xl text-center">
        <div className="flex items-center justify-center mb-4"><div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#E52222]/20 flex items-center justify-center"><Mail className="h-5 w-5 lg:h-6 lg:w-6 text-[#E52222]" /></div></div>
        <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 font-[family-name:var(--font-montserrat)]">{t("nl.title")}</h2>
        <p className="section-body-text text-sm md:text-base lg:text-lg text-white/50 mb-8 leading-relaxed">{t("nl.subtitle")}</p>
        {subscribed ? (
          <div className="bg-green-500/15 border border-green-500/20 rounded-xl p-4 flex items-center justify-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" /><span className="text-green-400 font-medium text-sm lg:text-lg">Subscribed!</span></div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t("nl.placeholder")} required className="nl-input flex-1 h-12 lg:h-14 bg-white/10 border border-white/10 rounded-lg px-4 text-white text-sm lg:text-lg placeholder:text-white/30 outline-none focus:border-[#E52222]/50 transition-colors" />
            <button type="submit" disabled={loading} className="nl-btn h-12 lg:h-14 px-6 lg:px-8 bg-[#E52222] text-white font-bold text-sm lg:text-lg rounded-lg hover:bg-[#C91C1C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0">{loading ? "..." : t("nl.btn")}</button>
          </form>
        )}
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        <p className="text-white/30 text-xs lg:text-base mt-3">{t("nl.disclaimer")}</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   BACK TO TOP — Floating button, bottom-right
   ══════════════════════════════════════════════════ */
function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const onScroll = () => setVisible(window.scrollY > 300); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (<button onClick={scrollToTop} aria-label="Back to top" className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#E52222] text-white shadow-lg flex items-center justify-center hover:bg-[#C91C1C] transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"}`}><ArrowUp className="h-5 w-5" /></button>);
}

/* ══════════════════════════════════════════════════
   WHATSAPP WIDGET — Floating button, bottom-left, all devices
   ══════════════════════════════════════════════════ */
function WhatsAppWidget() {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="fixed left-6 z-50 bottom-[70px] md:bottom-6">
      {showTooltip && (<div className="absolute bottom-14 left-0 bg-white dark:bg-[#2D2D2D] text-[#333333] dark:text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-gray-200 dark:border-white/10">{t("wa.tooltip")}<div className="absolute -bottom-1 left-4 w-2 h-2 bg-white dark:bg-[#2D2D2D] rotate-45 border-r border-b border-gray-200 dark:border-white/10" /></div>)}
      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} aria-label="WhatsApp" className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"><svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
    </div>
  );
}


/* ══════════════════════════════════════════════════
   FOOTER — Dark (#222) bg, minimal layout
   ══════════════════════════════════════════════════ */
function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="bg-[#222222] dark:bg-[#1A1A1A]" role="contentinfo">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="shrink-0"><rect width="32" height="32" rx="8" fill="#E52222" /><path d="M13 9L23 16L13 23V9Z" fill="white" /></svg>
            <span className="font-[family-name:var(--font-montserrat)] font-bold text-white text-lg lg:text-2xl" style={{ letterSpacing: "-0.03em" }}>Get<span className="text-[#E52222]">Mova</span></span>
          </div>
          <p className="text-[#999999] text-xs lg:text-sm max-w-2xl">{lang === "id" ? "GetMova adalah layanan download video online gratis dari berbagai platform sosial media. Privasi pengguna adalah prioritas utama kami." : "GetMova is a free online video downloader from various social media platforms. User privacy is our top priority."}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:gap-x-6 lg:gap-y-2">
            <a href="/about" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">{lang === "id" ? "Tentang Kami" : "About Us"}</a>
            <a href="/how-it-works" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">{lang === "id" ? "Cara Kerja" : "How It Works"}</a>
            <a href="/faq" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">FAQ</a>
            <a href="/blog" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">Blog</a>
            <a href="/contact" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">{lang === "id" ? "Hubungi Kami" : "Contact Us"}</a>
            <a href="/privacy" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">{lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}</a>
            <a href="/terms" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">{lang === "id" ? "Syarat & Ketentuan" : "Terms of Service"}</a>
            <a href="/disclaimer" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">{lang === "id" ? "Disclaimer" : "Disclaimer"}</a>
            <a href="/dmca" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">DMCA</a>
            <a href="/cookie-policy" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">{lang === "id" ? "Kebijakan Cookie" : "Cookie Policy"}</a>
            <a href="/sitemap.xml" className="footer-link text-white text-xs md:text-sm hover:text-[#E52222] transition-colors">Sitemap</a>
          </div>
          <p className="footer-copy text-[#999999] text-xs lg:text-base">&copy; 2024-2026 GetMova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════
   STICKY DOWNLOAD BAR — Appears below navbar when scrolled past hero
   Clean inline bar, not floating navbar at bottom
   ══════════════════════════════════════════════════ */
function StickyDownloadBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [barUrl, setBarUrl] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setVisible(heroBottom < 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = () => {
    if (!barUrl.trim()) return;
    // Fill the hero input and trigger analyze
    const heroInput = document.querySelector<HTMLInputElement>("#hero input[type='text']");
    if (heroInput) {
      // Use native input value setter to trigger React's onChange
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
      nativeInputValueSetter?.call(heroInput, barUrl);
      heroInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
    // Scroll to hero and click download
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const heroBtn = document.querySelector<HTMLButtonElement>("#hero button.download-btn-desktop");
      heroBtn?.click();
    }, 600);
  };

  return (
    <div
      className={`fixed top-16 lg:top-18 left-0 right-0 z-40 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border-b border-gray-100 dark:border-white/10 transition-all duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-3xl h-12 flex items-center gap-2 px-4">
        <div className="flex-1 relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            value={barUrl}
            onChange={e => setBarUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder={t("input.placeholder")}
            className="h-9 w-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white text-sm pl-9 pr-3 rounded-lg border-0 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="h-9 px-4 bg-[#E52222] text-white font-bold text-xs rounded-lg hover:bg-[#C91C1C] transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t("btn.download")}</span>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════ */
export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
        <Navbar />
        <StickyDownloadBar />
        <main className="flex-1">
          <HeroSection />
          <FreeDownloaderSection />
          <HowToUseSection />
          <PlatformQuickAccessSection />
          <FeatureCardsSection />
          <SupportedFormatsSection />
          <StatisticsSection />
          <WhyChooseSection />
          <ComparisonSection />
          <TestimonialsSection />
          <FAQSection />
          <BlogPreviewSection />
          <ToolsSection />
          <NewsletterSection />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Apakah GetMova benar-benar gratis?", acceptedAnswer: { "@type": "Answer", text: "Ya, GetMova 100% gratis tanpa biaya tersembunyi." } },
              { "@type": "Question", name: "Apakah ada batasan jumlah download?", acceptedAnswer: { "@type": "Answer", text: "Tidak ada batasan!" } },
              { "@type": "Question", name: "Di mana video yang didownload disimpan?", acceptedAnswer: { "@type": "Answer", text: "Video akan otomatis tersimpan di folder download perangkatmu." } },
              { "@type": "Question", name: "Platform apa saja yang didukung?", acceptedAnswer: { "@type": "Answer", text: "GetMova mendukung TikTok, Instagram, Facebook, Twitter/X, Pinterest, dan Reddit." } },
              { "@type": "Question", name: "Apakah video yang didownload bebas watermark?", acceptedAnswer: { "@type": "Answer", text: "Ya! Semua video yang didownload melalui GetMova bebas watermark." } },
              { "@type": "Question", name: "Apakah GetMova aman digunakan?", acceptedAnswer: { "@type": "Answer", text: "Sangat aman! Kami tidak menyimpan data pribadi atau riwayat download kamu." } },
            ]
          })}} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "HowTo", name: "Cara Download Video Tanpa Watermark dengan GetMova",
            step: [
              { "@type": "HowToStep", position: 1, name: "Cari Video", text: "Temukan video yang kamu inginkan dan salin link-nya." },
              { "@type": "HowToStep", position: 2, name: "Tempel Link", text: "Tempel link yang sudah disalin di kolom input GetMova." },
              { "@type": "HowToStep", position: 3, name: "Download", text: "Pilih kualitas dan klik download untuk menyimpan video." }
            ]
          })}} />
        </main>
        <Footer />
        <BackToTopButton />
        <WhatsAppWidget />

      </div>
    </LanguageProvider>
  );
}

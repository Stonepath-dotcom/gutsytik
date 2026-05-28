/**
 * Mova Video Downloader API
 *
 * Standalone backend for YouTube (and other platform) video downloading.
 * Uses yt-dlp as the primary downloader and ffmpeg for audio conversion.
 *
 * Endpoints:
 *  GET  /health              - Health check
 *  GET  /info?url=...&audio=0|1  - Get video info + quality options
 *  GET  /download?url=...&format=...&quality=...  - Download/convert video
 *  GET  /stream?url=...&format=...&quality=...    - Stream video/audio
 *  POST /cookies             - Update YouTube cookies (admin only)
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { execFile, exec, spawn } = require("child_process");
const { URL } = require("url");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

/* ──────────── Configuration ──────────── */
const PORT = parseInt(process.env.PORT || "8888", 10);
const YT_DLP_PATH = process.env.YT_DLP_PATH || "yt-dlp";
const FFMPEG_PATH = process.env.FFMPEG_PATH || "ffmpeg";
const ADMIN_KEY = process.env.ADMIN_KEY || "mova-admin-secret";
const COOKIES_FILE = process.env.COOKIES_FILE || path.join(__dirname, "..", "cookies", "youtube.txt");
const TEMP_DIR = process.env.TEMP_DIR || "/tmp/mova-downloads";
const MAX_REQUESTS_PER_MIN = parseInt(process.env.RATE_LIMIT || "30", 10);
const YT_DLP_TIMEOUT = parseInt(process.env.YTDLP_TIMEOUT || "120000", 10);
const DOWNLOAD_TIMEOUT = parseInt(process.env.DOWNLOAD_TIMEOUT || "300000", 10);
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || "1073741824", 10); // 1GB

// Allowed platforms
const ALLOWED_HOSTS = [
  "youtube.com", "youtu.be", "m.youtube.com",
  "tiktok.com", "vm.tiktok.com", "vt.tiktok.com",
  "instagram.com",
  "facebook.com", "fb.watch", "fb.com",
  "twitter.com", "x.com",
  "pinterest.com", "pin.it",
  "reddit.com", "redd.it",
  "soundcloud.com", "vimeo.com", "dailymotion.com",
  "twitch.tv", "likee.video", "snackvideo.com",
];

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Ensure cookies directory exists
const cookiesDir = path.dirname(COOKIES_FILE);
if (!fs.existsSync(cookiesDir)) {
  fs.mkdirSync(cookiesDir, { recursive: true });
}

/* ──────────── Rate Limiting ──────────── */
const requests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const reqs = (requests.get(ip) || []).filter((t) => now - t < 60000);
  requests.set(ip, [...reqs, now]);
  // Cleanup old entries periodically
  if (requests.size > 10000) {
    for (const [key, times] of requests) {
      requests.set(key, times.filter((t) => now - t < 60000));
      if (requests.get(key).length === 0) requests.delete(key);
    }
  }
  return reqs.length >= MAX_REQUESTS_PER_MIN;
}

/* ──────────── URL Validation ──────────── */
function isAllowedUrl(urlStr) {
  try {
    const h = new URL(urlStr).hostname.toLowerCase();
    return ALLOWED_HOSTS.some((d) => h.includes(d));
  } catch {
    return false;
  }
}

/* ──────────── Platform Detection ──────────── */
function detectPlatform(urlStr) {
  try {
    const h = new URL(urlStr).hostname.toLowerCase();
    if (h.includes("tiktok") || h.includes("vm.tiktok") || h.includes("vt.tiktok")) return "TikTok";
    if (h.includes("youtube") || h.includes("youtu.be")) return "YouTube";
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("facebook") || h.includes("fb.watch") || h.includes("fb.com")) return "Facebook";
    if (h.includes("twitter") || h.includes("x.com")) return "Twitter/X";
    if (h.includes("pinterest")) return "Pinterest";
    if (h.includes("reddit")) return "Reddit";
    if (h.includes("soundcloud")) return "SoundCloud";
    if (h.includes("vimeo")) return "Vimeo";
    return "Unknown";
  } catch {
    return "Unknown";
  }
}

/* ──────────── YouTube Video ID Extraction ──────────── */
function extractYouTubeVideoId(urlStr) {
  try {
    const p = new URL(urlStr);
    if (p.hostname.includes("youtube.com") && p.searchParams.get("v")) return p.searchParams.get("v");
    if (p.hostname === "youtu.be") return p.pathname.slice(1).split("/")[0] || null;
    if (p.pathname.startsWith("/shorts/")) return p.pathname.split("/")[2] || null;
    if (p.pathname.startsWith("/embed/")) return p.pathname.split("/")[2] || null;
  } catch {}
  return null;
}

/* ──────────── yt-dlp Execution ──────────── */
function runYtdlp(args, timeout = YT_DLP_TIMEOUT) {
  return new Promise((resolve, reject) => {
    const proc = execFile(YT_DLP_PATH, args, {
      timeout,
      maxBuffer: 50 * 1024 * 1024, // 50MB buffer for large JSON outputs
      env: { ...process.env, HOME: process.env.HOME || "/tmp" },
    }, (error, stdout, stderr) => {
      if (error) {
        const errMsg = (stderr || error.message).substring(0, 500);
        console.error(`[yt-dlp] Error: ${errMsg}`);
        reject(new Error(errMsg));
        return;
      }
      // For --dump-json, parse the JSON output
      for (const line of stdout.split("\n")) {
        if (line.startsWith("{")) {
          try {
            resolve(JSON.parse(line));
          } catch (e) {
            reject(new Error("Failed to parse yt-dlp JSON output"));
          }
          return;
        }
      }
      // For other commands, return stdout
      resolve({ stdout, stderr });
    });
  });
}

/* ──────────── Cookie Management ──────────── */
function hasCookies() {
  try {
    return fs.existsSync(COOKIES_FILE) && fs.statSync(COOKIES_FILE).size > 0;
  } catch {
    return false;
  }
}

function getCookieArgs() {
  if (hasCookies()) {
    return ["--cookies", COOKIES_FILE];
  }
  return [];
}

/* ──────────── Build Quality Options ──────────── */
function buildQualityOptions(formats, audioOnly) {
  const qualityOptions = [];

  if (audioOnly) {
    // Audio-only: get best audio formats
    const audioFormats = formats
      .filter((f) => f.acodec !== "none" && f.vcodec === "none" && f.url)
      .sort((a, b) => (b.abr || 0) - (a.abr || 0));

    if (audioFormats.length > 0) {
      qualityOptions.push({
        label: "Audio",
        resolution: "MP3",
        format: "mp3",
        url: audioFormats[0].url,
        ext: audioFormats[0].ext || "m4a",
        bitrate: audioFormats[0].abr,
        filesize: audioFormats[0].filesize,
        needsConversion: true, // Will be converted to MP3 via ffmpeg
        acodec: audioFormats[0].acodec,
      });
      if (audioFormats.length > 1) {
        qualityOptions.push({
          label: "Audio (Medium)",
          resolution: "MP3",
          format: "mp3",
          url: audioFormats[Math.floor(audioFormats.length / 2)].url,
          ext: audioFormats[Math.floor(audioFormats.length / 2)].ext || "m4a",
          bitrate: audioFormats[Math.floor(audioFormats.length / 2)].abr,
          needsConversion: true,
          acodec: audioFormats[Math.floor(audioFormats.length / 2)].acodec,
        });
      }
    }
  } else {
    // Video: prefer combined formats (video+audio)
    const combined = formats
      .filter((f) => f.acodec !== "none" && f.vcodec !== "none" && f.url)
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    // Video-only formats (for muxing)
    const videoOnly = formats
      .filter((f) => f.vcodec !== "none" && f.acodec === "none" && f.url)
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    const audioFormats = formats
      .filter((f) => f.acodec !== "none" && f.vcodec === "none" && f.url)
      .sort((a, b) => (b.abr || 0) - (a.abr || 0));

    const seen = new Set();

    // Add combined formats first
    for (const f of combined) {
      const key = f.height || "auto";
      if (seen.has(key)) continue;
      seen.add(key);
      qualityOptions.push({
        label: f.format_note || (f.height ? `${f.height}p` : "Auto"),
        resolution: f.height ? `${f.height}p` : "Auto",
        format: "mp4",
        url: f.url,
        ext: f.ext || "mp4",
        filesize: f.filesize,
        filesizeApprox: f.filesize_approx,
        needsConversion: false,
        vcodec: f.vcodec,
        acodec: f.acodec,
        height: f.height,
        width: f.width,
        fps: f.fps,
      });
    }

    // If no combined formats, add video-only with a note about muxing
    if (combined.length === 0) {
      for (const f of videoOnly.slice(0, 6)) {
        const key = f.height || "auto";
        if (seen.has(key)) continue;
        seen.add(key);
        qualityOptions.push({
          label: f.format_note || (f.height ? `${f.height}p` : "Auto"),
          resolution: f.height ? `${f.height}p` : "Auto",
          format: "mp4",
          url: f.url,
          ext: f.ext || "mp4",
          filesize: f.filesize,
          filesizeApprox: f.filesize_approx,
          needsConversion: true, // Needs muxing with audio
          needsMuxing: true,
          vcodec: f.vcodec,
          acodec: "none",
          height: f.height,
          audioUrl: audioFormats.length > 0 ? audioFormats[0].url : null,
        });
      }
    }

    // Add audio option
    if (audioFormats.length > 0) {
      qualityOptions.push({
        label: "Audio",
        resolution: "MP3",
        format: "mp3",
        url: audioFormats[0].url,
        ext: audioFormats[0].ext || "m4a",
        bitrate: audioFormats[0].abr,
        needsConversion: true,
        acodec: audioFormats[0].acodec,
      });
    }
  }

  return qualityOptions;
}

/* ──────────── Express App ──────────── */
const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://getmova.my.id",
    "https://www.getmova.my.id",
    "http://localhost:3000",
    "http://localhost:3001",
    /\.vercel\.app$/,
    /\.onrender\.com$/,
    /\.railway\.app$/,
    /\.koyeb\.app$/,
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-Admin-Key", "Range"],
  exposedHeaders: ["Content-Range", "Accept-Ranges", "Content-Length", "Content-Disposition"],
  credentials: false,
  maxAge: 86400,
}));

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(morgan("combined"));
app.use(express.json({ limit: "1mb" }));

// Trust proxy headers (for Render/Railway)
app.set("trust proxy", 1);

/* ──────────── Health Check ──────────── */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "mova-downloader-api",
    version: "2.0.0",
    ytdlp: YT_DLP_PATH,
    ffmpeg: FFMPEG_PATH,
    cookies: hasCookies(),
    uptime: process.uptime(),
    memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
  });
});

/* ──────────── Video Info Endpoint ──────────── */
app.get("/info", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Rate limited. Try again in a minute." });
  }

  const targetUrl = req.query.url;
  const audioOnly = req.query.audio === "1";

  if (!targetUrl || !isAllowedUrl(targetUrl)) {
    return res.status(400).json({ error: "Invalid or unsupported URL." });
  }

  console.log(`[info] ${new Date().toISOString()} URL=${targetUrl} audio=${audioOnly} ip=${ip}`);

  try {
    const args = [
      "--dump-json",
      "--no-download",
      "--no-warnings",
      "--no-check-certificates",
      "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      ...getCookieArgs(),
    ];

    if (audioOnly) {
      args.push("-f", "bestaudio/best");
    }

    args.push(targetUrl);

    const result = await runYtdlp(args);

    const videoId = extractYouTubeVideoId(targetUrl);
    const title = result.title || "Video";
    const author = result.uploader || result.channel || "@unknown";
    const duration = result.duration || 0;
    const thumbnail = result.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "");
    const durationStr = `${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}`;
    const platform = detectPlatform(targetUrl);

    const qualityOptions = buildQualityOptions(result.formats || [], audioOnly);

    if (qualityOptions.length === 0) {
      return res.status(404).json({ error: "No downloadable formats found for this video." });
    }

    const response = {
      success: true,
      title,
      thumbnail,
      duration: durationStr,
      durationSeconds: duration,
      author,
      platform,
      downloadUrl: qualityOptions[0].url,
      qualityOptions,
      filename: `mova_${platform.toLowerCase().replace(/[^a-z0-9]/g, "")}_${videoId || Date.now()}`,
      videoId,
    };

    console.log(`[info] OK: ${title} (${qualityOptions.length} formats)`);
    res.json(response);
  } catch (error) {
    console.error(`[info] Error: ${error.message}`);
    const status = error.message.includes("Video unavailable") ? 404
      : error.message.includes("Sign in") ? 403
      : error.message.includes("HTTP Error 429") ? 429
      : 422;
    res.status(status).json({
      error: error.message.substring(0, 300),
      hint: status === 403 ? "YouTube requires authentication. Cookies may need to be updated." : undefined,
    });
  }
});

/* ──────────── Download Endpoint ──────────── */
app.get("/download", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Rate limited." });
  }

  const targetUrl = req.query.url;
  const formatId = req.query.format; // yt-dlp format ID or quality label
  const quality = req.query.quality || "best";
  const audioOnly = req.query.audio === "1" || quality === "MP3" || quality === "Audio";

  if (!targetUrl || !isAllowedUrl(targetUrl)) {
    return res.status(400).json({ error: "Invalid or unsupported URL." });
  }

  console.log(`[download] ${new Date().toISOString()} URL=${targetUrl} quality=${quality} audio=${audioOnly}`);

  const tempId = crypto.randomBytes(8).toString("hex");
  const outputTemplate = path.join(TEMP_DIR, `mova_${tempId}.%(ext)s`);

  try {
    const args = [
      "--no-warnings",
      "--no-check-certificates",
      "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      ...getCookieArgs(),
    ];

    if (audioOnly) {
      // Audio download: get best audio and convert to mp3
      args.push(
        "-f", "bestaudio/best",
        "-x", // Extract audio
        "--audio-format", "mp3",
        "--audio-quality", "0",
        "--ffmpeg-location", FFMPEG_PATH,
      );
    } else {
      // Video download: try best combined, or best video+audio
      if (formatId) {
        args.push("-f", formatId);
      } else {
        args.push("-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best");
      }
      args.push(
        "--merge-output-format", "mp4",
        "--ffmpeg-location", FFMPEG_PATH,
      );
    }

    args.push("-o", outputTemplate);
    args.push(targetUrl);

    // Execute yt-dlp download
    await new Promise((resolve, reject) => {
      const proc = execFile(YT_DLP_PATH, args, {
        timeout: DOWNLOAD_TIMEOUT,
        maxBuffer: 10 * 1024 * 1024,
        env: { ...process.env, HOME: process.env.HOME || "/tmp" },
      }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error((stderr || error.message).substring(0, 500)));
          return;
        }
        resolve({ stdout, stderr });
      });
    });

    // Find the output file
    const ext = audioOnly ? "mp3" : "mp4";
    let filePath = outputTemplate.replace("%(ext)s", ext);

    // yt-dlp might output a different extension
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(outputTemplate);
      const base = path.basename(outputTemplate, ".%(ext)s");
      const files = fs.readdirSync(dir).filter((f) => f.startsWith(base));
      if (files.length > 0) {
        filePath = path.join(dir, files[0]);
      } else {
        throw new Error("Download completed but output file not found.");
      }
    }

    // Check file size
    const stat = fs.statSync(filePath);
    if (stat.size === 0) {
      fs.unlinkSync(filePath);
      throw new Error("Downloaded file is empty.");
    }
    if (stat.size > MAX_FILE_SIZE) {
      fs.unlinkSync(filePath);
      throw new Error("File too large.");
    }

    // Stream the file to the client
    const videoId = extractYouTubeVideoId(targetUrl);
    const downloadName = `mova_${audioOnly ? "mp3" : "video"}_${videoId || tempId}.${ext}`;
    const contentType = audioOnly ? "audio/mpeg" : "video/mp4";

    // Handle Range requests for video seeking
    let fileStream;
    const rangeHeader = req.headers.range;

    if (rangeHeader && !audioOnly) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunkSize = end - start + 1;

      res.setHeader("Content-Range", `bytes ${start}-${end}/${stat.size}`);
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Length", chunkSize.toString());
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.status(206);

      fileStream = fs.createReadStream(filePath, { start, end });
    } else {
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
      res.setHeader("Content-Length", stat.size.toString());
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "no-cache");

      fileStream = fs.createReadStream(filePath);
    }
    fileStream.pipe(res);

    // Clean up file after streaming
    fileStream.on("end", () => {
      try { fs.unlinkSync(filePath); } catch {}
    });
    fileStream.on("error", () => {
      try { fs.unlinkSync(filePath); } catch {}
    });

    console.log(`[download] OK: ${downloadName} (${(stat.size / 1024 / 1024).toFixed(1)}MB)`);
  } catch (error) {
    console.error(`[download] Error: ${error.message}`);
    // Clean up temp files
    try {
      const files = fs.readdirSync(TEMP_DIR).filter((f) => f.includes(tempId));
      files.forEach((f) => fs.unlinkSync(path.join(TEMP_DIR, f)));
    } catch {}

    if (!res.headersSent) {
      res.status(500).json({ error: error.message.substring(0, 300) });
    }
  }
});

/* ──────────── Stream Endpoint (direct URL proxy) ──────────── */
app.get("/stream", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Rate limited." });
  }

  const streamUrl = req.query.url;
  const filename = req.query.filename || `mova_stream_${Date.now()}`;
  const quality = req.query.quality || "video";

  if (!streamUrl) {
    return res.status(400).json({ error: "Stream URL required." });
  }

  try {
    let parsedUrl;
    try {
      parsedUrl = new URL(streamUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL." });
    }

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Accept-Encoding": "identity",
    };

    // Add referer for specific hosts
    const host = parsedUrl.hostname.toLowerCase();
    if (host.includes("googlevideo") || host.includes("youtube")) {
      headers["Referer"] = "https://www.youtube.com/";
      headers["Origin"] = "https://www.youtube.com";
    } else if (host.includes("tiktokcdn") || host.includes("tiktok") || host.includes("tikwm")) {
      headers["Referer"] = "https://www.tiktok.com/";
    } else if (host.includes("reddit") || host.includes("redd.it")) {
      headers["Referer"] = "https://www.reddit.com/";
    } else if (host.includes("instagram") || host.includes("cdninstagram") || host.includes("fbcdn")) {
      headers["Referer"] = "https://www.instagram.com/";
    } else if (host.includes("facebook") || host.includes("fbcdn")) {
      headers["Referer"] = "https://www.facebook.com/";
    }

    // Support Range requests for video seeking
    const rangeHeader = req.headers.range;
    if (rangeHeader) {
      headers["Range"] = rangeHeader;
    }

    const isAudio = quality === "Audio" || quality === "MP3" || quality === "Audio (Low)";
    const ext = isAudio ? "mp3" : "mp4";
    const downloadName = `${filename}_${quality}.${ext}`;

    const response = await fetch(streamUrl, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(180000), // 3 min timeout for large files
    });

    if (!response.ok && response.status !== 206) {
      return res.status(response.status).json({ error: `Upstream returned ${response.status}` });
    }

    const contentType = response.headers.get("content-type") || (isAudio ? "audio/mpeg" : "video/mp4");
    const contentLength = response.headers.get("content-length");
    const contentRange = response.headers.get("content-range");
    const acceptRanges = response.headers.get("accept-ranges");

    res.setHeader("Content-Type", isAudio ? "audio/mpeg" : contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Accept-Ranges", acceptRanges || "bytes");
    if (contentLength) {
      res.setHeader("Content-Length", contentLength);
    }
    if (contentRange) {
      res.setHeader("Content-Range", contentRange);
      res.status(206); // Partial Content
    }

    // Stream the response with backpressure handling
    const reader = response.body.getReader();
    let bytesStreamed = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytesStreamed += value.length;
        if (!res.write(value)) {
          // Handle backpressure
          await new Promise((resolve) => res.once("drain", resolve));
        }
      }
    } catch (e) {
      console.error(`[stream] Stream error after ${bytesStreamed} bytes: ${e.message}`);
    }
    res.end();

    console.log(`[stream] OK: ${downloadName} (${(bytesStreamed / 1024 / 1024).toFixed(1)}MB)`);
  } catch (error) {
    console.error(`[stream] Error: ${error.message}`);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message.substring(0, 300) });
    }
  }
});

/* ──────────── Convert Endpoint (audio conversion via ffmpeg) ──────────── */
app.get("/convert", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Rate limited." });
  }

  const sourceUrl = req.query.url;
  const format = req.query.format || "mp3";
  const bitrate = req.query.bitrate || "192k";
  const filename = req.query.filename || `mova_audio_${Date.now()}`;

  if (!sourceUrl) {
    return res.status(400).json({ error: "Source URL required." });
  }

  console.log(`[convert] ${new Date().toISOString()} format=${format} bitrate=${bitrate}`);

  const tempId = crypto.randomBytes(8).toString("hex");
  const inputFile = path.join(TEMP_DIR, `input_${tempId}`);
  const outputFile = path.join(TEMP_DIR, `output_${tempId}.${format}`);

  try {
    // Download the source file first
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "*/*",
      "Accept-Encoding": "identity",
    };

    let parsedUrl;
    try { parsedUrl = new URL(sourceUrl); } catch {
      return res.status(400).json({ error: "Invalid source URL." });
    }

    const host = parsedUrl.hostname.toLowerCase();
    if (host.includes("googlevideo") || host.includes("youtube")) {
      headers["Referer"] = "https://www.youtube.com/";
    }

    const response = await fetch(sourceUrl, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) {
      throw new Error(`Failed to download source: ${response.status}`);
    }

    // Save to temp file
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(inputFile, Buffer.from(buffer));

    // Convert with ffmpeg
    await new Promise((resolve, reject) => {
      const ffmpegArgs = [
        "-i", inputFile,
        "-vn", // No video
        "-acodec", format === "mp3" ? "libmp3lame" : "copy",
        "-ab", bitrate,
        "-y", // Overwrite
        outputFile,
      ];

      execFile(FFMPEG_PATH, ffmpegArgs, { timeout: 120000 }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`ffmpeg error: ${(stderr || error.message).substring(0, 300)}`));
          return;
        }
        resolve();
      });
    });

    // Check output file
    if (!fs.existsSync(outputFile)) {
      throw new Error("Conversion completed but output file not found.");
    }

    const stat = fs.statSync(outputFile);
    if (stat.size === 0) {
      throw new Error("Converted file is empty.");
    }

    // Stream the converted file
    const downloadName = `${filename}.${format}`;
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
    res.setHeader("Content-Length", stat.size.toString());
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");

    const fileStream = fs.createReadStream(outputFile);
    fileStream.pipe(res);

    fileStream.on("end", () => {
      try { fs.unlinkSync(inputFile); fs.unlinkSync(outputFile); } catch {}
    });

    console.log(`[convert] OK: ${downloadName} (${(stat.size / 1024 / 1024).toFixed(1)}MB)`);
  } catch (error) {
    console.error(`[convert] Error: ${error.message}`);
    try { fs.unlinkSync(inputFile); fs.unlinkSync(outputFile); } catch {}
    if (!res.headersSent) {
      res.status(500).json({ error: error.message.substring(0, 300) });
    }
  }
});

/* ──────────── Cookies Update Endpoint (Admin Only) ──────────── */
app.post("/cookies", (req, res) => {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized. Provide X-Admin-Key header." });
  }

  try {
    const { cookies } = req.body;
    if (!cookies || typeof cookies !== "string") {
      return res.status(400).json({ error: "Cookies content required in body.cookies field." });
    }

    fs.writeFileSync(COOKIES_FILE, cookies, "utf-8");
    console.log(`[cookies] Updated successfully (${cookies.length} bytes)`);
    res.json({ success: true, message: "Cookies updated.", size: cookies.length });
  } catch (error) {
    res.status(500).json({ error: `Failed to write cookies: ${error.message}` });
  }
});

/* ──────────── Cleanup: Remove old temp files ──────────── */
setInterval(() => {
  try {
    const now = Date.now();
    const files = fs.readdirSync(TEMP_DIR);
    let cleaned = 0;
    for (const file of files) {
      const filePath = path.join(TEMP_DIR, file);
      try {
        const stat = fs.statSync(filePath);
        // Remove files older than 1 hour
        if (now - stat.mtimeMs > 3600000) {
          fs.unlinkSync(filePath);
          cleaned++;
        }
      } catch {}
    }
    if (cleaned > 0) {
      console.log(`[cleanup] Removed ${cleaned} old temp files.`);
    }
  } catch {}
}, 600000); // Every 10 minutes

/* ──────────── Start Server ──────────── */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n========================================`);
  console.log(`  Mova Downloader API v2.0`);
  console.log(`  Running on http://0.0.0.0:${PORT}`);
  console.log(`  yt-dlp: ${YT_DLP_PATH}`);
  console.log(`  ffmpeg: ${FFMPEG_PATH}`);
  console.log(`  Cookies: ${hasCookies() ? "loaded" : "not found"}`);
  console.log(`  Temp dir: ${TEMP_DIR}`);
  console.log(`  Rate limit: ${MAX_REQUESTS_PER_MIN} req/min`);
  console.log(`========================================\n`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[shutdown] SIGTERM received, cleaning up...");
  try {
    const files = fs.readdirSync(TEMP_DIR);
    for (const file of files) {
      try { fs.unlinkSync(path.join(TEMP_DIR, file)); } catch {}
    }
  } catch {}
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error("[uncaught]", err);
});

process.on("unhandledRejection", (err) => {
  console.error("[unhandled]", err);
});

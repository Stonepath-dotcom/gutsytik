import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const YT_DLP_PATH = "/home/z/.local/bin/yt-dlp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, lang, format } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL video tidak boleh kosong." },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();

    try {
      new URL(trimmedUrl);
    } catch {
      return NextResponse.json(
        { error: "Format URL tidak valid." },
        { status: 400 }
      );
    }

    // If lang is provided, download the subtitle in SRT format
    if (lang && format === "srt") {
      try {
        const { stdout } = await execFileAsync(YT_DLP_PATH, [
          "--write-sub",
          "--write-auto-sub",
          "--sub-lang", lang,
          "--sub-format", "srt",
          "--skip-download",
          "-o", "-",
          "--no-warnings",
          "--no-check-certificates",
          "--user-agent",
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          trimmedUrl,
        ], { timeout: 30000, maxBuffer: 10 * 1024 * 1024 });

        return NextResponse.json(
          { content: stdout, lang },
          { status: 200 }
        );
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        // Try alternative approach: download subtitle file
        try {
          const tmpPath = `/tmp/gutsytik_sub_${Date.now()}`;
          await execFileAsync(YT_DLP_PATH, [
            "--write-sub",
            "--write-auto-sub",
            "--sub-lang", lang,
            "--sub-format", "srt/vtt/best",
            "--skip-download",
            "-o", tmpPath,
            "--no-warnings",
            "--no-check-certificates",
            trimmedUrl,
          ], { timeout: 30000 });

          // Read the subtitle file
          const fs = await import("fs");
          const files = fs.readdirSync("/tmp").filter((f) => f.startsWith(`gutsytik_sub_${Date.now() - 1000}`) && (f.endsWith(".srt") || f.endsWith(".vtt")));

          if (files.length > 0) {
            const content = fs.readFileSync(`/tmp/${files[0]}`, "utf-8");
            // Clean up temp files
            for (const f of files) {
              try { fs.unlinkSync(`/tmp/${f}`); } catch {}
            }
            return NextResponse.json(
              { content, lang },
              { status: 200 }
            );
          }
        } catch {}

        return NextResponse.json(
          { error: `Gagal mengunduh subtitle: ${errorMessage.substring(0, 100)}` },
          { status: 422 }
        );
      }
    }

    // Otherwise, list available subtitles
    try {
      const { stdout } = await execFileAsync(YT_DLP_PATH, [
        "--list-subs",
        "--no-warnings",
        "--no-check-certificates",
        "--user-agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        trimmedUrl,
      ], { timeout: 30000, maxBuffer: 5 * 1024 * 1024 });

      // Parse the output to extract subtitle languages
      const subtitles: { lang: string; name: string }[] = [];
      const lines = stdout.split("\n");

      let inSubtitleSection = false;
      for (const line of lines) {
        if (line.includes("Available subtitles")) {
          inSubtitleSection = true;
          continue;
        }
        if (line.includes("Available automatic captions")) {
          inSubtitleSection = true;
          continue;
        }
        if (inSubtitleSection && line.trim() === "") {
          inSubtitleSection = false;
          continue;
        }
        if (inSubtitleSection) {
          // Parse lines like: "en       English"
          const match = line.match(/^([a-z]{2,3}(?:-[a-zA-Z]+)?)\s+(.+)$/);
          if (match) {
            const existing = subtitles.find((s) => s.lang === match[1]);
            if (!existing) {
              subtitles.push({ lang: match[1], name: match[2].trim() });
            }
          }
        }
      }

      // Also try to get subtitles via JSON for better parsing
      try {
        const { stdout: jsonOut } = await execFileAsync(YT_DLP_PATH, [
          "-j",
          "--no-warnings",
          "--no-check-certificates",
          trimmedUrl,
        ], { timeout: 30000, maxBuffer: 10 * 1024 * 1024 });

        const info = JSON.parse(jsonOut);
        const subs = info.subtitles || {};
        const autoSubs = info.automatic_captions || {};

        // Clear and re-populate from JSON data (more accurate)
        const jsonSubtitles: { lang: string; name: string }[] = [];
        for (const [langCode, formats] of Object.entries(subs)) {
          if (!jsonSubtitles.find((s) => s.lang === langCode)) {
            jsonSubtitles.push({ lang: langCode, name: langCode.toUpperCase() });
          }
        }
        for (const [langCode] of Object.entries(autoSubs)) {
          if (!jsonSubtitles.find((s) => s.lang === langCode)) {
            jsonSubtitles.push({ lang: langCode, name: `${langCode.toUpperCase()} (Auto)` });
          }
        }

        if (jsonSubtitles.length > 0) {
          return NextResponse.json(
            { subtitles: jsonSubtitles },
            { status: 200 }
          );
        }
      } catch {}

      if (subtitles.length === 0) {
        return NextResponse.json(
          { subtitles: [], message: "Tidak ada subtitle tersedia untuk video ini." },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { subtitles },
        { status: 200 }
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return NextResponse.json(
        { error: `Gagal mengambil daftar subtitle: ${errorMessage.substring(0, 100)}` },
        { status: 422 }
      );
    }
  } catch (error) {
    console.error("Subtitles API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal." },
      { status: 500 }
    );
  }
}

#!/bin/bash
# Mova API - Glitch Startup Script
# Installs yt-dlp + ffmpeg on first run, then starts the server

echo "========================================="
echo "  Mova API - Starting Up"
echo "========================================="

# Install yt-dlp if not present
if ! command -v yt-dlp &> /dev/null; then
  echo "[setup] Installing yt-dlp..."
  pip3 install yt-dlp 2>/dev/null || pip install yt-dlp 2>/dev/null || {
    echo "[setup] pip not found, installing via curl..."
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /app/.local/bin/yt-dlp 2>/dev/null || {
      mkdir -p /app/.local/bin
      curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /app/.local/bin/yt-dlp
    }
    chmod +x /app/.local/bin/yt-dlp 2>/dev/null
    export PATH="/app/.local/bin:$PATH"
  }
  echo "[setup] yt-dlp installed: $(which yt-dlp 2>/dev/null || echo 'checking...')"
else
  echo "[setup] yt-dlp already installed: $(yt-dlp --version 2>/dev/null)"
fi

# Install ffmpeg if not present
if ! command -v ffmpeg &> /dev/null; then
  echo "[setup] Installing ffmpeg..."
  apt-get update -qq 2>/dev/null && apt-get install -y -qq ffmpeg 2>/dev/null || {
    echo "[setup] apt-get failed, trying static build..."
    mkdir -p /app/.local/bin
    curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz -o /tmp/ffmpeg.tar.xz 2>/dev/null
    if [ -f /tmp/ffmpeg.tar.xz ]; then
      tar -xf /tmp/ffmpeg.tar.xz -C /tmp/ 2>/dev/null
      cp /tmp/ffmpeg-*-static/ffmpeg /app/.local/bin/ffmpeg 2>/dev/null
      cp /tmp/ffmpeg-*-static/ffprobe /app/.local/bin/ffprobe 2>/dev/null
      chmod +x /app/.local/bin/ffmpeg /app/.local/bin/ffprobe 2>/dev/null
      rm -f /tmp/ffmpeg.tar.xz
      rm -rf /tmp/ffmpeg-*-static
    fi
    export PATH="/app/.local/bin:$PATH"
  }
  echo "[setup] ffmpeg installed: $(which ffmpeg 2>/dev/null || echo 'checking...')"
else
  echo "[setup] ffmpeg already installed: $(ffmpeg -version 2>/dev/null | head -1)"
fi

# Create temp and cookies directories
mkdir -p /tmp/mova-downloads
mkdir -p /app/cookies

# Update yt-dlp to latest version
echo "[setup] Updating yt-dlp to latest version..."
yt-dlp -U 2>/dev/null || true

echo "========================================="
echo "  Starting Mova API Server..."
echo "========================================="

# Start the Node.js server
exec node src/server.js

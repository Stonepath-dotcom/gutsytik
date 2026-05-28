# Mova Downloader API - Dockerfile for Render/Railway
# Uses Python + Node.js image to support yt-dlp and ffmpeg

FROM node:20-slim

# Install Python, ffmpeg, and other dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp via pip
RUN pip3 install --no-cache-dir --break-system-packages yt-dlp

# Verify installations
RUN yt-dlp --version && ffmpeg -version | head -1

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install Node.js dependencies
RUN npm install --production

# Copy application code
COPY src/ ./src/
COPY cookies/ ./cookies/

# Create temp directory
RUN mkdir -p /tmp/mova-downloads

# Environment variables
ENV PORT=8888
ENV NODE_ENV=production
ENV YT_DLP_PATH=yt-dlp
ENV FFMPEG_PATH=ffmpeg
ENV TEMP_DIR=/tmp/mova-downloads
ENV RATE_LIMIT=30
ENV YTDLP_TIMEOUT=120000
ENV DOWNLOAD_TIMEOUT=300000

# Expose port
EXPOSE 8888

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:8888/health || exit 1

# Start the server
CMD ["node", "src/server.js"]

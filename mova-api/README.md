# Mova Downloader API

Standalone backend service for Mova video downloader. Runs on Render/Railway with yt-dlp and ffmpeg support.

## Architecture

```
Frontend (Vercel)  →  API Downloader (Render/Railway)  →  YouTube/Other Platforms
getmova.my.id           mova-api.onrender.com
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/info?url=...&audio=0\|1` | Get video info + quality options |
| GET | `/download?url=...&quality=...&audio=0\|1` | Download & convert video (full file) |
| GET | `/stream?url=...&quality=...&filename=...` | Stream video/audio directly |
| GET | `/convert?url=...&format=mp3&bitrate=192k` | Convert audio to MP3 via ffmpeg |
| POST | `/cookies` | Update YouTube cookies (requires X-Admin-Key) |

## Deployment

### Render

1. Create a new **Web Service** on Render
2. Connect your repository
3. Set the root directory to `mova-api/`
4. Render will auto-detect the Dockerfile
5. Set environment variables (see below)

### Railway

1. Create a new project on Railway
2. Deploy from GitHub repo, set root directory to `mova-api/`
3. Railway will use the Dockerfile
4. Set environment variables

### Manual VPS

```bash
cd mova-api
npm install
# Install yt-dlp and ffmpeg
pip3 install yt-dlp
apt-get install ffmpeg
# Start the server
node src/server.js
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8888` | Server port |
| `YT_DLP_PATH` | `yt-dlp` | Path to yt-dlp binary |
| `FFMPEG_PATH` | `ffmpeg` | Path to ffmpeg binary |
| `ADMIN_KEY` | `mova-admin-secret` | Admin key for cookie management |
| `COOKIES_FILE` | `./cookies/youtube.txt` | YouTube cookies file path |
| `TEMP_DIR` | `/tmp/mova-downloads` | Temporary download directory |
| `RATE_LIMIT` | `30` | Requests per minute per IP |
| `YTDLP_TIMEOUT` | `120000` | yt-dlp timeout (ms) |
| `DOWNLOAD_TIMEOUT` | `300000` | Full download timeout (ms) |
| `MAX_FILE_SIZE` | `1073741824` | Max file size (1GB) |

## Vercel Frontend Configuration

Set this environment variable in your Vercel project:

```
MOVA_API_URL=https://your-render-app.onrender.com
```

This tells the Vercel frontend to route YouTube download requests to the external backend.

## YouTube Cookies

If YouTube blocks requests (403 errors), you need to update cookies:

```bash
curl -X POST https://your-api.onrender.com/cookies \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: your-admin-key" \
  -d '{"cookies": "# Netscape HTTP Cookie File\n..."}'
```

To export cookies from your browser, use a browser extension like "Get cookies.txt LOCALLY" and export for youtube.com.

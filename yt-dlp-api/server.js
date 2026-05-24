const http = require('http');
const { execFile } = require('child_process');
const { URL } = require('url');

const YTDLP = '/home/z/.local/bin/yt-dlp';
const PORT = 8888;

const requests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const reqs = (requests.get(ip) || []).filter(t => now - t < 60000);
  requests.set(ip, [...reqs, now]);
  return reqs.length >= 15;
}

function isAllowedUrl(urlStr) {
  try {
    const h = new URL(urlStr).hostname.toLowerCase();
    return ['youtube.com','youtu.be','instagram.com','facebook.com','fb.watch','fb.com',
      'twitter.com','x.com','pinterest.com','reddit.com','tiktok.com','vm.tiktok.com',
      'vt.tiktok.com','soundcloud.com','vimeo.com','dailymotion.com','twitch.tv',
      'likee.video','snackvideo.com'].some(d => h.includes(d));
  } catch { return false; }
}

function extractYouTubeVideoId(urlStr) {
  try {
    const p = new URL(urlStr);
    if (p.hostname.includes('youtube.com') && p.searchParams.get('v')) return p.searchParams.get('v');
    if (p.hostname === 'youtu.be') return p.pathname.slice(1).split('/')[0] || null;
    if (p.pathname.startsWith('/shorts/')) return p.pathname.split('/')[2] || null;
    if (p.pathname.startsWith('/embed/')) return p.pathname.split('/')[2] || null;
  } catch {}
  return null;
}

function detectPlatform(urlStr) {
  try {
    const h = new URL(urlStr).hostname.toLowerCase();
    if (h.includes('tiktok') || h.includes('vm.tiktok') || h.includes('vt.tiktok')) return 'TikTok';
    if (h.includes('youtube') || h.includes('youtu.be')) return 'YouTube';
    if (h.includes('instagram')) return 'Instagram';
    if (h.includes('facebook') || h.includes('fb.watch') || h.includes('fb.com')) return 'Facebook';
    if (h.includes('twitter') || h.includes('x.com')) return 'Twitter/X';
    if (h.includes('pinterest')) return 'Pinterest';
    if (h.includes('reddit')) return 'Reddit';
    return 'Unknown';
  } catch { return 'Unknown'; }
}

function runYtdlp(args) {
  return new Promise((resolve, reject) => {
    const proc = execFile(YTDLP, args, {
      timeout: 25000,
      maxBuffer: 10 * 1024 * 1024,
    }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error((stderr || error.message).substring(0, 300)));
        return;
      }
      for (const line of stdout.split('\n')) {
        if (line.startsWith('{')) {
          try { resolve(JSON.parse(line)); } catch (e) { reject(new Error('JSON parse error')); }
          return;
        }
      }
      reject(new Error('No JSON output'));
    });
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  let parsedUrl;
  try { parsedUrl = new URL(req.url, `http://${req.headers.host}`); }
  catch { res.writeHead(400, {'Content-Type':'application/json'}); res.end('{"error":"Bad request"}'); return; }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  if (parsedUrl.pathname === '/health') {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify({status:'ok',service:'mova-ytdlp-api',version:'2.0'}));
    return;
  }

  if (parsedUrl.pathname === '/info') {
    if (isRateLimited(ip)) {
      res.writeHead(429, {'Content-Type':'application/json'});
      res.end(JSON.stringify({error:'Rate limited'}));
      return;
    }

    const targetUrl = parsedUrl.searchParams.get('url');
    const audioOnly = parsedUrl.searchParams.get('audio') === '1';

    if (!targetUrl || !isAllowedUrl(targetUrl)) {
      res.writeHead(400, {'Content-Type':'application/json'});
      res.end(JSON.stringify({error:'Invalid URL'}));
      return;
    }

    console.log(`[${new Date().toISOString()}] Info: ${targetUrl} audio=${audioOnly}`);

    try {
      const args = [
        '--dump-json', '--no-download', '--no-warnings', '--no-check-certificates',
        '--js-runtimes', 'node:/usr/bin/node,bun:/usr/local/bin/bun',
        '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      ];

      if (audioOnly) args.push('-f', 'bestaudio/best');
      args.push(targetUrl);

      const result = await runYtdlp(args);

      const videoId = extractYouTubeVideoId(targetUrl);
      const title = result.title || 'Video';
      const author = result.uploader || result.channel || '@unknown';
      const duration = result.duration || 0;
      const thumbnail = result.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '');
      const durationStr = `${String(Math.floor(duration/60)).padStart(2,'0')}:${String(duration%60).padStart(2,'0')}`;
      const platform = detectPlatform(targetUrl);

      const qualityOptions = [];

      if (audioOnly) {
        const audioFormats = (result.formats || [])
          .filter(f => f.acodec !== 'none' && f.vcodec === 'none' && f.url)
          .sort((a, b) => (b.abr || 0) - (a.abr || 0));

        if (audioFormats.length > 0) {
          qualityOptions.push({
            label: 'Audio', resolution: 'MP3', url: audioFormats[0].url,
            format: audioFormats[0].ext, bitrate: audioFormats[0].abr,
          });
        }
      } else {
        const combined = (result.formats || [])
          .filter(f => f.acodec !== 'none' && f.vcodec !== 'none' && f.url)
          .sort((a, b) => (b.height || 0) - (a.height || 0));

        const videoOnly = (result.formats || [])
          .filter(f => f.vcodec !== 'none' && f.acodec === 'none' && f.url)
          .sort((a, b) => (b.height || 0) - (a.height || 0));

        const audioFormats = (result.formats || [])
          .filter(f => f.acodec !== 'none' && f.vcodec === 'none' && f.url)
          .sort((a, b) => (b.abr || 0) - (a.abr || 0));

        const seen = new Set();
        for (const f of combined) {
          const key = f.height || 'auto';
          if (seen.has(key)) continue;
          seen.add(key);
          qualityOptions.push({
            label: f.format_note || (f.height ? f.height+'p' : 'Auto'),
            resolution: f.height ? f.height+'p' : 'Auto',
            url: f.url, format: f.ext, filesize: f.filesize,
          });
        }

        if (combined.length === 0) {
          for (const f of videoOnly.slice(0, 4)) {
            qualityOptions.push({
              label: f.format_note || (f.height ? f.height+'p' : 'Auto'),
              resolution: f.height ? f.height+'p' : 'Auto',
              url: f.url, format: f.ext, filesize: f.filesize,
            });
          }
        }

        if (audioFormats.length > 0) {
          qualityOptions.push({
            label: 'Audio', resolution: 'MP3', url: audioFormats[0].url,
            format: audioFormats[0].ext, bitrate: audioFormats[0].abr,
          });
        }
      }

      if (qualityOptions.length === 0) {
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(JSON.stringify({error:'No formats found'}));
        return;
      }

      const response = {
        title, thumbnail, duration: durationStr, author, platform,
        downloadUrl: qualityOptions[0].url, qualityOptions,
        filename: `mova_${platform.toLowerCase()}_${videoId || Date.now()}`,
      };

      console.log(`[${new Date().toISOString()}] OK: ${title} (${qualityOptions.length} formats)`);
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify(response));

    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error: ${error.message}`);
      res.writeHead(422, {'Content-Type':'application/json'});
      res.end(JSON.stringify({error: error.message.substring(0, 300)}));
    }
    return;
  }

  res.writeHead(404, {'Content-Type':'application/json'});
  res.end('{"error":"Not found"}');
});

server.listen(PORT, '0.0.0.0', () => console.log(`yt-dlp API v2 running on port ${PORT}`));
process.on('uncaughtException', err => console.error('Uncaught:', err));
process.on('unhandledRejection', err => console.error('Unhandled:', err));

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://googleads.g.doubleclick.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.googleusercontent.com https://*.ggpht.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.co.id https://*.tikwm.com https://*.tiktokcdn.com https://*.tiktok.com https://*.tiktokv.com https://*.ibytedtos.com https://*.byteimg.com https://*.tikcdn.io https://*.ssstik.io https://*.fbcdn.net https://*.cdninstagram.com https://*.redd.it https://*.pinimg.com",
              "frame-src https://googleads.g.doubleclick.net https://www.google.com https://www.youtube.com",
              "connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://*.onrender.com https://*.railway.app https://*.up.railway.app https://*.replit.app https://*.replit.dev https://*.workers.dev https://*.deno.dev https://*.deno.land https://*.tikwm.com https://*.tiktokcdn.com https://*.tiktok.com https://*.tiktokv.com https://*.ibytedtos.com https://*.byteimg.com https://*.tikcdn.io https://ssstik.io https://*.fbcdn.net https://*.cdninstagram.com https://*.redd.it https://*.pinimg.com",
              "font-src 'self'",
              "media-src 'self' blob: https://*.onrender.com https://*.railway.app https://*.up.railway.app https://*.replit.app https://*.replit.dev https://*.googlevideo.com https://*.workers.dev https://*.deno.dev https://*.deno.land https://*.tikwm.com https://*.tiktokcdn.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // NOTE: www→non-www redirect moved to vercel.json for edge-level handling
  // This prevents redirect chains (www + trailing slash + http→https)
  async redirects() {
    return [];
  },
};

export default nextConfig;

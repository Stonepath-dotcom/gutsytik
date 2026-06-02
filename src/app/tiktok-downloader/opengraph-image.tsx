import { ImageResponse } from "next/og";

export const alt = "getmova - Download Video TikTok Tanpa Watermark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#09090B",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(1,1,1,0.2), transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo + Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "#E52222",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <span style={{ fontSize: 48, fontWeight: 900, color: "#FAFAFA", letterSpacing: -2 }}>
              getmova
            </span>
          </div>

          {/* Platform name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#010101",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/>
              </svg>
            </div>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#FAFAFA" }}>
              TikTok Downloader
            </span>
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 22, color: "#A1A1AA", fontWeight: 500, marginBottom: 20 }}>
            Download Video Tanpa Watermark - Gratis & Cepat
          </div>

          {/* Feature badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {["HD Quality", "No Watermark", "100% Free", "No Signup"].map((f) => (
              <div
                key={f}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "#111113",
                  border: "1px solid #27272A",
                  color: "#E52222",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#E52222" }} />
      </div>
    ),
    { ...size }
  );
}

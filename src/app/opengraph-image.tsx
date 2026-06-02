import { ImageResponse } from "next/og";

export const alt = "getmova - Download Video Tanpa Watermark";
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
        {/* Subtle orange glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Main content */}
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
          {/* Logo / Brand Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "#E52222",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#FAFAFA",
                letterSpacing: -2,
              }}
            >
              getmova
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: "#A1A1AA",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Download Video Tanpa Watermark
          </div>

          {/* Platform badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {["TikTok", "Instagram", "YouTube", "Twitter/X", "Facebook"].map(
              (platform) => (
                <div
                  key={platform}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: "#111113",
                    border: "1px solid #27272A",
                    color: "#FAFAFA",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {platform}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#E52222",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

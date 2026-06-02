import { ImageResponse } from "next/og";

export const alt = "getmova - Download Video Telegram HD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#09090B", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,136,204,0.12), transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "#E52222", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 14 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </div>
            <span style={{ fontSize: 48, fontWeight: 900, color: "#FAFAFA", letterSpacing: -2 }}>getmova</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#0088CC", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </div>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#FAFAFA" }}>Telegram Downloader</span>
          </div>
          <div style={{ fontSize: 22, color: "#A1A1AA", fontWeight: 500, marginBottom: 20 }}>Download Video Telegram HD - Gratis & Cepat</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {["HD Quality", "All Formats", "100% Free", "No Signup"].map((f) => (
              <div key={f} style={{ padding: "8px 16px", borderRadius: 8, background: "#111113", border: "1px solid #27272A", color: "#E52222", fontSize: 14, fontWeight: 600 }}>{f}</div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#E52222" }} />
      </div>
    ),
    { ...size }
  );
}

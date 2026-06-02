import { ImageResponse } from "next/og";

export const alt = "getmova - Konversi YouTube ke MP3 Gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#09090B", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,0,0.10), transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "#E52222", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 14 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </div>
            <span style={{ fontSize: 48, fontWeight: 900, color: "#FAFAFA", letterSpacing: -2 }}>getmova</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#FAFAFA" }}>YouTube to MP3</span>
          </div>
          <div style={{ fontSize: 22, color: "#A1A1AA", fontWeight: 500, marginBottom: 20 }}>Konversi Video YouTube ke Audio MP3 - Gratis</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {["320kbps", "Fast Convert", "100% Free", "No Signup"].map((f) => (
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

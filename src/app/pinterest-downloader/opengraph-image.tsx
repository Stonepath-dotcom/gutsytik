import { ImageResponse } from "next/og";

export const alt = "getmova - Download Video Pinterest HD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#09090B", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,0,35,0.12), transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "#E52222", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 14 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </div>
            <span style={{ fontSize: 48, fontWeight: 900, color: "#FAFAFA", letterSpacing: -2 }}>getmova</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#E60023", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
            </div>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#FAFAFA" }}>Pinterest Downloader</span>
          </div>
          <div style={{ fontSize: 22, color: "#A1A1AA", fontWeight: 500, marginBottom: 20 }}>Download Video & Gambar Pinterest - Gratis</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {["HD Quality", "Images", "100% Free", "No Signup"].map((f) => (
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

import { NextResponse } from "next/server";

/**
 * Debug endpoint - Check if ZAI config is available
 */
export async function GET() {
  const hasZaiConfig = !!process.env.ZAI_CONFIG;
  const hasZaiToken = !!process.env.ZAI_TOKEN;
  const configPreview = process.env.ZAI_CONFIG
    ? (() => {
        try {
          const c = JSON.parse(process.env.ZAI_CONFIG);
          return { baseUrl: c.baseUrl, apiKey: c.apiKey, hasToken: !!c.token, hasChatId: !!c.chatId };
        } catch {
          return "invalid json";
        }
      })()
    : null;

  return NextResponse.json({
    hasZaiConfig,
    hasZaiToken,
    configPreview,
    cwd: process.cwd(),
    envKeys: Object.keys(process.env).filter((k) => k.includes("ZAI") || k.includes("Z_AI")).sort(),
  });
}

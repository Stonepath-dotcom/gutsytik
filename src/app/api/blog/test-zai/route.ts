import { NextResponse } from "next/server";

/**
 * ZAI Connection Test - Diagnostic Results
 *
 * FINDING: internal-api.z.ai resolves to 172.25.x.x (internal IP)
 * This means ZAI API is only accessible from the z.ai development environment.
 * Vercel serverless functions CANNOT connect to internal-api.z.ai.
 *
 * SOLUTION: Automations that need AI/Web Search run from the dev environment
 * (where z-ai-web-dev-sdk works) and the results are pushed to Vercel
 * via git commits (auto-blog.json updates).
 *
 * Endpoints that DON'T need AI still work on Vercel:
 * - /api/blog/dashboard (read metrics)
 * - /api/blog/link-check (HTTP fetch only)
 * - /api/blog/index-now (HTTP POST to search engines)
 * - /api/blog/cron (triggers automation)
 *
 * Endpoints that NEED AI (work locally, not on Vercel):
 * - /api/blog/generate (AI content generation)
 * - /api/blog/refresh (AI content refresh)
 * - /api/blog/trending (web search)
 * - /api/blog/seo-audit (AI analysis)
 * - /api/blog/keyword-research (web search + AI)
 * - /api/blog/content-gap (web search + AI)
 * - /api/blog/backlinks (web search + AI)
 * - /api/blog/report (AI report)
 * - /api/blog/paa (web search + AI)
 * - /api/blog/og-image (AI image generation)
 * - /api/blog/topic-cluster (AI strategy)
 * - /api/blog/competitor (web search + AI)
 * - /api/blog/translate (AI translation)
 * - /api/blog/vitals (web search + AI)
 * - /api/blog/social (AI captions)
 */

export async function GET() {
  return NextResponse.json({
    status: "diagnostic",
    zaiConfigLoaded: !!process.env.ZAI_CONFIG,
    zaiApiAccessible: false,
    reason: "internal-api.z.ai resolves to internal IP (172.25.x.x) - not accessible from Vercel",
    solution: "Run AI automations from local dev environment, push results via git",
    workingOnVercel: [
      "/api/blog/dashboard",
      "/api/blog/link-check",
      "/api/blog/index-now",
    ],
    needsLocalRun: [
      "/api/blog/generate",
      "/api/blog/refresh",
      "/api/blog/trending",
      "/api/blog/seo-audit",
      "/api/blog/keyword-research",
      "/api/blog/content-gap",
      "/api/blog/backlinks",
      "/api/blog/report",
      "/api/blog/paa",
      "/api/blog/og-image",
      "/api/blog/topic-cluster",
      "/api/blog/competitor",
      "/api/blog/translate",
      "/api/blog/vitals",
      "/api/blog/social",
    ],
  });
}

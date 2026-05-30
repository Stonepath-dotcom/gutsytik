import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

/**
 * Create ZAI client with multiple fallback strategies
 *
 * Priority:
 * 1. Environment variables (ZAI_TOKEN, ZAI_BASE_URL, etc.) - for Vercel production
 * 2. Config file in project root (.z-ai-config) - for local dev
 * 3. Config file in /etc/.z-ai-config - for local dev (alternative)
 * 4. Default ZAI.create() - reads from standard locations
 */

let _zaiInstance: ZAI | null = null;

function readConfigFile(): Record<string, string> | null {
  // Try project root first
  const paths = [
    path.join(process.cwd(), ".z-ai-config"),
    "/etc/.z-ai-config",
  ];

  for (const configPath of paths) {
    try {
      if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(raw);
      }
    } catch {
      // Try next path
    }
  }
  return null;
}

export async function createZai(): Promise<ZAI> {
  if (_zaiInstance) return _zaiInstance;

  // Strategy 1: Try environment variables first
  const envToken = process.env.ZAI_TOKEN || process.env.Z_AI_TOKEN;
  if (envToken) {
    try {
      const config = {
        apiKey: process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY || "Z.ai",
        baseUrl: process.env.ZAI_BASE_URL || process.env.Z_AI_BASE_URL || "https://internal-api.z.ai/v1",
        token: envToken,
        chatId: process.env.ZAI_CHAT_ID || process.env.Z_AI_CHAT_ID || "",
        userId: process.env.ZAI_USER_ID || process.env.Z_AI_USER_ID || "",
      };

      const zai = await ZAI.create(config as any);
      _zaiInstance = zai;
      return zai;
    } catch {
      // Env var approach failed, try next
    }
  }

  // Strategy 2: Try reading config file
  const fileConfig = readConfigFile();
  if (fileConfig && fileConfig.token) {
    try {
      const zai = await ZAI.create({
        apiKey: fileConfig.apiKey || "Z.ai",
        baseUrl: fileConfig.baseUrl || "https://internal-api.z.ai/v1",
        token: fileConfig.token,
        chatId: fileConfig.chatId || "",
        userId: fileConfig.userId || "",
      } as any);
      _zaiInstance = zai;
      return zai;
    } catch {
      // Config file approach failed, try next
    }
  }

  // Strategy 3: Try default ZAI.create()
  try {
    const zai = await ZAI.create();
    _zaiInstance = zai;
    return zai;
  } catch {
    // All strategies failed
  }

  throw new Error(
    "ZAI configuration not found. To fix:\n" +
    "1. Set ZAI_TOKEN environment variable on Vercel Dashboard → Settings → Environment Variables\n" +
    "2. Or place .z-ai-config file in the project root\n" +
    "The token can be found in /etc/.z-ai-config on the dev machine"
  );
}

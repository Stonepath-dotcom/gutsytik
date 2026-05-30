import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

/**
 * Create ZAI client with multiple fallback strategies
 *
 * The ZAI SDK's ZAI.create() only reads from config files.
 * For Vercel production, we need to:
 * 1. Check environment variables first (Vercel env vars)
 * 2. Check config files (local dev)
 * 3. Create ZAI instance directly with config (new ZAI(config))
 *
 * To set up on Vercel Dashboard → Settings → Environment Variables:
 * - ZAI_TOKEN (the token from .z-ai-config)
 * - ZAI_BASE_URL (optional, defaults to https://internal-api.z.ai/v1)
 * - ZAI_CHAT_ID (optional)
 * - ZAI_USER_ID (optional)
 */

let _zaiInstance: ZAI | null = null;

function readConfigFile(): Record<string, string> | null {
  const paths = [
    path.join(process.cwd(), ".z-ai-config"),
    path.join(require("os").homedir(), ".z-ai-config"),
    "/etc/.z-ai-config",
  ];

  for (const configPath of paths) {
    try {
      if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync(configPath, "utf-8");
        const config = JSON.parse(raw);
        if (config.baseUrl && config.apiKey) {
          return config;
        }
      }
    } catch {
      // Try next path
    }
  }
  return null;
}

export async function createZai(): Promise<ZAI> {
  if (_zaiInstance) return _zaiInstance;

  // Strategy 1: Try ZAI.create() first (reads from config files)
  try {
    const zai = await ZAI.create();
    _zaiInstance = zai;
    return zai;
  } catch {
    // Config file not found, try environment variables
  }

  // Strategy 2: Read from environment variables and create instance directly
  const envToken = process.env.ZAI_TOKEN || process.env.Z_AI_TOKEN;
  if (envToken) {
    const config = {
      apiKey: process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY || "Z.ai",
      baseUrl: process.env.ZAI_BASE_URL || process.env.Z_AI_BASE_URL || "https://internal-api.z.ai/v1",
      token: envToken,
      chatId: process.env.ZAI_CHAT_ID || process.env.Z_AI_CHAT_ID || "",
      userId: process.env.ZAI_USER_ID || process.env.Z_AI_USER_ID || "",
    };

    const zai = new ZAI(config);
    _zaiInstance = zai;
    return zai;
  }

  // Strategy 3: Try reading config file manually (in case ZAI.create() failed for other reason)
  const fileConfig = readConfigFile();
  if (fileConfig) {
    const zai = new ZAI(fileConfig);
    _zaiInstance = zai;
    return zai;
  }

  throw new Error(
    "ZAI configuration not found. To fix:\n" +
    "Option A: Set ZAI_TOKEN environment variable on Vercel Dashboard → Settings → Environment Variables\n" +
    "Option B: Place .z-ai-config file in the project root\n" +
    "The token value can be found in /etc/.z-ai-config on the dev machine"
  );
}

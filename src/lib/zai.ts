import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

/**
 * Create ZAI client with multiple fallback strategies
 *
 * Vercel serverless functions have read-only filesystem (except /tmp),
 * so .z-ai-config file can't be read at runtime.
 *
 * SOLUTION: Set ZAI_CONFIG env var on Vercel with the full JSON config
 *
 * On Vercel Dashboard → Settings → Environment Variables:
 * ZAI_CONFIG = {"baseUrl":"https://internal-api.z.ai/v1","apiKey":"Z.ai","chatId":"chat-44eebbbe-989c-479d-be1e-74878bafcdd1","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","userId":"587bfcd3-5c4b-4b2a-8405-681be93efb7b"}
 *
 * Or set individual env vars:
 * - ZAI_TOKEN
 * - ZAI_BASE_URL (optional)
 * - ZAI_CHAT_ID (optional)
 * - ZAI_USER_ID (optional)
 */

let _zaiInstance: ZAI | null = null;

function readConfigFile(): Record<string, string> | null {
  const paths = [
    path.join(process.cwd(), ".z-ai-config"),
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

  // Strategy 1: Try ZAI_CONFIG env var (full JSON config string)
  if (process.env.ZAI_CONFIG) {
    try {
      const config = JSON.parse(process.env.ZAI_CONFIG);
      if (config.baseUrl && config.apiKey) {
        const zai = new (ZAI as any)(config);
        _zaiInstance = zai;
        return zai;
      }
    } catch {
      // Invalid JSON, try next strategy
    }
  }

  // Strategy 2: Try individual environment variables
  const envToken = process.env.ZAI_TOKEN || process.env.Z_AI_TOKEN;
  if (envToken) {
    const config = {
      apiKey: process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY || "Z.ai",
      baseUrl: process.env.ZAI_BASE_URL || process.env.Z_AI_BASE_URL || "https://internal-api.z.ai/v1",
      token: envToken,
      chatId: process.env.ZAI_CHAT_ID || process.env.Z_AI_CHAT_ID || "",
      userId: process.env.ZAI_USER_ID || process.env.Z_AI_USER_ID || "",
    };

    const zai = new (ZAI as any)(config);
    _zaiInstance = zai;
    return zai;
  }

  // Strategy 3: Try ZAI.create() (reads from config files on local filesystem)
  try {
    const zai = await ZAI.create();
    _zaiInstance = zai;
    return zai;
  } catch {
    // Config file not found
  }

  // Strategy 4: Try reading config file manually
  const fileConfig = readConfigFile();
  if (fileConfig) {
    const zai = new (ZAI as any)(fileConfig);
    _zaiInstance = zai;
    return zai;
  }

  throw new Error(
    "ZAI configuration not found. To fix, set on Vercel Dashboard → Settings → Environment Variables:\n" +
    "ZAI_CONFIG = {\"baseUrl\":\"https://internal-api.z.ai/v1\",\"apiKey\":\"Z.ai\",\"token\":\"YOUR_TOKEN\"}\n" +
    "Or set individual: ZAI_TOKEN, ZAI_BASE_URL, ZAI_CHAT_ID, ZAI_USER_ID"
  );
}

import ZAI from "z-ai-web-dev-sdk";

/**
 * Create ZAI client with fallback config from environment variables
 * On local dev: reads from /etc/.z-ai-config or project .z-ai-config
 * On Vercel production: reads from ZAI_API_KEY, ZAI_BASE_URL, ZAI_TOKEN env vars
 *
 * To set up on Vercel, add these environment variables:
 * - ZAI_API_KEY (optional, defaults to "Z.ai")
 * - ZAI_BASE_URL (optional, defaults to "https://internal-api.z.ai/v1")
 * - ZAI_TOKEN (the JWT token from .z-ai-config)
 * - ZAI_CHAT_ID (optional)
 * - ZAI_USER_ID (optional)
 */

let _zaiInstance: ZAI | null = null;

export async function createZai(): Promise<ZAI> {
  if (_zaiInstance) return _zaiInstance;

  try {
    // Try default ZAI.create() first (reads config file)
    const zai = await ZAI.create();
    _zaiInstance = zai;
    return zai;
  } catch {
    // Config file not found - try environment variables
  }

  // Fallback: create with environment variables
  const apiKey = process.env.ZAI_API_KEY || process.env.Z_AI_API_KEY || "Z.ai";
  const baseUrl = process.env.ZAI_BASE_URL || process.env.Z_AI_BASE_URL || "https://internal-api.z.ai/v1";
  const token = process.env.ZAI_TOKEN || process.env.Z_AI_TOKEN || "";
  const chatId = process.env.ZAI_CHAT_ID || process.env.Z_AI_CHAT_ID || "";
  const userId = process.env.ZAI_USER_ID || process.env.Z_AI_USER_ID || "";

  if (!token) {
    throw new Error(
      "ZAI configuration not found. Either:\n" +
      "1. Place .z-ai-config in the project root or /etc/\n" +
      "2. Set ZAI_TOKEN environment variable on Vercel\n" +
      "Run 'cat /etc/.z-ai-config' to get the token value"
    );
  }

  // Create ZAI instance with config from env vars
  const zai = await ZAI.create({
    apiKey,
    baseUrl,
    token,
    chatId,
    userId,
  });

  _zaiInstance = zai;
  return zai;
}

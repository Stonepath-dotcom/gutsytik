/**
 * Simple in-memory rate limiter for API routes.
 * Tracks requests by IP address and enforces limits per time window.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 2 minutes to prevent memory leaks
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 2 * 60 * 1000; // 2 minutes

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}

/**
 * Check if a request should be rate limited.
 * @param ip - The client IP address
 * @param limit - Maximum number of requests per window (default: 30)
 * @param windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @returns Object with success flag and remaining requests count
 */
export function rateLimit(
  ip: string,
  limit: number = 30,
  windowMs: number = 60_000
): { success: boolean; remaining: number; limit: number } {
  cleanup();

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetTime) {
    // New window
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1, limit };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, limit };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count, limit };
}

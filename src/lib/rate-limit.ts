import { LRUCache } from "lru-cache";

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

export function createRateLimit(options: RateLimitOptions) {
  const cache = new LRUCache<string, number>({
    max: 500,
    ttl: options.windowMs,
  });

  return function isRateLimited(identifier: string): boolean {
    const count = cache.get(identifier) || 0;
    if (count >= options.maxRequests) return true;
    cache.set(identifier, count + 1);
    return false;
  };
}

export function getClientIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
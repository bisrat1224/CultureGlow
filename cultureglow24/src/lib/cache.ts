/**
 * CMS Query Caching Layer
 *
 * Implements stale-while-revalidate caching for Payload CMS queries
 * to reduce database load and improve page performance.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  staleAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL = 60 * 1000;
const DEFAULT_STALE = 5 * 60 * 1000;

export async function cachedQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: {
    ttl?: number;
    staleTime?: number;
  }
): Promise<T> {
  const ttl = options?.ttl || DEFAULT_TTL;
  const staleTime = options?.staleTime || DEFAULT_STALE;
  const now = Date.now();

  const cached = cache.get(key) as CacheEntry<T> | undefined;

  if (cached && now < cached.timestamp + ttl) {
    return cached.data;
  }

  if (cached && now < cached.staleAt) {
    fetcher()
      .then((data) => {
        cache.set(key, {
          data,
          timestamp: Date.now(),
          staleAt: Date.now() + staleTime,
        });
      })
      .catch(() => {});

    return cached.data;
  }

  const data = await fetcher();
  cache.set(key, {
    data,
    timestamp: Date.now(),
    staleAt: Date.now() + staleTime,
  });

  return data;
}

export function invalidateCache(keyPattern?: string) {
  if (!keyPattern) {
    cache.clear();
    return;
  }

  for (const key of cache.keys()) {
    if (key.includes(keyPattern)) {
      cache.delete(key);
    }
  }
}

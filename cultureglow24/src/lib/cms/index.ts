import { cachedQuery } from "../cache";
import { getPayloadClient } from "../payload";

export async function getCachedGlobal<T>(slug: string): Promise<T> {
  return cachedQuery(
    `global:${slug}`,
    async () => {
      const payload = await getPayloadClient();
      return payload.findGlobal({ slug }) as Promise<T>;
    },
    { ttl: 30 * 1000, staleTime: 2 * 60 * 1000 }
  );
}

export async function getCachedCollection<T>(
  slug: string,
  options?: {
    where?: Record<string, unknown>;
    sort?: string;
    limit?: number;
  }
): Promise<{ docs: T[] }> {
  const cacheKey = `collection:${slug}:${JSON.stringify(options || {})}`;

  return cachedQuery(
    cacheKey,
    async () => {
      const payload = await getPayloadClient();
      return payload.find({
        collection: slug as any,
        ...(options as any),
      }) as unknown as Promise<{ docs: T[] }>;
    },
    { ttl: 30 * 1000, staleTime: 2 * 60 * 1000 }
  );
}

export * from "./home";
export * from "./about";
export * from "./menu";
export * from "./catering";
export * from "./shop";
export * from "./gallery";
export * from "./contact";
export * from "./layout";

import { getPayload } from "payload";
import configPromise from "../../payload.config";

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload;
  }

  const payload = await getPayload({
    config: configPromise,
  });

  cachedPayload = payload;
  return payload;
}

export function resetPayloadClient() {
  cachedPayload = null;
}

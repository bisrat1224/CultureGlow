import { createClient, type ContentfulClientApi } from "contentful";

let deliveryClient: ContentfulClientApi<undefined> | null = null;
let previewClient: ContentfulClientApi<undefined> | null = null;

function requireDeliveryEnv() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN;
  if (!space || !accessToken) {
    throw new Error(
      "CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN are required"
    );
  }
  return { space, accessToken };
}

/** Delivery API client — always used for published content. */
export function getDeliveryClient() {
  if (!deliveryClient) {
    const { space, accessToken } = requireDeliveryEnv();
    deliveryClient = createClient({
      space,
      accessToken,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    });
  }
  return deliveryClient;
}

export function getPreviewClient() {
  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_PREVIEW_TOKEN
  ) {
    return null;
  }

  if (!previewClient) {
    previewClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
      host: "preview.contentful.com",
    });
  }
  return previewClient;
}

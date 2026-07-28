import { createClient, type ContentfulClientApi } from "contentful";

let deliveryClient: ContentfulClientApi<undefined> | null = null;
let previewClient: ContentfulClientApi<undefined> | null = null;

export function isContentfulEnabled(): boolean {
  return (
    process.env.CONTENTFUL_ENABLED !== "false" &&
    Boolean(process.env.CONTENTFUL_SPACE_ID) &&
    Boolean(process.env.CONTENTFUL_DELIVERY_TOKEN)
  );
}

export function getDeliveryClient() {
  if (!isContentfulEnabled()) return null;

  if (!deliveryClient) {
    deliveryClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
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

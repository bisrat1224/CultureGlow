/**
 * Seeds TikTok posts + Instagram Reels into Contentful.
 * Dedicated social seed — does not touch product/menu entries.
 *
 * Prerequisites:
 *   npx tsx scripts/contentful/bootstrap-social.ts
 *
 * Usage:
 *   npx tsx scripts/contentful/seed-social.ts
 */
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";
import { createClient } from "contentful-management";

config({ path: resolve(process.cwd(), ".env.local") });
config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN");
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

type SocialSeedItem = {
  id: string;
  title: string;
  url: string;
  caption: string;
  addedToSite: string;
  sortOrder: number;
  showOnHome: boolean;
  showOnGallery: boolean;
};

type SocialJson = {
  tiktoks: SocialSeedItem[];
  reels: SocialSeedItem[];
};

type Env = Awaited<
  ReturnType<Awaited<ReturnType<typeof client.getSpace>>["getEnvironment"]>
>;

async function findEntryBySlug(env: Env, contentType: string, slug: string) {
  const res = await env.getEntries({
    content_type: contentType,
    "fields.slug": slug,
    limit: 1,
  });
  return res.items[0] ?? null;
}

async function upsertSocialEntry(
  env: Env,
  contentType: "tiktokPost" | "instagramReel",
  item: SocialSeedItem
) {
  const fields = {
    slug: { "en-US": item.id },
    title: { "en-US": item.title },
    url: { "en-US": item.url },
    caption: { "en-US": item.caption },
    // Contentful Date fields expect ISO-8601; midnight UTC is fine
    addedToSite: { "en-US": `${item.addedToSite}T00:00:00.000Z` },
    sortOrder: { "en-US": item.sortOrder },
    showOnHome: { "en-US": item.showOnHome },
    showOnGallery: { "en-US": item.showOnGallery },
  };

  const existing = await findEntryBySlug(env, contentType, item.id);
  if (existing) {
    console.log(`  ↻ skip (exists): ${contentType} / ${item.id}`);
    return;
  }

  console.log(`  + creating ${contentType}: ${item.id}`);
  let entry = await env.createEntry(contentType, { fields });
  entry = await entry.publish();
  console.log(`  ✓ published: ${item.id}`);
}

async function main() {
  console.log(`\nSeeding social posts — space ${SPACE_ID} / ${ENVIRONMENT}\n`);

  const jsonPath = resolve(process.cwd(), "content/social.json");
  const data = JSON.parse(readFileSync(jsonPath, "utf8")) as SocialJson;

  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENVIRONMENT);

  console.log("TikTok posts:");
  for (const item of data.tiktoks) {
    await upsertSocialEntry(env, "tiktokPost", item);
  }

  console.log("\nInstagram Reels:");
  for (const item of data.reels) {
    await upsertSocialEntry(env, "instagramReel", item);
  }

  console.log("\nDone. Publish is already applied per entry.");
  console.log("Set CONTENTFUL_ENABLED=true and refresh the site.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

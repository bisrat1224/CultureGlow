/**
 * Unpublish + delete ALL entries except tiktokPost and instagramReel.
 * Content types are left intact. Assets are left intact (seed will reuse/upload).
 *
 * Usage (from project root, with .env.local loaded):
 *   npx tsx scripts/contentful/purge-except-social.ts
 *
 * Optional hard confirm:
 *   CONFIRM_PURGE=yes npx tsx scripts/contentful/purge-except-social.ts
 */
import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "contentful-management";

config({ path: resolve(process.cwd(), ".env.local") });
config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const CONFIRM = process.env.CONFIRM_PURGE === "yes";

const KEEP_TYPES = new Set(["tiktokPost", "instagramReel"]);

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN");
  process.exit(1);
}

if (!CONFIRM) {
  console.error(
    "\nRefusing to run without CONFIRM_PURGE=yes\n" +
      "This will DELETE every entry except TikTok + Instagram Reels.\n" +
      "Example:\n  CONFIRM_PURGE=yes npx tsx scripts/contentful/purge-except-social.ts\n"
  );
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENVIRONMENT);

  console.log(`\nPurging space ${SPACE_ID} / ${ENVIRONMENT}`);
  console.log(`Keeping content types: ${[...KEEP_TYPES].join(", ")}\n`);

  let skip = 0;
  const limit = 100;
  let totalDeleted = 0;
  let totalKept = 0;

  // Paginate until empty (ids shift as we delete, so always fetch from skip=0
  // after a batch, or collect all ids first).
  const toDelete: { id: string; type: string; title: string }[] = [];

  for (;;) {
    const res = await env.getEntries({ limit, skip });
    if (!res.items.length) break;

    for (const entry of res.items) {
      const type = entry.sys.contentType.sys.id;
      const fields = entry.fields as Record<string, Record<string, unknown>>;
      const title =
        (fields.internalName?.["en-US"] as string) ||
        (fields.name?.["en-US"] as string) ||
        (fields.title?.["en-US"] as string) ||
        (fields.slug?.["en-US"] as string) ||
        entry.sys.id;

      if (KEEP_TYPES.has(type)) {
        totalKept++;
        console.log(`  keep  [${type}] ${title}`);
      } else {
        toDelete.push({ id: entry.sys.id, type, title });
      }
    }

    skip += res.items.length;
    if (skip >= res.total) break;
  }

  console.log(`\nDeleting ${toDelete.length} entries (kept ${totalKept} social)…\n`);

  for (const item of toDelete) {
    try {
      let entry = await env.getEntry(item.id);
      if (entry.isPublished()) {
        entry = await entry.unpublish();
      }
      await entry.delete();
      totalDeleted++;
      console.log(`  ✕ [${item.type}] ${item.title}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`  ⚠ failed ${item.id}: ${msg}`);
    }
  }

  console.log(`\n✓ Purge done. Deleted ${totalDeleted}, kept ${totalKept} social entries.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

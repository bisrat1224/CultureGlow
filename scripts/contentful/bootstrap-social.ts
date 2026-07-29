/**
 * Creates TikTok + Instagram Reel content types via the Management API.
 * Dedicated social bootstrap — does not touch product/menu types.
 *
 * Usage (from project root, with .env.local filled):
 *   npx tsx scripts/contentful/bootstrap-social.ts
 */
import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "contentful-management";

config({ path: resolve(process.cwd(), ".env.local") });
config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

type Field = {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  localized?: boolean;
  validations?: unknown[];
  linkType?: string;
  items?: { type: string; linkType?: string; validations?: unknown[] };
};

async function ensureContentType(
  env: Awaited<
    ReturnType<Awaited<ReturnType<typeof client.getSpace>>["getEnvironment"]>
  >,
  id: string,
  name: string,
  displayField: string,
  fields: Field[],
  description?: string
) {
  try {
    const existing = await env.getContentType(id);
    console.log(`  ↻ content type already exists: ${id} — updating fields`);
    existing.name = name;
    existing.displayField = displayField;
    if (description) existing.description = description;
    const existingIds = new Set(existing.fields.map((f) => f.id));
    for (const field of fields) {
      if (!existingIds.has(field.id)) {
        existing.fields.push(field as (typeof existing.fields)[number]);
      }
    }
    const updated = await existing.update();
    await updated.publish();
    console.log(`  ✓ updated + published: ${id}`);
  } catch (err: unknown) {
    const e = err as { name?: string };
    if (e.name !== "NotFound") throw err;

    console.log(`  + creating content type: ${id}`);
    const created = await env.createContentTypeWithId(id, {
      name,
      description,
      displayField,
      fields: fields as never,
    });
    await created.publish();
    console.log(`  ✓ created + published: ${id}`);
  }
}

/** Shared field set for both social content types. */
const socialFields: Field[] = [
  {
    id: "slug",
    name: "Slug",
    type: "Symbol",
    required: true,
    validations: [{ unique: true }],
  },
  { id: "title", name: "Title", type: "Symbol", required: true },
  {
    id: "url",
    name: "Post URL",
    type: "Symbol",
    required: true,
  },
  { id: "caption", name: "Caption", type: "Symbol" },
  {
    id: "addedToSite",
    name: "Date added to website",
    type: "Date",
    required: true,
  },
  {
    id: "sortOrder",
    name: "Sort order",
    type: "Integer",
    required: true,
  },
  {
    id: "showOnHome",
    name: "Show on Home",
    type: "Boolean",
    required: true,
  },
  {
    id: "showOnGallery",
    name: "Show on Gallery",
    type: "Boolean",
    required: true,
  },
  {
    id: "thumbnail",
    name: "Thumbnail (optional)",
    type: "Link",
    linkType: "Asset",
    validations: [{ linkMimetypeGroup: ["image"] }],
  },
];

async function main() {
  console.log(
    `\nBootstrapping social content types — space ${SPACE_ID} / ${ENVIRONMENT}\n`
  );

  const space = await client.getSpace(SPACE_ID!);
  const env = await space.getEnvironment(ENVIRONMENT);

  await ensureContentType(
    env,
    "tiktokPost",
    "TikTok Post",
    "title",
    socialFields,
    "TikTok video shown on Home and/or Gallery (embed + link-out)"
  );

  await ensureContentType(
    env,
    "instagramReel",
    "Instagram Reel",
    "title",
    socialFields,
    "Instagram Reel shown on Home (embed when possible + link-out)"
  );

  console.log("\nDone. Next: npx tsx scripts/contentful/seed-social.ts\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

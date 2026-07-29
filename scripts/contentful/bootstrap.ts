/**
 * Creates Phase 1 Contentful content types via the Management API.
 *
 * Usage (from project root, with .env.local filled):
 *   npx tsx scripts/contentful/bootstrap.ts
 */
import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "contentful-management";

config({ path: resolve(process.cwd(), ".env.local") });
config(); // also allow plain .env

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
console.log({
  space: SPACE_ID,
  env: ENVIRONMENT,
  token: MANAGEMENT_TOKEN,
});

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
  env: Awaited<ReturnType<Awaited<ReturnType<typeof client.getSpace>>["getEnvironment"]>>,
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
    // Merge: keep existing field ids, add missing ones
    const existingIds = new Set(existing.fields.map((f) => f.id));
    for (const field of fields) {
      if (!existingIds.has(field.id)) {
        existing.fields.push(field as (typeof existing.fields)[number]);
      }
    }
    const updated = await existing.update();
    await updated.publish();
    console.log(`  ✓ updated + published: ${id}`);
  }  catch (err: any) {
  if (err.name !== "NotFound") {
    throw err;
  }

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

async function main() {
  console.log(`\nBootstrapping Contentful space ${SPACE_ID} / ${ENVIRONMENT}\n`);

  const space = await client.getSpace(SPACE_ID!);
  const env = await space.getEnvironment(ENVIRONMENT);

  // ── product ──────────────────────────────────────────────
  await ensureContentType(
    env,
    "product",
    "Product",
    "name",
    [
      {
        id: "slug",
        name: "Slug",
        type: "Symbol",
        required: true,
        validations: [{ unique: true }],
      },
      { id: "name", name: "Name", type: "Symbol", required: true },
      {
        id: "category",
        name: "Category",
        type: "Symbol",
        required: true,
        validations: [
          { in: ["HABESHA FOOD", "LIFESTYLE", "BEAUTY"] },
        ],
      },
      { id: "price", name: "Price", type: "Symbol", required: true },
      { id: "description", name: "Description", type: "RichText" },
      {
        id: "image",
        name: "Main image",
        type: "Link",
        linkType: "Asset",
        required: true,
        validations: [{ linkMimetypeGroup: ["image"] }],
      },
      {
        id: "gallery",
        name: "Gallery",
        type: "Array",
        items: {
          type: "Link",
          linkType: "Asset",
          validations: [{ linkMimetypeGroup: ["image"] }],
        },
      },
      { id: "alt", name: "Image alt text", type: "Symbol", required: true },
      {
        id: "badge",
        name: "Badge",
        type: "Symbol",
        validations: [{ in: ["Best Seller", "Popular", "Gift", "New"] }],
      },
      {
        id: "allergens",
        name: "Allergens",
        type: "Array",
        items: { type: "Symbol" },
      },
    ],
    "Shop catalogue item"
  );

  // ── menuItem ─────────────────────────────────────────────
  await ensureContentType(
    env,
    "menuItem",
    "Menu Item",
    "name",
    [
      {
        id: "slug",
        name: "Slug",
        type: "Symbol",
        required: true,
        validations: [{ unique: true }],
      },
      { id: "name", name: "Name", type: "Symbol", required: true },
      { id: "description", name: "Description", type: "RichText" },
      { id: "price", name: "Price", type: "Symbol", required: true },
      {
        id: "image",
        name: "Image",
        type: "Link",
        linkType: "Asset",
        validations: [{ linkMimetypeGroup: ["image"] }],
      },
      { id: "alt", name: "Image alt text", type: "Symbol", required: true },
      {
        id: "diet",
        name: "Diet flags",
        type: "Array",
        items: {
          type: "Symbol",
          validations: [{ in: ["veg", "vegan", "gf", "spicy"] }],
        },
      },
      { id: "tag", name: "Tag (e.g. Popular)", type: "Symbol" },
      {
        id: "categorySlug",
        name: "Category slug",
        type: "Symbol",
        required: true,
        validations: [
          {
            in: ["starters", "mains", "veg-vegan", "desserts", "drinks"],
          },
        ],
      },
    ],
    "Single dish or drink on the menu"
  );

  // ── menuCategory ─────────────────────────────────────────
  await ensureContentType(
    env,
    "menuCategory",
    "Menu Category",
    "navLabel",
    [
      {
        id: "slug",
        name: "Slug",
        type: "Symbol",
        required: true,
        validations: [{ unique: true }],
      },
      { id: "navLabel", name: "Nav label", type: "Symbol", required: true },
      { id: "eyebrow", name: "Eyebrow", type: "Symbol" },
      { id: "titleBeforeEm", name: "Title before emphasis", type: "Symbol" },
      { id: "titleEm", name: "Title emphasis", type: "Symbol" },
      {
        id: "variant",
        name: "Section variant",
        type: "Symbol",
        validations: [{ in: ["cream", "dark"] }],
      },
      { id: "countLabel", name: "Count label", type: "Symbol" },
      {
        id: "items",
        name: "Items",
        type: "Array",
        items: {
          type: "Link",
          linkType: "Entry",
          validations: [{ linkContentType: ["menuItem"] }],
        },
      },
    ],
    "Menu section (Starters, Mains, …)"
  );

  // ── homePage ─────────────────────────────────────────────
  await ensureContentType(
    env,
    "homePage",
    "Home Page",
    "internalName",
    [
      {
        id: "internalName",
        name: "Internal name",
        type: "Symbol",
        required: true,
      },
      // Hero
      { id: "heroEyebrow", name: "Hero eyebrow", type: "Symbol" },
      { id: "heroHeadingBeforeEm", name: "Hero heading before em", type: "Symbol" },
      { id: "heroHeadingEm", name: "Hero heading em", type: "Symbol" },
      { id: "heroHeadingAfterEm", name: "Hero heading after em", type: "Symbol" },
      { id: "heroBody", name: "Hero body", type: "RichText" },
      { id: "heroPrimaryCta", name: "Hero primary CTA", type: "Symbol" },
      { id: "heroSecondaryCta", name: "Hero secondary CTA", type: "Symbol" },
      // Marquee
      {
        id: "marqueeItems",
        name: "Marquee items",
        type: "Array",
        items: { type: "Symbol" },
      },
      // Story
      { id: "storyEyebrow", name: "Story eyebrow", type: "Symbol" },
      { id: "storyHeadingBeforeEm", name: "Story heading before em", type: "Symbol" },
      { id: "storyHeadingEm", name: "Story heading em", type: "Symbol" },
      { id: "storyHeadingAfterEm", name: "Story heading after em", type: "Symbol" },
      { id: "storyHeadingSecondLine", name: "Story heading second line", type: "Symbol" },
      { id: "storyBody", name: "Story body", type: "RichText" },
      { id: "storyAmharic", name: "Story Amharic line", type: "Symbol" },
      { id: "storyBadge", name: "Story badge", type: "Symbol" },
      {
        id: "storyStats",
        name: "Story stats (JSON)",
        type: "Object",
      },
      // Products section labels
      { id: "productsEyebrow", name: "Products eyebrow", type: "Symbol" },
      { id: "productsHeadingBeforeEm", name: "Products heading before em", type: "Symbol" },
      { id: "productsHeadingEm", name: "Products heading em", type: "Symbol" },
      { id: "productsHeadingAfterEm", name: "Products heading after em", type: "Symbol" },
      { id: "productsViewAllCta", name: "Products view-all CTA", type: "Symbol" },
      {
        id: "featuredProducts",
        name: "Featured products",
        type: "Array",
        items: {
          type: "Link",
          linkType: "Entry",
          validations: [{ linkContentType: ["product"] }],
        },
      },
      // Accent band
      {
        id: "accentBandItems",
        name: "Accent band items",
        type: "Array",
        items: { type: "Symbol" },
      },
      // Kitchen
      { id: "kitchenEyebrow", name: "Kitchen eyebrow", type: "Symbol" },
      { id: "kitchenHeadingBeforeEm", name: "Kitchen heading before em", type: "Symbol" },
      { id: "kitchenHeadingEm", name: "Kitchen heading em", type: "Symbol" },
      { id: "kitchenHeadingSecondLine", name: "Kitchen heading second line", type: "Symbol" },
      { id: "kitchenBody", name: "Kitchen body", type: "RichText" },
      { id: "kitchenCta", name: "Kitchen CTA", type: "Symbol" },
      // Social
      { id: "socialEyebrow", name: "Social eyebrow", type: "Symbol" },
      { id: "socialHeadingBeforeEm", name: "Social heading before em", type: "Symbol" },
      { id: "socialHeadingEm", name: "Social heading em", type: "Symbol" },
      { id: "socialHeadingAfterEm", name: "Social heading after em", type: "Symbol" },
      { id: "socialTiktokLabel", name: "Social TikTok label", type: "Symbol" },
      { id: "socialReelsLabel", name: "Social Reels label", type: "Symbol" },
      // Catering teaser
      { id: "cateringEyebrow", name: "Catering eyebrow", type: "Symbol" },
      { id: "cateringHeadingBeforeEm", name: "Catering heading before em", type: "Symbol" },
      { id: "cateringHeadingEm", name: "Catering heading em", type: "Symbol" },
      { id: "cateringHeadingSecondLine", name: "Catering heading second line", type: "Symbol" },
      { id: "cateringBody", name: "Catering body", type: "RichText" },
      { id: "cateringCta", name: "Catering CTA", type: "Symbol" },
      // Testimonials section labels
      { id: "testimonialsEyebrow", name: "Testimonials eyebrow", type: "Symbol" },
      { id: "testimonialsHeadingBeforeEm", name: "Testimonials heading before em", type: "Symbol" },
      { id: "testimonialsHeadingEm", name: "Testimonials heading em", type: "Symbol" },
      { id: "testimonialsHeadingAfterEm", name: "Testimonials heading after em", type: "Symbol" },
    ],
    "Singleton — marketing copy for the home page"
  );

  // ── shopPage ─────────────────────────────────────────────
  await ensureContentType(
    env,
    "shopPage",
    "Shop Page",
    "internalName",
    [
      {
        id: "internalName",
        name: "Internal name",
        type: "Symbol",
        required: true,
      },
      { id: "heroLabel", name: "Hero label", type: "Symbol" },
      { id: "heroTitle", name: "Hero title", type: "Symbol" },
      { id: "heroDesc", name: "Hero description", type: "Text" },
      {
        id: "scrollingBannerItems",
        name: "Scrolling banner items",
        type: "Array",
        items: { type: "Symbol" },
      },
      { id: "featureBannerLabel", name: "Feature banner label", type: "Symbol" },
      { id: "featureBannerTitle", name: "Feature banner title", type: "Symbol" },
      { id: "featureBannerDesc", name: "Feature banner description", type: "Text" },
      { id: "featureBannerCta", name: "Feature banner CTA", type: "Symbol" },
      { id: "bundlesLabel", name: "Bundles label", type: "Symbol" },
      { id: "bundlesTitle", name: "Bundles title", type: "Symbol" },
      { id: "bundlesDesc", name: "Bundles description", type: "Text" },
      { id: "productsLabel", name: "Products section label", type: "Symbol" },
      { id: "productsTitle", name: "Products section title", type: "Symbol" },
      { id: "howToOrderLabel", name: "How-to-order label", type: "Symbol" },
      { id: "howToOrderTitle", name: "How-to-order title", type: "Symbol" },
      { id: "howToOrderDesc", name: "How-to-order description", type: "Text" },
      {
        id: "howToOrderSteps",
        name: "How-to-order steps (JSON)",
        type: "Object",
      },
    ],
    "Singleton — marketing copy for the shop page"
  );

  // ── menuPage ─────────────────────────────────────────────
  await ensureContentType(
    env,
    "menuPage",
    "Menu Page",
    "internalName",
    [
      {
        id: "internalName",
        name: "Internal name",
        type: "Symbol",
        required: true,
      },
      { id: "heroEyebrow", name: "Hero eyebrow", type: "Symbol" },
      { id: "heroHeadingBeforeEm", name: "Hero heading before em", type: "Symbol" },
      { id: "heroHeadingEm", name: "Hero heading em", type: "Symbol" },
      { id: "heroHeadingAfterEm", name: "Hero heading after em", type: "Symbol" },
      { id: "heroDesc", name: "Hero description", type: "Text" },
      { id: "heroPrimaryCta", name: "Hero primary CTA", type: "Symbol" },
      { id: "heroSecondaryCta", name: "Hero secondary CTA", type: "Symbol" },
      { id: "featureBannerLabel", name: "Feature banner label", type: "Symbol" },
      { id: "featureBannerTitle", name: "Feature banner title", type: "Symbol" },
      { id: "featureBannerDesc", name: "Feature banner description", type: "Text" },
      { id: "featureBannerCta", name: "Feature banner CTA", type: "Symbol" },
      { id: "howToOrderLabel", name: "How-to-order label", type: "Symbol" },
      { id: "howToOrderTitle", name: "How-to-order title", type: "Symbol" },
      { id: "howToOrderDesc", name: "How-to-order description", type: "Text" },
      {
        id: "howToOrderSteps",
        name: "How-to-order steps (JSON)",
        type: "Object",
      },
      { id: "pdfCtaEyebrow", name: "PDF CTA eyebrow", type: "Symbol" },
      { id: "pdfCtaTitle", name: "PDF CTA title", type: "Symbol" },
      { id: "pdfCtaDesc", name: "PDF CTA description", type: "Text" },
      { id: "pdfCtaCta", name: "PDF CTA button", type: "Symbol" },
    ],
    "Singleton — marketing copy for the menu page"
  );

  console.log("\n✓ Bootstrap complete. Next: npx tsx scripts/contentful/seed.ts\n");
}

main().catch((err) => {
  console.error("\nBootstrap failed:\n", err);
  process.exit(1);
});

/**
 * Seeds Contentful from existing TS content + local images.
 *
 * Usage:
 *   npx tsx scripts/contentful/seed.ts
 *
 * Requires bootstrap.ts to have been run first.
 */
import { config } from "dotenv";
import { resolve, join, basename, extname } from "path";
import { readFileSync, existsSync, readdirSync } from "fs";
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

// ── Helpers ────────────────────────────────────────────────

function plainToRichText(text: string) {
  return {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [
          {
            nodeType: "text",
            value: text,
            marks: [],
            data: {},
          },
        ],
      },
    ],
  };
}

function mimeFromExt(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  return map[ext] || "application/octet-stream";
}

type Env = Awaited<
  ReturnType<Awaited<ReturnType<typeof client.getSpace>>["getEnvironment"]>
>;

/** Map local path "/assets/images/foo.jpg" → Contentful asset id */
const assetByLocalPath = new Map<string, string>();

async function findEntryBySlug(env: Env, contentType: string, slug: string) {
  const res = await env.getEntries({
    content_type: contentType,
    "fields.slug": slug,
    limit: 1,
  });
  return res.items[0] ?? null;
}

async function findSingleton(env: Env, contentType: string, internalName: string) {
  const res = await env.getEntries({
    content_type: contentType,
    "fields.internalName": internalName,
    limit: 1,
  });
  return res.items[0] ?? null;
}

async function uploadAsset(
  env: Env,
  localPath: string,
  title: string
): Promise<string | null> {
  // localPath like "/assets/images/injera-plate.jpg"
  const relative = localPath.replace(/^\//, "");
  const abs = resolve(process.cwd(), "public", relative);

  if (assetByLocalPath.has(localPath)) {
    return assetByLocalPath.get(localPath)!;
  }

  if (!existsSync(abs)) {
    console.warn(`  ⚠ image not found, skip: ${abs}`);
    return null;
  }

  // Reuse existing asset with same title if present
  const existing = await env.getAssets({
    "fields.title": title,
    limit: 1,
  });
  if (existing.items[0]) {
    const id = existing.items[0].sys.id;
    assetByLocalPath.set(localPath, id);
    return id;
  }

  const fileName = basename(abs);
  const contentType = mimeFromExt(abs);
  const buffer = readFileSync(abs);

  console.log(`  ↑ uploading ${fileName}`);

  let asset = await env.createAssetFromFiles({
    fields: {
      title: { "en-US": title },
      description: { "en-US": title },
      file: {
        "en-US": {
          contentType,
          fileName,
          file: buffer,
        },
      },
    },
  });

  asset = await asset.processForAllLocales();
  // Wait briefly for processing
  for (let i = 0; i < 10; i++) {
    asset = await env.getAsset(asset.sys.id);
    const file = asset.fields.file?.["en-US"];
    if (file && "url" in file && file.url) break;
    await new Promise((r) => setTimeout(r, 500));
  }

  if (!asset.isPublished()) {
    asset = await asset.publish();
  }

  assetByLocalPath.set(localPath, asset.sys.id);
  return asset.sys.id;
}

function linkAsset(id: string) {
  return { sys: { type: "Link", linkType: "Asset", id } };
}

function linkEntry(id: string) {
  return { sys: { type: "Link", linkType: "Entry", id } };
}

// ── Seed products ──────────────────────────────────────────

async function seedProducts(env: Env) {
  console.log("\n→ Products");
  // Dynamic import of TS data
  const { PRODUCTS } = await import("../../src/lib/data/products");

  const entryIdsBySlug = new Map<string, string>();

  for (const p of PRODUCTS) {
    const existing = await findEntryBySlug(env, "product", p.id);
    if (existing) {
      console.log(`  ↻ skip existing product: ${p.id}`);
      entryIdsBySlug.set(p.id, existing.sys.id);
      // Still map image if we can
      if (p.image) {
        const aid = await uploadAsset(env, p.image, p.name);
        if (aid) assetByLocalPath.set(p.image, aid);
      }
      continue;
    }

    const imageId = p.image
      ? await uploadAsset(env, p.image, `${p.name} main`)
      : null;
    const galleryIds: string[] = [];
    for (const g of p.gallery ?? []) {
      const gid = await uploadAsset(env, g, `${p.name} gallery`);
      if (gid) galleryIds.push(gid);
    }

    const fields: Record<string, unknown> = {
      slug: { "en-US": p.id },
      name: { "en-US": p.name },
      category: { "en-US": p.category },
      price: { "en-US": p.price },
      description: {
        "en-US": plainToRichText(p.description || ""),
      },
      alt: { "en-US": p.alt },
    };
    if (imageId) fields.image = { "en-US": linkAsset(imageId) };
    if (galleryIds.length) {
      fields.gallery = { "en-US": galleryIds.map(linkAsset) };
    }
    if (p.badge) fields.badge = { "en-US": p.badge };
    if (p.allergens?.length) {
      fields.allergens = { "en-US": p.allergens };
    }

    const entry = await env.createEntry("product", { fields });
    const published = await entry.publish();
    entryIdsBySlug.set(p.id, published.sys.id);
    console.log(`  ✓ product: ${p.id}`);
  }

  return entryIdsBySlug;
}

// ── Seed menu ──────────────────────────────────────────────

async function seedMenu(env: Env) {
  console.log("\n→ Menu items + categories");
  const menu = await import("../../src/lib/data/menu");

  const groups: { slug: string; items: typeof menu.STARTERS_ITEMS }[] = [
    { slug: "starters", items: menu.STARTERS_ITEMS },
    { slug: "mains", items: menu.MAINS_ITEMS },
    { slug: "veg-vegan", items: menu.VEG_VEGAN_ITEMS },
    { slug: "desserts", items: menu.DESSERTS_ITEMS },
    { slug: "drinks", items: menu.DRINKS_ITEMS },
  ];

  const itemIdsBySlug = new Map<string, string>();

  for (const group of groups) {
    for (const item of group.items) {
      const existing = await findEntryBySlug(env, "menuItem", item.id);
      if (existing) {
        console.log(`  ↻ skip existing menuItem: ${item.id}`);
        itemIdsBySlug.set(item.id, existing.sys.id);
        continue;
      }

      const imageId = item.image
        ? await uploadAsset(env, item.image, item.name)
        : null;

      const fields: Record<string, unknown> = {
        slug: { "en-US": item.id },
        name: { "en-US": item.name },
        description: {
          "en-US": plainToRichText(item.description || ""),
        },
        price: { "en-US": item.price },
        alt: { "en-US": item.alt },
        categorySlug: { "en-US": group.slug },
      };
      if (imageId) fields.image = { "en-US": linkAsset(imageId) };
      if (item.diet?.length) fields.diet = { "en-US": item.diet };
      if (item.tag) fields.tag = { "en-US": item.tag };

      const entry = await env.createEntry("menuItem", { fields });
      const published = await entry.publish();
      itemIdsBySlug.set(item.id, published.sys.id);
      console.log(`  ✓ menuItem: ${item.id}`);
    }
  }

  for (const cat of menu.CATEGORIES) {
    const existing = await findEntryBySlug(env, "menuCategory", cat.id);
    if (existing) {
      console.log(`  ↻ skip existing menuCategory: ${cat.id}`);
      continue;
    }

    const group = groups.find((g) => g.slug === cat.id);
    const linked = (group?.items ?? [])
      .map((i) => itemIdsBySlug.get(i.id))
      .filter(Boolean)
      .map((id) => linkEntry(id!));

    const fields = {
      slug: { "en-US": cat.id },
      navLabel: { "en-US": cat.navLabel },
      eyebrow: { "en-US": cat.eyebrow },
      titleBeforeEm: { "en-US": cat.titleBeforeEm },
      titleEm: { "en-US": cat.titleEm },
      variant: { "en-US": cat.variant },
      countLabel: { "en-US": cat.countLabel },
      items: { "en-US": linked },
    };

    const entry = await env.createEntry("menuCategory", { fields });
    await entry.publish();
    console.log(`  ✓ menuCategory: ${cat.id}`);
  }

  return itemIdsBySlug;
}

// ── Seed page singletons ───────────────────────────────────

async function seedHomePage(
  env: Env,
  productIds: Map<string, string>
) {
  console.log("\n→ Home page");
  const { homeContent } = await import("../../src/lib/content/content.home");
  const { FEATURED_PRODUCT_IDS } = await import("./featured-ids");

  const existing = await findSingleton(env, "homePage", "Home");
  if (existing) {
    console.log("  ↻ homePage already exists — skip");
    return;
  }

  const featured = FEATURED_PRODUCT_IDS.map((id) => productIds.get(id))
    .filter(Boolean)
    .map((id) => linkEntry(id!));

  const c = homeContent;
  const fields = {
    internalName: { "en-US": "Home" },
    heroEyebrow: { "en-US": c.hero.eyebrow },
    heroHeadingBeforeEm: { "en-US": c.hero.headingBeforeEm },
    heroHeadingEm: { "en-US": c.hero.headingEm },
    heroHeadingAfterEm: { "en-US": c.hero.headingAfterEm },
    heroBody: { "en-US": plainToRichText(c.hero.body) },
    heroPrimaryCta: { "en-US": c.hero.primaryCta },
    heroSecondaryCta: { "en-US": c.hero.secondaryCta },
    marqueeItems: { "en-US": [...c.marquee.items] },
    storyEyebrow: { "en-US": c.story.eyebrow },
    storyHeadingBeforeEm: { "en-US": c.story.headingBeforeEm },
    storyHeadingEm: { "en-US": c.story.headingEm },
    storyHeadingAfterEm: { "en-US": c.story.headingAfterEm },
    storyHeadingSecondLine: { "en-US": c.story.headingSecondLine },
    storyBody: { "en-US": plainToRichText(c.story.body) },
    storyAmharic: { "en-US": c.story.amharic },
    storyBadge: { "en-US": c.story.badge },
    storyStats: { "en-US": c.story.stats },
    productsEyebrow: { "en-US": c.products.eyebrow },
    productsHeadingBeforeEm: { "en-US": c.products.headingBeforeEm },
    productsHeadingEm: { "en-US": c.products.headingEm },
    productsHeadingAfterEm: { "en-US": c.products.headingAfterEm },
    productsViewAllCta: { "en-US": c.products.viewAllCta },
    featuredProducts: { "en-US": featured },
    accentBandItems: { "en-US": [...c.accentBand.items] },
    kitchenEyebrow: { "en-US": c.kitchen.eyebrow },
    kitchenHeadingBeforeEm: { "en-US": c.kitchen.headingBeforeEm },
    kitchenHeadingEm: { "en-US": c.kitchen.headingEm },
    kitchenHeadingSecondLine: { "en-US": c.kitchen.headingSecondLine },
    kitchenBody: { "en-US": plainToRichText(c.kitchen.body) },
    kitchenCta: { "en-US": c.kitchen.cta },
    socialEyebrow: { "en-US": c.social.eyebrow },
    socialHeadingBeforeEm: { "en-US": c.social.headingBeforeEm },
    socialHeadingEm: { "en-US": c.social.headingEm },
    socialHeadingAfterEm: { "en-US": c.social.headingAfterEm },
    socialTiktokLabel: { "en-US": c.social.tiktokLabel },
    socialReelsLabel: { "en-US": c.social.reelsLabel },
    cateringEyebrow: { "en-US": c.catering.eyebrow },
    cateringHeadingBeforeEm: { "en-US": c.catering.headingBeforeEm },
    cateringHeadingEm: { "en-US": c.catering.headingEm },
    cateringHeadingSecondLine: { "en-US": c.catering.headingSecondLine },
    cateringBody: { "en-US": plainToRichText(c.catering.body) },
    cateringCta: { "en-US": c.catering.cta },
    testimonialsEyebrow: { "en-US": c.testimonials.eyebrow },
    testimonialsHeadingBeforeEm: {
      "en-US": c.testimonials.headingBeforeEm,
    },
    testimonialsHeadingEm: { "en-US": c.testimonials.headingEm },
    testimonialsHeadingAfterEm: {
      "en-US": c.testimonials.headingAfterEm,
    },
  };

  const entry = await env.createEntry("homePage", { fields });
  await entry.publish();
  console.log("  ✓ homePage");
}

async function seedShopPage(env: Env) {
  console.log("\n→ Shop page");
  const { shopContent } = await import("../../src/lib/content/content.shop");
  const existing = await findSingleton(env, "shopPage", "Shop");
  if (existing) {
    console.log("  ↻ shopPage already exists — skip");
    return;
  }

  const c = shopContent;
  const fields = {
    internalName: { "en-US": "Shop" },
    heroLabel: { "en-US": c.hero.label },
    heroTitle: { "en-US": c.hero.title },
    heroDesc: { "en-US": c.hero.desc },
    scrollingBannerItems: { "en-US": [...c.scrollingBanner.items] },
    featureBannerLabel: { "en-US": c.featureBanner.label },
    featureBannerTitle: { "en-US": c.featureBanner.title },
    featureBannerDesc: { "en-US": c.featureBanner.desc },
    featureBannerCta: { "en-US": c.featureBanner.cta },
    bundlesLabel: { "en-US": c.bundles.label },
    bundlesTitle: { "en-US": c.bundles.title },
    bundlesDesc: { "en-US": c.bundles.desc },
    productsLabel: { "en-US": c.productsSection.label },
    productsTitle: { "en-US": c.productsSection.title },
    howToOrderLabel: { "en-US": c.howToOrder.label },
    howToOrderTitle: { "en-US": c.howToOrder.title },
    howToOrderDesc: { "en-US": c.howToOrder.desc },
    howToOrderSteps: { "en-US": c.howToOrder.steps },
  };

  const entry = await env.createEntry("shopPage", { fields });
  await entry.publish();
  console.log("  ✓ shopPage");
}

async function seedMenuPage(env: Env) {
  console.log("\n→ Menu page");
  const { menuContent } = await import("../../src/lib/content/content.menu");
  const existing = await findSingleton(env, "menuPage", "Menu");
  if (existing) {
    console.log("  ↻ menuPage already exists — skip");
    return;
  }

  const c = menuContent;
  const fields = {
    internalName: { "en-US": "Menu" },
    heroEyebrow: { "en-US": c.hero.eyebrow },
    heroHeadingBeforeEm: { "en-US": c.hero.headingBeforeEm },
    heroHeadingEm: { "en-US": c.hero.headingEm },
    heroHeadingAfterEm: { "en-US": c.hero.headingAfterEm },
    heroDesc: { "en-US": c.hero.desc },
    heroPrimaryCta: { "en-US": c.hero.primaryCta },
    heroSecondaryCta: { "en-US": c.hero.secondaryCta },
    featureBannerLabel: { "en-US": c.featureBanner.label },
    featureBannerTitle: { "en-US": c.featureBanner.title },
    featureBannerDesc: { "en-US": c.featureBanner.desc },
    featureBannerCta: { "en-US": c.featureBanner.cta },
    howToOrderLabel: { "en-US": c.howToOrder.label },
    howToOrderTitle: { "en-US": c.howToOrder.title },
    howToOrderDesc: { "en-US": c.howToOrder.desc },
    howToOrderSteps: { "en-US": c.howToOrder.steps },
    pdfCtaEyebrow: { "en-US": c.pdfCta.eyebrow },
    pdfCtaTitle: { "en-US": c.pdfCta.title },
    pdfCtaDesc: { "en-US": c.pdfCta.desc },
    pdfCtaCta: { "en-US": c.pdfCta.cta },
  };

  const entry = await env.createEntry("menuPage", { fields });
  await entry.publish();
  console.log("  ✓ menuPage");
}

async function main() {
  console.log(`\nSeeding Contentful space ${SPACE_ID} / ${ENVIRONMENT}\n`);

  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENVIRONMENT);

  const productIds = await seedProducts(env);
  await seedMenu(env);
  await seedHomePage(env, productIds);
  await seedShopPage(env);
  await seedMenuPage(env);

  console.log("\n✓ Seed complete. Open Contentful → Content to review, then npm run dev\n");
}

main().catch((err) => {
  console.error("\nSeed failed:\n", err);
  process.exit(1);
});

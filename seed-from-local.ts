/**
 * Seed Contentful from current local source of truth.
 * Handles image subfolders under public/assets/images/:
 *   shop-items/, menu-items/, gallery/, hero-bg-images/, and root-level images.
 *
 * Prerequisites:
 *   1. bootstrap.ts already run (content types exist)
 *   2. purge-except-social.ts run (or empty non-social entries)
 *
 * Usage:
 *   npx tsx scripts/contentful/seed-from-local.ts
 *
 * Reads:
 *   content/products.json
 *   content/menu.json
 *   src/lib/content/content.*.ts (via dynamic import where possible)
 *   Gallery allow-list (hardcoded to match site)
 */
import { config } from "dotenv";
import { resolve, basename, extname } from "path";
import { readFileSync, existsSync } from "fs";
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

type Env = Awaited<
  ReturnType<Awaited<ReturnType<typeof client.getSpace>>["getEnvironment"]>
>;

// ── Helpers ────────────────────────────────────────────────

function plainToRichText(text: string) {
  return {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [{ nodeType: "text", value: text, marks: [], data: {} }],
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

/** local web path → asset id (supports subfolders) */
const assetByLocalPath = new Map<string, string>();

/**
 * Upload (or reuse) an asset.
 * localPath examples:
 *   /assets/images/shop-items/habesha-necklace-1.jpeg
 *   /assets/images/gallery/booth-3.jpeg
 *   /assets/images/injera-plate.jpg
 *
 * Title is derived from the relative path so subfolder files never collide
 * on basename alone.
 */
async function uploadAsset(
  env: Env,
  localPath: string,
  titleHint?: string
): Promise<string | null> {
  if (!localPath) return null;
  // Skip remote URLs (placeholders / pexels)
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    console.warn(`  ⚠ skip remote image: ${localPath.slice(0, 60)}…`);
    return null;
  }

  const relative = localPath.replace(/^\//, ""); // assets/images/...
  const abs = resolve(process.cwd(), "public", relative);

  if (assetByLocalPath.has(localPath)) {
    return assetByLocalPath.get(localPath)!;
  }

  if (!existsSync(abs)) {
    console.warn(`  ⚠ image not found: ${abs}`);
    return null;
  }

  // Unique title from path so shop-items/foo and menu-items/foo don't clash
  const title =
    titleHint ||
    relative
      .replace(/^assets\/images\//, "")
      .replace(/\.[^.]+$/, "")
      .replace(/\//g, " — ");

  const existing = await env.getAssets({ "fields.title": title, limit: 1 });
  if (existing.items[0]) {
    const id = existing.items[0].sys.id;
    assetByLocalPath.set(localPath, id);
    console.log(`  ↻ reuse asset: ${title}`);
    return id;
  }

  const fileName = basename(abs);
  const contentType = mimeFromExt(abs);
  const buffer = readFileSync(abs);

  console.log(`  ↑ upload ${relative}`);

  let asset = await env.createAssetFromFiles({
    fields: {
      title: { "en-US": title },
      description: { "en-US": titleHint || title },
      file: {
        "en-US": {
          contentType,
          fileName, // basename only is fine for the binary
          file: buffer,
        },
      },
    },
  });

  asset = await asset.processForAllLocales();
  for (let i = 0; i < 12; i++) {
    asset = await env.getAsset(asset.sys.id);
    const file = asset.fields.file?.["en-US"] as { url?: string } | undefined;
    if (file?.url) break;
    await new Promise((r) => setTimeout(r, 400));
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

async function findBySlug(env: Env, contentType: string, slug: string) {
  const res = await env.getEntries({
    content_type: contentType,
    "fields.slug": slug,
    limit: 1,
  } as Record<string, string | number>);
  return res.items[0] ?? null;
}

async function findSingleton(env: Env, contentType: string, internalName: string) {
  const res = await env.getEntries({
    content_type: contentType,
    "fields.internalName": internalName,
    limit: 1,
  } as Record<string, string | number>);
  return res.items[0] ?? null;
}

async function publishNew(
  env: Env,
  contentType: string,
  fields: Record<string, unknown>
) {
  let entry = await env.createEntry(contentType, { fields });
  entry = await entry.publish();
  return entry;
}

// ── Allowed gallery set (matches site) ─────────────────────

const GALLERY_ALLOW = [
  {
    slug: "wedding",
    path: "/assets/images/gallery/wedding.jpeg",
    alt: "Wedding celebration with CultureGlow24 catering",
    showOnGallery: true,
    showOnCatering: true,
    showOnAbout: true,
  },
  {
    slug: "aau-event",
    path: "/assets/images/gallery/aau-event.jpeg",
    alt: "CultureGlow24 at an AAU event",
    showOnGallery: true,
    showOnCatering: true,
    showOnAbout: true,
  },
  {
    slug: "booth-3",
    path: "/assets/images/gallery/booth-3.jpeg",
    alt: "CultureGlow24 market booth",
    showOnGallery: true,
    showOnCatering: true,
    showOnAbout: true,
  },
  {
    slug: "booth-4",
    path: "/assets/images/gallery/booth-4.jpeg",
    alt: "CultureGlow24 booth close-up",
    showOnGallery: true,
    showOnCatering: true,
    showOnAbout: true,
  },
  {
    slug: "happy-customers-2",
    path: "/assets/images/gallery/happy-customers-2.jpeg",
    alt: "Customers at a CultureGlow24 event",
    showOnGallery: true,
    showOnCatering: true,
    showOnAbout: true,
  },
  {
    slug: "happy-customers-4",
    path: "/assets/images/gallery/happy-customers-4.jpeg",
    alt: "Happy customers with CultureGlow24 dishes",
    showOnGallery: true,
    showOnCatering: true,
    showOnAbout: true,
  },
] as const;

// ── Seeders ────────────────────────────────────────────────

async function seedProducts(env: Env) {
  console.log("\n→ Products (from content/products.json)");
  const data = JSON.parse(
    readFileSync(resolve(process.cwd(), "content/products.json"), "utf8")
  );
  const products = data.products as Array<{
    id: string;
    category: string;
    name: string;
    price: string;
    image: string;
    alt: string;
    description?: string;
    gallery?: string[];
    badge?: string;
    allergens?: string[];
  }>;

  const ids = new Map<string, string>();

  for (const p of products) {
    const existing = await findBySlug(env, "product", p.id);
    if (existing) {
      console.log(`  ↻ skip product ${p.id}`);
      ids.set(p.id, existing.sys.id);
      continue;
    }

    const imageId = p.image
      ? await uploadAsset(env, p.image, `product — ${p.name}`)
      : null;
    const galleryIds: string[] = [];
    for (const g of p.gallery || []) {
      const gid = await uploadAsset(env, g, `product — ${p.name} gallery`);
      if (gid) galleryIds.push(gid);
    }

    const fields: Record<string, unknown> = {
      slug: { "en-US": p.id },
      name: { "en-US": p.name },
      category: { "en-US": p.category },
      price: { "en-US": p.price },
      alt: { "en-US": p.alt || p.name },
    };
    if (p.description)
      fields.description = { "en-US": plainToRichText(p.description) };
    if (imageId) fields.image = { "en-US": linkAsset(imageId) };
    if (galleryIds.length)
      fields.gallery = { "en-US": galleryIds.map(linkAsset) };
    if (p.badge) fields.badge = { "en-US": p.badge };
    if (p.allergens?.length) fields.allergens = { "en-US": p.allergens };

    const entry = await publishNew(env, "product", fields);
    ids.set(p.id, entry.sys.id);
    console.log(`  ✓ product ${p.id}`);
  }

  return ids;
}

async function seedMenu(env: Env) {
  console.log("\n→ Menu (from content/menu.json)");
  const data = JSON.parse(
    readFileSync(resolve(process.cwd(), "content/menu.json"), "utf8")
  );

  const itemIds = new Map<string, string>();

  for (const [categorySlug, items] of Object.entries(
    data.items as Record<
      string,
      Array<{
        id: string;
        name: string;
        description: string;
        price: string;
        image: string;
        alt: string;
        diet?: string[];
        tag?: string;
      }>
    >
  )) {
    for (const item of items) {
      const existing = await findBySlug(env, "menuItem", item.id);
      if (existing) {
        console.log(`  ↻ skip menuItem ${item.id}`);
        itemIds.set(item.id, existing.sys.id);
        continue;
      }

      const imageId = item.image
        ? await uploadAsset(env, item.image, `menu — ${item.name}`)
        : null;

      const fields: Record<string, unknown> = {
        slug: { "en-US": item.id },
        name: { "en-US": item.name },
        price: { "en-US": item.price },
        alt: { "en-US": item.alt || item.name },
        categorySlug: { "en-US": categorySlug },
        description: { "en-US": plainToRichText(item.description || "") },
      };
      if (imageId) fields.image = { "en-US": linkAsset(imageId) };
      if (item.diet?.length) fields.diet = { "en-US": item.diet };
      if (item.tag) fields.tag = { "en-US": item.tag };

      const entry = await publishNew(env, "menuItem", fields);
      itemIds.set(item.id, entry.sys.id);
      console.log(`  ✓ menuItem ${item.id}`);
    }
  }

  // Categories
  for (const cat of data.categories as Array<{
    id: string;
    navLabel: string;
    eyebrow?: string;
    titleBeforeEm?: string;
    titleEm?: string;
    variant?: string;
    countLabel?: string;
  }>) {
    const existing = await findBySlug(env, "menuCategory", cat.id);
    if (existing) {
      console.log(`  ↻ skip menuCategory ${cat.id}`);
      continue;
    }

    const itemsInCat = (data.items[cat.id] || []) as Array<{ id: string }>;
    const links = itemsInCat
      .map((i) => itemIds.get(i.id))
      .filter(Boolean)
      .map((id) => linkEntry(id!));

    const fields: Record<string, unknown> = {
      slug: { "en-US": cat.id },
      navLabel: { "en-US": cat.navLabel },
    };
    if (cat.eyebrow) fields.eyebrow = { "en-US": cat.eyebrow };
    if (cat.titleBeforeEm) fields.titleBeforeEm = { "en-US": cat.titleBeforeEm };
    if (cat.titleEm) fields.titleEm = { "en-US": cat.titleEm };
    if (cat.variant) fields.variant = { "en-US": cat.variant };
    if (cat.countLabel) fields.countLabel = { "en-US": cat.countLabel };
    if (links.length) fields.items = { "en-US": links };

    await publishNew(env, "menuCategory", fields);
    console.log(`  ✓ menuCategory ${cat.id}`);
  }
}

async function seedGalleryPhotos(env: Env) {
  console.log("\n→ Gallery photos (allow-list only)");
  let order = 0;
  for (const g of GALLERY_ALLOW) {
    const existing = await findBySlug(env, "galleryPhoto", g.slug);
    if (existing) {
      console.log(`  ↻ skip galleryPhoto ${g.slug}`);
      continue;
    }
    const imageId = await uploadAsset(env, g.path, `gallery — ${g.slug}`);
    const fields: Record<string, unknown> = {
      slug: { "en-US": g.slug },
      alt: { "en-US": g.alt },
      showOnGallery: { "en-US": g.showOnGallery },
      showOnCatering: { "en-US": g.showOnCatering },
      showOnAbout: { "en-US": g.showOnAbout },
      sortOrder: { "en-US": order++ },
    };
    if (imageId) fields.image = { "en-US": linkAsset(imageId) };
    await publishNew(env, "galleryPhoto", fields);
    console.log(`  ✓ galleryPhoto ${g.slug}`);
  }
}

async function seedPageSingleton(
  env: Env,
  contentType: string,
  internalName: string,
  fieldsExtra: Record<string, unknown>
) {
  const existing = await findSingleton(env, contentType, internalName);
  if (existing) {
    console.log(`  ↻ skip ${contentType} "${internalName}"`);
    return existing;
  }
  const fields: Record<string, unknown> = {
    internalName: { "en-US": internalName },
    ...fieldsExtra,
  };
  const entry = await publishNew(env, contentType, fields);
  console.log(`  ✓ ${contentType} "${internalName}"`);
  return entry;
}

async function seedPages(env: Env, productIds: Map<string, string>) {
  console.log("\n→ Page singletons");

  // Home — minimal required fields + featured products if type supports it
  const featured = ["habesha-summer-dress", "habesha-filigree-necklace", "muday-basket", "ethiopian-orthodox-cross"]
    .map((id) => productIds.get(id))
    .filter(Boolean)
    .map((id) => linkEntry(id!));

  await seedPageSingleton(env, "homePage", "Home", {
    heroEyebrow: { "en-US": "Habesha Food, Beauty & Lifestyle" },
    heroHeadingBeforeEm: { "en-US": "Culture, " },
    heroHeadingEm: { "en-US": "Delivered" },
    heroPrimaryCta: { "en-US": "Order on WhatsApp" },
    ...(featured.length
      ? { featuredProducts: { "en-US": featured } }
      : {}),
  });

  await seedPageSingleton(env, "shopPage", "Shop", {
    heroLabel: { "en-US": "The Shop" },
    heroTitle: { "en-US": "Habesha Essentials" },
  });

  await seedPageSingleton(env, "menuPage", "Menu", {
    heroEyebrow: { "en-US": "The Menu" },
    heroHeadingBeforeEm: { "en-US": "Eat with " },
    heroHeadingEm: { "en-US": "Us" },
  });

  // About + hero image from subfolder
  const aboutHeroId = await uploadAsset(
    env,
    "/assets/images/hero-bg-images/hero-bg-image-1.jpeg",
    "about — hero"
  );
  await seedPageSingleton(env, "aboutPage", "About", {
    heroEyebrow: { "en-US": "About Us" },
    heroHeadingBeforeEm: { "en-US": "Our " },
    heroHeadingEm: { "en-US": "Story" },
    heroDesc: {
      "en-US": "Habesha food, beauty, and lifestyle delivered with care.",
    },
  });

  // Contact + hero image from subfolder
  const contactHeroId = await uploadAsset(
    env,
    "/assets/images/hero-bg-images/hero-bg-image-2.jpeg",
    "contact — hero"
  );
  await seedPageSingleton(env, "contactPage", "Contact", {
    heroEyebrow: { "en-US": "Get in Touch" },
    heroHeadingBeforeEm: { "en-US": "Let's " },
    heroHeadingEm: { "en-US": "Talk" },
  });

  await seedPageSingleton(env, "cateringPage", "Catering", {
    heroEyebrow: { "en-US": "Catering & Events" },
    heroHeadingBeforeEm: { "en-US": "Bring the " },
    heroHeadingEm: { "en-US": "Feast" },
    heroHeadingAfterEm: { "en-US": " to Your Occasion" },
  });

  await seedPageSingleton(env, "galleryPage", "Gallery", {
    heroEyebrow: { "en-US": "The Gallery" },
    heroHeadingBeforeEm: { "en-US": "Moments in " },
    heroHeadingEm: { "en-US": "Frame" },
  });

  await seedPageSingleton(env, "siteSettings", "Site Settings", {
    footerTagline: {
      "en-US":
        "Habesha food, beauty and lifestyle products, delivered across London.",
    },
  });

  // Note: page hero image fields may not exist on all types yet.
  // aboutHeroId / contactHeroId are uploaded as assets either way for later linking.
  void aboutHeroId;
  void contactHeroId;
}

async function main() {
  console.log(`\nSeeding Contentful ${SPACE_ID} / ${ENVIRONMENT}`);
  console.log("Image roots include subfolders: shop-items, menu-items, gallery, hero-bg-images\n");

  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENVIRONMENT);

  const productIds = await seedProducts(env);
  await seedMenu(env);
  await seedGalleryPhotos(env);
  await seedPages(env, productIds);

  console.log("\n✓ Seed complete.");
  console.log("  Review in Contentful → Content (filter by content type).");
  console.log("  TikTok / Instagram entries were left untouched.\n");
}

main().catch((err) => {
  console.error("\nSeed failed:\n", err);
  process.exit(1);
});

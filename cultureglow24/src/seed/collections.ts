import type { Payload } from "payload";
import path from "path";
import { PRODUCTS } from "../lib/data/products";
import { CATEGORIES, STARTERS_ITEMS, MAINS_ITEMS, VEG_VEGAN_ITEMS, DESSERTS_ITEMS, DRINKS_ITEMS } from "../lib/data/menu";

// Shared cache so the same source file (e.g. "/assets/images/stew-pans.jpg"
// used by multiple products/menu items) is only uploaded to the `media`
// collection once, instead of creating a duplicate doc per reference.
const mediaCache = new Map<string, number | string>();

async function getOrCreateMedia(
  payload: Payload,
  /** Path relative to `public/`, with or without a leading slash, e.g. "assets/images/stew-pans.jpg" */
  relPath: string,
  alt: string
): Promise<number | string> {
  const normalized = relPath.replace(/^\/+/, "");
  const cached = mediaCache.get(normalized);
  if (cached !== undefined) return cached;

  const filename = path.basename(normalized);

  // Re-runs shouldn't re-upload files that are already in the media
  // collection (this is on top of the in-memory cache above, which only
  // dedupes within a single run).
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    const id = existing.docs[0].id;
    mediaCache.set(normalized, id);
    return id;
  }

  const doc = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.resolve(process.cwd(), "public", normalized),
  });

  if (doc?.id === undefined || doc?.id === null) {
    throw new Error(`getOrCreateMedia: payload.create() for "${normalized}" did not return an id.`);
  }

  mediaCache.set(normalized, doc.id);
  return doc.id;
}

/**
 * Create a doc only if one with this slug doesn't already exist. Makes
 * collections with a unique `slug` field safe to re-seed without hitting
 * unique-constraint errors on a second run.
 */
async function upsertBySlug(
  payload: Payload,
  collection: string,
  slug: string,
  data: Record<string, unknown>
): Promise<number | string> {
  const existing = await payload.find({
    collection: collection as never,
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    return existing.docs[0].id;
  }
  const doc = await payload.create({ collection: collection as never, data: data as never });
  return doc.id;
}

/** Skip re-seeding a collection that has no natural unique key if it already has docs. */
async function isAlreadySeeded(payload: Payload, collection: string): Promise<boolean> {
  const result = await payload.find({ collection: collection as never, limit: 1 });
  return result.totalDocs > 0;
}

// Inline data from components (we'll read these from the component files)
const HOME_TESTIMONIALS = [
  { quote: "The flavours took me straight back to Addis. Absolutely incredible experience.", initial: "M", name: "Maya T.", location: "London" },
  { quote: "Best Ethiopian food I've had outside of Ethiopia. The coffee ceremony was magical.", initial: "J", name: "James K.", location: "Manchester" },
  { quote: "Our wedding catering was flawless. Every guest asked for their contact details.", initial: "A", name: "Amina H.", location: "Birmingham" },
];

const CATERING_TESTIMONIALS = [
  { quote: "CultureGlow24 made our corporate event unforgettable. The food was exceptional.", initial: "S", name: "Sarah L.", location: "London" },
  { quote: "Professional, punctual, and the food was out of this world. Highly recommend.", initial: "D", name: "David M.", location: "Leeds" },
];

const CATERING_PACKAGES = [
  {
    name: "Intimate Gathering",
    guests: "Up to 30 guests",
    price_from: "£1,500",
    features: ["Curated menu selection", "Professional service staff", "Table setting & linens", "2-hour service window"],
    featured: false,
  },
  {
    name: "Celebration Feast",
    guests: "30–80 guests",
    price_from: "£3,800",
    features: ["Extended menu options", "Full service team", "Elegant presentation", "3-hour service window", "Dietary accommodations"],
    featured: true,
  },
  {
    name: "Grand Event",
    guests: "80+ guests",
    price_from: "£7,500",
    features: ["Bespoke menu design", "Dedicated event manager", "Premium tableware", "Full-day service", "Live coffee ceremony"],
    featured: false,
  },
];

// NOTE: the original filenames here (wedding.jpg, corporate.jpg, party.jpg,
// cultural.jpg) don't exist in public/assets/images — they were placeholders
// that were never actually added. Mapped to the closest existing images
// below so the seed can run; swap these for real event photos in the admin
// panel whenever they're available.
const EVENT_TYPES = [
  { title: "Weddings", tag: "Weddings", description: "Make your special day unforgettable with authentic Habesha cuisine and traditions.", image: "/assets/images/bride-henna.jpg", alt: "Wedding celebration with Habesha food" },
  { title: "Corporate Events", tag: "Corporate", description: "Impress clients and colleagues with professional catering that stands out.", image: "/assets/images/platter-big.jpg", alt: "Corporate event catering" },
  { title: "Private Parties", tag: "Private", description: "Birthdays, anniversaries, or any celebration — we bring the feast to you.", image: "/assets/images/sharing-hands.jpg", alt: "Private party catering" },
  { title: "Cultural Events", tag: "Cultural", description: "Authentic Ethiopian coffee ceremonies and traditional dining experiences.", image: "/assets/images/coffee-pot.jpg", alt: "Cultural event with coffee ceremony" },
];

// NOTE: this array had no image source at all in the original seed data.
// Mapped to existing assets by best-guess subject match — swap for real
// gallery photos in the admin panel when available.
const GALLERY_PHOTOS = [
  { alt: "Traditional Habesha coffee ceremony setup", ratio: "3/4", type: "gallery", image: "/assets/images/coffee-pot.jpg" },
  { alt: "Injera with assorted wats", ratio: "4/3", type: "gallery", image: "/assets/images/injera-plate.jpg" },
  { alt: "Habesha beauty products display", ratio: "3/4", type: "gallery", image: "/assets/images/habesha-sefed.webp" },
  { alt: "Catering setup at wedding", ratio: "1/1", type: "gallery", image: "/assets/images/bride-henna.jpg" },
  { alt: "Traditional Ethiopian dress", ratio: "4/3", type: "gallery", image: "/assets/images/dress-green.jpg" },
  { alt: "Coffee beans roasting", ratio: "3/4", type: "gallery", image: "/assets/images/tibs-skillet.jpg" },
];

const SOCIAL_TILES = [
  { platform: "tiktok" as const, color: "a" as const, caption: "Behind the scenes in our kitchen 🔥" },
  { platform: "reels" as const, color: "b" as const, caption: "How we prepare our signature dishes ✨" },
  { platform: "tiktok" as const, color: "c" as const, caption: "Coffee ceremony step by step ☕" },
  { platform: "reels" as const, color: "a" as const, caption: "Meet the team behind CultureGlow24 👋" },
];

const TIKTOK_TILES = [
  { caption: "Behind the scenes in our kitchen", gradient_from: "#2D6A4F" },
  { caption: "Coffee ceremony preparation", gradient_from: "#C8973A" },
  { caption: "How we plate our signature dishes", gradient_from: "#B8321A" },
  { caption: "Meet our head chef", gradient_from: "#2D6A4F" },
  { caption: "Traditional bread making", gradient_from: "#C8973A" },
  { caption: "Customer reactions", gradient_from: "#B8321A" },
];

// NOTE: no image source in the original seed data either — mapped by
// best-guess subject match, same caveat as EVENT_TYPES/GALLERY_PHOTOS above.
const BUNDLES = [
  { label: "For Coffee Lovers", title: "Habesha Coffee Experience", price_from: "£180", slug: "coffee-experience", alt: "Habesha coffee set bundle", image: "/assets/images/coffee-pot.jpg" },
  { label: "For Food Lovers", title: "Taste of Ethiopia", price_from: "£320", slug: "taste-of-ethiopia", alt: "Ethiopian food bundle", image: "/assets/images/platter-big.jpg" },
  { label: "For Beauty Lovers", title: "Natural Beauty Collection", price_from: "£450", slug: "beauty-collection", alt: "Natural beauty products bundle", image: "/assets/images/habesha-sefed.webp" },
];

const MILESTONES = [
  { year: "2024", label: "CultureGlow24 founded in London" },
  { year: "2024", label: "First catering event — 50 guests" },
  { year: "2025", label: "Launched online shop" },
  { year: "2025", label: "Served 100+ events" },
];

const VALUES = [
  { title: "Authentic Heritage", body: "Every recipe and product honours generations of Ethiopian tradition.", icon: "heart" as const },
  { title: "Community First", body: "We build connections through shared meals and cultural experiences.", icon: "users" as const },
  { title: "Quality Craft", body: "From sourcing to serving, excellence is our standard.", icon: "sparkles" as const },
];

export async function seedCollections(payload: Payload) {
  console.log("📦 Seeding collections...");

  // 1. Products
  for (const product of PRODUCTS) {
    const imageId = await getOrCreateMedia(payload, product.image, product.alt);
    const galleryIds = product.gallery
      ? await Promise.all(product.gallery.map((g) => getOrCreateMedia(payload, g, product.alt)))
      : [];

    await upsertBySlug(payload, "products", product.id, {
      name: product.name,
      slug: product.id,
      category: product.category,
      price: product.price,
      description: product.description,
      image: imageId,
      gallery: galleryIds.map((id) => ({ image: id })),
      allergens: (product.allergens || []).map((a) => ({ allergen: a })),
      badge: product.badge || undefined,
      published: true,
      featured: false,
    });
  }
  console.log(`  ✓ products (${PRODUCTS.length} items)`);

  // 2. Menu Categories
  const categoryMap = new Map<string, number | string>(); // slug -> id

  for (const [index, cat] of CATEGORIES.entries()) {
    const id = await upsertBySlug(payload, "menu_categories", cat.id, {
      name: cat.navLabel,
      slug: cat.id,
      nav_label: cat.navLabel,
      eyebrow: cat.eyebrow,
      title_before_em: cat.titleBeforeEm,
      title_em: cat.titleEm,
      variant: cat.variant,
      count_label: cat.countLabel,
      sort_order: index,
      published: true,
    });
    categoryMap.set(cat.id, id);
  }
  console.log(`  ✓ menu_categories (${CATEGORIES.length} items)`);

  // 3. Menu Items
  const allItems = [
    ...STARTERS_ITEMS.map((i) => ({ ...i, categorySlug: "starters" })),
    ...MAINS_ITEMS.map((i) => ({ ...i, categorySlug: "mains" })),
    ...VEG_VEGAN_ITEMS.map((i) => ({ ...i, categorySlug: "veg-vegan" })),
    ...DESSERTS_ITEMS.map((i) => ({ ...i, categorySlug: "desserts" })),
    ...DRINKS_ITEMS.map((i) => ({ ...i, categorySlug: "drinks" })),
  ];

  for (const item of allItems) {
    const categoryId = categoryMap.get(item.categorySlug);
    if (categoryId === undefined) continue;

    const imageId = await getOrCreateMedia(payload, item.image, item.alt);

    await upsertBySlug(payload, "menu_items", item.id, {
      name: item.name,
      slug: item.id,
      description: item.description,
      price: item.price,
      image: imageId,
      alt: item.alt,
      category: categoryId,
      diet_flags: item.diet || [],
      tag: item.tag || undefined,
      ribbon: (item as { ribbon?: string }).ribbon || undefined,
      published: true,
    });
  }
  console.log(`  ✓ menu_items (${allItems.length} items)`);

  // 4. Testimonials (no unique key on this collection — skip entirely if already seeded)
  if (await isAlreadySeeded(payload, "testimonials")) {
    console.log(`  ↺ testimonials already seeded, skipping`);
  } else {
    for (const t of HOME_TESTIMONIALS) {
      await payload.create({
        collection: "testimonials",
        data: { ...t, type: "home", published: true },
      });
    }
    for (const t of CATERING_TESTIMONIALS) {
      await payload.create({
        collection: "testimonials",
        data: { ...t, type: "catering", published: true },
      });
    }
    console.log(`  ✓ testimonials (${HOME_TESTIMONIALS.length + CATERING_TESTIMONIALS.length} items)`);
  }

  // 5. Catering Packages
  for (const pkg of CATERING_PACKAGES) {
    const slug = pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await upsertBySlug(payload, "catering_packages", slug, {
      name: pkg.name,
      slug,
      guests: pkg.guests,
      price_from: pkg.price_from,
      features: pkg.features.map((f) => ({ feature: f })),
      featured: pkg.featured,
      published: true,
    });
  }
  console.log(`  ✓ catering_packages (${CATERING_PACKAGES.length} items)`);

  // 6. Event Types
  for (const evt of EVENT_TYPES) {
    const imageId = await getOrCreateMedia(payload, evt.image, evt.alt);
    const slug = evt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await upsertBySlug(payload, "event_types", slug, {
      title: evt.title,
      slug,
      tag: evt.tag,
      description: evt.description,
      image: imageId,
      alt: evt.alt,
      published: true,
    });
  }
  console.log(`  ✓ event_types (${EVENT_TYPES.length} items)`);

  // 7. Gallery Photos (no unique key — skip entirely if already seeded)
  if (await isAlreadySeeded(payload, "gallery_photos")) {
    console.log(`  ↺ gallery_photos already seeded, skipping`);
  } else {
    for (let i = 0; i < GALLERY_PHOTOS.length; i++) {
      const photo = GALLERY_PHOTOS[i];
      const imageId = await getOrCreateMedia(payload, photo.image, photo.alt);
      await payload.create({
        collection: "gallery_photos",
        data: {
          image: imageId,
          alt: photo.alt,
          type: photo.type as "gallery" | "about" | "catering",
          ratio: photo.ratio,
          sort_order: i,
          published: true,
        },
      });
    }
    console.log(`  ✓ gallery_photos (${GALLERY_PHOTOS.length} items)`);
  }

  // 8. Social Tiles (no unique key — skip entirely if already seeded)
  if (await isAlreadySeeded(payload, "social_tiles")) {
    console.log(`  ↺ social_tiles already seeded, skipping`);
  } else {
    for (let i = 0; i < SOCIAL_TILES.length; i++) {
      const tile = SOCIAL_TILES[i];
      await payload.create({
        collection: "social_tiles",
        data: {
          platform: tile.platform,
          color: tile.color,
          caption: tile.caption,
          sort_order: i,
          published: true,
        },
      });
    }
    console.log(`  ✓ social_tiles (${SOCIAL_TILES.length} items)`);
  }

  // 9. TikTok Tiles (no unique key — skip entirely if already seeded)
  if (await isAlreadySeeded(payload, "tiktok_tiles")) {
    console.log(`  ↺ tiktok_tiles already seeded, skipping`);
  } else {
    for (let i = 0; i < TIKTOK_TILES.length; i++) {
      const tile = TIKTOK_TILES[i];
      await payload.create({
        collection: "tiktok_tiles",
        data: {
          caption: tile.caption,
          gradient_from: tile.gradient_from,
          sort_order: i,
          published: true,
        },
      });
    }
    console.log(`  ✓ tiktok_tiles (${TIKTOK_TILES.length} items)`);
  }

  // 10. Bundles
  for (const bundle of BUNDLES) {
    const imageId = await getOrCreateMedia(payload, bundle.image, bundle.alt);
    await upsertBySlug(payload, "bundles", bundle.slug, {
      title: bundle.title,
      slug: bundle.slug,
      label: bundle.label,
      price_from: bundle.price_from,
      image: imageId,
      alt: bundle.alt,
      published: true,
    });
  }
  console.log(`  ✓ bundles (${BUNDLES.length} items)`);

  // 11. Milestones (no unique key — skip entirely if already seeded)
  if (await isAlreadySeeded(payload, "milestones")) {
    console.log(`  ↺ milestones already seeded, skipping`);
  } else {
    for (let i = 0; i < MILESTONES.length; i++) {
      const m = MILESTONES[i];
      await payload.create({
        collection: "milestones",
        data: {
          year: m.year,
          label: m.label,
          sort_order: i,
          published: true,
        },
      });
    }
    console.log(`  ✓ milestones (${MILESTONES.length} items)`);
  }

  // 12. Values (no unique key — skip entirely if already seeded)
  if (await isAlreadySeeded(payload, "values")) {
    console.log(`  ↺ values already seeded, skipping`);
  } else {
    for (let i = 0; i < VALUES.length; i++) {
      const v = VALUES[i];
      await payload.create({
        collection: "values",
        data: {
          title: v.title,
          body: v.body,
          icon: v.icon,
          sort_order: i,
          published: true,
        },
      });
    }
    console.log(`  ✓ values (${VALUES.length} items)`);
  }

  console.log("📦 Collections seeded successfully.\n");
}
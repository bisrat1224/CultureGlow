import type { Payload } from "payload";
import { PRODUCTS } from "../lib/data/products";
import { CATEGORIES, STARTERS_ITEMS, MAINS_ITEMS, VEG_VEGAN_ITEMS, DESSERTS_ITEMS, DRINKS_ITEMS } from "../lib/data/menu";

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

const EVENT_TYPES = [
  { title: "Weddings", tag: "Weddings", description: "Make your special day unforgettable with authentic Habesha cuisine and traditions.", image: "wedding.jpg", alt: "Wedding celebration with Habesha food" },
  { title: "Corporate Events", tag: "Corporate", description: "Impress clients and colleagues with professional catering that stands out.", image: "corporate.jpg", alt: "Corporate event catering" },
  { title: "Private Parties", tag: "Private", description: "Birthdays, anniversaries, or any celebration — we bring the feast to you.", image: "party.jpg", alt: "Private party catering" },
  { title: "Cultural Events", tag: "Cultural", description: "Authentic Ethiopian coffee ceremonies and traditional dining experiences.", image: "cultural.jpg", alt: "Cultural event with coffee ceremony" },
];

const GALLERY_PHOTOS = [
  { alt: "Traditional Habesha coffee ceremony setup", ratio: "3/4", type: "gallery" },
  { alt: "Injera with assorted wats", ratio: "4/3", type: "gallery" },
  { alt: "Habesha beauty products display", ratio: "3/4", type: "gallery" },
  { alt: "Catering setup at wedding", ratio: "1/1", type: "gallery" },
  { alt: "Traditional Ethiopian dress", ratio: "4/3", type: "gallery" },
  { alt: "Coffee beans roasting", ratio: "3/4", type: "gallery" },
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

const BUNDLES = [
  { label: "For Coffee Lovers", title: "Habesha Coffee Experience", price_from: "£180", slug: "coffee-experience", alt: "Habesha coffee set bundle" },
  { label: "For Food Lovers", title: "Taste of Ethiopia", price_from: "£320", slug: "taste-of-ethiopia", alt: "Ethiopian food bundle" },
  { label: "For Beauty Lovers", title: "Natural Beauty Collection", price_from: "£450", slug: "beauty-collection", alt: "Natural beauty products bundle" },
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
    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: product.price,
        description: product.description,
        badge: product.badge || undefined,
        whatsapp_message: product.whatsappMessage,
        published: true,
        featured: product.featured || false,
      },
    });
  }
  console.log(`  ✓ products (${PRODUCTS.length} items)`);

  // 2. Menu Categories
  const categoryMap = new Map<string, string>(); // slug -> id

  for (const cat of CATEGORIES) {
    const doc = await payload.create({
      collection: "menu_categories",
      data: {
        name: cat.name,
        slug: cat.slug,
        nav_label: cat.navLabel,
        eyebrow: cat.eyebrow,
        title_before_em: cat.title.beforeEm,
        title_em: cat.title.em,
        variant: cat.variant,
        count_label: cat.countLabel,
        sort_order: cat.sortOrder,
        published: true,
      },
    });
    categoryMap.set(cat.slug, doc.id);
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
    if (!categoryId) continue;

    await payload.create({
      collection: "menu_items",
      data: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        alt: item.alt,
        category: categoryId,
        diet_flags: item.dietFlags || [],
        tag: item.tag || undefined,
        ribbon: item.ribbon || undefined,
        published: true,
      },
    });
  }
  console.log(`  ✓ menu_items (${allItems.length} items)`);

  // 4. Testimonials
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

  // 5. Catering Packages
  for (const pkg of CATERING_PACKAGES) {
    await payload.create({
      collection: "catering_packages",
      data: {
        name: pkg.name,
        slug: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        guests: pkg.guests,
        price_from: pkg.price_from,
        features: pkg.features.map((f) => ({ feature: f })),
        featured: pkg.featured,
        published: true,
      },
    });
  }
  console.log(`  ✓ catering_packages (${CATERING_PACKAGES.length} items)`);

  // 6. Event Types
  for (const evt of EVENT_TYPES) {
    await payload.create({
      collection: "event_types",
      data: {
        title: evt.title,
        slug: evt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tag: evt.tag,
        description: evt.description,
        alt: evt.alt,
        published: true,
      },
    });
  }
  console.log(`  ✓ event_types (${EVENT_TYPES.length} items)`);

  // 7. Gallery Photos
  for (let i = 0; i < GALLERY_PHOTOS.length; i++) {
    const photo = GALLERY_PHOTOS[i];
    await payload.create({
      collection: "gallery_photos",
      data: {
        alt: photo.alt,
        type: photo.type as "gallery" | "about" | "catering",
        ratio: photo.ratio,
        sort_order: i,
        published: true,
      },
    });
  }
  console.log(`  ✓ gallery_photos (${GALLERY_PHOTOS.length} items)`);

  // 8. Social Tiles
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

  // 9. TikTok Tiles
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

  // 10. Bundles
  for (const bundle of BUNDLES) {
    await payload.create({
      collection: "bundles",
      data: {
        title: bundle.title,
        slug: bundle.slug,
        label: bundle.label,
        price_from: bundle.price_from,
        alt: bundle.alt,
        published: true,
      },
    });
  }
  console.log(`  ✓ bundles (${BUNDLES.length} items)`);

  // 11. Milestones
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

  // 12. Values
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

  console.log("📦 Collections seeded successfully.\n");
}
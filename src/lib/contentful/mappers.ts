import type { Entry, Asset, EntrySkeletonType } from "contentful";
import type { Product } from "@/components/home/ProductsSection/ProductCard";
import type { MenuItem, CategoryMeta } from "@/lib/data/menu";
import { homeContent } from "@/lib/content/content.home";
import type { HomeContent } from "@/lib/content/content.home";
import type { ShopContent } from "@/lib/content/content.shop";
import type { MenuContent } from "@/lib/content/content.menu";
import type { SocialPost, SocialPlatform } from "@/lib/data/social";
import { richTextToPlain } from "./richText";

type Fields = Record<string, unknown>;

function f<T>(fields: Fields, key: string, fallback?: T): T {
  const v = fields[key];
  return (v === undefined || v === null ? fallback : v) as T;
}

/** Prefer non-empty CMS string; else static fallback. */
function str(fields: Fields, key: string, fallback: string): string {
  const v = fields[key];
  return typeof v === "string" && v.trim() ? v : fallback;
}

function assetUrl(asset: Asset | undefined | null): string {
  if (!asset?.fields?.file) return "";
  const file = asset.fields.file as { url?: string };
  const url = file?.url;
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

export function mapProduct(entry: Entry<EntrySkeletonType>): Product {
  const fields = entry.fields as Fields;
  const image = fields.image as Asset | undefined;
  const gallery = (fields.gallery as Asset[] | undefined) ?? [];

  return {
    id: f(fields, "slug", entry.sys.id),
    category: f(fields, "category", ""),
    name: f(fields, "name", ""),
    price: f(fields, "price", ""),
    image: assetUrl(image) || "/assets/images/injera-plate.jpg",
    alt: f(fields, "alt", f(fields, "name", "")),
    description: richTextToPlain(fields.description) || undefined,
    badge: f(fields, "badge") || undefined,
    gallery: gallery.map(assetUrl).filter(Boolean),
    allergens: f(fields, "allergens") || undefined,
  };
}

export function mapMenuItem(entry: Entry<EntrySkeletonType>): MenuItem {
  const fields = entry.fields as Fields;
  const image = fields.image as Asset | undefined;

  return {
    id: f(fields, "slug", entry.sys.id),
    name: f(fields, "name", ""),
    description: richTextToPlain(fields.description) || "",
    price: f(fields, "price", ""),
    image: assetUrl(image) || "/assets/images/injera-plate.jpg",
    alt: f(fields, "alt", f(fields, "name", "")),
    diet: f(fields, "diet") || undefined,
    tag: f(fields, "tag") || undefined,
  };
}

export function mapMenuCategory(
  entry: Entry<EntrySkeletonType>
): CategoryMeta & { itemIds: string[] } {
  const fields = entry.fields as Fields;
  const items = (fields.items as Entry<EntrySkeletonType>[] | undefined) ?? [];

  return {
    id: f(fields, "slug", entry.sys.id),
    navLabel: f(fields, "navLabel", ""),
    eyebrow: f(fields, "eyebrow", ""),
    titleBeforeEm: f(fields, "titleBeforeEm", ""),
    titleEm: f(fields, "titleEm", ""),
    variant: f(fields, "variant", "cream") as "cream" | "dark",
    countLabel: f(fields, "countLabel") || undefined,
    itemIds: items.map((i) => {
      const s = (i.fields as Fields)?.slug;
      return typeof s === "string" ? s : i.sys.id;
    }),
  };
}

export function mapHomePage(entry: Entry<EntrySkeletonType>): HomeContent {
  const fields = entry.fields as Fields;

  return {
    hero: {
      eyebrow: f(fields, "heroEyebrow", ""),
      headingBeforeEm: f(fields, "heroHeadingBeforeEm", ""),
      headingEm: f(fields, "heroHeadingEm", ""),
      headingAfterEm: f(fields, "heroHeadingAfterEm", ""),
      body: richTextToPlain(fields.heroBody) || f(fields, "heroBody", ""),
      primaryCta: f(fields, "heroPrimaryCta", ""),
      secondaryCta: f(fields, "heroSecondaryCta", ""),
    },
    marquee: {
      items: f(fields, "marqueeItems", []),
    },
    story: {
      eyebrow: f(fields, "storyEyebrow", ""),
      headingBeforeEm: f(fields, "storyHeadingBeforeEm", ""),
      headingEm: f(fields, "storyHeadingEm", ""),
      headingAfterEm: f(fields, "storyHeadingAfterEm", ""),
      headingSecondLine: f(fields, "storyHeadingSecondLine", ""),
      body: richTextToPlain(fields.storyBody) || "",
      readMoreCta: f(fields, "storyReadMoreCta", ""),
      amharic: f(fields, "storyAmharic", ""),
      badge: f(fields, "storyBadge", ""),
      stats: f(fields, "storyStats", []),
    },
    products: {
      eyebrow: str(fields, "productsEyebrow", homeContent.products.eyebrow),
      headingBeforeEm: str(
        fields,
        "productsHeadingBeforeEm",
        homeContent.products.headingBeforeEm,
      ),
      headingEm: str(fields, "productsHeadingEm", homeContent.products.headingEm),
      headingAfterEm: str(
        fields,
        "productsHeadingAfterEm",
        homeContent.products.headingAfterEm,
      ),
      viewAllCta: str(
        fields,
        "productsViewAllCta",
        homeContent.products.viewAllCta,
      ),
    },
    accentBand: {
      items: f(fields, "accentBandItems", []),
    },
    kitchen: {
      eyebrow: f(fields, "kitchenEyebrow", ""),
      headingBeforeEm: f(fields, "kitchenHeadingBeforeEm", ""),
      headingEm: f(fields, "kitchenHeadingEm", ""),
      headingSecondLine: f(fields, "kitchenHeadingSecondLine", ""),
      body: richTextToPlain(fields.kitchenBody) || "",
      cta: f(fields, "kitchenCta", ""),
    },
    social: {
      eyebrow: f(fields, "socialEyebrow", ""),
      headingBeforeEm: f(fields, "socialHeadingBeforeEm", ""),
      headingEm: f(fields, "socialHeadingEm", ""),
      headingAfterEm: f(fields, "socialHeadingAfterEm", ""),
      tiktokLabel: f(fields, "socialTiktokLabel", ""),
      reelsLabel: f(fields, "socialReelsLabel", ""),
    },
    catering: {
      eyebrow: f(fields, "cateringEyebrow", ""),
      headingBeforeEm: f(fields, "cateringHeadingBeforeEm", ""),
      headingEm: f(fields, "cateringHeadingEm", ""),
      headingSecondLine: f(fields, "cateringHeadingSecondLine", ""),
      body: richTextToPlain(fields.cateringBody) || "",
      cta: f(fields, "cateringCta", ""),
    },
    testimonials: {
      eyebrow: f(fields, "testimonialsEyebrow", ""),
      headingBeforeEm: f(fields, "testimonialsHeadingBeforeEm", ""),
      headingEm: f(fields, "testimonialsHeadingEm", ""),
      headingAfterEm: f(fields, "testimonialsHeadingAfterEm", ""),
      reviewCta: {
        heading: f(fields, "testimonialsReviewHeading", "Leave a Review"),
        body: f(
          fields,
          "testimonialsReviewBody",
          "Enjoyed your order? Let others know on Google.",
        ),
        button: f(fields, "testimonialsReviewButton", "Write a Review"),
      },
      items: f(fields, "testimonialsItems", []),
    },
  } as HomeContent;
}

export function mapShopPage(entry: Entry<EntrySkeletonType>): ShopContent {
  const fields = entry.fields as Fields;

  return {
    hero: {
      label: f(fields, "heroLabel", ""),
      title: f(fields, "heroTitle", ""),
      desc: f(fields, "heroDesc", ""),
    },
    scrollingBanner: {
      items: f(fields, "scrollingBannerItems", []),
    },
    featureBanner: {
      label: f(fields, "featureBannerLabel", ""),
      title: f(fields, "featureBannerTitle", ""),
      desc: f(fields, "featureBannerDesc", ""),
      cta: f(fields, "featureBannerCta", ""),
    },
    bundles: {
      label: f(fields, "bundlesLabel", ""),
      title: f(fields, "bundlesTitle", ""),
      desc: f(fields, "bundlesDesc", ""),
    },
    productsSection: {
      label: f(fields, "productsLabel", ""),
      title: f(fields, "productsTitle", ""),
    },
    howToOrder: {
      label: f(fields, "howToOrderLabel", ""),
      title: f(fields, "howToOrderTitle", ""),
      desc: f(fields, "howToOrderDesc", ""),
      steps: f(fields, "howToOrderSteps", []),
    },
  } as ShopContent;
}

export function mapMenuPage(entry: Entry<EntrySkeletonType>): MenuContent {
  const fields = entry.fields as Fields;

  return {
    hero: {
      eyebrow: f(fields, "heroEyebrow", ""),
      headingBeforeEm: f(fields, "heroHeadingBeforeEm", ""),
      headingEm: f(fields, "heroHeadingEm", ""),
      headingAfterEm: f(fields, "heroHeadingAfterEm", ""),
      desc: f(fields, "heroDesc", ""),
      primaryCta: f(fields, "heroPrimaryCta", ""),
      secondaryCta: f(fields, "heroSecondaryCta", ""),
    },
    featureBanner: {
      label: f(fields, "featureBannerLabel", ""),
      title: f(fields, "featureBannerTitle", ""),
      desc: f(fields, "featureBannerDesc", ""),
      cta: f(fields, "featureBannerCta", ""),
    },
    howToOrder: {
      label: f(fields, "howToOrderLabel", ""),
      title: f(fields, "howToOrderTitle", ""),
      desc: f(fields, "howToOrderDesc", ""),
      steps: f(fields, "howToOrderSteps", []),
    },
    pdfCta: {
      eyebrow: f(fields, "pdfCtaEyebrow", ""),
      title: f(fields, "pdfCtaTitle", ""),
      desc: f(fields, "pdfCtaDesc", ""),
      cta: f(fields, "pdfCtaCta", ""),
    },
  } as MenuContent;
}

function dateField(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  return String(value).slice(0, 10);
}

export function mapTiktokPost(entry: Entry<EntrySkeletonType>): SocialPost {
  const fields = entry.fields as Fields;
  const thumb = fields.thumbnail as Asset | undefined;
  return {
    id: f(fields, "slug", entry.sys.id),
    platform: "tiktok" as SocialPlatform,
    title: f(fields, "title", ""),
    url: f(fields, "url", ""),
    caption: f(fields, "caption", ""),
    addedToSite: dateField(fields.addedToSite),
    sortOrder: Number(f(fields, "sortOrder", 0)),
    showOnHome: Boolean(f(fields, "showOnHome", true)),
    showOnGallery: Boolean(f(fields, "showOnGallery", true)),
    thumbnail: assetUrl(thumb) || undefined,
  };
}

export function mapInstagramReel(entry: Entry<EntrySkeletonType>): SocialPost {
  const fields = entry.fields as Fields;
  const thumb = fields.thumbnail as Asset | undefined;
  return {
    id: f(fields, "slug", entry.sys.id),
    platform: "reels" as SocialPlatform,
    title: f(fields, "title", ""),
    url: f(fields, "url", ""),
    caption: f(fields, "caption", ""),
    addedToSite: dateField(fields.addedToSite),
    sortOrder: Number(f(fields, "sortOrder", 0)),
    showOnHome: Boolean(f(fields, "showOnHome", true)),
    showOnGallery: Boolean(f(fields, "showOnGallery", false)),
    thumbnail: assetUrl(thumb) || undefined,
  };
}
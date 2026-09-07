import type { Entry, Asset, EntrySkeletonType } from "contentful";
import type { Product } from "@/components/home/ProductsSection/ProductCard";
import type { MenuItem } from "@/lib/data/menu";
import type { GlobalSettings } from "@/lib/content/content.global";
import type { SocialPost, SocialPlatform } from "@/lib/data/social";
import { richTextToPlain } from "./richText";

type Fields = Record<string, unknown>;

export function mapGlobalSettings(entry: Entry<EntrySkeletonType>): GlobalSettings {
  const fields = entry.fields as Fields;
  return {
    email: f(fields, "email", ""),
    whatsappNumber: f(fields, "whatsappNumber", ""),
    physicalAddress: f(fields, "physicalAddress", ""),
    openingHours: f(fields, "openingHours", ""),
    instagramUrl: f(fields, "instagramUrl", ""),
    tiktokUrl: f(fields, "tiktokUrl", ""),
    etsyUrl: f(fields, "etsyUrl", ""),
  };
}

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
  const seoImage = fields.seoImage as Asset | undefined;

  return {
    id: f(fields, "slug", entry.sys.id),
    category: f(fields, "category", ""),
    name: f(fields, "name", ""),
    price: f(fields, "price", ""),
    image: assetUrl(image) || "/assets/images/logo.png",
    alt: f(fields, "alt", f(fields, "name", "")),
    description: richTextToPlain(fields.description) || undefined,
    badge: f(fields, "badge") || undefined,
    gallery: gallery.map(assetUrl).filter(Boolean),
    seoTitle: f(fields, "seoTitle") || undefined,
    seoDescription: f(fields, "seoDescription") || undefined,
    seoImage: assetUrl(seoImage) || undefined,
  };
}

export function mapMenuItem(entry: Entry<EntrySkeletonType>): MenuItem {
  const fields = entry.fields as Fields;
  const image = fields.image as Asset | undefined;
  const seoImage = fields.seoImage as Asset | undefined;

  return {
    id: f(fields, "slug", entry.sys.id),
    name: f(fields, "name", ""),
    description: richTextToPlain(fields.description) || "",
    price: f(fields, "price", ""),
    image: assetUrl(image) || "/assets/images/injera-plate.jpg",
    alt: f(fields, "alt", f(fields, "name", "")),
    diet: f(fields, "dietaryTags") || undefined,
    allergens: f(fields, "allergens") || undefined,
    tag: f(fields, "tag") || undefined,
    seoTitle: f(fields, "seoTitle") || undefined,
    seoDescription: f(fields, "seoDescription") || undefined,
    seoImage: assetUrl(seoImage) || undefined,
  };
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
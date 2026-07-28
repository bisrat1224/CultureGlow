import { getDeliveryClient, isContentfulEnabled } from "./client";
import {
  mapProduct,
  mapMenuItem,
  mapMenuCategory,
  mapHomePage,
  mapShopPage,
  mapMenuPage,
} from "./mappers";
import type { Product } from "@/components/home/ProductsSection/ProductCard";
import type { MenuItem, CategoryMeta } from "@/lib/data/menu";
import type { HomeContent } from "@/lib/content/content.home";
import type { ShopContent } from "@/lib/content/content.shop";
import type { MenuContent } from "@/lib/content/content.menu";

import { homeContent as homeFallback } from "@/lib/content/content.home";
import { shopContent as shopFallback } from "@/lib/content/content.shop";
import { menuContent as menuFallback } from "@/lib/content/content.menu";
import {
  PRODUCTS as productsFallback,
  FEATURED_PRODUCTS as featuredFallback,
  getProductBySlug as getProductBySlugFallback,
  getRelatedProducts as getRelatedProductsFallback,
  SHOP_FILTERS,
} from "@/lib/data/products";
import {
  CATEGORIES as categoriesFallback,
  STARTERS_ITEMS,
  MAINS_ITEMS,
  VEG_VEGAN_ITEMS,
  DESSERTS_ITEMS,
  DRINKS_ITEMS,
  FEATURED_MENU_ITEMS as featuredMenuFallback,
  DIET_LEGEND,
} from "@/lib/data/menu";

export { SHOP_FILTERS, DIET_LEGEND };

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isContentfulEnabled()) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.error("[contentful]", err);
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const res = await client.getEntries({
      content_type: "product",
      include: 2,
      limit: 100,
      order: ["fields.name"],
    });
    if (!res.items.length) return productsFallback;
    return res.items.map(mapProduct);
  }, productsFallback);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const home = await client.getEntries({
      content_type: "homePage",
      include: 2,
      limit: 1,
    });
    const entry = home.items[0];
    if (!entry) return featuredFallback;

    const featured = (entry.fields as { featuredProducts?: unknown[] })
      .featuredProducts;
    if (!Array.isArray(featured) || !featured.length) return featuredFallback;

    return featured
      .filter(
        (e): e is (typeof home.items)[0] =>
          Boolean(e) && typeof e === "object" && "sys" in (e as object)
      )
      .map((e) => mapProduct(e as never));
  }, featuredFallback);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const res = await client.getEntries({
      content_type: "product",
      "fields.slug": slug,
      include: 2,
      limit: 1,
    });
    if (!res.items[0]) return getProductBySlugFallback(slug);
    return mapProduct(res.items[0]);
  }, getProductBySlugFallback(slug));
}

export async function getRelatedProducts(
  product: Product,
  limit = 3
): Promise<Product[]> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const res = await client.getEntries({
      content_type: "product",
      "fields.category": product.category,
      include: 2,
      limit: limit + 5,
    });
    return res.items
      .map(mapProduct)
      .filter((p) => p.id !== product.id)
      .slice(0, limit);
  }, getRelatedProductsFallback(product, limit));
}

const MENU_FALLBACK_BY_CAT: Record<string, MenuItem[]> = {
  starters: STARTERS_ITEMS,
  mains: MAINS_ITEMS,
  "veg-vegan": VEG_VEGAN_ITEMS,
  desserts: DESSERTS_ITEMS,
  drinks: DRINKS_ITEMS,
};

export async function getMenuCategories(): Promise<CategoryMeta[]> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const res = await client.getEntries({
      content_type: "menuCategory",
      include: 1,
      limit: 20,
    });
    if (!res.items.length) return categoriesFallback;
    const order = categoriesFallback.map((c) => c.id);
    const mapped = res.items.map(mapMenuCategory);
    return order
      .map((id) => mapped.find((c) => c.id === id))
      .filter(Boolean) as CategoryMeta[];
  }, categoriesFallback);
}

export async function getMenuItemsByCategory(
  categorySlug: string
): Promise<MenuItem[]> {
  const fallback = MENU_FALLBACK_BY_CAT[categorySlug] ?? [];
  return safe(async () => {
    const client = getDeliveryClient()!;
    const res = await client.getEntries({
      content_type: "menuItem",
      "fields.categorySlug": categorySlug,
      include: 2,
      limit: 50,
    });
    if (!res.items.length) return fallback;
    return res.items.map(mapMenuItem);
  }, fallback);
}

export async function getAllMenuItems(): Promise<
  { category: CategoryMeta; items: MenuItem[] }[]
> {
  const categories = await getMenuCategories();
  const result = [];
  for (const cat of categories) {
    const items = await getMenuItemsByCategory(cat.id);
    result.push({ category: cat, items });
  }
  return result;
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const slugs = featuredMenuFallback.map((i) => i.id);
    const res = await client.getEntries({
      content_type: "menuItem",
      "fields.slug[in]": slugs,
      include: 2,
      limit: 10,
    });
    if (!res.items.length) return featuredMenuFallback;
    const bySlug = new Map(
      res.items.map((e) => {
        const m = mapMenuItem(e);
        return [m.id, m] as const;
      })
    );
    return slugs.map((s) => bySlug.get(s)).filter(Boolean) as MenuItem[];
  }, featuredMenuFallback);
}

export async function getHomeContent(): Promise<HomeContent> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const res = await client.getEntries({
      content_type: "homePage",
      limit: 1,
      include: 1,
    });
    if (!res.items[0]) return homeFallback;
    return mapHomePage(res.items[0]);
  }, homeFallback);
}

export async function getShopContent(): Promise<ShopContent> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const res = await client.getEntries({
      content_type: "shopPage",
      limit: 1,
    });
    if (!res.items[0]) return shopFallback;
    return mapShopPage(res.items[0]);
  }, shopFallback);
}

export async function getMenuContent(): Promise<MenuContent> {
  return safe(async () => {
    const client = getDeliveryClient()!;
    const res = await client.getEntries({
      content_type: "menuPage",
      limit: 1,
    });
    if (!res.items[0]) return menuFallback;
    return mapMenuPage(res.items[0]);
  }, menuFallback);
}

import type { ContentStore } from "./store";
import { staticStore } from "./static-store";
import { getDeliveryClient } from "./client";
import {
  mapGlobalSettings,
  mapProduct,
  mapMenuItem,
  mapMenuCategory,
  mapHomePage,
  mapShopPage,
  mapMenuPage,
  mapTiktokPost,
  mapInstagramReel,
} from "./mappers";
import type { Entry, EntrySkeletonType } from "contentful";

type Fields = Record<string, unknown>;

function slug(entry: Entry<EntrySkeletonType>): string {
  const s = (entry.fields as Fields)?.slug;
  return typeof s === "string" ? s : entry.sys.id;
}

export const contentfulStore: ContentStore = {
  async getGlobalSettings() {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "globalSettings", limit: 1 });
      if (!res.items.length) return staticStore.getGlobalSettings();
      return mapGlobalSettings(res.items[0]);
    } catch {
      return staticStore.getGlobalSettings();
    }
  },

  async getProducts() {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "product", include: 2, limit: 100, order: ["fields.name"] as any });
      if (!res.items.length) return staticStore.getProducts();
      return res.items.map(mapProduct);
    } catch {
      return staticStore.getProducts();
    }
  },

  async getFeaturedProducts() {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "homePage", include: 2, limit: 1 });
      const entry = res.items[0];
      if (!entry) return staticStore.getFeaturedProducts();
      const featured = (entry.fields as { featuredProducts?: unknown[] }).featuredProducts;
      if (!Array.isArray(featured) || !featured.length) return staticStore.getFeaturedProducts();
      return featured
        .filter((e): e is Entry<EntrySkeletonType> => Boolean(e) && typeof e === "object" && "sys" in (e as object))
        .map((e) => mapProduct(e as never));
    } catch {
      return staticStore.getFeaturedProducts();
    }
  },

  async getProductBySlug(slug_) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "product", "fields.slug": slug_, include: 2, limit: 1 } as any);
      if (!res.items[0]) return staticStore.getProductBySlug(slug_);
      return mapProduct(res.items[0]);
    } catch {
      return staticStore.getProductBySlug(slug_);
    }
  },

  async getRelatedProducts(product, limit = 3) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "product", "fields.category": product.category, include: 2, limit: limit + 5 } as any);
      return res.items.map(mapProduct).filter((p) => p.id !== product.id).slice(0, limit);
    } catch {
      return staticStore.getRelatedProducts(product, limit);
    }
  },

  async getMenuCategories() {
    try {
      const client = getDeliveryClient()!;
      const fallbackOrder = (await staticStore.getMenuCategories()).map((c) => c.id);
      const res = await client.getEntries({ content_type: "menuCategory", include: 1, limit: 20 });
      if (!res.items.length) return staticStore.getMenuCategories();
      const mapped = res.items.map(mapMenuCategory);
      return fallbackOrder
        .map((id) => mapped.find((c) => c.id === id))
        .filter(Boolean) as typeof mapped;
    } catch {
      return staticStore.getMenuCategories();
    }
  },

  async getMenuItemsByCategory(categorySlug) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "menuItem", "fields.categorySlug": categorySlug, include: 2, limit: 50 } as any);
      if (!res.items.length) return staticStore.getMenuItemsByCategory(categorySlug);
      return res.items.map(mapMenuItem);
    } catch {
      return staticStore.getMenuItemsByCategory(categorySlug);
    }
  },

  async getAllMenuItems() {
    const categories = await this.getMenuCategories();
    return Promise.all(
      categories.map(async (category) => ({
        category,
        items: await this.getMenuItemsByCategory(category.id),
      }))
    );
  },

  async getFeaturedMenuItems() {
    try {
      const fallback = await staticStore.getFeaturedMenuItems();
      const client = getDeliveryClient()!;
      const slugs = fallback.map((i) => i.id);
      const res = await client.getEntries({ content_type: "menuItem", "fields.slug[in]": slugs, include: 2, limit: 10 } as any);
      if (!res.items.length) return fallback;
      const bySlug = new Map(res.items.map((e) => { const m = mapMenuItem(e); return [m.id, m] as const; }));
      return slugs.map((s) => bySlug.get(s)).filter(Boolean) as Awaited<ReturnType<typeof staticStore.getFeaturedMenuItems>>;
    } catch {
      return staticStore.getFeaturedMenuItems();
    }
  },

  async getHomeContent() {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "homePage", limit: 1, include: 1 });
      if (!res.items[0]) return staticStore.getHomeContent();
      return mapHomePage(res.items[0]) as any;
    } catch {
      return staticStore.getHomeContent();
    }
  },

  async getShopContent() {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "shopPage", limit: 1 });
      if (!res.items[0]) return staticStore.getShopContent();
      return mapShopPage(res.items[0]) as any;
    } catch {
      return staticStore.getShopContent();
    }
  },

  async getMenuContent() {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "menuPage", limit: 1 });
      if (!res.items[0]) return staticStore.getMenuContent();
      return mapMenuPage(res.items[0]) as any;
    } catch {
      return staticStore.getMenuContent();
    }
  },

  async getTiktokPosts(opts) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "tiktokPost", limit: 50, order: ["fields.sortOrder"] as any });
      if (!res.items.length) return staticStore.getTiktokPosts(opts);
      let posts = res.items.map(mapTiktokPost);
      if (opts?.homeOnly) posts = posts.filter((p) => p.showOnHome);
      if (opts?.galleryOnly) posts = posts.filter((p) => p.showOnGallery);
      return posts.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch {
      return staticStore.getTiktokPosts(opts);
    }
  },

  async getInstagramReels(opts) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "instagramReel", limit: 50, order: ["fields.sortOrder"] as any });
      if (!res.items.length) return staticStore.getInstagramReels(opts);
      let posts = res.items.map(mapInstagramReel);
      if (opts?.homeOnly) posts = posts.filter((p) => p.showOnHome);
      return posts.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch {
      return staticStore.getInstagramReels(opts);
    }
  },
};

import type { ContentStore } from "./store";
import { staticStore } from "./static-store";
import { getDeliveryClient } from "./client";
import {
  mapGlobalSettings,
  mapProduct,
  mapMenuItem,
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
      const res = await client.getEntries({ content_type: "shopProduct", include: 2, limit: 100, order: ["fields.name"] as any });
      if (!res.items.length) return staticStore.getProducts();
      return res.items.map(mapProduct);
    } catch {
      return staticStore.getProducts();
    }
  },

  async getFeaturedProducts() {
    return staticStore.getFeaturedProducts();
  },

  async getProductBySlug(id) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "shopProduct", "sys.id": id, include: 2, limit: 1 } as any);
      if (!res.items[0]) return staticStore.getProductBySlug(id);
      return mapProduct(res.items[0]);
    } catch {
      return staticStore.getProductBySlug(id);
    }
  },

  async getRelatedProducts(product, limit = 3) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "shopProduct", "fields.category": product.category, include: 2, limit: limit + 5 } as any);
      return res.items.map(mapProduct).filter((p) => p.id !== product.id).slice(0, limit);
    } catch {
      return staticStore.getRelatedProducts(product, limit);
    }
  },

  async getMenuCategories() {
    return staticStore.getMenuCategories();
  },

  async getMenuItemsByCategory(categorySlug) {
    try {
      const client = getDeliveryClient()!;
      // categorySlug maps to our hardcoded category ids: "starters", "mains", "veg-vegan", "desserts", "drinks"
      const res = await client.getEntries({ content_type: "menuItem", "fields.category": categorySlug, include: 2, limit: 50 } as any);
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
    return staticStore.getFeaturedMenuItems();
  },

  async getHomeContent() {
    return staticStore.getHomeContent();
  },

  async getShopContent() {
    return staticStore.getShopContent();
  },

  async getMenuContent() {
    return staticStore.getMenuContent();
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

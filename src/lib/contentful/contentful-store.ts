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
import productsData from "../../../content/products.json";

const FEATURED_PRODUCT_IDS: string[] = productsData.featuredIds;

function warnFallback(method: string, reason: "empty" | "error", err?: unknown) {
  if (reason === "error") {
    console.warn(`[contentful] ${method} fell back`, err);
  } else {
    console.warn(`[contentful] ${method} fell back (empty)`);
  }
}

export const contentfulStore: ContentStore = {
  async getGlobalSettings() {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "globalSettings", limit: 1 });
      if (!res.items.length) {
        warnFallback("getGlobalSettings", "empty");
        return staticStore.getGlobalSettings();
      }
      return mapGlobalSettings(res.items[0]);
    } catch (err) {
      warnFallback("getGlobalSettings", "error", err);
      return staticStore.getGlobalSettings();
    }
  },

  async getProducts() {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "shopProduct", include: 2, limit: 100, order: ["fields.name"] as any });
      if (!res.items.length) {
        warnFallback("getProducts", "empty");
        return staticStore.getProducts();
      }
      return res.items.map(mapProduct);
    } catch (err) {
      warnFallback("getProducts", "error", err);
      return staticStore.getProducts();
    }
  },

  async getFeaturedProducts() {
    try {
      const products = await this.getProducts();
      const featured = FEATURED_PRODUCT_IDS.map((id) =>
        products.find((p) => p.id === id)
      ).filter((p): p is NonNullable<typeof p> => Boolean(p));

      if (!featured.length) {
        warnFallback("getFeaturedProducts", "empty");
        return staticStore.getFeaturedProducts();
      }
      return featured;
    } catch (err) {
      warnFallback("getFeaturedProducts", "error", err);
      return staticStore.getFeaturedProducts();
    }
  },

  async getProductBySlug(id) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({
        content_type: "shopProduct",
        "fields.slug": id,
        include: 2,
        limit: 1,
      } as any);
      if (!res.items[0]) {
        warnFallback("getProductBySlug", "empty");
        return staticStore.getProductBySlug(id);
      }
      return mapProduct(res.items[0]);
    } catch (err) {
      warnFallback("getProductBySlug", "error", err);
      return staticStore.getProductBySlug(id);
    }
  },

  async getRelatedProducts(product, limit = 3) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "shopProduct", "fields.category": product.category, include: 2, limit: limit + 5 } as any);
      const related = res.items.map(mapProduct).filter((p) => p.id !== product.id).slice(0, limit);
      if (!related.length) {
        warnFallback("getRelatedProducts", "empty");
        return staticStore.getRelatedProducts(product, limit);
      }
      return related;
    } catch (err) {
      warnFallback("getRelatedProducts", "error", err);
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
      if (!res.items.length) {
        warnFallback("getMenuItemsByCategory", "empty");
        return staticStore.getMenuItemsByCategory(categorySlug);
      }
      return res.items.map(mapMenuItem);
    } catch (err) {
      warnFallback("getMenuItemsByCategory", "error", err);
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
      if (!res.items.length) {
        warnFallback("getTiktokPosts", "empty");
        return staticStore.getTiktokPosts(opts);
      }
      let posts = res.items.map(mapTiktokPost);
      if (opts?.homeOnly) posts = posts.filter((p) => p.showOnHome);
      if (opts?.galleryOnly) posts = posts.filter((p) => p.showOnGallery);
      return posts.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch (err) {
      warnFallback("getTiktokPosts", "error", err);
      return staticStore.getTiktokPosts(opts);
    }
  },

  async getInstagramReels(opts) {
    try {
      const client = getDeliveryClient()!;
      const res = await client.getEntries({ content_type: "instagramReel", limit: 50, order: ["fields.sortOrder"] as any });
      if (!res.items.length) {
        warnFallback("getInstagramReels", "empty");
        return staticStore.getInstagramReels(opts);
      }
      let posts = res.items.map(mapInstagramReel);
      if (opts?.homeOnly) posts = posts.filter((p) => p.showOnHome);
      return posts.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch (err) {
      warnFallback("getInstagramReels", "error", err);
      return staticStore.getInstagramReels(opts);
    }
  },
};

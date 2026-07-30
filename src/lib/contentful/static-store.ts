import type { ContentStore } from "./store";
import {
  PRODUCTS as productsFallback,
  FEATURED_PRODUCTS as featuredFallback,
  getProductBySlug as getProductBySlugFallback,
  getRelatedProducts as getRelatedProductsFallback,
} from "@/lib/data/products";
import {
  CATEGORIES as categoriesFallback,
  STARTERS_ITEMS,
  MAINS_ITEMS,
  VEG_VEGAN_ITEMS,
  DESSERTS_ITEMS,
  DRINKS_ITEMS,
  FEATURED_MENU_ITEMS as featuredMenuFallback,
} from "@/lib/data/menu";
import { homeContent as homeFallback } from "@/lib/content/content.home";
import { shopContent as shopFallback } from "@/lib/content/content.shop";
import { menuContent as menuFallback } from "@/lib/content/content.menu";
import { getLocalTiktoks, getLocalReels } from "@/lib/data/social";

const MENU_FALLBACK_BY_CAT: Record<string, typeof STARTERS_ITEMS> = {
  starters: STARTERS_ITEMS,
  mains: MAINS_ITEMS,
  "veg-vegan": VEG_VEGAN_ITEMS,
  desserts: DESSERTS_ITEMS,
  drinks: DRINKS_ITEMS,
};

export const staticStore: ContentStore = {
  getProducts: async () => productsFallback,

  getFeaturedProducts: async () => featuredFallback,

  getProductBySlug: async (slug) => getProductBySlugFallback(slug),

  getRelatedProducts: async (product, limit = 3) =>
    getRelatedProductsFallback(product, limit),

  getMenuCategories: async () => categoriesFallback,

  getMenuItemsByCategory: async (slug) => MENU_FALLBACK_BY_CAT[slug] ?? [],

  getAllMenuItems: async () =>
    categoriesFallback.map((category) => ({
      category,
      items: MENU_FALLBACK_BY_CAT[category.id] ?? [],
    })),

  getFeaturedMenuItems: async () => featuredMenuFallback,

  getHomeContent: async () => homeFallback as any,

  getShopContent: async () => shopFallback as any,

  getMenuContent: async () => menuFallback as any,

  getTiktokPosts: async (opts) => getLocalTiktoks(opts),

  getInstagramReels: async (opts) => getLocalReels(opts),
};

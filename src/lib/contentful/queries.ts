import { contentfulStore } from "./contentful-store";
import {
  SHOP_FILTERS,
} from "@/lib/data/products";
import { DIET_LEGEND } from "@/lib/data/menu";

export { SHOP_FILTERS, DIET_LEGEND };

/** Always Contentful; store falls back to local JSON/TS on empty/error. */
const store = contentfulStore;

export const getGlobalSettings = () => store.getGlobalSettings();
export const getProducts = () => store.getProducts();
export const getFeaturedProducts = () => store.getFeaturedProducts();
export const getProductBySlug = (slug: string) => store.getProductBySlug(slug);
export const getRelatedProducts = (product: Parameters<typeof store.getRelatedProducts>[0], limit?: number) =>
  store.getRelatedProducts(product, limit);
export const getMenuCategories = () => store.getMenuCategories();
export const getMenuItemsByCategory = (slug: string) => store.getMenuItemsByCategory(slug);
export const getAllMenuItems = () => store.getAllMenuItems();
export const getFeaturedMenuItems = () => store.getFeaturedMenuItems();
export const getHomeContent = () => store.getHomeContent();
export const getShopContent = () => store.getShopContent();
export const getMenuContent = () => store.getMenuContent();
export const getTiktokPosts = (opts?: Parameters<typeof store.getTiktokPosts>[0]) =>
  store.getTiktokPosts(opts);
export const getInstagramReels = (opts?: Parameters<typeof store.getInstagramReels>[0]) =>
  store.getInstagramReels(opts);

import { isContentfulEnabled } from "./client";
import { staticStore } from "./static-store";
import { contentfulStore } from "./contentful-store";
import type { ContentStore } from "./store";
import {
  SHOP_FILTERS,
} from "@/lib/data/products";
import { DIET_LEGEND } from "@/lib/data/menu";

export { SHOP_FILTERS, DIET_LEGEND };

const store: ContentStore = isContentfulEnabled() ? contentfulStore : staticStore;

export const getProducts = () => store.getProducts();
export const getFeaturedProducts = () => store.getFeaturedProducts();
export const getProductBySlug = (slug: string) => store.getProductBySlug(slug);
export const getRelatedProducts = (product: Parameters<ContentStore["getRelatedProducts"]>[0], limit?: number) =>
  store.getRelatedProducts(product, limit);
export const getMenuCategories = () => store.getMenuCategories();
export const getMenuItemsByCategory = (slug: string) => store.getMenuItemsByCategory(slug);
export const getAllMenuItems = () => store.getAllMenuItems();
export const getFeaturedMenuItems = () => store.getFeaturedMenuItems();
export const getHomeContent = () => store.getHomeContent();
export const getShopContent = () => store.getShopContent();
export const getMenuContent = () => store.getMenuContent();
export const getTiktokPosts = (opts?: Parameters<ContentStore["getTiktokPosts"]>[0]) =>
  store.getTiktokPosts(opts);
export const getInstagramReels = (opts?: Parameters<ContentStore["getInstagramReels"]>[0]) =>
  store.getInstagramReels(opts);

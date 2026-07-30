import type { Product } from "@/components/home/ProductsSection/ProductCard";
import type { MenuItem, CategoryMeta } from "@/lib/data/menu";
import type { HomeContent } from "@/lib/content/content.home";
import type { ShopContent } from "@/lib/content/content.shop";
import type { MenuContent } from "@/lib/content/content.menu";
import type { SocialPost } from "@/lib/data/social";

export type SocialOpts = { homeOnly?: boolean; galleryOnly?: boolean };

export interface ContentStore {
  getProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]>;
  getMenuCategories(): Promise<CategoryMeta[]>;
  getMenuItemsByCategory(slug: string): Promise<MenuItem[]>;
  getAllMenuItems(): Promise<{ category: CategoryMeta; items: MenuItem[] }[]>;
  getFeaturedMenuItems(): Promise<MenuItem[]>;
  getHomeContent(): Promise<HomeContent>;
  getShopContent(): Promise<ShopContent>;
  getMenuContent(): Promise<MenuContent>;
  getTiktokPosts(opts?: SocialOpts): Promise<SocialPost[]>;
  getInstagramReels(opts?: Pick<SocialOpts, "homeOnly">): Promise<SocialPost[]>;
}

import type { Product } from "@/components/home/ProductsSection/ProductCard";
import productsData from "../../../content/products.json";

export type { Product };

export type ProductCategory = "LIFESTYLE" | "BEAUTY";

export const SHOP_FILTERS: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "LIFESTYLE", label: "Lifestyle" },
  { value: "BEAUTY", label: "Beauty" },
];

/** Loaded from content/products.json. Edit that file to change the catalogue. */
export const PRODUCTS: Product[] = productsData.products as Product[];

const FEATURED_PRODUCT_IDS: string[] = productsData.featuredIds;

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) =>
  FEATURED_PRODUCT_IDS.includes(p.id)
);

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);
}

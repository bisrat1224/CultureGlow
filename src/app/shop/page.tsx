import { ShopHero } from "@/components/shop/ShopHero";
import { ShopFilterBar } from "@/components/shop/ShopFilterBar";
import { HowToOrderSection } from "@/components/shop/HowToOrderSection";
import { getProducts, getShopContent } from "@/lib/contentful/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | CultureGlow24 - Habesha Fashion, Crafts & Gifts",
  description:
    "Shop Habesha fashion, jewellery, mugs, and traditional crafts from CultureGlow24. Authentic Ethiopian lifestyle products. Order via WhatsApp.",
};

export default async function ShopPage() {
  const [products, shop] = await Promise.all([
    getProducts(),
    getShopContent(),
  ]);

  return (
    <>
      <ShopHero />
      <div className="wrap">
        <ShopFilterBar
          products={products}
          label={shop.productsSection.label}
          title={shop.productsSection.title}
        />
      </div>
      <HowToOrderSection {...shop.howToOrder} />
    </>
  );
}
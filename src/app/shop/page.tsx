import { ShopHero } from "@/components/shop/ShopHero";
import { ShopFilterBar } from "@/components/shop/ShopFilterBar";
import { HowToOrderSection } from "@/components/shop/HowToOrderSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { getProducts, getShopContent } from "@/lib/contentful/queries";
import { OG_IMAGE } from "@/lib/constants";
import type { Metadata } from "next";

const TITLE = "Shop | CultureGlow24 - Habesha Fashion, Crafts & Gifts";
const DESCRIPTION =
  "Shop Habesha fashion, jewellery, mugs, and traditional crafts from CultureGlow24. Authentic Ethiopian lifestyle products. Order via WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: TITLE,
    description:
      "Shop Habesha fashion, jewellery, mugs, and traditional crafts from CultureGlow24.",
    url: "/shop",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default async function ShopPage() {
  const [products, shop] = await Promise.all([
    getProducts(),
    getShopContent(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ]}
      />
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
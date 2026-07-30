import { ShopHero } from "@/components/shop/ShopHero";
import { ScrollingBanner } from "@/components/shop/ScrollingBanner";
import { ShopFilterBar } from "@/components/shop/ShopFilterBar";
import { FeatureBanner } from "@/components/shop/FeatureBanner";
import { BundlesSection } from "@/components/shop/BundlesSection";
import { HowToOrderSection } from "@/components/shop/HowToOrderSection";
import { getProducts, getShopContent } from "@/lib/contentful/queries";

export default async function ShopPage() {
  const [products, shop] = await Promise.all([
    getProducts(),
    getShopContent(),
  ]);

  return (
    <>
      <ShopHero />
      <ScrollingBanner />
      <div className="wrap">
        <ShopFilterBar
          products={products}
          label={shop.productsSection.label}
          title={shop.productsSection.title}
        />
      </div>
      <FeatureBanner {...shop.featureBanner} />
      <BundlesSection />
      <HowToOrderSection {...shop.howToOrder} />
    </>
  );
}

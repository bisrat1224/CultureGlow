import { ShopHero } from "@/components/shop/ShopHero";
import { ScrollingBanner } from "@/components/shop/ScrollingBanner";
import { ShopFilterBar } from "@/components/shop/ShopFilterBar";
import { FeatureBanner } from "@/components/shop/FeatureBanner";
import { BundlesSection } from "@/components/shop/BundlesSection";
import { HowToOrderSection } from "@/components/shop/HowToOrderSection";

export default function ShopPage() {
  return (
    <>
      <ShopHero />
      <ScrollingBanner />
      <div className="wrap">
        <ShopFilterBar />
      </div>
      <FeatureBanner />
      <BundlesSection />
      <HowToOrderSection />
    </>
  );
}

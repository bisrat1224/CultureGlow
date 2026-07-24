import { getShopPageData } from "@/lib/cms/shop";
import { getPayloadClient } from "@/lib/payload";

import ShopHero from "@/components/shop/ShopHero";
import ScrollingBanner from "@/components/shop/ScrollingBanner";
import ShopFilterBar from "@/components/shop/ShopFilterBar";
import FeatureBanner from "@/components/shop/FeatureBanner";
import BundlesSection from "@/components/shop/BundlesSection";
import HowToOrderSection from "@/components/shop/HowToOrderSection";

export async function generateMetadata() {
  const payload = await getPayloadClient();
  const seo = await payload.findGlobal({ slug: "seo_defaults" });

  return {
    title: `Shop | ${seo.default_title}`,
    description: "Browse our curated collection of Ethiopian and Eritrean food, beauty, and lifestyle products.",
    metadataBase: new URL(seo.metadata_base || "https://cultureglow24.com"),
  };
}

export default async function ShopPage() {
  const data = await getShopPageData();

  return (
    <>
      <ShopHero hero={data.shopPage.hero} />
      <ScrollingBanner items={data.shopPage.scrolling_banner_items} />
      <div className="wrap">
        <ShopFilterBar
          productsSection={data.shopPage.products_heading}
          products={data.products}
        />
      </div>
      <FeatureBanner banner={data.shopPage.feature_banner} />
      <BundlesSection
        heading={data.shopPage.bundles_heading}
        bundles={data.bundles}
      />
      <HowToOrderSection section={data.shopPage.how_to_order} />
    </>
  );
}

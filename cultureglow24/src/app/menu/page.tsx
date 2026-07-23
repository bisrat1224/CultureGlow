import type { Metadata } from "next";
import { getMenuPageData } from "@/lib/cms/menu";
import { getPayloadClient } from "@/lib/payload";

import MenuHero from "@/components/menu/MenuHero";
import CategoryNav from "@/components/menu/CategoryNav";
import DietLegend from "@/components/menu/DietLegend";
import CategoryBlock from "@/components/menu/CategoryBlock";
import MenuRowList from "@/components/menu/MenuRowList";
import MainsGrid from "@/components/menu/MainsGrid";
import FeatureBanner from "@/components/menu/FeatureBanner";
import HowToOrderSection from "@/components/menu/HowToOrderSection";
import PdfCtaSection from "@/components/menu/PdfCtaSection";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient();
  const seo = await payload.findGlobal({ slug: "seo_defaults" });

  return {
    title: `Menu | ${seo.default_title}`,
    description: "Explore our authentic Habesha menu — starters, mains, vegan options, desserts, and drinks.",
    metadataBase: new URL(seo.metadata_base || "https://cultureglow24.com"),
  };
}

export default async function MenuPage() {
  const data = await getMenuPageData();

  const itemsByCategory = data.categories.map((cat) => ({
    category: cat,
    items: data.menuItems.filter((item) => {
      const itemCategoryId = typeof item.category === "string" ? item.category : item.category?.id;
      return itemCategoryId === cat.id;
    }),
  }));

  const mainsCategory = data.categories.find((c) => c.slug === "mains");
  const mainsItems = mainsCategory
    ? data.menuItems.filter((item) => {
        const itemCategoryId = typeof item.category === "string" ? item.category : item.category?.id;
        return itemCategoryId === mainsCategory.id;
      })
    : [];

  const rowCategories = itemsByCategory.filter(
    (ic) => ic.category.slug !== "mains"
  );

  return (
    <>
      <MenuHero hero={data.menuPage.hero} />
      <CategoryNav categories={data.categories} />
      <DietLegend />

      {rowCategories.map((ic) => (
        <CategoryBlock key={ic.category.id} category={ic.category}>
          <MenuRowList items={ic.items} />
        </CategoryBlock>
      ))}

      {mainsCategory && (
        <CategoryBlock category={mainsCategory}>
          <MainsGrid items={mainsItems} />
        </CategoryBlock>
      )}

      <FeatureBanner banner={data.menuPage.feature_banner} />
      <HowToOrderSection section={data.menuPage.how_to_order} />
      <PdfCtaSection cta={data.menuPage.pdf_cta} />
    </>
  );
}

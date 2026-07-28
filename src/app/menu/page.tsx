import { MenuHero } from "@/components/menu/MenuHero";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { DietLegend } from "@/components/menu/DietLegend";
import { CategoryBlock } from "@/components/menu/CategoryBlock";
import { MenuRowList } from "@/components/menu/MenuRowList";
import { FeatureBanner } from "@/components/menu/FeatureBanner";
import { HowToOrderSection } from "@/components/menu/HowToOrderSection";
import { PdfCtaSection } from "@/components/menu/PdfCtaSection";
import { getAllMenuItems } from "@/lib/contentful/queries";

export default async function MenuPage() {
  const sections = await getAllMenuItems();

  return (
    <>
      <MenuHero />
      <CategoryNav categories={sections.map((s) => s.category)} />

      <div className="wrap">
        <DietLegend />
      </div>

      {sections.map(({ category, items }) => (
        <CategoryBlock
          key={category.id}
          id={category.id}
          eyebrow={category.eyebrow}
          titleBeforeEm={category.titleBeforeEm}
          titleEm={category.titleEm}
          countLabel={category.countLabel}
          variant={category.variant}
        >
          <MenuRowList items={items} />
        </CategoryBlock>
      ))}

      <FeatureBanner />
      <HowToOrderSection />
      <PdfCtaSection />
    </>
  );
}

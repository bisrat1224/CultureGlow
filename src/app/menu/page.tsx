import { MenuHero } from "@/components/menu/MenuHero";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { DietLegend } from "@/components/menu/DietLegend";
import { CategoryBlock } from "@/components/menu/CategoryBlock";
import { MenuRowList } from "@/components/menu/MenuRowList";
import { FeatureBanner } from "@/components/menu/FeatureBanner";
import { HowToOrderSection } from "@/components/menu/HowToOrderSection";
import { PdfCtaSection } from "@/components/menu/PdfCtaSection";
import { getAllMenuItems, getMenuContent } from "@/lib/contentful/queries";

export default async function MenuPage() {
  const [sections, menu] = await Promise.all([getAllMenuItems(), getMenuContent()]);

  const sectionsWithCount = sections.map(({ category, items }) => ({
    items,
    category: {
      ...category,
      countLabel: `${items.length} ${items.length === 1 ? "dish" : "dishes"}`,
    },
  }));

  return (
    <>
      <MenuHero />
      <CategoryNav categories={sectionsWithCount.map((s) => s.category)} />

      <div className="wrap">
        <DietLegend />
      </div>

      {sectionsWithCount.map(({ category, items }) => (
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

      <FeatureBanner {...menu.featureBanner} />
      <HowToOrderSection {...menu.howToOrder} />
      <PdfCtaSection />
    </>
  );
}

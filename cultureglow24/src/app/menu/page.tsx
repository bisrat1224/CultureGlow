import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";
import { MenuHero } from "@/components/menu/MenuHero";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { DietLegend } from "@/components/menu/DietLegend";
import { CategoryBlock } from "@/components/menu/CategoryBlock";
import { MenuRowList } from "@/components/menu/MenuRowList";
import { MainsGrid } from "@/components/menu/MainsGrid";
import { FeatureBanner } from "@/components/menu/FeatureBanner";
import { HowToOrderSection } from "@/components/menu/HowToOrderSection";
import { PdfCtaSection } from "@/components/menu/PdfCtaSection";
import {
  CATEGORIES,
  STARTERS_ITEMS,
  VEG_VEGAN_ITEMS,
  DESSERTS_ITEMS,
  DRINKS_ITEMS,
} from "@/lib/data/menu";

// Category order/metadata comes from CATEGORIES (lib/data/menu.ts) so the
// CategoryNav pills and these section shells never drift out of sync.
const [starters, mains, vegVegan, desserts, drinks] = CATEGORIES;

export default function MenuPage() {
  return (
    <>
      <Header />
      <main>
        <MenuHero />
        <CategoryNav />

        <div className="wrap">
          <DietLegend />
        </div>

        <CategoryBlock
          id={starters.id}
          eyebrow={starters.eyebrow}
          titleBeforeEm={starters.titleBeforeEm}
          titleEm={starters.titleEm}
          countLabel={starters.countLabel}
          variant={starters.variant}
        >
          <MenuRowList items={STARTERS_ITEMS} />
        </CategoryBlock>

        <CategoryBlock
          id={mains.id}
          eyebrow={mains.eyebrow}
          titleBeforeEm={mains.titleBeforeEm}
          titleEm={mains.titleEm}
          countLabel={mains.countLabel}
          variant={mains.variant}
        >
          <MainsGrid />
        </CategoryBlock>

        <CategoryBlock
          id={vegVegan.id}
          eyebrow={vegVegan.eyebrow}
          titleBeforeEm={vegVegan.titleBeforeEm}
          titleEm={vegVegan.titleEm}
          countLabel={vegVegan.countLabel}
          variant={vegVegan.variant}
        >
          <MenuRowList items={VEG_VEGAN_ITEMS} />
        </CategoryBlock>

        <CategoryBlock
          id={desserts.id}
          eyebrow={desserts.eyebrow}
          titleBeforeEm={desserts.titleBeforeEm}
          titleEm={desserts.titleEm}
          countLabel={desserts.countLabel}
          variant={desserts.variant}
        >
          <MenuRowList items={DESSERTS_ITEMS} />
        </CategoryBlock>

        <CategoryBlock
          id={drinks.id}
          eyebrow={drinks.eyebrow}
          titleBeforeEm={drinks.titleBeforeEm}
          titleEm={drinks.titleEm}
          countLabel={drinks.countLabel}
          variant={drinks.variant}
        >
          <MenuRowList items={DRINKS_ITEMS} />
        </CategoryBlock>

        <FeatureBanner />
        <HowToOrderSection />
        <PdfCtaSection />
      </main>
      <Footer />
      <WhatsAppStickyBar />
    </>
  );
}
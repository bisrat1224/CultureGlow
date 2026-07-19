import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";
import { ShopHero } from "@/components/shop/ShopHero";
import { ScrollingBanner } from "@/components/shop/ScrollingBanner";
import { ShopFilterBar } from "@/components/shop/ShopFilterBar";
import { FeatureBanner } from "@/components/shop/FeatureBanner";
import { BundlesSection } from "@/components/shop/BundlesSection";
import { HowToOrderSection } from "@/components/shop/HowToOrderSection";

export default function ShopPage() {
  return (
    <>
      <Header />
      <main>
        <ShopHero />
        <ScrollingBanner />
        <div className="wrap">
          <ShopFilterBar />
        </div>
        <FeatureBanner />
        <BundlesSection />
        <HowToOrderSection />
      </main>
      <Footer />
      <WhatsAppStickyBar />
    </>
  );
}
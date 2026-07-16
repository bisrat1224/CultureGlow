import { Header } from "@/components/home/Header/Header";
import { Hero } from "@/components/home/Hero/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand/MarqueeBand";
import { StorySection } from "@/components/home/StorySection/StorySection";
import { ProductsSection } from "@/components/home/ProductsSection/ProductsSection";
import { AccentBand } from "@/components/home/AccentBand/AccentBand";
import { KitchenSection } from "@/components/home/KitchenSection/KitchenSection";
import { SocialSection } from "@/components/home/SocialSection/SocialSection";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <MarqueeBand />
        <StorySection />
        <ProductsSection />
        <AccentBand />
        <KitchenSection />
        <SocialSection />
        {/* Catering, Testimonials, Newsletter, and Contact sections
            are added in Chunks 9-10. */}
      </main>
      <WhatsAppStickyBar />
    </>
  );
}
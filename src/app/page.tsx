import { Hero } from "@/components/home/Hero/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand/MarqueeBand";
import { StorySection } from "@/components/home/StorySection/StorySection";
import { ProductsSection } from "@/components/home/ProductsSection/ProductsSection";
import { AccentBand } from "@/components/home/AccentBand/AccentBand";
import { KitchenSection } from "@/components/home/KitchenSection/KitchenSection";
import { SocialSection } from "@/components/home/SocialSection/SocialSection";
import { CateringSection } from "@/components/home/CateringSection/CateringSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <StorySection />
      <ProductsSection />
      <AccentBand />
      <KitchenSection />
      <SocialSection />
      <CateringSection />
      <TestimonialsSection />
    </>
  );
}
import {
  getHomeContent,
  getFeaturedProducts,
  getTiktokPosts,
  getInstagramReels,
  getFeaturedMenuItems,
} from "@/lib/contentful/queries";
import { Hero } from "@/components/home/Hero/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand/MarqueeBand";
import { StorySection } from "@/components/home/StorySection/StorySection";
import { ProductsSection } from "@/components/home/ProductsSection/ProductsSection";
import { KitchenSection } from "@/components/home/KitchenSection/KitchenSection";
import { SocialSection } from "@/components/home/SocialSection/SocialSection";
import { CateringSection } from "@/components/home/CateringSection/CateringSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection/TestimonialsSection";

export default async function Home() {
  const [home, products, tiktoks, reels, kitchenItems] = await Promise.all([
    getHomeContent(),
    getFeaturedProducts(),
    getTiktokPosts({ homeOnly: true }),
    getInstagramReels({ homeOnly: true }),
    getFeaturedMenuItems(),
  ]);

  return (
    <>
      <Hero />
      <MarqueeBand />
      <StorySection />
      <ProductsSection home={home.products} products={products} />
      <KitchenSection home={home.kitchen} items={kitchenItems} />
      <SocialSection home={home.social} tiktoks={tiktoks} reels={reels} />
      <CateringSection />
      <TestimonialsSection />
    </>
  );
}
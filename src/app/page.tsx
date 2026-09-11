import {
  getHomeContent,
  getFeaturedProducts,
  getTiktokPosts,
  getInstagramReels,
  getMenuItemsByCategory,
} from "@/lib/contentful/queries";
import { Hero } from "@/components/home/Hero/Hero";
import { StorySection } from "@/components/home/StorySection/StorySection";
import { ParallaxBreak } from "@/components/home/ParallaxBreak/ParallaxBreak";
import { ProductsSection } from "@/components/home/ProductsSection/ProductsSection";
import { KitchenSection } from "@/components/home/KitchenSection/KitchenSection";
import { CateringSection } from "@/components/home/CateringSection/CateringSection";
import { SocialSection } from "@/components/home/SocialSection/SocialSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection/TestimonialsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CultureGlow24 | Habesha Food, Coffee & Lifestyle",
  description:
    "Authentic Habesha food, Ethiopian coffee, beauty and lifestyle products. Order via WhatsApp - CultureGlow24 brings Habesha culture to you.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [home, products, tiktoks, reels, mainItems] = await Promise.all([
    getHomeContent(),
    getFeaturedProducts(),
    getTiktokPosts({ homeOnly: true }),
    getInstagramReels({ homeOnly: true }),
    getMenuItemsByCategory("mains"),
  ]);

  return (
    <>
      <Hero />
      <StorySection />
      <ParallaxBreak
        imageSrc="/assets/images/stew-pans.avif"
        eyebrow="Discover"
        heading="From Our Kitchen"
      />
      <KitchenSection home={home.kitchen} items={mainItems} />
      <ProductsSection home={home.products} products={products} />
      <CateringSection />
      <SocialSection home={home.social} tiktoks={tiktoks} reels={reels} />
      <TestimonialsSection />
    </>
  );
}

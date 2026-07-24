import { Metadata } from "next";
import { getHomePageData } from "@/lib/cms/home";
import { getPayloadClient } from "@/lib/payload";

import Hero from "@/components/home/Hero/Hero";
import MarqueeBand from "@/components/home/MarqueeBand/MarqueeBand";
import StorySection from "@/components/home/StorySection/StorySection";
import ProductsSection from "@/components/home/ProductsSection/ProductsSection";
import AccentBand from "@/components/home/AccentBand/AccentBand";
import KitchenSection from "@/components/home/KitchenSection/KitchenSection";
import SocialSection from "@/components/home/SocialSection/SocialSection";
import CateringSection from "@/components/home/CateringSection/CateringSection";
import TestimonialsSection from "@/components/home/TestimonialsSection/TestimonialsSection";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient();
  const seo = await payload.findGlobal({ slug: "seo_defaults" });
  const siteSettings = await payload.findGlobal({ slug: "site_settings" });

  return {
    title: seo.default_title,
    description: seo.default_description,
    keywords: seo.default_keywords?.map((k: any) => k.keyword) || [],
    metadataBase: new URL(seo.metadata_base || "https://cultureglow24.com"),
    openGraph: {
      title: seo.default_title,
      description: seo.default_description,
      type: "website",
    },
    twitter: {
      card: seo.twitter_card as any,
      title: seo.default_title,
      description: seo.default_description,
    },
  };
}

export default async function Home() {
  const data = await getHomePageData();

  return (
    <>
      <Hero hero={data.homePage.hero} />
      <MarqueeBand items={data.homePage.marquee_items} />
      <StorySection story={data.homePage.story} />
      <ProductsSection
        heading={data.homePage.products_heading}
        products={data.featuredProducts}
      />
      <AccentBand items={data.homePage.accent_band_items} />
      <KitchenSection kitchen={data.homePage.kitchen} />
      <SocialSection
        social={data.homePage.social_heading}
        tiles={data.socialTiles}
      />
      <CateringSection catering={data.homePage.catering_section} />
      <TestimonialsSection
        heading={data.homePage.testimonials_heading}
        testimonials={data.testimonials}
      />
    </>
  );
}

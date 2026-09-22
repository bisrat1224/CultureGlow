import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { CoffeeHeritage } from "@/components/about/CoffeeHeritage/CoffeeHeritage";
import { MissionValues } from "@/components/about/MissionValues/MissionValues";
import { AboutVisitSection } from "@/components/about/AboutVisitSection/AboutVisitSection";
import { AboutSocialLinks } from "@/components/about/AboutSocialLinks/AboutSocialLinks";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { OG_IMAGE } from "@/lib/constants";

const TITLE = "About | CultureGlow24 - Our Story & Mission";
const DESCRIPTION =
  "Learn about CultureGlow24's journey, our mission to share Habesha culture, and the values that guide everything we do.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutHero />
      <AboutStory />
      <CoffeeHeritage />
      <MissionValues />
      <AboutVisitSection />
      <AboutSocialLinks />
    </>
  );
}

import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { CoffeeHeritage } from "@/components/about/CoffeeHeritage/CoffeeHeritage";
import { MissionValues } from "@/components/about/MissionValues/MissionValues";
import { AboutVisitSection } from "@/components/about/AboutVisitSection/AboutVisitSection";
import { AboutSocialLinks } from "@/components/about/AboutSocialLinks/AboutSocialLinks";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "About | CultureGlow24 - Our Story & Mission",
  description:
    "Learn about CultureGlow24's journey, our mission to share Habesha culture, and the values that guide everything we do.",
  alternates: { canonical: "/about" },
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

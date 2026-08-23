import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { CoffeeHeritage } from "@/components/about/CoffeeHeritage/CoffeeHeritage";
import { MissionValues } from "@/components/about/MissionValues/MissionValues";
import { AboutSocialLinks } from "@/components/about/AboutSocialLinks/AboutSocialLinks";

export const metadata: Metadata = {
  title: "About | CultureGlow24 - Our Story & Mission",
  description:
    "Learn about CultureGlow24's journey, our mission to share Habesha culture, and the values that guide everything we do.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <CoffeeHeritage />
      <MissionValues />
      <AboutSocialLinks />
    </>
  );
}




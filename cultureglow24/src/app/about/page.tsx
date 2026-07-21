import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { MissionValues } from "@/components/about/MissionValues/MissionValues";
import { MilestonesTimeline } from "@/components/about/MilestonesTimeline/MilestonesTimeline";
import { AboutGallery } from "@/components/about/AboutGallery/AboutGallery";
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
      <MissionValues />
      <MilestonesTimeline />
      <AboutGallery />
      <AboutSocialLinks />
    </>
  );
}

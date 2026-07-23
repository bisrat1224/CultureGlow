import type { Metadata } from "next";
import { getAboutPageData } from "@/lib/cms/about";
import { getPayloadClient } from "@/lib/payload";

import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutStory from "@/components/about/AboutStory/AboutStory";
import MissionValues from "@/components/about/MissionValues/MissionValues";
import MilestonesTimeline from "@/components/about/MilestonesTimeline/MilestonesTimeline";
import AboutGallery from "@/components/about/AboutGallery/AboutGallery";
import AboutSocialLinks from "@/components/about/AboutSocialLinks/AboutSocialLinks";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient();
  const seo = await payload.findGlobal({ slug: "seo_defaults" });

  return {
    title: `About | ${seo.default_title}`,
    description: "Learn about CultureGlow24's journey, our mission to share Habesha culture, and the values that guide everything we do.",
    metadataBase: new URL(seo.metadata_base || "https://cultureglow24.com"),
    openGraph: {
      title: `About | ${seo.default_title}`,
      description: "Learn about CultureGlow24's journey, our mission to share Habesha culture, and the values that guide everything we do.",
      type: "website",
    },
  };
}

export default async function AboutPage() {
  const data = await getAboutPageData();

  return (
    <>
      <AboutHero hero={data.aboutPage.hero} />
      <AboutStory story={data.aboutPage.story} />
      <MissionValues
        mission={data.aboutPage.mission}
        values={data.values}
      />
      <MilestonesTimeline
        heading={data.aboutPage.milestones_heading}
        milestones={data.milestones}
      />
      <AboutGallery
        heading={data.aboutPage.gallery_heading}
        photos={data.galleryPhotos}
      />
      <AboutSocialLinks
        heading={data.aboutPage.social_heading}
        socialLinks={data.siteSettings.social_links}
      />
    </>
  );
}

import type { Metadata } from "next";
import { getCateringPageData } from "@/lib/cms/catering";
import { getPayloadClient } from "@/lib/payload";

import CateringHero from "@/components/catering/CateringHero/CateringHero";
import EventTypesSection from "@/components/catering/EventTypesSection/EventTypesSection";
import PackagesSection from "@/components/catering/PackagesSection/PackagesSection";
import EventGallerySection from "@/components/catering/EventGallerySection/EventGallerySection";
import CateringTestimonialsSection from "@/components/catering/CateringTerminalsSection/CateringTestimonialsSection";
import CateringContactCTA from "@/components/catering/CateringContactCTA/CateringContactCTA";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient();
  const seo = await payload.findGlobal({ slug: "seo_defaults" });

  return {
    title: `Catering & Events | ${seo.default_title}`,
    description: "Bring authentic Habesha catering to your wedding, corporate event, birthday, or cultural ceremony.",
    metadataBase: new URL(seo.metadata_base || "https://cultureglow24.com"),
  };
}

export default async function CateringPage() {
  const data = await getCateringPageData();

  return (
    <>
      <CateringHero hero={data.cateringPage.hero} />
      <EventTypesSection
        heading={data.cateringPage.event_types_heading}
        eventTypes={data.eventTypes}
      />
      <PackagesSection
        heading={data.cateringPage.packages_heading}
        packages={data.packages}
      />
      <EventGallerySection
        heading={data.cateringPage.gallery_heading}
        photos={data.galleryPhotos}
      />
      <CateringTestimonialsSection
        heading={data.cateringPage.testimonials_heading}
        testimonials={data.testimonials}
      />
      <CateringContactCTA cta={data.cateringPage.contact_cta} />
    </>
  );
}

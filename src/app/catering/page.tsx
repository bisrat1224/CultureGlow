import type { Metadata } from "next";
import { CateringHero } from "@/components/catering/CateringHero/CateringHero";
import { EventTypesSection } from "@/components/catering/EventTypesSection/EventTypesSection";
import { PackagesSection } from "@/components/catering/PackagesSection/PackagesSection";
import { CateringProcessSection } from "@/components/catering/CateringProcessSection/CateringProcessSection";
import { EventGallerySection } from "@/components/catering/EventGallerySection/EventGallerySection";
import { CateringContactCTA } from "@/components/catering/CateringContactCTA/CateringContactCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { OG_IMAGE } from "@/lib/constants";

const TITLE = "Catering & Events | CultureGlow24, Authentic Habesha Catering";
const DESCRIPTION =
  "Bring authentic Habesha catering to your wedding, corporate event, birthday, or cultural ceremony. Packages, galleries, and enquiries - CultureGlow24.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/catering" },
  openGraph: {
    title: "Catering & Events | CultureGlow24",
    description:
      "Authentic Habesha catering for weddings, corporate events, and ceremonies.",
    url: "/catering",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catering & Events | CultureGlow24",
    description:
      "Authentic Habesha catering for weddings, corporate events, and ceremonies.",
    images: [OG_IMAGE],
  },
};

export default function CateringPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Catering", path: "/catering" },
        ]}
      />
      <CateringHero />
      <EventTypesSection />
      <PackagesSection />
      <CateringProcessSection />
      <EventGallerySection />
      <CateringContactCTA />
    </>
  );
}

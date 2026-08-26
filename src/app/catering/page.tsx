import type { Metadata } from "next";
import { CateringHero } from "@/components/catering/CateringHero/CateringHero";
import { PackagesSection } from "@/components/catering/PackagesSection/PackagesSection";
import { CateringContactCTA } from "@/components/catering/CateringContactCTA/CateringContactCTA";

export const metadata: Metadata = {
  title: "Catering & Events | CultureGlow24, Authentic Habesha Catering",
  description:
    "Bring authentic Habesha catering to your wedding, corporate event, birthday, or cultural ceremony. Packages, galleries, and enquiries - CultureGlow24.",
};

export default function CateringPage() {
  return (
    <>
      <CateringHero />
      <PackagesSection />
      <CateringContactCTA />
    </>
  );
}
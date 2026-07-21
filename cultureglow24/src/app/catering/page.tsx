import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";
import { CateringHero } from "@/components/catering/CateringHero/CateringHero";
import { EventTypesSection } from "@/components/catering/EventTypesSection/EventTypesSection";
import { PackagesSection } from "@/components/catering/PackagesSection/PackagesSection";

import { EventGallerySection } from "@/components/catering/EventGallerySection/EventGallerySection";
import { CateringTestimonialsSection } from "@/components/catering/CateringTerminalsSection/CateringTestimonialsSection";

import { CateringEnquirySection } from "@/components/catering/CateringEnquirySection/CateringEnquirySection";

export const metadata: Metadata = {
  title: "Catering & Events | CultureGlow24, Authentic Habesha Catering",
  description:
    "Bring authentic Habesha catering to your wedding, corporate event, birthday, or cultural ceremony. Packages, galleries, and enquiries - CultureGlow24.",
};


export default function CateringPage() {
  return (
    <>
      <Header />
      <main id="top">
        <CateringHero />
        <EventTypesSection />
        <PackagesSection />
        <EventGallerySection />
        <CateringTestimonialsSection />
        <CateringEnquirySection />
      </main>
      <Footer />
      <WhatsAppStickyBar />
    </>
  );
}

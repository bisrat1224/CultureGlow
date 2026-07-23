import type { Metadata } from "next";
import { getContactPageData } from "@/lib/cms/contact";
import { getPayloadClient } from "@/lib/payload";

import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactSection from "@/components/contact/ContactSection/ContactSection";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient();
  const seo = await payload.findGlobal({ slug: "seo_defaults" });

  return {
    title: `Contact | ${seo.default_title}`,
    description: "Reach CultureGlow24 by WhatsApp, email, or phone. Send a message, check our delivery area, and find us on social media.",
    metadataBase: new URL(seo.metadata_base || "https://cultureglow24.com"),
  };
}

export default async function ContactPage() {
  const data = await getContactPageData();

  return (
    <>
      <ContactHero hero={data.contactPage.hero} />
      <ContactSection
        methods={data.contactPage.methods}
        siteSettings={data.siteSettings}
      />
    </>
  );
}

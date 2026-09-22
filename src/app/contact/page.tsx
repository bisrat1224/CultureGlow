import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero/ContactHero";
import { ContactSection } from "@/components/contact/ContactSection/ContactSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { contactContent } from "@/lib/content/content.contact";
import { OG_IMAGE } from "@/lib/constants";

const TITLE = "Contact | CultureGlow24 - Get in Touch";
const DESCRIPTION =
  "Reach CultureGlow24 by WhatsApp, email, or phone. Send a message, check our delivery area, and find us on social media.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: TITLE,
    description:
      "Reach CultureGlow24 by WhatsApp, email, or phone. Delivery across SW London.",
    url: "/contact",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <FaqJsonLd items={contactContent.faq.items} />
      <ContactHero />
      <ContactSection />
    </>
  );
}

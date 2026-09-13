import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero/ContactHero";
import { ContactSection } from "@/components/contact/ContactSection/ContactSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { contactContent } from "@/lib/content/content.contact";

export const metadata: Metadata = {
  title: "Contact | CultureGlow24 - Get in Touch",
  description:
    "Reach CultureGlow24 by WhatsApp, email, or phone. Send a message, check our delivery area, and find us on social media.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | CultureGlow24 - Get in Touch",
    description:
      "Reach CultureGlow24 by WhatsApp, email, or phone. Delivery across SW London.",
    url: "/contact",
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

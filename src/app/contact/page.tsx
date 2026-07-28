import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero/ContactHero";
import { ContactSection } from "@/components/contact/ContactSection/ContactSection";

export const metadata: Metadata = {
  title: "Contact | CultureGlow24 - Get in Touch",
  description:
    "Reach CultureGlow24 by WhatsApp, email, or phone. Send a message, check our delivery area, and find us on social media.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}

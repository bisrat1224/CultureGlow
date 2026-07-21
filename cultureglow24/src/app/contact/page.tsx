import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";
import { ContactHero } from "@/components/contact/ContactHero/ContactHero";
import { ContactSection } from "@/components/contact/ContactSection/ContactSection";

export const metadata: Metadata = {
  title: "Contact | CultureGlow24 - Get in Touch",
  description:
    "Reach CultureGlow24 by WhatsApp, email, or phone. Send a message, check our delivery area, and find us on social media.",
};

// Content, copy, and layout (hero + two-column form/info grid + map) are
// ported one-for-one from the Kimi Agent reference build's ContactPage.tsx,
// rebuilt with this project's own components and conventions - see
// ContactHero.tsx and ContactSection.tsx for the specific deviations and
// the reasoning behind each one.
export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="top">
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppStickyBar />
    </>
  );
}

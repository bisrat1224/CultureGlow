import { Header } from "@/components/home/Header/Header";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        {/* Hero, Story (About), Featured Products (Shop), Kitchen (Menu),
            Social, Catering, Testimonials, Newsletter, Contact, and
            Delivery sections are added in Chunks 4–10. */}
      </main>
      <WhatsAppStickyBar />
    </>
  );
}
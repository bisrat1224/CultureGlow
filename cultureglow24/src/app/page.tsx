import { Header } from "@/components/home/Header/Header";
import { Hero } from "@/components/home/Hero/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand/MarqueeBand";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <MarqueeBand />
        {/* Story (About), Featured Products (Shop), Kitchen (Menu), Social,
            Catering, Testimonials, Newsletter, and Contact sections are
            added in Chunks 5–10. */}
      </main>
      <WhatsAppStickyBar />
    </>
  );
}
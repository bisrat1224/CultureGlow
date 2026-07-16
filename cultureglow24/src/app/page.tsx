import { Header } from "@/components/home/Header/Header";
import { Hero } from "@/components/home/Hero/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand/MarqueeBand";
import { StorySection } from "@/components/home/StorySection/StorySection";
import { AccentBand } from "@/components/home/AccentBand/AccentBand";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <MarqueeBand />
        <StorySection />
        <AccentBand />
        {/* Kitchen (Menu), Social, Catering, Testimonials, Newsletter, and
            Contact sections are added in Chunks 6-10. */}
      </main>
      <WhatsAppStickyBar />
    </>
  );
}
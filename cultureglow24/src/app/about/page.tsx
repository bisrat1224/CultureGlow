import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";
import { AboutHero } from "@/components/about/AboutHero/AboutHero"; // ADD
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { MissionValues } from "@/components/about/MissionValues/MissionValues";
import { MilestonesTimeline } from "@/components/about/MilestonesTimeline/MilestonesTimeline";
import { AboutGallery } from "@/components/about/AboutGallery/AboutGallery";
import { AboutSocialLinks } from "@/components/about/AboutSocialLinks/AboutSocialLinks";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero /> 
        <AboutStory />
        <MissionValues />
        <MilestonesTimeline />
        <AboutGallery />
        <AboutSocialLinks />
      </main>
      <Footer />
      <WhatsAppStickyBar />
    </>
  );
}
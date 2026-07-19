import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";
import { GalleryHero } from "@/components/gallery/GalleryHero/GalleryHero";
import { GalleryPhotoGrid } from "@/components/gallery/GalleryPhotoGrid/GalleryPhotoGrid";
import { GalleryTikTokSection } from "@/components/gallery/GalleryTikTokSection/GalleryTikTokSection";

export const metadata: Metadata = {
  title: "Gallery | CultureGlow24 — Photos & Videos",
  description:
    "Food, fashion, and festivity from CultureGlow24 — photo gallery and the latest from TikTok.",
};

// Real content for /gallery (Stage 5, Chunks 18-19), replacing PageStub.
// Content and interaction model rebuilt from the Kimi Agent reference
// build's GalleryPage.tsx; real photo assets migrated from that build's
// src/assets/images/ into this project's public/assets/images/. Uses the
// sitewide Header/Footer/WhatsAppStickyBar, same as every other real page.
export default function GalleryPage() {
  return (
    <>
      <Header />
      <main id="top">
        <GalleryHero />
        <GalleryPhotoGrid />
        <GalleryTikTokSection />
      </main>
      <Footer />
      <WhatsAppStickyBar />
    </>
  );
}

import type { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero/GalleryHero";
import { GalleryPhotoGrid } from "@/components/gallery/GalleryPhotoGrid/GalleryPhotoGrid";
import { GalleryTikTokSection } from "@/components/gallery/GalleryTikTokSection/GalleryTikTokSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Gallery | CultureGlow24 - Photos & Videos",
  description:
    "Food, fashion, and festivity from CultureGlow24 - photo gallery and the latest from TikTok.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <GalleryHero />
      <GalleryPhotoGrid />
      <GalleryTikTokSection />
    </>
  );
}

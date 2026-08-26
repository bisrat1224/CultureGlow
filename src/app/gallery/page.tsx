import type { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero/GalleryHero";
import { GalleryPhotoGrid } from "@/components/gallery/GalleryPhotoGrid/GalleryPhotoGrid";

export const metadata: Metadata = {
  title: "Gallery | CultureGlow24 - Photos & Videos",
  description:
    "Food, fashion, and festivity from CultureGlow24 - photo gallery and the latest from TikTok.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryPhotoGrid />
    </>
  );
}

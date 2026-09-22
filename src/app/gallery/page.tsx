import type { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero/GalleryHero";
import { GalleryPhotoGrid } from "@/components/gallery/GalleryPhotoGrid/GalleryPhotoGrid";
import { GalleryTikTokSection } from "@/components/gallery/GalleryTikTokSection/GalleryTikTokSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { OG_IMAGE } from "@/lib/constants";

const TITLE = "Gallery | CultureGlow24 - Photos & Videos";
const DESCRIPTION =
  "Food, fashion, and festivity from CultureGlow24 - photo gallery and the latest from TikTok.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/gallery",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
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

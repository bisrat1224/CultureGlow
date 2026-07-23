import type { Metadata } from "next";
import { getGalleryPageData } from "@/lib/cms/gallery";
import { getPayloadClient } from "@/lib/payload";

import GalleryHero from "@/components/gallery/GalleryHero/GalleryHero";
import GalleryPhotoGrid from "@/components/gallery/GalleryPhotoGrid/GalleryPhotoGrid";
import GalleryTikTokSection from "@/components/gallery/GalleryTikTokSection/GalleryTikTokSection";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient();
  const seo = await payload.findGlobal({ slug: "seo_defaults" });

  return {
    title: `Gallery | ${seo.default_title}`,
    description: "Food, fashion, and festivity from CultureGlow24 — photo gallery and the latest from TikTok.",
    metadataBase: new URL(seo.metadata_base || "https://cultureglow24.com"),
  };
}

export default async function GalleryPage() {
  const data = await getGalleryPageData();

  return (
    <>
      <GalleryHero hero={data.galleryPage.hero} />
      <GalleryPhotoGrid
        heading={data.galleryPage.photo_grid_heading}
        photos={data.photos}
      />
      <GalleryTikTokSection
        heading={data.galleryPage.tiktok_heading}
        tiles={data.tiktokTiles}
      />
    </>
  );
}

import { getPayloadClient } from "../payload";

export async function getGalleryPageData() {
  const payload = await getPayloadClient();

  const galleryPage = await payload.findGlobal({
    slug: "gallery_page",
  });

  const galleryPhotos = await payload.find({
    collection: "gallery_photos",
    where: { published: { equals: true } },
    sort: "createdAt",
  });

  const tiktokTiles = await payload.find({
    collection: "tiktok_tiles",
    where: { published: { equals: true } },
    sort: "sort_order",
  });

  return {
    galleryPage,
    photos: galleryPhotos.docs,
    tiktokTiles: tiktokTiles.docs,
  };
}

export type GalleryPageData = Awaited<ReturnType<typeof getGalleryPageData>>;

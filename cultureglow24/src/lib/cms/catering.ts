import { getPayloadClient } from "../payload";

export async function getCateringPageData() {
  const payload = await getPayloadClient();

  const cateringPage = await payload.findGlobal({
    slug: "catering_page",
  });

  const packages = await payload.find({
    collection: "catering_packages",
    where: { published: { equals: true } },
    sort: "createdAt",
  });

  const eventTypes = await payload.find({
    collection: "event_types",
    where: { published: { equals: true } },
    sort: "createdAt",
  });

  const testimonials = await payload.find({
    collection: "testimonials",
    where: {
      type: { equals: "catering" },
      published: { equals: true },
    },
    sort: "createdAt",
  });

  const galleryPhotos = await payload.find({
    collection: "gallery_photos",
    where: { published: { equals: true } },
    sort: "createdAt",
    limit: 6,
  });

  return {
    cateringPage,
    packages: packages.docs,
    eventTypes: eventTypes.docs,
    testimonials: testimonials.docs,
    galleryPhotos: galleryPhotos.docs,
  };
}

export type CateringPageData = Awaited<ReturnType<typeof getCateringPageData>>;

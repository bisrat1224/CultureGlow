import { getPayloadClient } from "../payload";

export async function getAboutPageData() {
  const payload = await getPayloadClient();

  const aboutPage = await payload.findGlobal({
    slug: "about_page",
  });

  const milestones = await payload.find({
    collection: "milestones",
    where: { published: { equals: true } },
    sort: "sort_order",
  });

  const values = await payload.find({
    collection: "values",
    where: { published: { equals: true } },
    sort: "sort_order",
  });

  const galleryPhotos = await payload.find({
    collection: "gallery_photos",
    where: { published: { equals: true } },
    sort: "createdAt",
    limit: 6,
  });

  const siteSettings = await payload.findGlobal({
    slug: "site_settings",
  });

  return {
    aboutPage,
    milestones: milestones.docs,
    values: values.docs,
    galleryPhotos: galleryPhotos.docs,
    siteSettings,
  };
}

export type AboutPageData = Awaited<ReturnType<typeof getAboutPageData>>;

import { getPayloadClient } from "../payload";

export async function getHomePageData() {
  const payload = await getPayloadClient();

  const homePage = await payload.findGlobal({
    slug: "home_page",
  });

  const testimonials = await payload.find({
    collection: "testimonials",
    where: {
      type: { equals: "home" },
      published: { equals: true },
    },
    sort: "createdAt",
  });

  const featuredProducts = await payload.find({
    collection: "products",
    where: {
      featured: { equals: true },
      published: { equals: true },
    },
    limit: 4,
  });

  const socialTiles = await payload.find({
    collection: "social_tiles",
    where: { published: { equals: true } },
    sort: "sort_order",
  });

  const siteSettings = await payload.findGlobal({
    slug: "site_settings",
  });

  return {
    homePage,
    testimonials: testimonials.docs,
    featuredProducts: featuredProducts.docs,
    socialTiles: socialTiles.docs,
    siteSettings,
  };
}

export type HomePageData = Awaited<ReturnType<typeof getHomePageData>>;

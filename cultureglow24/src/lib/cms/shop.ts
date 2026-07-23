import { getPayloadClient } from "../payload";

export async function getShopPageData() {
  const payload = await getPayloadClient();

  const shopPage = await payload.findGlobal({
    slug: "shop_page",
  });

  const products = await payload.find({
    collection: "products",
    where: { published: { equals: true } },
    sort: "createdAt",
  });

  const bundles = await payload.find({
    collection: "bundles",
    where: { published: { equals: true } },
    sort: "createdAt",
  });

  return {
    shopPage,
    products: products.docs,
    bundles: bundles.docs,
  };
}

export async function getProductBySlug(slug: string) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: {
      slug: { equals: slug },
      published: { equals: true },
    },
    limit: 1,
  });

  return result.docs[0] || null;
}

export async function getRelatedProducts(currentProduct: any, limit: number = 3) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: {
      id: { not_equals: currentProduct.id },
      category: { equals: currentProduct.category },
      published: { equals: true },
    },
    limit,
  });

  return result.docs;
}

export type ShopPageData = Awaited<ReturnType<typeof getShopPageData>>;

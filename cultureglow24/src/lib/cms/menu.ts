import { getPayloadClient } from "../payload";

export async function getMenuPageData() {
  const payload = await getPayloadClient();

  const menuPage = await payload.findGlobal({
    slug: "menu_page",
  });

  const categories = await payload.find({
    collection: "menu_categories",
    where: { published: { equals: true } },
    sort: "sort_order",
  });

  const menuItems = await payload.find({
    collection: "menu_items",
    where: { published: { equals: true } },
    sort: "createdAt",
  });

  return {
    menuPage,
    categories: categories.docs,
    menuItems: menuItems.docs,
  };
}

export type MenuPageData = Awaited<ReturnType<typeof getMenuPageData>>;

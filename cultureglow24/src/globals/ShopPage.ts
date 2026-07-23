import type { GlobalConfig } from "payload";

export const ShopPage: GlobalConfig = {
  slug: "shop_page",
  label: "Shop Page",
  admin: {
    description: "Content for the Shop page.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Habesha Food · Beauty · Lifestyle" },
        { name: "title", type: "text", required: true, defaultValue: "Everything Habesha, Delivered to Your Door" },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    {
      name: "scrolling_banner_items",
      type: "array",
      label: "Scrolling Banner Items",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "feature_banner",
      type: "group",
      label: "Feature Banner",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Catering & Events" },
        { name: "title", type: "text", required: true, defaultValue: "Let Us Cater Your Next Celebration" },
        { name: "desc", type: "textarea", required: true },
        { name: "cta", type: "text", required: true, defaultValue: "Plan Your Event" },
        { name: "banner_image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "bundles_heading",
      type: "group",
      label: "Bundles Section Heading",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Gift Bundles" },
        { name: "title", type: "text", required: true, defaultValue: "Curated Sets, Ready to Gift" },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    {
      name: "products_heading",
      type: "group",
      label: "Products Section Heading",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Our Products" },
        { name: "title", type: "text", required: true, defaultValue: "Shop the Full Collection" },
      ],
    },
    {
      name: "how_to_order",
      type: "group",
      label: "How to Order Section",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Simple Process" },
        { name: "title", type: "text", required: true, defaultValue: "Ordering Is Easy" },
        { name: "desc", type: "textarea", required: true },
        {
          name: "steps",
          type: "array",
          required: true,
          minRows: 1,
          fields: [
            { name: "number", type: "number", required: true },
            { name: "title", type: "text", required: true },
            { name: "desc", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
};

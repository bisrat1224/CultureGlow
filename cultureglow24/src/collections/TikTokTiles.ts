import type { CollectionConfig } from "payload";

export const TikTokTiles: CollectionConfig = {
  slug: "tiktok_tiles",
  admin: {
    useAsTitle: "caption",
    defaultColumns: ["caption", "sort_order", "published"],
    description: "TikTok embed tiles for the Gallery page.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "caption",
      type: "text",
      required: true,
    },
    {
      name: "gradient_from",
      type: "text",
      required: true,
      defaultValue: "#2D6A4F",
      label: "Gradient Start Color",
      admin: {
        description: "Hex color for the tile gradient (e.g. #2D6A4F, #C8973A)",
      },
    },
    {
      name: "sort_order",
      type: "number",
      defaultValue: 0,
      label: "Sort Order",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      label: "Published",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

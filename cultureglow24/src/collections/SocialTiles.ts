import type { CollectionConfig } from "payload";

export const SocialTiles: CollectionConfig = {
  slug: "social_tiles",
  admin: {
    useAsTitle: "caption",
    defaultColumns: ["caption", "platform", "sort_order", "published"],
    description: "Social media tiles for the Home page Social section.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "platform",
      type: "select",
      required: true,
      options: [
        { label: "TikTok", value: "tiktok" },
        { label: "Reels", value: "reels" },
      ],
    },
    {
      name: "color",
      type: "select",
      required: true,
      defaultValue: "a",
      options: [
        { label: "Color A (Green)", value: "a" },
        { label: "Color B (Gold)", value: "b" },
        { label: "Color C (Red)", value: "c" },
      ],
      admin: {
        description: "Brand color for the tile background",
      },
    },
    {
      name: "caption",
      type: "text",
      required: true,
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

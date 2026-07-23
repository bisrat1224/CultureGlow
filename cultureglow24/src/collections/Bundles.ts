import type { CollectionConfig } from "payload";

export const Bundles: CollectionConfig = {
  slug: "bundles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "label", "price_from", "published"],
    description: "Gift bundles for the Shop page.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "label",
      type: "text",
      required: true,
      label: "Bundle Label",
      admin: {
        description: "e.g. For Coffee Lovers, For Food Lovers",
      },
    },
    {
      name: "price_from",
      type: "text",
      required: true,
      label: "Price From",
      admin: {
        description: "e.g. £180, £320",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Image Alt Text",
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

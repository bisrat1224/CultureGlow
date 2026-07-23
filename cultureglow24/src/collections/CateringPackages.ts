import type { CollectionConfig } from "payload";

export const CateringPackages: CollectionConfig = {
  slug: "catering_packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "guests", "price_from", "featured", "published"],
    description: "Catering packages and pricing tiers.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
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
      name: "guests",
      type: "text",
      required: true,
      label: "Guest Range",
      admin: {
        description: "e.g. Up to 30 guests, 80+ guests",
      },
    },
    {
      name: "price_from",
      type: "text",
      required: true,
      label: "Price From",
      admin: {
        description: "e.g. £1,500, £3,800",
      },
    },
    {
      name: "features",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured (Most Popular)",
      admin: {
        position: "sidebar",
        description: "Highlights this package with a badge",
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

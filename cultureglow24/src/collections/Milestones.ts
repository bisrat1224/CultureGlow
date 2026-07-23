import type { CollectionConfig } from "payload";

export const Milestones: CollectionConfig = {
  slug: "milestones",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["year", "label", "sort_order"],
    description: "Timeline milestones for the About page.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "year",
      type: "text",
      required: true,
      maxLength: 4,
    },
    {
      name: "label",
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
import type { CollectionConfig } from "payload";

export const Values: CollectionConfig = {
  slug: "values",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "sort_order", "published"],
    description: "Mission & values for the About page.",
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
      name: "body",
      type: "textarea",
      required: true,
    },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "heart",
      options: [
        { label: "Heart", value: "heart" },
        { label: "Users", value: "users" },
        { label: "Sparkles", value: "sparkles" },
      ],
      admin: {
        description: "Lucide icon name for the value card",
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

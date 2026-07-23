import type { CollectionConfig } from "payload";

export const MenuItems: CollectionConfig = {
  slug: "menu_items",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "published", "updatedAt"],
    description: "Individual dishes on the menu.",
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
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      type: "text",
      required: true,
      label: "Price",
      admin: {
        description: "e.g. £180, £520",
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
      name: "category",
      type: "relationship",
      relationTo: "menu_categories",
      required: true,
    },
    {
      name: "diet_flags",
      type: "select",
      hasMany: true,
      options: [
        { label: "Vegetarian", value: "veg" },
        { label: "Vegan", value: "vegan" },
        { label: "Gluten Free", value: "gf" },
        { label: "Spicy", value: "spicy" },
      ],
    },
    {
      name: "tag",
      type: "select",
      options: [
        { label: "Popular", value: "Popular" },
      ],
      admin: {
        description: "Optional corner tag (e.g. Popular)",
      },
    },
    {
      name: "ribbon",
      type: "text",
      label: "Ribbon Label",
      admin: {
        description: "e.g. Chef's Special (shown on mains cards)",
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

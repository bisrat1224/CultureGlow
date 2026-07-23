import type { CollectionConfig } from "payload";

export const MenuCategories: CollectionConfig = {
  slug: "menu_categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "nav_label", "variant", "sort_order"],
    description: "Menu section categories (Starters, Mains, etc.)",
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
      label: "Category Name",
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
      name: "nav_label",
      type: "text",
      required: true,
      label: "Navigation Label",
      admin: {
        description: "Short label shown in the category nav pills",
      },
    },
    {
      name: "eyebrow",
      type: "text",
      required: true,
      label: "Section Eyebrow",
      admin: {
        description: "Small text above the section title",
      },
    },
    {
      name: "title_before_em",
      type: "text",
      required: true,
      label: "Title (before emphasized word)",
    },
    {
      name: "title_em",
      type: "text",
      required: true,
      label: "Emphasized Word",
    },
    {
      name: "variant",
      type: "select",
      required: true,
      defaultValue: "cream",
      options: [
        { label: "Cream Background", value: "cream" },
        { label: "Dark Background", value: "dark" },
      ],
    },
    {
      name: "count_label",
      type: "text",
      required: true,
      label: "Item Count Label",
      admin: {
        description: "e.g. 2 dishes, 5 dishes",
      },
    },
    {
      name: "sort_order",
      type: "number",
      required: true,
      defaultValue: 0,
      label: "Sort Order",
      admin: {
        description: "Lower numbers appear first",
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

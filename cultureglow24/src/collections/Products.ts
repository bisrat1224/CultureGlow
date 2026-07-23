import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "published", "updatedAt"],
    description: "Shop products — food, beauty, and lifestyle items.",
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
      label: "Product Name",
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
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Habesha Food", value: "HABESHA FOOD" },
        { label: "Lifestyle", value: "LIFESTYLE" },
        { label: "Beauty", value: "BEAUTY" },
      ],
    },
    {
      name: "price",
      type: "text",
      required: true,
      label: "Price",
      admin: {
        description: "e.g. £450, £3,200",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      label: "Gallery Images",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "allergens",
      type: "array",
      label: "Allergen Information",
      fields: [
        {
          name: "allergen",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "badge",
      type: "select",
      options: [
        { label: "Best Seller", value: "Best Seller" },
        { label: "Popular", value: "Popular" },
        { label: "Gift", value: "Gift" },
        { label: "New", value: "New" },
      ],
    },
    {
      name: "whatsapp_message",
      type: "text",
      label: "WhatsApp Order Message",
      defaultValue: "I'd like to order",
      admin: {
        description: "Pre-filled message when user taps Order via WhatsApp.",
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
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured on Home Page",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

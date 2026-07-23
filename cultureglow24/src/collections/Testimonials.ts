import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "location", "published"],
    description: "Customer testimonials for Home and Catering pages.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "initial",
      type: "text",
      required: true,
      maxLength: 2,
      label: "Initial",
      admin: {
        description: "Single letter for the avatar circle",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "home",
      options: [
        { label: "Home Page", value: "home" },
        { label: "Catering Page", value: "catering" },
      ],
      admin: {
        description: "Which page this testimonial appears on",
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
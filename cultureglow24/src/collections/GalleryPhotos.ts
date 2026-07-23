import type { CollectionConfig } from "payload";

export const GalleryPhotos: CollectionConfig = {
  slug: "gallery_photos",
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "type", "sort_order", "published"],
    description: "Photos for the Gallery and About pages.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
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
    },
    {
      name: "caption",
      type: "text",
      label: "Caption",
      admin: {
        description: "Optional caption (used on catering gallery)",
      },
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "gallery",
      options: [
        { label: "Gallery Page", value: "gallery" },
        { label: "About Page", value: "about" },
        { label: "Catering Page", value: "catering" },
      ],
      admin: {
        description: "Which page this photo appears on",
      },
    },
    {
      name: "ratio",
      type: "select",
      options: [
        { label: "Portrait (3:4)", value: "3/4" },
        { label: "Landscape (4:3)", value: "4/3" },
        { label: "Square (1:1)", value: "1/1" },
      ],
      admin: {
        description: "Aspect ratio for gallery grid layout",
      },
    },
    {
      name: "tall",
      type: "checkbox",
      defaultValue: false,
      label: "Tall Layout",
      admin: {
        description: "Spans two rows in the catering gallery grid",
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

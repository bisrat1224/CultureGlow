import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        crop: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        crop: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        crop: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "filename", "createdAt"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt Text",
      admin: {
        description: "Describe this image for screen readers and SEO.",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Caption",
    },
  ],
};

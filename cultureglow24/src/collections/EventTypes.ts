import type { CollectionConfig } from "payload";

export const EventTypes: CollectionConfig = {
  slug: "event_types",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "published"],
    description: "Types of events CultureGlow24 caters for.",
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
      name: "tag",
      type: "text",
      required: true,
      label: "Tag Label",
      admin: {
        description: "Short label shown on the card overlay",
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

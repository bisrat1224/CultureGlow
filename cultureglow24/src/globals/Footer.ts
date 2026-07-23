import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    description: "Footer content and columns.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "tagline",
      type: "text",
      required: true,
      defaultValue: "Habesha food, beauty, and lifestyle - ordering via WhatsApp only.",
    },
    {
      name: "columns",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Column Title",
        },
        {
          name: "links",
          type: "array",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "href",
              type: "text",
              label: "URL",
            },
          ],
        },
      ],
    },
    {
      name: "copyright_text",
      type: "text",
      defaultValue: "CultureGlow24. All rights reserved.",
    },
  ],
};

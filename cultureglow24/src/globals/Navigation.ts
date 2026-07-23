import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: {
    description: "Header navigation links.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "links",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
          label: "URL",
        },
        {
          name: "sort_order",
          type: "number",
          defaultValue: 0,
          label: "Sort Order",
        },
      ],
    },
  ],
};

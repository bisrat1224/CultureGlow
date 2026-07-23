import type { GlobalConfig } from "payload";

export const SEODefaults: GlobalConfig = {
  slug: "seo_defaults",
  label: "SEO Defaults",
  admin: {
    description: "Default metadata for all pages.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "default_title",
      type: "text",
      required: true,
      defaultValue: "CultureGlow24 — Habesha Food, Beauty & Lifestyle",
    },
    {
      name: "default_description",
      type: "textarea",
      required: true,
      defaultValue: "Authentic Habesha food, beauty, and lifestyle products. Order via WhatsApp.",
    },
    {
      name: "default_keywords",
      type: "array",
      fields: [
        {
          name: "keyword",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "default_og_image",
      type: "upload",
      relationTo: "media",
      label: "Default Open Graph Image",
    },
    {
      name: "twitter_card",
      type: "select",
      defaultValue: "summary_large_image",
      options: [
        { label: "Summary Large Image", value: "summary_large_image" },
        { label: "Summary", value: "summary" },
      ],
    },
    {
      name: "metadata_base",
      type: "text",
      defaultValue: "https://cultureglow24.com",
      label: "Metadata Base URL",
    },
  ],
};

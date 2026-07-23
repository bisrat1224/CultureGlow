import type { GlobalConfig } from "payload";

export const MenuPage: GlobalConfig = {
  slug: "menu_page",
  label: "Menu Page",
  admin: {
    description: "Content for the Menu page.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "The Full Menu" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Every " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Dish" },
        { name: "heading_after_em", type: "text", defaultValue: ", Every Category" },
        { name: "desc", type: "textarea", required: true },
        { name: "primary_cta", type: "text", required: true, defaultValue: "Order" },
        { name: "secondary_cta", type: "text", required: true, defaultValue: "See Signature Dishes" },
        { name: "hero_image", type: "upload", relationTo: "media", required: true },
      ],
    },
    {
      name: "feature_banner",
      type: "group",
      label: "Feature Banner",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Catering & Events" },
        { name: "title", type: "text", required: true, defaultValue: "Bring This Menu to Your Next Event" },
        { name: "desc", type: "textarea", required: true },
        { name: "cta", type: "text", required: true, defaultValue: "Plan Your Event" },
        { name: "banner_image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "how_to_order",
      type: "group",
      label: "How to Order Section",
      fields: [
        { name: "label", type: "text", required: true, defaultValue: "Simple Process" },
        { name: "title", type: "text", required: true, defaultValue: "From Menu to Doorstep" },
        { name: "desc", type: "textarea", required: true },
        {
          name: "steps",
          type: "array",
          required: true,
          minRows: 1,
          fields: [
            { name: "number", type: "number", required: true },
            { name: "title", type: "text", required: true },
            { name: "desc", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "pdf_cta",
      type: "group",
      label: "PDF Download CTA",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Take It With You" },
        { name: "title", type: "text", required: true, defaultValue: "Download the Full Menu" },
        { name: "desc", type: "textarea", required: true },
        { name: "cta", type: "text", required: true, defaultValue: "Download Menu (PDF)" },
        { name: "pdf_url", type: "text", label: "PDF URL" },
      ],
    },
  ],
};

import type { GlobalConfig } from "payload";

export const GalleryPage: GlobalConfig = {
  slug: "gallery_page",
  label: "Gallery Page",
  admin: {
    description: "Content for the Gallery page.",
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
        { name: "eyebrow", type: "text", required: true, defaultValue: "The Gallery" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Moments in " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Frame" },
        { name: "heading_after_em", type: "text" },
        { name: "desc", type: "textarea", required: true },
        { name: "hero_image", type: "upload", relationTo: "media", required: true },
      ],
    },
    {
      name: "photo_grid_heading",
      type: "group",
      label: "Photo Grid Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Photos" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Food, Fashion & " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Festivity" },
        { name: "heading_after_em", type: "text" },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    {
      name: "tiktok_heading",
      type: "group",
      label: "TikTok Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "On TikTok" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Watch the " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Latest" },
        { name: "heading_after_em", type: "text" },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};

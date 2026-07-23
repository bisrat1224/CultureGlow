import type { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
  slug: "home_page",
  label: "Home Page",
  admin: {
    description: "Content for the Home page sections.",
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
        { name: "eyebrow", type: "text", required: true, defaultValue: "Habesha Food · Beauty · Lifestyle" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Taste the " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Soul" },
        { name: "heading_after_em", type: "text", defaultValue: " of Ethiopia" },
        { name: "body", type: "textarea", required: true },
        { name: "primary_cta", type: "text", required: true, defaultValue: "Order" },
        { name: "secondary_cta", type: "text", required: true, defaultValue: "Explore the Menu" },
        { name: "hero_image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "marquee_items",
      type: "array",
      label: "Marquee Items",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "story",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Our Story" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Where " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Culture" },
        { name: "heading_second_line", type: "text", defaultValue: "Meets the Table" },
        { name: "body", type: "textarea", required: true },
        { name: "amharic", type: "text", defaultValue: "Every dish tells a story of home." },
        { name: "badge", type: "text", defaultValue: "Since 2024" },
        {
          name: "stats",
          type: "array",
          fields: [
            { name: "value", type: "text", required: true },
            { name: "label", type: "text", required: true },
          ],
        },
        { name: "story_image_main", type: "upload", relationTo: "media" },
        { name: "story_image_accent", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "products_heading",
      type: "group",
      label: "Products Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Featured Products" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Handpicked " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Favourites" },
        { name: "view_all_cta", type: "text", defaultValue: "View All" },
      ],
    },
    {
      name: "accent_band_items",
      type: "array",
      label: "Accent Band Items",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "kitchen",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "From the Kitchen" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Our " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Signature" },
        { name: "heading_second_line", type: "text", defaultValue: "Dishes" },
        { name: "body", type: "textarea", required: true },
        { name: "cta", type: "text", required: true, defaultValue: "Order" },
      ],
    },
    {
      name: "social_heading",
      type: "group",
      label: "Social Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "On Social" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Follow the " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Feed" },
        { name: "tiktok_label", type: "text", defaultValue: "TikTok" },
        { name: "reels_label", type: "text", defaultValue: "Reels" },
      ],
    },
    {
      name: "catering_section",
      type: "group",
      label: "Catering Section",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Catering & Events" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Bring the " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Feast" },
        { name: "heading_second_line", type: "text", defaultValue: "to Your Event" },
        { name: "body", type: "textarea", required: true },
        { name: "cta", type: "text", required: true, defaultValue: "Plan Your Event" },
        { name: "section_image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "testimonials_heading",
      type: "group",
      label: "Testimonials Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Kind Words" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "What Our " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Guests" },
        { name: "heading_after_em", type: "text", defaultValue: " Say" },
      ],
    },
  ],
};

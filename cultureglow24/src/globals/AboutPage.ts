import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: "about_page",
  label: "About Page",
  admin: {
    description: "Content for the About page.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // HERO
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "About Us" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Our " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Story" },
        { name: "heading_after_em", type: "text" },
        { name: "desc", type: "textarea", required: true, defaultValue: "Habesha food, beauty, and lifestyle delivered with care." },
        { name: "hero_image", type: "upload", relationTo: "media", required: true },
      ],
    },
    // STORY
    {
      name: "story",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Our Story" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "About " },
        { name: "heading_em", type: "text", required: true, defaultValue: "CultureGlow24" },
        { name: "body", type: "textarea", required: true },
        { name: "amharic", type: "text", defaultValue: "Our culture is our pride. Food, Fashion, Life!" },
        { name: "badge", type: "text", defaultValue: "Est. 2024" },
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
    // MISSION HEADING
    {
      name: "mission_heading",
      type: "group",
      label: "Mission Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Mission & Values" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "What We " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Stand For" },
      ],
    },
    // MILESTONES HEADING
    {
      name: "milestones_heading",
      type: "group",
      label: "Milestones Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Our Journey" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Milestones Along the " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Way" },
      ],
    },
    // GALLERY HEADING
    {
      name: "gallery_heading",
      type: "group",
      label: "Gallery Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "In Pictures" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Moments We " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Cherish" },
      ],
    },
    // SOCIAL HEADING
    {
      name: "social_heading",
      type: "group",
      label: "Social Section Heading",
      fields: [
        { name: "heading", type: "text", required: true, defaultValue: "Follow Along" },
      ],
    },
  ],
};
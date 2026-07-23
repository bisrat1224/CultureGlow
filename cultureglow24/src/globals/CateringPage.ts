import type { GlobalConfig } from "payload";

export const CateringPage: GlobalConfig = {
  slug: "catering_page",
  label: "Catering Page",
  admin: {
    description: "Content for the Catering & Events page.",
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
        { name: "eyebrow", type: "text", required: true, defaultValue: "Catering & Events" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Bring the " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Feast" },
        { name: "heading_after_em", type: "text", defaultValue: " to Your Occasion" },
        { name: "desc", type: "textarea", required: true },
        { name: "primary_cta", type: "text", required: true, defaultValue: "Enquire on WhatsApp" },
        { name: "secondary_cta", type: "text", required: true, defaultValue: "See Packages" },
        { name: "hero_image", type: "upload", relationTo: "media", required: true },
      ],
    },
    {
      name: "event_types_heading",
      type: "group",
      label: "Event Types Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Occasions We Cater" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Every " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Celebration" },
        { name: "heading_after_em", type: "text", defaultValue: ", Covered" },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    {
      name: "packages_heading",
      type: "group",
      label: "Packages Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Packages" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Find Your " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Fit" },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    {
      name: "gallery_heading",
      type: "group",
      label: "Gallery Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "From Past Events" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Moments We've " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Catered" },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    {
      name: "testimonials_heading",
      type: "group",
      label: "Testimonials Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Kind Words" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "What Our " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Clients" },
        { name: "heading_after_em", type: "text", defaultValue: " Say" },
      ],
    },
    {
      name: "contact_cta",
      type: "group",
      label: "Contact CTA Section",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Plan Your Event" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Let's Plan Your " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Celebration" },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};

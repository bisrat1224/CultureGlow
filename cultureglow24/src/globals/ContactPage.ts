import type { GlobalConfig } from "payload";

export const ContactPage: GlobalConfig = {
  slug: "contact_page",
  label: "Contact Page",
  admin: {
    description: "Content for the Contact page.",
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
        { name: "eyebrow", type: "text", required: true, defaultValue: "Get in Touch" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Let's " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Talk" },
        { name: "heading_after_em", type: "text" },
        { name: "desc", type: "textarea", required: true },
        { name: "cta", type: "text", required: true, defaultValue: "Chat on WhatsApp" },
        { name: "hero_image", type: "upload", relationTo: "media", required: true },
      ],
    },
    {
      name: "methods_heading",
      type: "group",
      label: "Contact Methods Section Heading",
      fields: [
        { name: "eyebrow", type: "text", required: true, defaultValue: "Get in Touch" },
        { name: "heading_before_em", type: "text", required: true, defaultValue: "Ways to " },
        { name: "heading_em", type: "text", required: true, defaultValue: "Reach Us" },
        { name: "heading_after_em", type: "text" },
        { name: "desc", type: "textarea", required: true },
        { name: "whatsapp_label", type: "text", defaultValue: "WhatsApp" },
        { name: "whatsapp_value", type: "text", defaultValue: "Chat with us instantly" },
        { name: "phone_label", type: "text", defaultValue: "Phone" },
        { name: "email_label", type: "text", defaultValue: "Email" },
        { name: "social_label", type: "text", defaultValue: "Follow Us" },
      ],
    },
    {
      name: "map_title",
      type: "text",
      defaultValue: "CultureGlow24 delivery area map",
    },
  ],
};
import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site_settings",
  label: "Site Settings",
  admin: {
    description: "Brand identity, contact info, and business details.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "site_name",
      type: "text",
      required: true,
      defaultValue: "CultureGlow24",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "whatsapp_number",
      type: "text",
      required: true,
      defaultValue: "251900000000",
      label: "WhatsApp Number",
      admin: {
        description: "Full number with country code, no + or spaces",
      },
    },
    {
      name: "contact_email",
      type: "email",
      required: true,
      defaultValue: "hello@cultureglow24.com",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
      admin: {
        description: "Displayed on contact page",
      },
    },
    {
      name: "phone_tel",
      type: "text",
      label: "Phone Tel Link",
      admin: {
        description: "Number for tel: href (no spaces/symbols)",
      },
    },
    {
      name: "opening_hours",
      type: "text",
      defaultValue: "Mon–Sat, 9am–7pm",
    },
    {
      name: "address",
      type: "textarea",
      label: "Business Address",
    },
    {
      name: "map_embed_url",
      type: "text",
      label: "Google Maps Embed URL",
      admin: {
        description: "Full iframe src URL for the map embed",
      },
    },
    {
      name: "social_links",
      type: "array",
      label: "Social Media Links",
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
      ],
    },
    {
      name: "ga_measurement_id",
      type: "text",
      label: "Google Analytics Measurement ID",
      admin: {
        description: "e.g. G-XXXXXXXXXX",
      },
    },
  ],
};
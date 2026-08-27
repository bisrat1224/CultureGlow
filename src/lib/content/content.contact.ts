/**
 * Centralized sitewide copy, CONTACT PAGE.
 * Mirrors content.home.ts's shape/rationale. Copy only.
 */

export const contactContent = {
  hero: {
    eyebrow: "Get in Touch",
    headingBeforeEm: "Let's ",
    headingEm: "Talk",
    headingAfterEm: "",
    desc: "Questions about an order, a catering enquiry, or just want to say hello, we're easiest to reach on WhatsApp, but every channel below works too.",
    cta: "Chat on WhatsApp",
  },

  methods: {
    eyebrow: "Get in Touch",
    headingBeforeEm: "Ways to ",
    headingEm: "Reach Us",
    headingAfterEm: "",
    desc: "No forms to fill out, pick whichever way suits you best.",
    whatsapp: {
      label: "WhatsApp",
      value: "Chat with us instantly",
    },
    phone: {
      label: "Phone",
    },
    email: {
      label: "Email",
    },
    social: {
      label: "Follow Us",
    },
    directions: {
      label: "Get Directions",
      value: "Open in OpenStreetMap",
    },
  },

  /**
   * TODO(PLACEHOLDER): Opening hours are client-approved placeholders per 2026-08-22 instruction
   * ("can be changed later, just assume for now"). Replace with verified trading hours once confirmed.
   */
  hours: {
    eyebrow: "Opening Hours",
    headingBeforeEm: "When We're ",
    headingEm: "Open",
    headingAfterEm: "",
    desc: "Join us in Putney for authentic Habesha coffee, cuisine, and cultural treasures.",
    schedule: [
      {
        days: "Monday - Friday",
        hours: "8:00 AM - 8:00 PM",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        days: "Saturday",
        hours: "9:00 AM - 8:00 PM",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        days: "Sunday",
        hours: "10:00 AM - 6:00 PM",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    note: "Kitchen service closes 30 minutes before closing time.",
  },

  map: {
    title: "CultureGlow24 delivery area map",
  },
} as const;

export type ContactContent = typeof contactContent;


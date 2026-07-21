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
  },

  map: {
    title: "CultureGlow24 delivery area map",
  },
} as const;

export type ContactContent = typeof contactContent;


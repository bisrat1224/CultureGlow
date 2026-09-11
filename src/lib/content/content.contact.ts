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
    desc: "Find us in Putney, South West London (SW15). Order Habesha food and lifestyle products via WhatsApp for delivery across the SW London area.",
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
    address: {
      label: "Visit Us",
    },
    social: {
      label: "Follow Us",
    },
    directions: {
      label: "Get Directions",
      value: "Open in Google Maps",
    },
  },

  serviceArea: {
    eyebrow: "Delivery",
    headingBeforeEm: "Where We ",
    headingEm: "Deliver",
    headingAfterEm: "",
    body: "CultureGlow24 is based on Putney High Street, London SW15 1SN. We deliver fresh Habesha meals and lifestyle orders across Putney, Fulham, Wandsworth, Battersea, and neighbouring South West London postcodes. Message us on WhatsApp with your postcode to confirm coverage and lead times.",
  },

  /**
   * Opening hours — client-approved placeholders per 2026-08-22.
   * Confirm with Google Business Profile before treating as final.
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

  faq: {
    eyebrow: "FAQ",
    headingBeforeEm: "Common ",
    headingEm: "Questions",
    headingAfterEm: "",
    items: [
      {
        q: "How do I order?",
        a: "Message us on WhatsApp with the dishes or products you want. We confirm availability, price, and delivery details before you pay.",
      },
      {
        q: "What is the delivery lead time?",
        a: "Most food orders for SW London are prepared fresh the same day when ordered early enough. Ask on WhatsApp for today's cut-off.",
      },
      {
        q: "Is there a minimum order?",
        a: "Minimums depend on distance and order type. Tell us your postcode and we will confirm before you commit.",
      },
      {
        q: "Do you cater events?",
        a: "Yes — weddings, corporate, birthdays, and cultural ceremonies. Visit the Catering page or WhatsApp us with your date and guest count.",
      },
    ],
  },

  map: {
    title: "CultureGlow24 delivery area map",
  },
} as const;

export type ContactContent = typeof contactContent;

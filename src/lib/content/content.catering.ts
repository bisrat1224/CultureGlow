/**
 * Centralized sitewide copy, CATERING & EVENTS PAGE.
 * Mirrors content.home.ts's shape/rationale. Copy only, EVENT_TYPES,
 * PACKAGES, GALLERY_ITEMS, and TESTIMONIALS arrays stay inline in their
 * respective component files; those are repeatable structured data, not
 * one-off sitewide copy, per the CMS scoping doc's Initiative A boundary.
 */

export const cateringContent = {
  hero: {
    eyebrow: "Catering & Events",
    headingBeforeEm: "Bring the ",
    headingEm: "Feast",
    headingAfterEm: " to Your Occasion",
    desc: "Weddings, corporate gatherings, birthdays, or cultural ceremonies, our catering team brings authentic Habesha flavor and presentation to every table.",
    primaryCta: "Enquire on WhatsApp",
    secondaryCta: "See Packages",
  },

  eventTypes: {
    eyebrow: "Occasions We Cater",
    headingBeforeEm: "Every ",
    headingEm: "Celebration",
    headingAfterEm: ", Covered",
    desc: "Whatever you're celebrating, we tailor the menu, portions, and presentation to fit the occasion and the guest count.",
  },

  packages: {
    eyebrow: "Packages",
    headingBeforeEm: "Find Your ",
    headingEm: "Fit",
    headingAfterEm: "",
    desc: "Starting prices below give you a sense of scale, every package is customized to your guest count and menu preferences once you reach out.",
  },

  gallery: {
    eyebrow: "From Our Events",
    headingBeforeEm: "Built for the ",
    headingEm: "Occasion",
    headingAfterEm: "",
    desc: "Weddings, markets, and community gatherings we have catered — real CultureGlow24 moments.",
  },

  process: {
    eyebrow: "How It Works",
    headingBeforeEm: "From Enquiry to ",
    headingEm: "Event Day",
    headingAfterEm: "",
    body: "We cater across Greater London with a focus on South West London and neighbouring boroughs. Typical flow: WhatsApp enquiry with date and guest count → tailored menu and quote → optional tasting for larger events → prep, delivery or on-site service on the day. Sample menus draw from our full kitchen list — injera platters, vegetarian spreads, and coffee service available on request.",
    steps: [
      { title: "Enquire", desc: "Share your date, venue, and guest count on WhatsApp." },
      { title: "Menu & quote", desc: "We propose a package sized to your budget and dietary needs." },
      { title: "Confirm", desc: "Lock the menu, deposit, and service style (delivery or on-site)." },
      { title: "Celebrate", desc: "We cook fresh and arrive ready to serve your guests." },
    ],
  },

  testimonials: {
    eyebrow: "Kind Words",
    headingBeforeEm: "What Our ",
    headingEm: "Clients",
    headingAfterEm: " Say",
  },

  contactCta: {
    eyebrow: "Plan Your Event",
    headingBeforeEm: "Let's Plan Your ",
    headingEm: "Celebration",
    headingAfterEm: "",
    desc: "Tell us about your event and we'll get back to you with a tailored package and quote. Reach out directly, whichever way suits you best.",
  },
} as const;

export type CateringContent = typeof cateringContent;
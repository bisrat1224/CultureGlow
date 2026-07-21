/**
 * Centralized sitewide copy — HOME PAGE.
 *
 * Part of Initiative A (CMS_ADMIN_SCOPING.md, Chunk A1): pulls every
 * hardcoded heading, eyebrow, description, and button label out of Home's
 * component files into one place. Components import from here instead of
 * hardcoding strings inline.
 *
 * This file's shape is deliberate — it mirrors how the `siteCopy` global
 * will be structured in Payload once B3 (Collections & Globals schema)
 * happens, so this isn't just cleanup, it's the schema draft.
 *
 * Structured/repeatable data (products, menu items, testimonials, etc.)
 * is NOT here — that already lives in src/lib/data/*.ts and will become
 * Payload *collections*, not part of this *copy* file. This file is only
 * for one-off sitewide strings: headings, eyebrows, descriptions, CTAs.
 *
 * Lorem Ipsum is left as Lorem Ipsum on purpose — replacing it with real
 * client copy is a content task for the owner once they have admin
 * access (CMS_ADMIN_SCOPING.md §6, Chunk B4), not a code task now.
 */

export const homeContent = {
  hero: {
    eyebrow: "Habesha Food · Beauty · Lifestyle",
    headingBeforeEm: "Taste the ",
    headingEm: "Soul",
    headingAfterEm: " of Ethiopia",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
    primaryCta: "Order",
    secondaryCta: "Explore the Menu",
  },

  marquee: {
    items: [
      "CultureGlow24",
      "Authentic Habesha Cuisine",
      "Traditional Clothing",
      "Cultural Events",
      "Catering Services",
    ],
  },

  story: {
    eyebrow: "Our Story",
    headingBeforeEm: "Where ",
    headingEm: "Culture",
    headingAfterEm: "",
    headingSecondLine: "Meets the Table",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    amharic: "ባህላችን ኩራታችን ነው — ምግብ፣ ልብስ፣ ሕይወት።",
    badge: "Since 2024",
    stats: [
      { value: "500+", label: "Orders Delivered" },
      { value: "12+", label: "Menu Items" },
      { value: "100%", label: "Authentic" },
    ],
  },

  products: {
    eyebrow: "Featured Products",
    headingBeforeEm: "Handpicked ",
    headingEm: "Favourites",
    headingAfterEm: "",
    viewAllCta: "View All →",
  },

  accentBand: {
    items: [
      "CULTUREGLOW24",
      "AUTHENTIC HABESHA EXPERIENCE",
      "FOOD · FASHION · CULTURE",
    ],
  },

  kitchen: {
    eyebrow: "From the Kitchen",
    headingBeforeEm: "Our ",
    headingEm: "Signature",
    headingSecondLine: "Dishes",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.",
    cta: "Order",
  },

  social: {
    eyebrow: "On Social",
    headingBeforeEm: "Follow the ",
    headingEm: "Feed",
    headingAfterEm: "",
    tiktokLabel: "TikTok",
    reelsLabel: "Reels",
  },

  catering: {
    eyebrow: "Catering & Events",
    headingBeforeEm: "Bring the ",
    headingEm: "Feast",
    headingSecondLine: "to Your Event",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.",
    cta: "Plan Your Event →",
  },

  testimonials: {
    eyebrow: "Kind Words",
    headingBeforeEm: "What Our ",
    headingEm: "Guests",
    headingAfterEm: " Say",
  },

  newsletter: {
    eyebrow: "Stay in Touch",
    headingBeforeEm: "Join the ",
    headingEm: "Table",
    headingAfterEm: "",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. New dishes, catering offers, and cultural events — straight to your inbox.",
    inputPlaceholder: "Your email address",
    submitCta: "Subscribe",
    note: "No spam. Unsubscribe anytime.",
  },

  whatsAppStickyBar: {
    label: "Order",
  },
} as const;

export type HomeContent = typeof homeContent;
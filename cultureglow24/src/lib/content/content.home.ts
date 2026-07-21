/**
 * Centralized sitewide copy, HOME PAGE.
 *
 * Part of Initiative A (CMS_ADMIN_SCOPING.md, Chunk A1): pulls every
 * hardcoded heading, eyebrow, description, and button label out of Home's
 * component files into one place. Components import from here instead of
 * hardcoding strings inline.
 *
 * This file's shape is deliberate, it mirrors how the `siteCopy` global
 * will be structured in Payload once B3 (Collections & Globals schema)
 * happens, so this isn't just cleanup, it's the schema draft.
 *
 * Structured/repeatable data (products, menu items, testimonials, etc.)
 * is NOT here, that already lives in src/lib/data/*.ts and will become
 * Payload *collections*, not part of this *copy* file. This file is only
 * for one-off sitewide strings: headings, eyebrows, descriptions, CTAs.
 *
 * Body copy below is placeholder marketing copy written to match brand
 * voice, not final client-approved copy, that still comes from the PM
 * per the Content Checklist (Developer Brief §5, "Brand story" - Pending).
 */

export const homeContent = {
  hero: {
    eyebrow: "Habesha Food · Beauty · Lifestyle",
    headingBeforeEm: "Taste the ",
    headingEm: "Soul",
    headingAfterEm: " of Ethiopia",
    body: "Handcrafted Habesha stews, warm spice blends, and everyday essentials, made the traditional way and delivered straight to your door.",
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
    body: "What started as home-cooked meals shared between neighbours has grown into a full celebration of Habesha food, beauty, and lifestyle. Every dish, garment, and gift we offer carries the same care we'd bring to our own family table.",
    amharic: "????? ????? ??, ???? ???? ?????",
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
    viewAllCta: "View All ?",
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
    body: "Every dish is simmered, spiced, and plated the way it's always been done, slow-cooked stews, fresh injera, and recipes passed down rather than shortcuts taken.",
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
    body: "From intimate family gatherings to full wedding receptions, our catering team brings the same authentic flavor and warm hospitality to every table we serve.",
    cta: "Plan Your Event ?",
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
    body: "Be the first to hear about new dishes, catering offers, and cultural events, straight to your inbox.",
    inputPlaceholder: "Your email address",
    submitCta: "Subscribe",
    note: "No spam. Unsubscribe anytime.",
  },

  whatsAppStickyBar: {
    label: "Order",
  },
} as const;

export type HomeContent = typeof homeContent;
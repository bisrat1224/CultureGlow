/**
 * Centralized sitewide copy, MENU PAGE.
 * Mirrors content.home.ts's shape/rationale. Copy only, CATEGORIES and
 * every *_ITEMS array plus DIET_LEGEND stay in lib/data/menu.ts; those
 * are repeatable structured data, not one-off sitewide copy, per the
 * CMS scoping doc's Initiative A boundary.
 */

export const menuContent = {
  hero: {
    eyebrow: "The Full Menu",
    headingBeforeEm: "Every ",
    headingEm: "Dish",
    headingAfterEm: ", Every Category",
    desc: "From sizzling tibs to slow-simmered wats, explore every dish we make, organized by course, so you can find your next favorite in seconds.",
    primaryCta: "Order",
    secondaryCta: "See Signature Dishes",
  },

  // FeatureBanner.tsx (menu-specific copy, separate from Shop's own
  // FeatureBanner content per the "keep duplicates separate, sections
  // evolve independently" convention already established sitewide)
  featureBanner: {
    label: "Catering & Events",
    title: "Bring This Menu to Your Next Event",
    desc: "Everything on this menu can be scaled up for weddings, corporate gatherings, and family celebrations, ask us about full-service catering.",
    cta: "Plan Your Event",
  },

  howToOrder: {
    label: "Simple Process",
    title: "From Menu to Doorstep",
    desc: "Ordering from the full menu takes the same four simple steps as everything else we offer.",
    steps: [
      {
        number: 1,
        title: "Browse & Pick",
        desc: "Scroll the categories above and pick the dishes that catch your eye.",
      },
      {
        number: 2,
        title: "WhatsApp Us",
        desc: "Tap Order on any dish to send us your pick directly on WhatsApp.",
      },
      {
        number: 3,
        title: "Confirm & Pay",
        desc: "We'll confirm availability, pricing, and delivery details with you directly.",
      },
      {
        number: 4,
        title: "Fast Delivery",
        desc: "Your dishes are prepared fresh and delivered straight to your door.",
      },
    ],
  },

  pdfCta: {
    eyebrow: "Take It With You",
    title: "Download the Full Menu",
    desc: "Prefer a printable copy? Grab the full CultureGlow24 menu as a PDF, perfect for sharing or keeping on hand.",
    cta: "Download Menu (PDF)",
  },
} as const;

export type MenuContent = typeof menuContent;


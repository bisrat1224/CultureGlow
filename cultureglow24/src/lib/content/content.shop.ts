/**
 * Centralized sitewide copy, SHOP PAGE.
 * Mirrors content.home.ts's shape/rationale. Copy only, the PRODUCTS,
 * SHOP_FILTERS (lib/data/products.ts) and BUNDLES (BundlesSection.tsx)
 * arrays stay where they are; those are repeatable structured data, not
 * one-off sitewide copy, per the CMS scoping doc's Initiative A boundary.
 */

export const shopContent = {
  hero: {
    label: "Habesha Food · Beauty · Lifestyle",
    title: "Everything Habesha, Delivered to Your Door",
    desc: "Browse our curated collection of Ethiopian and Eritrean food, beauty, and lifestyle products, order in seconds over WhatsApp, no account or checkout required.",
  },

  scrollingBanner: {
    items: [
      "CULTUREGLOW24",
      "AUTHENTIC HABESHA FLAVORS",
      "ORDER VIA WHATSAPP",
      "DELIVERED FRESH",
    ],
  },

  featureBanner: {
    label: "Catering & Events",
    title: "Let Us Cater Your Next Celebration",
    desc: "From weddings to office parties, our catering team brings the full CultureGlow24 experience, authentic dishes, beautifully presented, to any gathering.",
    cta: "Plan Your Event",
  },

  bundles: {
    label: "Gift Bundles",
    title: "Curated Sets, Ready to Gift",
    desc: "Can't decide what to order? These handpicked bundles pair our most-loved dishes, garments, and beauty items into one easy WhatsApp order.",
  },

  productsSection: {
    label: "Our Products",
    title: "Shop the Full Collection",
  },

  howToOrder: {
    label: "Simple Process",
    title: "Ordering Is Easy",
    desc: "No app to download and no account to create, just four simple steps between you and your next Habesha favorite.",
    steps: [
      {
        number: 1,
        title: "Browse & Pick",
        desc: "Explore our food, beauty, and lifestyle products and pick what speaks to you.",
      },
      {
        number: 2,
        title: "WhatsApp Us",
        desc: "Tap the order button and send us your pick directly on WhatsApp.",
      },
      {
        number: 3,
        title: "Confirm & Pay",
        desc: "We'll confirm availability, pricing, and delivery details with you directly.",
      },
      {
        number: 4,
        title: "Fast Delivery",
        desc: "Sit back while your order is prepared and delivered fresh to your door.",
      },
    ],
  },
} as const;

export type ShopContent = typeof shopContent;


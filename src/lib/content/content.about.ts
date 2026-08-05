/**
 * Centralized sitewide copy for the ABOUT PAGE.
 * Mirrors content.home.ts's shape/rationale (see that file's header comment).
 * Structured/repeatable data stays out of this file per the CMS scoping
 * doc — this is copy only (headings, body text, eyebrows, alt text).
 */

export const aboutContent = {
  story: {
    eyebrow: "Our Story",
    headingBeforeEm: "About ",
    headingEm: "CultureGlow24",
    headingAfterEm: "",
    body: "Habesha culture belongs in everyday life, not saved for holidays. We started by cooking family recipes for neighbours, and we now deliver Habesha food, beauty and lifestyle products across London. You order over WhatsApp and we bring it to your door.",
    amharic: "Our culture is our pride. Food, Fashion, Life!",
    badge: "Est. 2024",
    stats: [
      { value: "500+", label: "Orders Delivered" },
      { value: "12+", label: "Menu Items" },
      { value: "2024", label: "Serving London Since" },
    ],
  },

  mission: {
    eyebrow: "Mission & Values",
    headingBeforeEm: "What We ",
    headingEm: "Stand For",
    values: [
      {
        title: "Authenticity",
        body: "We cook the recipes and source the garments as Habesha tradition makes them. We do not adapt the spicing to make it easier to sell.",
      },
      {
        title: "Community",
        body: "We grew from word of mouth between family and neighbors, and we still treat every order like it's going to someone we know.",
      },
      {
        title: "Craftsmanship",
        body: "Our stews simmer for hours and our textiles are embroidered by hand. We choose suppliers who work at that pace.",
      },
    ],
  },

  milestones: {
    eyebrow: "Our Journey",
    headingBeforeEm: "Milestones Along the ",
    headingEm: "Way",
    items: [
      { year: "2024", label: "CultureGlow24 Founded" },
      { year: "2024", label: "First 100 Orders Delivered" },
      { year: "2025", label: "Catering & Events Launched" },
      { year: "2025", label: "500+ Customers Served" },
    ],
  },

  gallery: {
    eyebrow: "In Pictures",
    headingBeforeEm: "Moments We ",
    headingEm: "Cherish",
    images: [
      {
        src: "https://images.pexels.com/photos/35976293/pexels-photo-35976293.png?auto=compress&cs=tinysrgb&w=700",
        alt: "Ethiopian wedding celebration at night",
      },
      {
        src: "https://images.pexels.com/photos/3376765/pexels-photo-3376765.jpeg?auto=compress&cs=tinysrgb&w=700",
        alt: "Banquet hall set up with round tables and floral centerpieces",
      },
      {
        src: "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&w=700",
        alt: "Elegant birthday celebration with balloons and cake",
      },
      {
        src: "https://images.pexels.com/photos/20865956/pexels-photo-20865956.jpeg?auto=compress&cs=tinysrgb&w=700",
        alt: "Women in colorful traditional dress at Meskel festival, Addis Ababa",
      },
      {
        src: "https://images.pexels.com/photos/17272177/pexels-photo-17272177.jpeg?auto=compress&cs=tinysrgb&w=700",
        alt: "Traditional parade during a religious festival in Addis Ababa",
      },
      {
        src: "https://images.pexels.com/photos/6405679/pexels-photo-6405679.jpeg?auto=compress&cs=tinysrgb&w=700",
        alt: "Team celebrating together at a festive office party",
      },
    ],
  },

  social: {
    heading: "Follow Along",
  },
} as const;

export type AboutContent = typeof aboutContent;

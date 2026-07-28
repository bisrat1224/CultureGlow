/**
 * Centralized sitewide copy — ABOUT PAGE.
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
    body: "CultureGlow24 began with a simple idea: Habesha culture deserves a place in everyday life, not just special occasions. What started as family recipes shared between neighbors in Addis Ababa has grown into a full celebration of Habesha food, beauty, and lifestyle — delivered straight to your door, one WhatsApp order at a time.",
    amharic: "Our culture is our pride. Food, Fashion, Life!",
    badge: "Est. 2024",
    stats: [
      { value: "500+", label: "Orders Delivered" },
      { value: "12+", label: "Menu Items" },
      { value: "100%", label: "Authentic" },
    ],
  },

  mission: {
    eyebrow: "Mission & Values",
    headingBeforeEm: "What We ",
    headingEm: "Stand For",
    values: [
      {
        title: "Authenticity",
        body: "Every recipe, spice blend, and garment we offer is rooted in real Habesha tradition — nothing adapted or diluted for convenience.",
      },
      {
        title: "Community",
        body: "We grew from word of mouth between family and neighbors, and we still treat every order like it's going to someone we know.",
      },
      {
        title: "Craftsmanship",
        body: "From slow-simmered stews to hand-embroidered textiles, we work with people who take the time real quality demands.",
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

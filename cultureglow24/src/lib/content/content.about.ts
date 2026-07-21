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
    body: "CultureGlow24 began with a simple idea: Ethiopian and Eritrean culture deserves a place in everyday life, not just special occasions. What started as family recipes shared between neighbors in Addis Ababa has grown into a full celebration of Habesha food, beauty, and lifestyle — delivered straight to your door, one WhatsApp order at a time.",
    amharic: "ባህላችን ኩራታችን ነው — ምግብ፣ ልብስ፣ ሕይወት።",
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
        src: "/assets/images/pexels-berlinerlights-23858842.jpg",
        alt: "Traditional Habesha stews simmering in dark pans",
      },
      {
        src: "/assets/images/pexels-dbaler-17486836.jpg",
        alt: "Injera platter with assorted stews",
      },
      {
        src: "/assets/images/879d4f180b0382a039490cefec95d4e2.jpg",
        alt: "Habesha kemis dress with intricate embroidery",
      },
      {
        src: "/assets/images/147f32aef0aacd3cb17eb003475d052b.jpg",
        alt: "Elegant Habesha cultural dress",
      },
      {
        src: "/assets/images/istockphoto-452732099-612x612.jpg",
        alt: "Ethiopian coffee ceremony setting",
      },
      {
        src: "/assets/images/istockphoto-908729848-612x612.jpg",
        alt: "Habesha catering spread for a family gathering",
      },
    ],
  },

  social: {
    heading: "Follow Along",
  },
} as const;

export type AboutContent = typeof aboutContent;
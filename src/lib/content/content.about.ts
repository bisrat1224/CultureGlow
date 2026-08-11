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
    body: "CultureGlow24 was born from a vibrant, unstoppable idea: Habesha culture shouldn’t just come out for special occasions. It deserves to pulse through your everyday life! What started as soulful family recipes passed from kitchen to kitchen among neighbors back in The Homeland has erupted into a full-scale celebration of Habesha food, beauty, and lifestyle. And the best part? We bring that electric energy straight to your doorstep, one WhatsApp order at a time! Let’s live the culture, every single day.",
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
        src: "/assets/images/gallery/wedding.jpeg",
        alt: "Wedding celebration with CultureGlow24 catering",
      },
      {
        src: "/assets/images/gallery/aau-event.jpeg",
        alt: "CultureGlow24 at an AAU event",
      },
      {
        src: "/assets/images/gallery/booth-3.jpeg",
        alt: "CultureGlow24 market booth",
      },
      {
        src: "/assets/images/gallery/booth-4.jpeg",
        alt: "CultureGlow24 booth close-up",
      },
      {
        src: "/assets/images/gallery/happy-customers-2.jpeg",
        alt: "Customers at a CultureGlow24 event",
      },
      {
        src: "/assets/images/gallery/happy-customers-4.jpeg",
        alt: "Happy customers with CultureGlow24 dishes",
      },
    ],
  },

  social: {
    heading: "Follow Along",
  },
} as const;

export type AboutContent = typeof aboutContent;

/**
 * Centralized sitewide copy for the ABOUT PAGE.
 * Mirrors content.home.ts's shape/rationale (see that file's header comment).
 * Structured/repeatable data stays out of this file per the CMS scoping
 * doc — this is copy only (headings, body text, eyebrows, alt text).
 */

export const aboutContent = {
  story: {
    eyebrow: "Our Story",
    headingBeforeEm: "A Heritage ",
    headingEm: "Reimagined",
    headingAfterEm: "",
    paragraphs: [
      "Cultureglow24 is more than a restaurant; it is the story of our family, of tables gathered around, of laughter shared, of recipes treasured and passed lovingly from one generation to the next. Our name, culture, carries the weight of memory, tradition, and the quiet pride of craftsmanship.",
      "Our cuisine is born from these roots. Each dish begins with ingredients chosen for their purity and character, sourced from the landscapes of Ethiopia and the hands of local artisans who share our devotion to quality. What arrives at the table is not simply food, but a reflection of where we come from, flavours shaped by history, refined with care, and presented with elegance.",
      "Our coffee has been assembled with the same intention. Every cup tells a story of its own, of kissed by sun, of families who pour their life into their craft. Each selection is made to deepen the experience, to harmonise with our dishes, and to elevate the moment.",
      "Our service embodies the warmth of Ethiopia hospitality. Here, you are not just a guest, you are part of our family.",
      "As we open our doors, we welcome you into our story. A place where time slows, where the table becomes a gathering place for connection, where tradition and elegance meet.",
      "Welcome to cultureglow24. This is where our new chapter begins, and we are honoured to share it with you.",
    ],
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
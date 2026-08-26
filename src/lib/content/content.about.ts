/**
 * Centralized sitewide copy for the ABOUT PAGE.
 * Mirrors content.home.ts's shape/rationale (see that file's header comment).
 * Structured/repeatable data stays out of this file per the CMS scoping
 * doc, this is copy only (headings, body text, eyebrows, alt text).
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

  coffeeHeritage: {
    eyebrow: "Coffee Heritage",
    headingBeforeEm: "The Birthplace of ",
    headingEm: "Coffee",
    headingAfterEm: "",
    intro:
      "Ethiopia is not merely a producer of fine coffee, it is the ancestral home where the world's coffee journey began.",
    points: [
      {
        number: "01",
        title: "Origin in the Kaffa Region",
        text: "Deep in the ancient mountain rainforests of southwestern Ethiopia's Kaffa province, Coffea arabica grew wild for millennia. The lush forest canopy and fertile volcanic soils nurtured the planet's very first wild coffee trees, giving the beverage the name by which it is known worldwide.",
      },
      {
        number: "02",
        title: "The Legend of Kaldi (c. 850 AD)",
        text: "Centuries ago, an observant Ethiopian goat herder named Kaldi noticed his flock dancing with unbridled vitality after grazing on crimson berries from an evergreen shrub. Kaldi tasted the cherries, felt their energizing power, and brought them to a local monastery where monks first brewed an infusion to sustain long nights of prayer.",
      },
      {
        number: "03",
        title: "Cultivated by Smallholder Farmers",
        text: "Across the world-renowned microclimates of Yirgacheffe, Kochere, Sidama, and Guji, generations of smallholder farming families cultivate coffee under the protective shade of indigenous trees. Handed down across centuries, this artisanal stewardship preserves unique heirloom varietals found nowhere else on earth.",
      },
      {
        number: "04",
        title: "Harvesting & Meticulous Processing",
        text: "Every cherry is selectively hand-picked at peak ripeness before undergoing meticulous processing. Sun-dried on raised African beds (natural processing) or washed with pure mountain spring waters, each method unlocks complex tasting profiles noted for floral jasmine, bergamot, bright citrus, and ripe berry notes.",
      },
      {
        number: "05",
        title: "Roasting & the Sacred Ceremony",
        text: "The traditional Ethiopian coffee ceremony (Buna) is a cornerstone of Habesha hospitality and community life. Green beans are washed, roasted over open embers in a flat pan, ground with a traditional mortar and pestle, and brewed in a clay jebena over three progressive rounds: Abol, Tona, and Baraka, served with aromatic frankincense.",
      },
      {
        number: "06",
        title: "The Gift to the World",
        text: "From the Ethiopian highlands across the Red Sea through ancient trading routes, coffee spread to Yemen, Arabia, and eventually across every continent. Today, every cup brewed anywhere in the world traces its lineage back to the wild forests of Ethiopia.",
      },
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

  social: {
    heading: "Follow Along",
  },
} as const;

export type AboutContent = typeof aboutContent;
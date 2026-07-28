/**
 * Centralized sitewide copy, GALLERY PAGE.
 * Mirrors content.home.ts's shape/rationale. Copy only, the PHOTOS
 * array (GalleryPhotoGrid.tsx) and TIKTOK_TILES array
 * (GalleryTikTokSection.tsx) stay inline in their components; those are
 * repeatable structured data, not one-off sitewide copy, per the CMS
 * scoping doc's Initiative A boundary.
 */

export const galleryContent = {
  hero: {
    eyebrow: "The Gallery",
    headingBeforeEm: "Moments in ",
    headingEm: "Frame",
    headingAfterEm: "",
    desc: "A window into CultureGlow24, the dishes we cook, the garments we love, and the celebrations we're honored to be part of.",
  },

  photoGrid: {
    eyebrow: "Photos",
    headingBeforeEm: "Food, Fashion & ",
    headingEm: "Festivity",
    headingAfterEm: "",
    desc: "A growing collection of real moments from our kitchen, our fittings, and the events we've catered, more added as they come in.",
  },

  tiktok: {
    eyebrow: "On TikTok",
    headingBeforeEm: "Watch the ",
    headingEm: "Latest",
    headingAfterEm: "",
    desc: "Follow along on TikTok for behind-the-scenes cooking, styling, and everyday moments from CultureGlow24.",
  },
} as const;

export type GalleryContent = typeof galleryContent;


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
    // Describes the subject rather than claiming authorship: the images on
    // this page are currently licensed stock, not our own shoots.
    desc: "The food we cook, the dress we sell, and the celebrations we cater.",
  },

  photoGrid: {
    eyebrow: "Photos",
    headingBeforeEm: "Food, Fashion & ",
    headingEm: "Festivity",
    headingAfterEm: "",
    desc: "Weddings, market booths, and shared tables — moments from CultureGlow24 kitchen and events across London.",
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


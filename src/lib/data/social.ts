/**
 * Social posts (TikTok + Instagram Reels), local fallback from content/social.json.
 * Contentful is preferred when CONTENTFUL_ENABLED=true.
 */
import socialJson from "../../../content/social.json";

export type SocialPlatform = "tiktok" | "reels";

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  title: string;
  url: string;
  caption: string;
  /** ISO date string YYYY-MM-DD */
  addedToSite: string;
  sortOrder: number;
  showOnHome: boolean;
  showOnGallery: boolean;
  /** Optional local or remote image path shown as the tile background */
  thumbnail?: string;
}

type Raw = {
  id: string;
  title: string;
  url: string;
  caption: string;
  addedToSite: string;
  sortOrder: number;
  showOnHome: boolean;
  showOnGallery: boolean;
  thumbnail?: string;
};

function mapRaw(item: Raw, platform: SocialPlatform): SocialPost {
  return {
    id: item.id,
    platform,
    title: item.title,
    url: item.url,
    caption: item.caption,
    addedToSite: item.addedToSite,
    sortOrder: item.sortOrder,
    showOnHome: item.showOnHome,
    showOnGallery: item.showOnGallery,
    thumbnail: item.thumbnail || undefined,
  };
}

export const LOCAL_TIKTOKS: SocialPost[] = (socialJson.tiktoks as Raw[]).map(
  (t) => mapRaw(t, "tiktok")
);

export const LOCAL_REELS: SocialPost[] = (socialJson.reels as Raw[]).map((r) =>
  mapRaw(r, "reels")
);

export function getLocalTiktoks(opts?: {
  homeOnly?: boolean;
  galleryOnly?: boolean;
}): SocialPost[] {
  let list = [...LOCAL_TIKTOKS];
  if (opts?.homeOnly) list = list.filter((p) => p.showOnHome);
  if (opts?.galleryOnly) list = list.filter((p) => p.showOnGallery);
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getLocalReels(opts?: { homeOnly?: boolean }): SocialPost[] {
  let list = [...LOCAL_REELS];
  if (opts?.homeOnly) list = list.filter((p) => p.showOnHome);
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

/** TikTok numeric video id from a share URL, or null. */
export function extractTikTokVideoId(url: string): string | null {
  const m = url.match(/\/video\/(\d+)/);
  return m?.[1] ?? null;
}

/** Instagram shortcode from /reel(s)/CODE/, or null. */
export function extractInstagramShortcode(url: string): string | null {
  const m = url.match(/\/reels?\/([A-Za-z0-9_-]+)/);
  return m?.[1] ?? null;
}

/** Official embed iframe src when we can derive an id; otherwise null. */
export function getEmbedSrc(post: SocialPost): string | null {
  if (post.platform === "tiktok") {
    const id = extractTikTokVideoId(post.url);
    return id ? `https://www.tiktok.com/embed/v2/${id}` : null;
  }
  const code = extractInstagramShortcode(post.url);
  return code ? `https://www.instagram.com/reel/${code}/embed/` : null;
}

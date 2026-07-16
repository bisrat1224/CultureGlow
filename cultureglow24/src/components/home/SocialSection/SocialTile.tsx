import styles from "./SocialSection.module.css";

export type SocialColor = "a" | "b" | "c";
export type SocialPlatform = "tiktok" | "reels";

export interface SocialTileData {
  id: string;
  color: SocialColor;
  platform: SocialPlatform;
  caption: string;
}

interface SocialTileProps {
  tile: SocialTileData;
  revealDelayClass?: string;
}

const COLOR_CLASS: Record<SocialColor, string> = {
  a: styles.socialColorA,
  b: styles.socialColorB,
  c: styles.socialColorC,
};

const PLATFORM_LABEL: Record<SocialPlatform, string> = {
  tiktok: "TikTok",
  reels: "Reels",
};

const PLATFORM_BADGE_CLASS: Record<SocialPlatform, string> = {
  tiktok: styles.socialBadgeTiktok,
  reels: styles.socialBadgeReels,
};

// Matches index.html's <article class="social-tile"> exactly. Per the
// source file's own comment, this is a static placeholder mockup (solid
// color block + play icon + platform badge) standing in for a real
// TikTok oEmbed / Behold.so Instagram embed — the Developer Brief's
// TikTok video URLs and Instagram handle are both still "Pending" on the
// Content Checklist, so there's nothing real to embed yet.
export function SocialTile({ tile, revealDelayClass }: SocialTileProps) {
  const { color, platform, caption } = tile;

  return (
    <article className={`${styles.socialTile} reveal ${revealDelayClass ?? ""}`}>
      <div className={`${styles.socialTileMedia} ${COLOR_CLASS[color]}`}>
        <span className={styles.socialPlay} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className={`${styles.socialBadge} ${PLATFORM_BADGE_CLASS[platform]}`}>
          {PLATFORM_LABEL[platform]}
        </span>
      </div>
      <p className={styles.socialCaption}>{caption}</p>
    </article>
  );
}
import type { SocialPost } from "@/lib/data/social";
import styles from "./SocialSection.module.css";

interface SocialTileProps {
  post: SocialPost;
  revealDelayClass?: string;
  /** True for the duplicated copy used to loop the marquee seamlessly:
   * hides it from screen readers and removes it from tab order so
   * keyboard/AT users only ever encounter each post once. */
  duplicate?: boolean;
}

const PLATFORM_LABEL: Record<SocialPost["platform"], string> = {
  tiktok: "TikTok",
  reels: "Reels",
};

const PLATFORM_BADGE_CLASS: Record<SocialPost["platform"], string> = {
  tiktok: styles.socialBadgeTiktok,
  reels: styles.socialBadgeReels,
};

/** Rotate brand colors so adjacent tiles don’t look identical. */
const COLOR_CYCLE = [
  styles.socialColorA,
  styles.socialColorB,
  styles.socialColorC,
] as const;

function colorForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash + id.charCodeAt(i)) % 3;
  return COLOR_CYCLE[hash];
}

/**
 * Static tile only: gradient (or optional CMS thumbnail) + play affordance.
 * Entire card is a link to the original TikTok / Instagram post.
 * No embed, no autoplay, no motion.
 */
export function SocialTile({
  post,
  revealDelayClass,
  duplicate,
}: SocialTileProps) {
  const { platform, caption, url, title, thumbnail, id } = post;
  const label = PLATFORM_LABEL[platform];
  const openLabel = `Open ${label}: ${title || caption || id}`;

  return (
    <article
      className={`${styles.socialTile} reveal ${revealDelayClass ?? ""}`}
      aria-hidden={duplicate ? true : undefined}
    >
      <a
        href={url}
        className={`${styles.socialTileLink} cg-press-card`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={openLabel}
        tabIndex={duplicate ? -1 : undefined}
      >
        <div
          className={`${styles.socialTileMedia} ${
            thumbnail ? "" : colorForId(id)
          }`}
        >
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt=""
              className={styles.socialThumbImg}
              loading="lazy"
              decoding="async"
            />
          ) : null}

          <span className={styles.socialPlay} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>

          <span
            className={`${styles.socialBadge} ${PLATFORM_BADGE_CLASS[platform]}`}
          >
            {label}
          </span>
        </div>

        {caption ? <p className={styles.socialCaption}>{caption}</p> : null}
      </a>
    </article>
  );
}

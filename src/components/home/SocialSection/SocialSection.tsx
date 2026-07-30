import type { HomeContent } from "@/lib/content/content.home";
import type { SocialPost } from "@/lib/data/social";
import { SocialTile } from "./SocialTile";
import styles from "./SocialSection.module.css";
import shared from "../shared.module.css";

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

interface Props {
  home: HomeContent["social"];
  tiktoks: SocialPost[];
  reels: SocialPost[];
}

export function SocialSection({ home, tiktoks, reels }: Props) {
  const { eyebrow, headingBeforeEm, headingEm, headingAfterEm } = home;

  // Merge both platforms into a single continuous strip. Interleave rather
  // than concatenate so the marquee doesn't show "all tiktok, then all
  // reels" back to back.
  const posts: SocialPost[] = [];
  const max = Math.max(tiktoks.length, reels.length);
  for (let i = 0; i < max; i++) {
    if (tiktoks[i]) posts.push(tiktoks[i]);
    if (reels[i]) posts.push(reels[i]);
  }

  if (posts.length === 0) return null;

  // Duplicate the track so the CSS animation can loop seamlessly from
  // translateX(0) to translateX(-50%). The second copy is marked so it
  // can be hidden from screen readers and tab order.
  const marqueePosts = [
    ...posts.map((post) => ({ post, duplicate: false })),
    ...posts.map((post) => ({ post, duplicate: true })),
  ];

  return (
    <section
      className={styles.socialSection}
      id="social"
      aria-labelledby="social-h2"
    >
      <div className="wrap">
        <div className={`${styles.socialHeader} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2 className={styles.sectionH2Light} id="social-h2">
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
        </div>

        <div className={`${styles.socialMarqueeViewport} reveal`}>
          <div className={styles.socialMarqueeTrack}>
            {marqueePosts.map(({ post, duplicate }, i) => (
              <SocialTile
                key={`${post.id}-${i}`}
                post={post}
                duplicate={duplicate}
                revealDelayClass={REVEAL_DELAYS[i % REVEAL_DELAYS.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

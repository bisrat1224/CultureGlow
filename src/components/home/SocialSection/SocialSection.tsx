import { SocialTile } from "./SocialTile";
import { homeContent } from "@/lib/content/content.home";
import { getTiktokPosts, getInstagramReels } from "@/lib/contentful/queries";
import styles from "./SocialSection.module.css";
import shared from "../shared.module.css";

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export async function SocialSection() {
  const {
    eyebrow,
    headingBeforeEm,
    headingEm,
    headingAfterEm,
    tiktokLabel,
    reelsLabel,
  } = homeContent.social;

  const [tiktoks, reels] = await Promise.all([
    getTiktokPosts({ homeOnly: true }),
    getInstagramReels({ homeOnly: true }),
  ]);

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

        {tiktoks.length > 0 && (
          <div className={`${styles.socialRow} reveal`}>
            <p className={styles.socialRowLabel}>{tiktokLabel}</p>
            <div className={styles.socialGrid}>
              {tiktoks.map((post, i) => (
                <SocialTile
                  key={post.id}
                  post={post}
                  revealDelayClass={REVEAL_DELAYS[i % REVEAL_DELAYS.length]}
                />
              ))}
            </div>
          </div>
        )}

        {reels.length > 0 && (
          <div className={`${styles.socialRow} reveal reveal-delay-2`}>
            <p className={styles.socialRowLabel}>{reelsLabel}</p>
            <div className={styles.socialGrid}>
              {reels.map((post, i) => (
                <SocialTile
                  key={post.id}
                  post={post}
                  revealDelayClass={REVEAL_DELAYS[i % REVEAL_DELAYS.length]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

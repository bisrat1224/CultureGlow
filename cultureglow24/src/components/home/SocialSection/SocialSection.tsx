import SocialTile from "./SocialTile";
import styles from "./SocialSection.module.css";
import shared from "../shared.module.css";

interface SocialSectionProps {
  social: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    tiktok_label: string;
    reels_label: string;
  };
  tiles: any[];
}

export default function SocialSection({ social, tiles }: SocialSectionProps) {
  const tiktokTiles = tiles.filter((t) => t.platform === "tiktok");
  const reelsTiles = tiles.filter((t) => t.platform === "reels");

  return (
    <section
      className={styles.socialSection}
      id="social"
      aria-labelledby="social-h2"
    >
      <div className="wrap">
        <div className={`${styles.socialHeader} reveal`}>
          <p className={shared.sectionEyebrow}>{social.eyebrow}</p>
          <h2 className={styles.sectionH2Light} id="social-h2">
            {social.heading_before_em}
            <em>{social.heading_em}</em>
            {social.heading_after_em}
          </h2>
        </div>

        {tiktokTiles.length > 0 && (
          <div className={`${styles.socialRow} reveal`}>
            <p className={styles.socialRowLabel}>{social.tiktok_label}</p>
            <div className={styles.socialGrid}>
              {tiktokTiles.map((tile, i) => (
                <SocialTile
                  key={tile.id}
                  data={{
                    id: tile.id,
                    platform: tile.platform,
                    color: tile.color,
                    caption: tile.caption,
                  }}
                  revealDelayClass={`reveal-delay-${Math.min(i + 1, 3)}`}
                />
              ))}
            </div>
          </div>
        )}

        {reelsTiles.length > 0 && (
          <div className={`${styles.socialRow} reveal`}>
            <p className={styles.socialRowLabel}>{social.reels_label}</p>
            <div className={styles.socialGrid}>
              {reelsTiles.map((tile, i) => (
                <SocialTile
                  key={tile.id}
                  data={{
                    id: tile.id,
                    platform: tile.platform,
                    color: tile.color,
                    caption: tile.caption,
                  }}
                  revealDelayClass={`reveal-delay-${Math.min(i + 1, 3)}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

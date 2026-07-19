import { SocialTile, type SocialTileData } from "./SocialTile";
import styles from "./SocialSection.module.css";
import shared from "../shared.module.css";


const TIKTOK_TILES: SocialTileData[] = [
  { id: "tiktok-1", color: "a", platform: "tiktok", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod." },
  { id: "tiktok-2", color: "b", platform: "tiktok", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod." },
  { id: "tiktok-3", color: "c", platform: "tiktok", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod." },
];

const REELS_TILES: SocialTileData[] = [
  { id: "reels-1", color: "b", platform: "reels", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod." },
  { id: "reels-2", color: "c", platform: "reels", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod." },
  { id: "reels-3", color: "a", platform: "reels", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod." },
];

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

export function SocialSection() {
  return (
    <section
      className={styles.socialSection}
      id="social"
      aria-labelledby="social-h2"
    >
      <div className="wrap">
        <div className={`${styles.socialHeader} reveal`}>
          <p className={shared.sectionEyebrow}>On Social</p>
          <h2 className={styles.sectionH2Light} id="social-h2">
            Follow the <em>Feed</em>
          </h2>
        </div>

        <div className={`${styles.socialRow} reveal`}>
          <p className={styles.socialRowLabel}>TikTok</p>
          <div className={styles.socialGrid}>
            {TIKTOK_TILES.map((tile, i) => (
              <SocialTile key={tile.id} tile={tile} revealDelayClass={REVEAL_DELAYS[i]} />
            ))}
          </div>
        </div>

        <div className={`${styles.socialRow} reveal reveal-delay-2`}>
          <p className={styles.socialRowLabel}>Reels</p>
          <div className={styles.socialGrid}>
            {REELS_TILES.map((tile, i) => (
              <SocialTile key={tile.id} tile={tile} revealDelayClass={REVEAL_DELAYS[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
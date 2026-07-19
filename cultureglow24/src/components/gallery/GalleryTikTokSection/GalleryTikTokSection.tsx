import styles from "./GalleryTikTokSection.module.css";
import shared from "../shared.module.css";

interface TikTokTile {
  id: string;
  gradientFrom: string;
  caption: string;
}

// 3 placeholder tiles standing in for real TikTok oEmbed integration —
// blocked on the client's video URLs (Open Decision D4). Matches the Kimi
// Agent reference build's GalleryPage exactly: solid play-icon tiles on a
// brand-colored gradient, TikTok badge, one-line caption. Distinct from
// Home's SocialSection (which shows both TikTok + Reels rows) — this is
// TikTok-only, per that reference and per the Developer Brief's Section
// 10 spec ("reuses the D4 TikTok oEmbed approach, placed below the photo
// grid").
const TIKTOK_TILES: TikTokTile[] = [
  { id: "tiktok-1", gradientFrom: "#2D6A4F", caption: "Lorem ipsum dolor sit amet" },
  { id: "tiktok-2", gradientFrom: "#C8973A", caption: "Consectetur adipiscing elit" },
  { id: "tiktok-3", gradientFrom: "#A61C00", caption: "Sed do eiusmod tempor" },
];

export function GalleryTikTokSection() {
  return (
    <section
      className={shared.sectionOnDark}
      id="gallery-tiktok"
      aria-labelledby="tiktok-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>On TikTok</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleDark}`}
            id="tiktok-h2"
          >
            Watch the <em>Latest</em>
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescDark}`}>
            TikTok embeds wire up here once the client supplies video URLs —
            placeholder tiles for now.
          </p>
        </div>

        <div className={`${styles.socialGrid} reveal`}>
          {TIKTOK_TILES.map((tile) => (
            <div className={styles.socialTile} key={tile.id}>
              <div
                className={styles.socialTileThumb}
                style={{
                  background: `linear-gradient(160deg, ${tile.gradientFrom}, #1A1A1A)`,
                }}
              >
                <svg viewBox="0 0 24 24" fill="rgba(250,246,240,0.9)" aria-hidden="true">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                <span className={styles.socialTileBadge}>TikTok</span>
              </div>
              <div className={styles.socialTileMeta}>
                <p>{tile.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

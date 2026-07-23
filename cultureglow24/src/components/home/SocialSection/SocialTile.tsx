import styles from "./SocialSection.module.css";

interface SocialTileData {
  id: string;
  platform: "tiktok" | "reels";
  color: "a" | "b" | "c";
  caption: string;
}

export default function SocialTile({ tile }: { tile: SocialTileData }) {
  return (
    <div className={`${styles.tile} ${styles[`color${tile.color.toUpperCase()}`]}`}>
      <span className={styles.platform}>{tile.platform}</span>
      <p className={styles.caption}>{tile.caption}</p>
    </div>
  );
}
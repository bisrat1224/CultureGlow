import styles from "./SocialSection.module.css";

interface SocialTileData {
  id: string;
  platform: "tiktok" | "reels";
  color: "a" | "b" | "c";
  caption: string;
}

export default function SocialTile({
  data,
  revealDelayClass,
}: {
  data: SocialTileData;
  revealDelayClass?: string;
}) {
  return (
    <div
      className={`${styles.tile} ${styles[`color${data.color.toUpperCase()}`]} reveal ${revealDelayClass ?? ""}`.trim()}
    >
      <span className={styles.platform}>{data.platform}</span>
      <p className={styles.caption}>{data.caption}</p>
    </div>
  );
}

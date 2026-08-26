import styles from "./ParallaxBreak.module.css";

interface ParallaxBreakProps {
  imageSrc: string;
  eyebrow: string;
  heading: string;
}

export function ParallaxBreak({ imageSrc, eyebrow, heading }: ParallaxBreakProps) {
  return (
    <div
      className={styles.parallax}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h3 className={styles.heading}>{heading}</h3>
      </div>
    </div>
  );
}

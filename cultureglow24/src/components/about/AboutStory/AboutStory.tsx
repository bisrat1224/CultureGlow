import Image from "next/image";
import styles from "./AboutStory.module.css";

const ABOUT_STATS = [
  { value: "500+", label: "Orders Delivered" },
  { value: "12+", label: "Menu Items" },
  { value: "100%", label: "Authentic" },
] as const;

export function AboutStory() {
  return (
    <section className={styles.storySection} aria-labelledby="about-story-h2">
      <div className="wrap">
        <div className={styles.storyInner}>
          <div className={`${styles.storyTextCol} reveal`}>
            <p className={styles.storyEyebrow}>Our Story</p>
            <h2 className={styles.storyH2} id="about-story-h2">
              About <em>CultureGlow24</em>
            </h2>
            <p className={styles.storyBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore.
            </p>
            <p className={`${styles.storyAmharic} font-ethiopic`}>
              ባህላችን ኩራታችን ነው — ምግብ፣ ልብስ፣ ሕይወት።
            </p>
            <div className={styles.storyStats}>
              {ABOUT_STATS.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <p className={styles.statNum}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.storyVisual} reveal reveal-delay-2`}>
            <div className={styles.storyImgMainWrap}>
              <Image
                src="/assets/images/pexels-berlinerlights-23858842.jpg"
                alt="Traditional Habesha stews in dark pans"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.storyImgMainEl}
              />
            </div>
            <div className={styles.storyImgAccentWrap}>
              <Image
                src="/assets/images/pexels-dbaler-17486836.jpg"
                alt="Injera platter"
                fill
                sizes="(min-width: 768px) 24vw, 48vw"
                className={styles.storyImgAccentEl}
              />
            </div>
            <span className={styles.storyBadge}>Est. 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}

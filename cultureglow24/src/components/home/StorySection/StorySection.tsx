import Image from "next/image";
import { homeContent } from "@/lib/content/content.home";
import styles from "./StorySection.module.css";

export function StorySection() {
  const { eyebrow, headingBeforeEm, headingEm, headingSecondLine, body, amharic, badge, stats } =
    homeContent.story;

  return (
    <section
      className={styles.storySection}
      id="about"
      aria-labelledby="story-h2"
    >
      <div className="wrap">
        <div className={styles.storyInner}>
          <div className={`${styles.storyTextCol} reveal`}>
            <p className={styles.storyEyebrow}>{eyebrow}</p>
            <h2 className={styles.storyH2} id="story-h2">
              {headingBeforeEm}
              <em>{headingEm}</em>
              <br />
              {headingSecondLine}
            </h2>
            <p className={styles.storyBody}>{body}</p>
            <p className={`${styles.storyAmharic} font-ethiopic`}>{amharic}</p>
            <div className={styles.storyStats}>
              {stats.map((stat) => (
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
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.storyImgMainEl}
              />
            </div>
            <div className={styles.storyImgAccentWrap}>
              <Image
                src="/assets/images/pexels-dbaler-17486836.jpg"
                alt="Injera platter"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 24vw, 48vw"
                className={styles.storyImgAccentEl}
              />
            </div>
            <span className={styles.storyBadge}>{badge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
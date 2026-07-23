import Image from "next/image";
import styles from "./AboutStory.module.css";

interface AboutStoryProps {
  story: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
    body: string;
    amharic: string;
    badge: string;
    stats?: { value: string; label: string }[];
  };
}

export default function AboutStory({ story }: AboutStoryProps) {
  return (
    <section className={styles.aboutStory} id="story" aria-labelledby="about-story-h2">
      <div className="wrap">
        <div className={styles.aboutStoryInner}>
          <div className={`${styles.aboutStoryText} reveal`}>
            <p className={styles.aboutStoryEyebrow}>{story.eyebrow}</p>
            <h2 className={styles.aboutStoryH2} id="about-story-h2">
              {story.heading_before_em}
              <em>{story.heading_em}</em>
              {story.heading_after_em}
            </h2>
            <p className={styles.aboutStoryBody}>{story.body}</p>
            <p className={`${styles.aboutStoryAmharic} font-ethiopic`}>{story.amharic}</p>
            <div className={styles.aboutStoryStats}>
              {story.stats?.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <p className={styles.statNum}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.aboutStoryVisual} reveal reveal-delay-2`}>
            <div className={styles.aboutStoryImgWrap}>
              <Image
                src="/assets/images/stew-pans.jpg"
                alt="Traditional Habesha stews"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.aboutStoryImgEl}
              />
            </div>
            <span className={styles.aboutStoryBadge}>{story.badge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

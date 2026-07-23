import Image from "next/image";
import styles from "./StorySection.module.css";

interface StorySectionProps {
  story: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_second_line: string;
    body: string;
    amharic: string;
    badge: string;
    stats?: { value: string; label: string }[];
    story_image_main?: any;
    story_image_accent?: any;
  };
}

export default function StorySection({ story }: StorySectionProps) {
  return (
    <section
      className={styles.storySection}
      id="about"
      aria-labelledby="story-h2"
    >
      <div className="wrap">
        <div className={styles.storyInner}>
          <div className={`${styles.storyTextCol} reveal`}>
            <p className={styles.storyEyebrow}>{story.eyebrow}</p>
            <h2 className={styles.storyH2} id="story-h2">
              {story.heading_before_em}
              <em>{story.heading_em}</em>
              <br />
              {story.heading_second_line}
            </h2>
            <p className={styles.storyBody}>{story.body}</p>
            <p className={`${styles.storyAmharic} font-ethiopic`}>{story.amharic}</p>
            <div className={styles.storyStats}>
              {story.stats?.map((stat) => (
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
                src={story.story_image_main?.url || "/assets/images/stew-pans.jpg"}
                alt="Traditional Habesha stews in dark pans"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.storyImgMainEl}
              />
            </div>
            <div className={styles.storyImgAccentWrap}>
              <Image
                src={story.story_image_accent?.url || "/assets/images/injera-plate.jpg"}
                alt="Injera platter"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                className={styles.storyImgAccentEl}
              />
            </div>
            <span className={styles.storyBadge}>{story.badge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

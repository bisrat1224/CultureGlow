import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/lib/content/content.home";
import styles from "./StorySection.module.css";

const COLLAGE_IMAGES = [
  {
    src: "/assets/images/menu-items/vegan-beyaynetu.webp",
    alt: "Habesha vegan food platter",
    className: styles.image1,
  },
  {
    src: "/assets/images/menu-items/coffee-pot-and-beans.webp",
    alt: "Traditional Ethiopian coffee pot and beans",
    className: styles.image2,
  },
  {
    src: "/assets/images/gallery/happy-customers-4.webp",
    alt: "Happy customers enjoying traditional food",
    className: styles.image3,
  },
];

export function StorySection() {
  const { eyebrow, headingBeforeEm, headingEm, headingSecondLine, body, stats } =
    homeContent.story;

  const intro = body.split("\n\n")[0];

  return (
    <section
      className={styles.section}
      id="about"
      aria-labelledby="story-h2"
    >
      <div className="wrap">
        <div className={styles.layout}>
          <div className={`${styles.textCol} reveal reveal-left`}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.heading} id="story-h2">
              {headingBeforeEm}
              <em>{headingEm}</em>
              <br />
              {headingSecondLine}
            </h2>
            <p className={styles.body}>{intro}</p>
            <Link href="/about" className={`${styles.link} cg-press`}>
              Read Our Story
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className={`${styles.imageCol} reveal reveal-right reveal-delay-2`}>
            <div className={styles.collage}>
              {COLLAGE_IMAGES.map((img, idx) => (
                <div key={img.src} className={`${styles.imageWrapper} ${img.className}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading={idx === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 900px) 30vw, 80vw"
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip - inspired by Feliciano's counter band */}
        <div className={`${styles.statsStrip} reveal`}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

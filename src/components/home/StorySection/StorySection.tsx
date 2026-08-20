import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/lib/content/content.home";
import styles from "./StorySection.module.css";
import shared from "../shared.module.css";

export function StorySection() {
  const { eyebrow, headingBeforeEm, headingEm, headingSecondLine, body, badge } =
    homeContent.story;

  // Homepage teaser: just the opening paragraph of the real story copy.
  // The full story (all paragraphs, stats, Amharic line) lives on /about.
  const intro = body.split("\n\n")[0];

  return (
    <section
      className={styles.storySection}
      id="about"
      aria-labelledby="story-h2"
    >
      <div className="wrap">
        <div className={styles.storyInner}>
          <div className={`${styles.storyTextCol} reveal reveal-left`}>
            <p className={styles.storyEyebrow}>{eyebrow}</p>
            <h2 className={styles.storyH2} id="story-h2">
              {headingBeforeEm}
              <em>{headingEm}</em>
              <br />
              {headingSecondLine}
            </h2>
            <p className={styles.storyBody}>{intro}</p>
            <Link href="/about" className={`${shared.btnPrimary} cg-press`}>
              Read More
            </Link>
          </div>

          <div className={`${styles.storyVisual} reveal-right reveal-delay-2`}>
            <div className={styles.storyImgMainWrap}>
              <Image
                src="/assets/images/stew-pans.avif"
                alt="Traditional Habesha stews in dark pans"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 42vw, 100vw"
                className={styles.storyImgMainEl}
              />
            </div>
            <div className={styles.storyImgAccentWrap}>
              <Image
                src="/assets/images/coffee-in-traditional-cup.webp"
                alt="Ethiopian coffee in a traditional cup"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 18vw, 40vw"
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

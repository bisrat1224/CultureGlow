import Image from "next/image";
import { aboutContent } from "@/lib/content/content.about";
import styles from "./AboutStory.module.css";

export function AboutStory() {
  const { paragraphs } = aboutContent.story;

  return (
    <section className={styles.storySection} aria-labelledby="about-story-h2">
      <div className="wrap">
        {/* Chapter 01 */}
        <div className={styles.chapterRow}>
          <div className={`${styles.chapterTextCol} reveal`}>
            <p className={styles.chapterPlacard}>Chapter I · Memory and Hearth</p>
            <h2 className={styles.chapterH2} id="about-story-h2">
              Recipes Treasured Across <br />
              <em>Generations</em>
            </h2>
            <div className={styles.chapterBody}>
              <p>{paragraphs[0]}</p>
              <p>{paragraphs[1]}</p>
            </div>
            <div className={styles.milestoneNote}>
              <span className={styles.milestoneYear}>2024</span>
              <p className={styles.milestoneDesc}>
                CultureGlow24 founded on family recipes and communal Habesha hospitality.
              </p>
            </div>
          </div>

          <div className={`${styles.chapterVisual} reveal reveal-delay-2`}>
            <div className={styles.pedestalCard}>
              <div className={styles.imageWrap}>
                <Image
                  src="/assets/images/injera-plate.jpg"
                  alt="Habesha communal injera plate"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className={styles.imageEl}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 02 - Asymmetric Staggered Flow */}
        <div className={`${styles.chapterRow} ${styles.chapterRowInverted}`}>
          <div className={`${styles.chapterVisual} reveal`}>
            <div className={styles.pedestalCard}>
              <div className={styles.imageWrap}>
                <Image
                  src="/assets/images/stew-pans.avif"
                  alt="Habesha stews simmered with authentic berbere spices"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className={styles.imageEl}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.chapterTextCol} reveal reveal-delay-2`}>
            <p className={styles.chapterPlacard}>Chapter II · Landscapes and Flavours</p>
            <h3 className={styles.chapterH2}>
              Devotion in Every <br />
              <em>Handcrafted Ingredient</em>
            </h3>
            <div className={styles.chapterBody}>
              <p>{paragraphs[2]}</p>
              <p>{paragraphs[3]}</p>
              <p>{paragraphs[4]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
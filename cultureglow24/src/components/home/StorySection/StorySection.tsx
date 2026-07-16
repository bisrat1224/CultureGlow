import styles from "./StorySection.module.css";

// Matches index.html's <section class="story-section" id="about"> exactly.
// This is the site-wide nav's "About" anchor target — the Header/MobileNav
// links to this section by scrolling here on Home, while the separate
// /about route (PageStub) remains the future full standalone page per the
// Chunk 3b decision.
const STORY_STATS = [
  { value: "500+", label: "Orders Delivered" },
  { value: "12+", label: "Menu Items" },
  { value: "100%", label: "Authentic" },
] as const;

export function StorySection() {
  return (
    <section
      className={styles.storySection}
      id="about"
      aria-labelledby="story-h2"
    >
      <div className="wrap">
        <div className={styles.storyInner}>
          <div className={`${styles.storyTextCol} reveal`}>
            <p className={styles.storyEyebrow}>Our Story</p>
            <h2 className={styles.storyH2} id="story-h2">
              Where <em>Culture</em>
              <br />
              Meets the Table
            </h2>
            <p className={styles.storyBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`${styles.storyAmharic} font-ethiopic`}>
              ባህላችን ኩራታችን ነው — ምግብ፣ ልብስ፣ ሕይወት።
            </p>
            <div className={styles.storyStats}>
              {STORY_STATS.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <p className={styles.statNum}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.storyVisual} reveal reveal-delay-2`}>
            <img
              src="/assets/images/pexels-berlinerlights-23858842.jpg"
              alt="Traditional Habesha stews in dark pans"
              className={styles.storyImgMain}
            />
            <img
              src="/assets/images/pexels-dbaler-17486836.jpg"
              alt="Injera platter"
              className={styles.storyImgAccent}
            />
            <span className={styles.storyBadge}>Since 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}
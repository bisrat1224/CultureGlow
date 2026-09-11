import { menuContent } from "@/lib/content/content.menu";
import styles from "./MenuIntro.module.css";

export function MenuIntro() {
  const intro = menuContent.intro;
  if (!intro) return null;

  return (
    <section className={styles.section} aria-labelledby="menu-intro-h2">
      <div className="wrap">
        <div className={`${styles.inner} reveal`}>
          <h2 className={styles.heading} id="menu-intro-h2">
            {intro.heading}
          </h2>
          <p className={styles.body}>{intro.body}</p>
        </div>
      </div>
    </section>
  );
}

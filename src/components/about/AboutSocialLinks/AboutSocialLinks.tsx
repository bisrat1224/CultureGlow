import { SOCIAL_LINKS } from "@/lib/constants";
import { aboutContent } from "@/lib/content/content.about";
import styles from "./AboutSocialLinks.module.css";

export function AboutSocialLinks() {
  return (
    <section className={styles.socialLinksSection} aria-labelledby="about-social-h2">
      <div className={`${styles.socialLinksInner} wrap reveal`}>
        <h2 className={styles.socialLinksH2} id="about-social-h2">
          {aboutContent.social.heading}
        </h2>
        <ul className={styles.socialLinksList}>
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
import styles from "./AboutSocialLinks.module.css";
import shared from "../shared.module.css";

interface AboutSocialLinksProps {
  heading: {
    eyebrow: string;
    heading_before_em: string;
    heading_em: string;
    heading_after_em: string;
  };
  socialLinks?: { label: string; href: string }[];
}

export default function AboutSocialLinks({ heading, socialLinks }: AboutSocialLinksProps) {
  return (
    <section className={shared.sectionOnCream} id="social" aria-labelledby="about-social-h2">
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>{heading.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="about-social-h2"
          >
            {heading.heading_before_em}
            <em>{heading.heading_em}</em>
            {heading.heading_after_em}
          </h2>
        </div>

        <div className={styles.socialLinksGrid}>
          {socialLinks?.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialLink} reveal reveal-delay-${Math.min(i + 1, 3)}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

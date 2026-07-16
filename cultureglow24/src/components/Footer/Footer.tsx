import Link from "next/link";
import { NAV_LINKS, buildWhatsAppLink } from "@/lib/constants";
import styles from "./Footer.module.css";

// Sitewide footer — carries the "business info block, social links" pieces
// the Developer Brief calls for on the standalone Contact page (section 2),
// surfaced globally since every page benefits from a way back to WhatsApp,
// the social accounts, and the nav, not just /contact itself. The real
// WhatsApp number, delivery area / hours, and TikTok + Instagram handles
// are all Pending items on the Content Checklist — placeholders below
// follow the same convention as WHATSAPP_NUMBER in constants.ts, swapped
// for real values once the PM delivers them.
const SOCIAL_LINKS = [
  { label: "TikTok", href: "#" },
  { label: "Instagram", href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} wrap`}>
        <div className={styles.footerBrand}>
          <img
            src="/assets/images/lgoo-1783945739982.jpg"
            alt="CultureGlow24"
            className={styles.footerLogo}
          />
          <p className={styles.footerTagline}>
            Ethiopian &amp; Eritrean food, beauty, and lifestyle — ordering
            via WhatsApp only.
          </p>
          <a
            href={buildWhatsAppLink()}
            className={styles.footerWaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            Order
          </a>
        </div>

        <nav className={styles.footerCol} aria-label="Footer navigation">
          <p className={styles.footerColTitle}>Explore</p>
          <ul className={styles.footerLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>Contact</p>
          <ul className={styles.footerLinks}>
            <li>Delivering across Addis Ababa</li>
            <li>hello@cultureglow24.com</li>
            <li>Mon–Sat, 9am–7pm</li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>Follow</p>
          <ul className={styles.footerLinks}>
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {year} CultureGlow24. All rights reserved.</p>
      </div>
    </footer>
  );
}
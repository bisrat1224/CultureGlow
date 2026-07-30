import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_EMAIL, buildWhatsAppLink } from "@/lib/constants";
import styles from "./Footer.module.css";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.18a8.16 8.16 0 0 0 4.76 1.52V7.25a4.85 4.85 0 0 1-1-.56z" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("instagram")) return <InstagramIcon />;
  if (key.includes("tiktok")) return <TikTokIcon />;
  return null;
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} wrap`}>
        <div className={styles.footerBrand}>
          <Image
            src="/assets/images/logo.png"
            alt="CultureGlow24"
            width={160}
            height={40}
            loading="lazy"
            className={styles.footerLogo}
          />
          <p className={styles.footerTagline}>
            Habesha food, beauty, and lifestyle - ordering via WhatsApp only.
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

        <div className={styles.footerMeta}>
          <div className={styles.footerCol}>
            <p className={styles.footerColTitle}>Contact</p>
            <ul className={styles.footerLinks}>
              <li>Delivering across Manchester</li>
              <li>{CONTACT_EMAIL}</li>
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
                    className={styles.footerSocialLink}
                  >
                    <span className={styles.footerSocialIcon}>
                      <SocialIcon label={social.label} />
                    </span>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {year} CultureGlow24. All rights reserved.</p>
      </div>
    </footer>
  );
}

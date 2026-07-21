import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_EMAIL, buildWhatsAppLink } from "@/lib/constants";
import styles from "./Footer.module.css";


export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} wrap`}>
        <div className={styles.footerBrand}>
          <Image
            src="/assets/images/lgoo-1783945739982.jpg"
            alt="CultureGlow24"
            width={160}
            height={40}
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
            <li>{CONTACT_EMAIL}</li>
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
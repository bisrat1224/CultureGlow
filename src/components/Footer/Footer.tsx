import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_EMAIL, buildWhatsAppLink } from "@/lib/constants";
import styles from "./Footer.module.css";

const ADDRESS =
  "156 Battersea High Street Putney high street SW15 1NS, London SW11 3JR, United Kingdom";
const ADDRESS_MAPS_URL =
  "https://www.google.com/maps/place/Cultureglow24/@51.4702081,-0.1720105,17z/data=!3m1!4b1!4m6!3m5!1s0x4876050041cfcabd:0xd52dc7647d223753!8m2!3d51.4702081!4d-0.1720105!16s%2Fg%2F11yzsf9ww8!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D";

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

        {/* Col 1: Brand */}
        <div className={styles.footerBrand}>
          <div className={styles.footerBrandHeader}>
            <Image
              src="/assets/images/logo.png"
              alt="CultureGlow24"
              width={160}
              height={40}
              loading="lazy"
              className={styles.footerLogo}
            />
            <p className={styles.footerBrandName}>Culture Glow</p>
          </div>
          <p className={styles.footerTagline}>
            Where culture meets glow — authentic Habesha food, beauty &amp; lifestyle delivered across London.
          </p>
          <a
            href={buildWhatsAppLink()}
            className={styles.footerWaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="WhatsApp Icon" />
            Order
          </a>
        </div>

        {/* Col 2: Explore (2-column grid) */}
        <nav className={styles.footerExplore} aria-label="Footer navigation">
          <p className={styles.footerColTitle}>Explore</p>
          <ul className={styles.footerExploreLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3: Contact + Address */}
        <div className={styles.footerContact}>
          <p className={styles.footerColTitle}>Contact</p>
          <ul className={styles.footerLinks}>
            <li>Delivering across London</li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
          <p className={`${styles.footerColTitle} ${styles.footerAddressTitle}`}>Address</p>
          <ul className={styles.footerLinks}>
            <li>
              <a
                href={ADDRESS_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerAddressLink}
              >
                {ADDRESS}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Follow */}
        <div className={styles.footerFollow}>
          <p className={styles.footerColTitle}>Follow</p>
          <ul className={`${styles.footerLinks} ${styles.footerSocialList}`}>
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

      <div className={styles.footerBottom}>
        <p>© {year} CULTURE GLOW24. All rights reserved. Designed by <a href="https://www.techallyconsult.com" target="_blank" rel="noopener noreferrer">Techally Consult</a></p>
      </div>
    </footer>
  );
}

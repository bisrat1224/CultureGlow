import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants"; 
import { contactContent } from "@/lib/content/content.contact";
import styles from "./Footer.module.css";

const ADDRESS = "Putney High St, London SW15 1SN";
const ADDRESS_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=51.4613,-0.2159";

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

        {/* Col 1: Brand & Social */}
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.footerBrandHeader}> 
            <Image
              src="/assets/images/logo.png"
              alt="CultureGlow24"
              width={160}
              height={40}
              loading="lazy"
              className={styles.footerLogo}
            />
            <p className={styles.footerBrandName}>Culture Glow</p>
          </Link> 
          <p className={styles.footerTagline}>
            Habesha food, beauty and lifestyle products, delivered across London.
          </p>
          <div className={styles.footerSocials}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.label}`}
                className={styles.footerSocialIconOnly}
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Contact & Location */}
        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>Location & Contact</p>
          <ul className={`${styles.footerLinks} ${styles.footerItemText}`}> 
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
            <li className={styles.footerSpacer} />
            <li>Delivering across London</li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.footerEmail}>{CONTACT_EMAIL}</a>
            </li>
          </ul> 
        </div>

        {/* Col 3: Opening Hours */}
        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>Opening Hours</p>
          <ul className={`${styles.footerLinks} ${styles.footerItemText}`}> 
            {contactContent.hours.schedule.map((item) => (
              <li key={item.days} className={styles.footerHourRow}>
                <span>{item.days}</span>
                <span>{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        

      </div>

      <div className={styles.footerBottom}>
        <div className={`wrap ${styles.footerBottomInner}`}>
          <p>© {year} CULTURE GLOW24. All rights reserved.</p>
          <p>Designed by <a href="https://www.techallyconsult.com" target="_blank" rel="noopener noreferrer">Techally Consult</a></p>
        </div>
      </div>
    </footer>
  );
}
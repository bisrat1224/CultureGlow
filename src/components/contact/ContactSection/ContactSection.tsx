import { MessageCircle, Phone, Mail, Navigation, Clock } from "lucide-react";
import {
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  buildWhatsAppLink,
  UK_PHONE_DISPLAY,
  UK_PHONE_TEL,
  BUSINESS_LAT,
  BUSINESS_LNG,
} from "@/lib/constants";
import { contactContent } from "@/lib/content/content.contact";
import { LocationMap } from "../LocationMap/LocationMap";
import styles from "./ContactSection.module.css";
import shared from "../shared.module.css";

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_LAT},${BUSINESS_LNG}`;

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 0 0 0 6.34-6.34V9.18a8.16 8.16 0 0 0 4.76 1.52V7.25a4.85 4.85 0 0 1-1-.56z" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("instagram")) return <InstagramIcon />;
  if (key.includes("tiktok")) return <TikTokIcon />;
  return null;
}

export function ContactSection() {
  const {
    eyebrow,
    headingBeforeEm,
    headingEm,
    headingAfterEm,
    desc,
    whatsapp,
    phone,
    email,
    social,
    directions,
  } = contactContent.methods;

  const { hours } = contactContent;

  return (
    <section
      className={shared.sectionOnCream}
      id="contact-hub"
      aria-labelledby="contact-h2"
    >
      <div className="wrap">
        <div className={`${shared.sectionHeadCentered} reveal`}>
          <p className={shared.sectionEyebrow}>{eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${shared.sectionTitleLight}`}
            id="contact-h2"
          >
            {headingBeforeEm}
            <em>{headingEm}</em>
            {headingAfterEm}
          </h2>
          <p className={`${shared.sectionDesc} ${shared.sectionDescLight}`}>
            {desc}
          </p>
        </div>

        <LocationMap />

        <div className={styles.methodsGrid}>
          <a
            href={buildWhatsAppLink()}
            className={`${styles.methodCard} cg-press-card`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.methodIcon} aria-hidden="true">
              <MessageCircle size={22} strokeWidth={1.75} />
            </span>
            <span className={styles.methodLabel}>{whatsapp.label}</span>
            <span className={styles.methodValue}>{whatsapp.value}</span>
          </a>

          <a
            href={`tel:${UK_PHONE_TEL}`}
            className={`${styles.methodCard} cg-press-card`}
          >
            <span className={styles.methodIcon} aria-hidden="true">
              <Phone size={22} strokeWidth={1.75} />
            </span>
            <span className={styles.methodLabel}>{phone.label}</span>
            <span className={styles.methodValue}>{UK_PHONE_DISPLAY}</span>
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={`${styles.methodCard} cg-press-card`}
          >
            <span className={styles.methodIcon} aria-hidden="true">
              <Mail size={22} strokeWidth={1.75} />
            </span>
            <span className={styles.methodLabel}>{email.label}</span>
            <span className={styles.methodValue}>{CONTACT_EMAIL}</span>
          </a>

          <a
            href={DIRECTIONS_URL}
            className={`${styles.methodCard} cg-press-card`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.methodIcon} aria-hidden="true">
              <Navigation size={22} strokeWidth={1.75} />
            </span>
            <span className={styles.methodLabel}>{directions.label}</span>
            <span className={styles.methodValue}>{directions.value}</span>
          </a>

          <div className={`${styles.methodCard} ${styles.socialCard}`}>
            <span className={styles.methodLabel}>{social.label}</span>
            <ul className={styles.socialList}>
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={s.label}
                  >
                    <span className={styles.socialIcon}>
                      <SocialIcon label={s.label} />
                    </span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Opening Hours */}
        <div className={styles.hoursWrapper}>
          <div className={styles.hoursCard}>
            <div className={styles.hoursHeader}>
              <span className={styles.methodIcon} aria-hidden="true">
                <Clock size={22} strokeWidth={1.75} />
              </span>
              <div>
                <span className={styles.methodLabel}>{hours.eyebrow}</span>
                <h3 className={styles.hoursHeading}>
                  {hours.headingBeforeEm}
                  <em>{hours.headingEm}</em>
                  {hours.headingAfterEm}
                </h3>
              </div>
            </div>
            <p className={styles.hoursDesc}>{hours.desc}</p>
            <div className={styles.hoursSchedule}>
              {hours.schedule.map((item) => (
                <div key={item.days} className={styles.scheduleRow}>
                  <span className={styles.scheduleDays}>{item.days}</span>
                  <span className={styles.scheduleDots} aria-hidden="true" />
                  <span className={styles.scheduleHours}>{item.hours}</span>
                </div>
              ))}
            </div>
            {hours.note && <p className={styles.hoursNote}>{hours.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./Footer.module.css";

interface FooterProps {
  siteName?: string;
  logo?: any;
  tagline?: string;
  columns?: {
    title: string;
    links?: { label: string; href?: string | null }[];
  }[];
  copyrightText?: string;
  whatsappNumber?: string;
}

export function Footer({
  siteName = "CultureGlow24",
  logo,
  tagline = "Habesha food, beauty, and lifestyle - ordering via WhatsApp only.",
  columns = [],
  copyrightText = "CultureGlow24. All rights reserved.",
  whatsappNumber,
}: FooterProps) {
  const year = new Date().getFullYear();
  const logoSrc = logo?.url || "/assets/images/logo.png";

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} wrap`}>
        <div className={styles.footerBrand}>
          <Image
            src={logoSrc}
            alt={siteName}
            width={160}
            height={40}
            loading="lazy"
            className={styles.footerLogo}
          />
          <p className={styles.footerTagline}>{tagline}</p>
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

        {columns.map((col, i) => (
          <nav key={i} className={styles.footerCol} aria-label={`${col.title} navigation`}>
            <p className={styles.footerColTitle}>{col.title}</p>
            <ul className={styles.footerLinks}>
              {col.links?.map((link, j) => (
                <li key={j}>
                  {link.href ? (
                    <Link href={link.href}>{link.label}</Link>
                  ) : (
                    <span>{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <p>© {year} {copyrightText}</p>
      </div>
    </footer>
  );
}

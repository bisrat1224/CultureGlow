"use client";

import { NAV_LINKS, buildWhatsAppLink } from "@/lib/constants";
import { useScrolledHeader } from "@/hooks/useScrolledHeader";
import { useMobileNav } from "@/hooks/useMobileNav";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export function Header() {
  const scrolled = useScrolledHeader();
  const { isOpen, open, close } = useMobileNav();

  return (
    <>
      <header
        className={`${styles.siteHeader} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.headerLogo}>
          <a href="#top">
            <img
              src="/assets/images/lgoo-1783945739982.jpg"
              alt="CultureGlow24"
            />
          </a>
        </div>

        <nav aria-label="Main navigation">
          <ul className={styles.headerNav}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerRight}>
          <a
            href={buildWhatsAppLink()}
            className={styles.btnWaHeader}
            aria-label="Order via WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="" />
            Order
          </a>
          <button
            type="button"
            className={styles.hamburger}
            aria-label="Open menu"
            aria-expanded={isOpen}
            onClick={open}
          >
            ☰
          </button>
        </div>
      </header>

      <MobileNav isOpen={isOpen} onClose={close} links={NAV_LINKS} />
    </>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, buildWhatsAppLink } from "@/lib/constants";
import { useScrolledHeader } from "@/hooks/useScrolledHeader";
import { useMobileNav } from "@/hooks/useMobileNav";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export function Header({ etsyUrl }: { etsyUrl?: string }) {
  const scrolled = useScrolledHeader();
  const { isOpen, open, close } = useMobileNav();
  const pathname = usePathname();

  const links = NAV_LINKS.map(link => 
    link.label === "Etsy" && etsyUrl ? { ...link, href: etsyUrl } : link
  );

  return (
    <>
      <header
        className={`${styles.siteHeader} ${scrolled ? styles.scrolled : ""} cg-scroll-edge`}
      >
        <div className={styles.headerLogo}>
          <a href="/">
            <Image
              src="/assets/images/logo.png"
              alt="CultureGlow24"
              priority
              width={48}
              height={48}
            />
            <span className={styles.logoName}>Culture Glow</span>
          </a>
        </div>

        <nav aria-label="Main navigation">
          <ul className={styles.headerNav}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={pathname === link.href ? styles.active : ""}
                  aria-current={
                    !link.external && pathname === link.href ? "page" : undefined
                  }
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerRight}>
          <a
            href={buildWhatsAppLink()}
            className={`${styles.btnWaHeader} cg-press`}
            aria-label="Order via WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/img_whatsappicon.svg" alt="WhatsApp Icon" />
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

      <MobileNav isOpen={isOpen} onClose={close} links={links} />
    </>
  );
}

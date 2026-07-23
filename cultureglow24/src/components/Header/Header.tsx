"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/constants";
import { useScrolledHeader } from "@/hooks/useScrolledHeader";
import { useMobileNav } from "@/hooks/useMobileNav";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

interface HeaderProps {
  logo?: any;
  navLinks?: { label: string; href: string; sort_order?: number }[];
  whatsappNumber?: string;
}

export function Header({ logo, navLinks, whatsappNumber }: HeaderProps) {
  const scrolled = useScrolledHeader();
  const { isOpen, open, close } = useMobileNav();
  const pathname = usePathname();

  const links = navLinks
    ?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((l) => ({ href: l.href, label: l.label })) || [];

  const logoSrc = logo?.url || "/assets/images/logo.png";

  return (
    <>
      <header
        className={`${styles.siteHeader} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.headerLogo}>
          <Link href="/">
            <Image
              src={logoSrc}
              alt="CultureGlow24"
              loading="lazy"
              width={48}
              height={48}
            />
          </Link>
        </div>

        <nav aria-label="Main navigation">
          <ul className={styles.headerNav}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? styles.active : ""}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
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

      <MobileNav isOpen={isOpen} onClose={close} links={links} />
    </>
  );
}

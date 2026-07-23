"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./MobileNav.module.css";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className={styles.mobileNavOverlay} onClick={onClose}>
      <div className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.mobileNavClose}
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>

        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavLinks}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? styles.active : ""}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={buildWhatsAppLink()}
          className={styles.mobileNavWaBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/images/img_whatsappicon.svg" alt="" />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}

"use client";

import type { NavLink } from "@/lib/constants";
import styles from "./MobileNav.module.css";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  return (
    <div
      className={`${styles.mobileNav} ${isOpen ? styles.open : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className={styles.mobileNavClose}
        aria-label="Close menu"
        onClick={onClose}
      >
        ✕
      </button>

      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={onClose}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
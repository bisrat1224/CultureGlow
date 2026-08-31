"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/constants";
import { useEffect, useRef } from "react";
import styles from "./MobileNav.module.css";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when menu opens
    closeBtnRef.current?.focus();

    // Trap focus and handle Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = navRef.current?.querySelectorAll<HTMLElement>(
        "a, button"
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Deliberately not unmounted when closed: an element that disappears from
  // the tree cannot animate out, which is why this used to be a hard cut.
  // `inert` keeps it out of the tab order and the accessibility tree while
  // it is closed, so keeping it mounted costs nothing.
  return (
    <div
      ref={navRef}
      className={`${styles.mobileNav} ${isOpen ? styles.open : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      inert={!isOpen}
    >
      <button
        ref={closeBtnRef}
        type="button"
        className={styles.mobileNavClose}
        aria-label="Close menu"
        onClick={onClose}
      >
        ✕
      </button>

      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={isActive ? styles.active : undefined}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/data/menu";
import styles from "./CategoryNav.module.css";

export function CategoryNav() {
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = CATEGORIES.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.categoryNav} aria-label="Menu categories">
      <div className="wrap">
        <div className={styles.categoryNavScroll} ref={navRef}>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`${styles.categoryNavBtn} ${
                activeId === cat.id ? styles.categoryNavBtnActive : ""
              }`}
            >
              {cat.navLabel}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

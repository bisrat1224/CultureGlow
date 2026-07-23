"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CategoryNav.module.css";

interface CategoryNavProps {
  categories: any[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.slug || "");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.slug))
      .filter((el): el is HTMLElement => el !== null);
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
  }, [categories]);

  return (
    <nav className={styles.categoryNav} aria-label="Menu categories">
      <div className="wrap">
        <div className={styles.categoryNavScroll} ref={navRef}>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.slug}`}
              className={`${styles.categoryNavBtn} ${
                activeId === cat.slug ? styles.categoryNavBtnActive : ""
              }`}
            >
              {cat.nav_label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

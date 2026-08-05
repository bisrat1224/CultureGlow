"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, type CategoryMeta } from "@/lib/data/menu";
import styles from "./CategoryNav.module.css";

interface CategoryNavProps {
  categories?: CategoryMeta[];
}

export function CategoryNav({ categories = CATEGORIES }: CategoryNavProps) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
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
    <nav className={`${styles.categoryNav} cg-scroll-edge`} aria-label="Menu categories">
      <div className="wrap">
        <div className={`${styles.categoryNavScroll} cg-hscroll`} ref={navRef}>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`${styles.categoryNavBtn} ${
                activeId === cat.id ? styles.categoryNavBtnActive : ""
              } cg-press`}
            >
              {cat.navLabel}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

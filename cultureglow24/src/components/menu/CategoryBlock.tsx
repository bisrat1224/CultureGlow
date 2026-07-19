import type { ReactNode } from "react";
import styles from "./CategoryBlock.module.css";

interface CategoryBlockProps {
  id: string;
  eyebrow: string;
  titleBeforeEm: string;
  titleEm: string;
  countLabel: string;
  variant: "cream" | "dark";
  children: ReactNode;
}

export function CategoryBlock({
  id,
  eyebrow,
  titleBeforeEm,
  titleEm,
  countLabel,
  variant,
  children,
}: CategoryBlockProps) {
  return (
    <section
      className={`${styles.categoryBlock} ${
        variant === "dark" ? styles.onDark : styles.onCream
      }`}
      id={id}
    >
      <div className="wrap">
        <div className={styles.categoryHead}>
          <div>
            <p className={styles.categoryEyebrow}>{eyebrow}</p>
            <h2
              className={`${styles.categoryTitle} ${
                variant === "dark" ? styles.onDarkTitle : styles.onLightTitle
              }`}
            >
              {titleBeforeEm}
              <em>{titleEm}</em>
            </h2>
          </div>
          <span
            className={`${styles.categoryCount} ${
              variant === "dark" ? styles.onDarkCount : ""
            }`}
          >
            {countLabel}
          </span>
        </div>

        {children}
      </div>
    </section>
  );
}

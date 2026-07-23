import styles from "./CategoryBlock.module.css";
import shared from "./shared.module.css";

interface CategoryBlockProps {
  category: {
    id: string;
    slug: string;
    eyebrow: string;
    title_before_em: string;
    title_em: string;
    variant: string;
    count_label: string;
  };
  children: React.ReactNode;
}

export default function CategoryBlock({ category, children }: CategoryBlockProps) {
  const isDark = category.variant === "dark";

  return (
    <section
      className={isDark ? shared.sectionOnDark : shared.sectionOnCream}
      id={category.slug}
      aria-labelledby={`${category.slug}-h2`}
    >
      <div className="wrap">
        <div className={`${shared.sectionHead} reveal`}>
          <p className={shared.sectionEyebrow}>{category.eyebrow}</p>
          <h2
            className={`${shared.sectionTitle} ${
              isDark ? shared.sectionTitleDark : shared.sectionTitleLight
            }`}
            id={`${category.slug}-h2`}
          >
            {category.title_before_em}
            <em>{category.title_em}</em>
          </h2>
          <p className={styles.categoryCount}>{category.count_label}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

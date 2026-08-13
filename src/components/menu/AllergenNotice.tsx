import styles from "./AllergenNotice.module.css";

export function AllergenNotice() {
  return (
    <section className={styles.allergenNotice}>
      <div className={`wrap ${styles.allergenNoticeInner}`}>
        <svg
          className={styles.allergenIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="13" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className={styles.allergenText}>
          <strong>Allergen Information:</strong> If you have any concerns about allergens,
          please speak to a member of our team who will be happy to provide detailed
          information about our dishes.
        </p>
      </div>
    </section>
  );
}

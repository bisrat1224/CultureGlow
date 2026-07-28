import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
}

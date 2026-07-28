import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <h2 className={styles.notFoundCode}>404</h2>
        <p className={styles.notFoundDesc}>This page could not be found.</p>
        <Link href="/" className={styles.notFoundLink}>
          Go home
        </Link>
      </div>
    </div>
  );
}

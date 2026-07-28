"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>Something went wrong</h2>
        <p className={styles.errorDesc}>
          We apologize for the inconvenience. Please try again.
        </p>
        <button onClick={reset} className={styles.errorBtn}>
          Try again
        </button>
      </div>
    </div>
  );
}

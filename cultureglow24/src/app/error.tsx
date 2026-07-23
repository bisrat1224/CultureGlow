"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="error-container">
      <div className="wrap">
        <h1 className="error-title">Something went wrong</h1>
        <p className="error-message">
          We&apos;re having trouble loading this page. This might be a temporary issue.
        </p>
        <button onClick={reset} className="error-button">
          Try again
        </button>
      </div>
    </div>
  );
}

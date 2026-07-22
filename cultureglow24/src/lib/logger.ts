/**
 * Structured logger for API routes.
 * In development: logs to console.
 * In production: silent (replace with Sentry/Datadog/etc. when ready).
 */
export const logger = {
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(message, error);
    }
    // TODO: Send to error tracking service (Sentry, etc.)
  },
  info: (message: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.info(message, meta);
    }
  },
};
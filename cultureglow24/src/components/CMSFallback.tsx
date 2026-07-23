import { ErrorBoundary } from "./ErrorBoundary";

interface CMSFallbackProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function CMSFallback({ children, fallback }: CMSFallbackProps) {
  return (
    <ErrorBoundary fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}

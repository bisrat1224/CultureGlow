"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Renders nothing — exists purely to call useScrollReveal() from a Client
 * Component, since layout.tsx itself stays a Server Component (it exports
 * `metadata`, which Client Components can't do). Mounted once in
 * layout.tsx's <body>, so every route (Home + all stub pages) gets the
 * same scroll-reveal behavior without each page wiring it up separately.
 */
export function ScrollRevealInit() {
  useScrollReveal();
  return null;
}
"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past `threshold` pixels.
 * Used by Header to switch on its solid/blurred background
 * (matches index.html's .site-header.scrolled behavior).
 */
export function useScrolledHeader(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
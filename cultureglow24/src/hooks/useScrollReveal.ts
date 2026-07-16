"use client";

import { useEffect } from "react";

/**
 * Arms the CSS scroll-reveal system defined in globals.css
 * (.reveal / .js-armed / .reveal.visible) and observes every .reveal
 * element currently in the DOM, adding .visible once it scrolls into view.
 *
 * Without this hook, .reveal elements stay permanently hidden — the CSS
 * itself only hides them once .js-armed is present on <html>, and only
 * JS can add that class + toggle .visible per-element. This was missing
 * since Chunk 2 introduced the CSS; every section's `reveal` classNames
 * (Hero, StorySection, ProductsSection, etc.) have had nothing driving
 * them until now.
 *
 * Mounted once, sitewide, via ScrollRevealInit in layout.tsx — so it
 * covers Home and every stub page without each page having to opt in.
 */
export function useScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js-armed");

    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (elements.length === 0) return;

    // Respect reduced-motion preference: reveal everything immediately
    // instead of animating, rather than leaving it invisible if a user
    // has motion reduction on and no observer callback ever fires early.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
"use client";

import { useEffect } from "react";


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
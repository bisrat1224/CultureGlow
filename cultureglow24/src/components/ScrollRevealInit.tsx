"use client";

import { useEffect } from "react";

export function ScrollRevealInit() {
  useEffect(() => {
    document.documentElement.classList.add("js-armed");

    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));

    // SAFETY NET: if IO never fires (hydration race), reveal everything after 2s
    const timer = setTimeout(() => {
      reveals.forEach((el) => el.classList.add("visible"));
    }, 2000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
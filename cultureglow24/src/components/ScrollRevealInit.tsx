"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.visible)")
        .forEach((el) => observer.observe(el));
    };

    // Initial render
    observeAll();

    // Allow Next.js client-side navigation content to mount first
    const timer = setTimeout(() => {
      const mutationObserver = new MutationObserver(() => {
        observeAll();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => mutationObserver.disconnect();
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
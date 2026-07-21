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
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = () => {
      const reveals = document.querySelectorAll<HTMLElement>(".reveal:not(.visible)");
      reveals.forEach((el) => observer.observe(el));
    };

    // Scan whatever this route's content mounted with
    observeAll();

    // SAFETY NET: if IO never fires (hydration race), reveal everything after 2s
    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) =>
        el.classList.add("visible")
      );
    }, 2000);

    // CATCH-ALL: re-scan if content mounts after the initial pass
    // (e.g. client-rendered sections added post-hydration)
    const mutationObserver = new MutationObserver(() => observeAll());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
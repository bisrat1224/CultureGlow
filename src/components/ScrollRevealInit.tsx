"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const REVEAL_SELECTOR =
      ".reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)";

    const revealEl = (el: Element) => {
      el.classList.add("visible");
    };

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(revealEl);
    };

    // Prefer-reduced-motion: never hide anything.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.remove("js-armed");
      revealAll();
      const raf = requestAnimationFrame(revealAll);
      return () => cancelAnimationFrame(raf);
    }

    document.documentElement.classList.add("js-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealEl(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        // Slightly more generous bottom margin so near-viewport elements
        // still trigger on soft navigations where layout may still settle.
        rootMargin: "0px 0px -20px 0px",
      }
    );

    /** Force-visible for elements already inside the viewport. */
    const revealAlreadyInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Any vertical overlap with the viewport counts as "in view".
        const inView = rect.bottom > 0 && rect.top < vh;
        if (inView) {
          revealEl(el);
          observer.unobserve(el);
        }
      });
    };

    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((el) => observer.observe(el));
      // Immediately promote anything already visible so soft-nav content
      // does not stay hidden waiting for a scroll event that never comes.
      revealAlreadyInView();
    };

    // First pass (may be empty if RSC content has not committed yet).
    observeAll();

    // MutationObserver starts immediately so we catch content as soon as
    // Next.js inserts the new page nodes.
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Extra sweeps to catch content that arrives a few frames later
    // (common with streaming RSC + soft navigation).
    const raf1 = requestAnimationFrame(() => {
      observeAll();
      const raf2 = requestAnimationFrame(observeAll);
      // Keep a reference so we can cancel on cleanup.
      (window as any).__scrollRevealRaf2 = raf2;
    });

    const timeoutId = window.setTimeout(() => {
      observeAll();
    }, 1500);

    return () => {
      cancelAnimationFrame(raf1);
      if ((window as any).__scrollRevealRaf2) {
        cancelAnimationFrame((window as any).__scrollRevealRaf2);
        delete (window as any).__scrollRevealRaf2;
      }
      clearTimeout(timeoutId);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
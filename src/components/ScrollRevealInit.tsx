"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const REVEAL_SELECTOR =
      ".reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)";

    const revealAll = () =>
      document
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((el) => el.classList.add("visible"));

    // Reduced motion: show everything outright and never arm the hidden
    // state. Checked before .js-armed is added, since arming first and
    // revealing after would flash the whole page.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Disarm as well as skip arming: if the preference was switched on
      // mid-session the class is already on <html>, and leaving it there
      // would keep every un-revealed element at opacity 0 for good.
      document.documentElement.classList.remove("js-armed");
      revealAll();
      // Route content can commit after this effect, so sweep once more on
      // the next frame to catch anything that mounted late.
      const raf = requestAnimationFrame(revealAll);
      return () => cancelAnimationFrame(raf);
    }

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
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((el) => observer.observe(el));
    };

    // Initial render
    observeAll();

    // Allow Next.js client-side navigation content to mount first. Held in
    // a variable rather than returned from the setTimeout callback, whose
    // return value is discarded - that leaked one observer per navigation.
    let mutationObserver: MutationObserver | undefined;
    const timer = setTimeout(() => {
      mutationObserver = new MutationObserver(observeAll);
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      mutationObserver?.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  className?: string;
}

function parse(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export function StatCounter({ value, className }: Props) {
  const { num, suffix } = parse(value);
  const [display, setDisplay] = useState(num);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();

        const duration = 1200;
        const start = performance.now();
        const isFloat = num % 1 !== 0;

        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * num;
          setDisplay(isFloat ? parseFloat(current.toFixed(1)) : Math.round(current));
          if (progress < 1) requestAnimationFrame(tick);
        }

        setDisplay(0);
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

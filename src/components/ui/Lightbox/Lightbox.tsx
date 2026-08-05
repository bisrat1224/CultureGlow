"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSwipeDismiss } from "@/hooks/useSwipeDismiss";
import styles from "./Lightbox.module.css";

export interface LightboxItem {
  src: string;
  alt: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  /**
   * Bounding rect of the thumbnail that opened this, so the image can scale
   * out of it rather than out of the centre of the screen.
   */
  originRect?: DOMRect | null;
}

export function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  originRect,
}: LightboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  // Captured on mount so focus can return where it came from on close.
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const item = items[index];
  const multiple = items.length > 1;

  const { bind, offset, isDragging } = useSwipeDismiss({
    onDismiss: onClose,
    onNext,
    onPrev,
  });

  useEffect(() => {
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key !== "Tab") return;

      // aria-modal alone does not stop Tab reaching the page behind, and a
      // dialog you can tab out of is one you can get lost behind.
      const focusable = rootRef.current?.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const restore = restoreFocusTo.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restore?.focus();
    };
  }, [onClose, onPrev, onNext]);

  const stop = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  // Percentage position of the source thumbnail, so the image reads as
  // growing out of the tile that was tapped.
  const originStyle =
    originRect && typeof window !== "undefined"
      ? ({
          "--cg-origin-x": `${
            ((originRect.left + originRect.width / 2) / window.innerWidth) * 100
          }%`,
          "--cg-origin-y": `${
            ((originRect.top + originRect.height / 2) / window.innerHeight) * 100
          }%`,
        } as React.CSSProperties)
      : undefined;

  return (
    <div
      ref={rootRef}
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${item.alt}`}
      onClick={onClose}
    >
      {/* Two layers on purpose. The outer one is owned by CSS and runs the
          scale-from-origin entrance; the inner one carries the drag offset.
          Sharing one element would mean the inline drag transform silently
          overrides the entrance transform, and the scale would never run. */}
      <div className={styles.figure} style={originStyle} onClick={stop}>
        <div
          {...bind}
          style={{
            ...bind.style,
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            // Dragging toward dismissal fades the layer, so the gesture
            // telegraphs its outcome before you commit to it.
            opacity: offset.y > 0 ? Math.max(1 - offset.y / 400, 0.3) : 1,
          }}
          className={`${styles.dragLayer} ${isDragging ? styles.dragging : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt}
            className={styles.lightboxImg}
            decoding="async"
            draggable={false}
          />
        </div>
      </div>

      <button
        ref={closeBtnRef}
        type="button"
        className={`${styles.lightboxClose} cg-press`}
        aria-label="Close"
        onClick={onClose}
      >
        ✕
      </button>

      {multiple && (
        <>
          <button
            type="button"
            className={`${styles.lightboxPrev} cg-press`}
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.lightboxNext} cg-press`}
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            ›
          </button>
          <p className={styles.lightboxCount}>
            {index + 1} / {items.length}
          </p>
          <p className={styles.hint} aria-hidden="true">
            Swipe to browse, pull down to close
          </p>
        </>
      )}
    </div>
  );
}

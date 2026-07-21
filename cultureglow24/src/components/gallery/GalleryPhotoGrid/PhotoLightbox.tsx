"use client";

import { useEffect } from "react";
import styles from "./PhotoLightbox.module.css";
import type { GalleryPhoto } from "./GalleryPhotoGrid";

interface PhotoLightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

// Hand-rolled rather than a lightbox dependency (the Developer Brief's
// Section 10 recommendation was "a small dependency, e.g.
// yet-another-react-lightbox, over hand-rolling one" - but package.json
// doesn't have one installed yet, and this behavior (Esc/←/→, click-outside
// to close, prev/next buttons, counter) is a direct, working port of the
// Kimi Agent reference build's own hand-rolled Lightbox, so there's no
// real gap to fill by adding a dependency here. Flagged as a deviation
// from the Brief's suggestion, not an oversight.
export function PhotoLightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: PhotoLightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const photo = photos[index];

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.alt}`}
      onClick={onClose}
    >
      {/* decoding="async" added — offloads full-res decode from the main
          thread so the open animation doesn't stutter. Not switched to
          next/image: this is a raw <img> by design (see comment above),
          and fill/Image needs a sized relative wrapper this modal doesn't
          have. */}
      <img
        src={photo.image}
        alt={photo.alt}
        className={styles.lightboxImg}
        decoding="async"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className={styles.lightboxClose}
        aria-label="Close"
        onClick={onClose}
      >
        ✕
      </button>
      <button
        className={styles.lightboxPrev}
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        ‹
      </button>
      <button
        className={styles.lightboxNext}
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        ›
      </button>
      <p className={styles.lightboxCount}>
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
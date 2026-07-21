"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

// Thumbnail strip + main image, with click-to-enlarge full-screen view.
// Mirrors the interaction model already established by Gallery's
// PhotoLightbox.tsx (Esc/←/→, click-outside to close) rather than
// introducing a new pattern or a carousel dependency, per Section 7's
// "match the pattern the section most resembles" convention.
export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % images.length);
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, images.length]);

  return (
    <div className={styles.gallery}>
      <button
        type="button"
        className={styles.mainImageWrap}
        onClick={() => setLightboxOpen(true)}
        aria-label="Open full-size image"
      >
        {/* priority + loading="lazy" were set together here, which is a
            contradiction Next.js can't resolve consistently — priority
            is meant to eager-load this LCP-candidate image ahead of
            everything else on the product page, so the lazy flag is
            dropped rather than the priority flag. */}
        <Image
          src={images[activeIndex]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </button>

      {images.length > 1 && (
        <div className={styles.thumbRow} role="group" aria-label="Product photos">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              className={`${styles.thumbBtn} ${
                i === activeIndex ? styles.thumbBtnActive : ""
              }`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1}`}
              aria-pressed={i === activeIndex}
            >
              <Image src={img} alt="" fill sizes="80px" style={{ objectFit: "cover" }} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${alt}`}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Raw <img>, not next/image, matching the pattern set by
              Gallery's PhotoLightbox.tsx (see that file's note for why).
              decoding="async" keeps the full-res decode off the main
              thread so opening the lightbox doesn't stutter the click. */}
          <img
            src={images[activeIndex]}
            alt={alt}
            className={styles.lightboxImg}
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={styles.lightboxClose}
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                className={styles.lightboxPrev}
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i - 1 + images.length) % images.length);
                }}
              >
                ‹
              </button>
              <button
                className={styles.lightboxNext}
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i + 1) % images.length);
                }}
              >
                ›
              </button>
              <p className={styles.lightboxCount}>
                {activeIndex + 1} / {images.length}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
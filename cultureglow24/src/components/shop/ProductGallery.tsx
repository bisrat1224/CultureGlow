"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProductGallery.module.css";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className={styles.gallery}>
      <button
        type="button"
        className={styles.mainImageWrap}
        onClick={() => setLightboxOpen(true)}
        aria-label={`View larger image of ${alt}`}
      >
        <Image src={images[activeIndex]} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" />
      </button>

      {images.length > 1 && (
        <div className={styles.thumbRow}>
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              className={`${styles.thumbBtn} ${i === activeIndex ? styles.thumbBtnActive : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1} of ${alt}`}
              aria-pressed={i === activeIndex}
            >
              <Image src={image} alt="" fill sizes="80px" />
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
                  prev();
                }}
              >
                ‹
              </button>
              <button
                className={styles.lightboxNext}
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
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

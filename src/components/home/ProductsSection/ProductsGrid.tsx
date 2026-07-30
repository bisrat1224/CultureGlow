"use client";
import { useState } from "react";
import { SHOP_FILTERS } from "@/lib/data/products";
import type { Product } from "./ProductCard";
import { ProductCard } from "./ProductCard";
import styles from "./ProductsGrid.module.css";

const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

export function ProductsGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState("all");
  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Product category filter">
        {SHOP_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            role="tab"
            aria-selected={active === value}
            className={`${styles.tab} ${active === value ? styles.tabActive : ""}`}
            onClick={() => setActive(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.bentoGrid}>
        {filtered.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            revealDelayClass={REVEAL_DELAYS[i % REVEAL_DELAYS.length]}
          />
        ))}
      </div>
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, SHOP_FILTERS, type ProductCategory } from "@/lib/data/products";
import { ShopProductCard } from "./ShopProductCard";
import styles from "./ShopFilterBar.module.css";


export function ShopFilterBar() {
  const [activeFilter, setActiveFilter] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <>
      <section className={styles.filterBar}>
        <div
          className={styles.filterScroll}
          role="group"
          aria-label="Filter products by category"
        >
          {SHOP_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`${styles.filterBtn} ${
                activeFilter === filter.value ? styles.filterBtnActive : ""
              }`}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.productsSection}>
        <div className={styles.productsHeader}>
          <p className={styles.sectionLabel}>Our Products</p>
          <h2 className={styles.sectionTitle}>Lorem ipsum dolor sit amet</h2>
        </div>

        <div className={styles.productsGrid}>
          {filtered.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

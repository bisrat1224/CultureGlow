"use client";

import { useMemo, useState } from "react";
import {
  SHOP_FILTERS,
  type ProductCategory,
} from "@/lib/data/products";
import type { Product } from "@/components/home/ProductsSection/ProductCard";
import { shopContent } from "@/lib/content/content.shop";
import { ShopProductCard } from "./ShopProductCard";
import styles from "./ShopFilterBar.module.css";

interface ShopFilterBarProps {
  products: Product[];
  label?: string;
  title?: string;
}

export function ShopFilterBar({
  products,
  label = shopContent.productsSection.label,
  title = shopContent.productsSection.title,
}: ShopFilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<ProductCategory | "all">(
    "all"
  );

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? products
        : products.filter((p) => p.category === activeFilter),
    [activeFilter, products]
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
          <p className={styles.sectionLabel}>{label}</p>
          <h2 className={styles.sectionTitle}>{title}</h2>
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

"use client";

import { useMemo, useState } from "react";
import ShopProductCard from "./ShopProductCard";

const SHOP_FILTERS = [
  { value: "all", label: "All" },
  { value: "HABESHA FOOD", label: "Habesha Food" },
  { value: "LIFESTYLE", label: "Lifestyle" },
  { value: "BEAUTY", label: "Beauty" },
];

interface ShopFilterBarProps {
  productsSection: {
    label: string;
    title: string;
  };
  products: any[];
}

export default function ShopFilterBar({ productsSection, products }: ShopFilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? products
        : products.filter((p) => p.category === activeFilter),
    [activeFilter, products]
  );

  return (
    <>
      <section className="filter-bar">
        <div className="filter-scroll" role="group" aria-label="Filter products by category">
          {SHOP_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`filter-btn ${activeFilter === filter.value ? "filter-btn-active" : ""}`}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="products-header">
          <p className="section-label">{productsSection.label}</p>
          <h2 className="section-title">{productsSection.title}</h2>
        </div>

        <div className="products-grid">
          {filtered.map((product) => (
            <ShopProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: typeof product.image === "string" ? product.image : product.image?.url,
                alt: product.alt || product.name,
                badge: product.badge || undefined,
                category: product.category,
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}

import ShopProductCard from "./ShopProductCard";
import styles from "./ProductGallery.module.css";

interface ProductsHeading {
  label: string;
  title: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  description: string;
  image?: { url?: string } | null;
  badge?: string | null;
}

export default function ProductGallery({
  heading,
  products,
}: {
  heading: ProductsHeading;
  products: Product[];
}) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>{heading.label}</span>
        <h2 className={styles.title}>{heading.title}</h2>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
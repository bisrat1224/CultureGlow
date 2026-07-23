import Image from "next/image";
import Link from "next/link";
import styles from "./ShopProductCard.module.css";

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

export default function ShopProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.image?.url ? (
          <Image
            src={product.image.url}
            alt={product.name}
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
      </div>
      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{product.price}</p>
      </div>
    </Link>
  );
}
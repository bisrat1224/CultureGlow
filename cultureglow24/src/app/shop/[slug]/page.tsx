import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { buildWhatsAppLink } from "@/lib/constants";
import {
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/data/products";
import styles from "./page.module.css";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Pre-renders a static page per product at build time — all 8 products
// are known ahead of time from lib/data/products.ts, consistent with the
// "still static/hardcoded — no CMS or database needed at this scope" note
// in the Developer Brief's Section 10 Shop spec.
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | CultureGlow24" };
  }

  return {
    title: `${product.name} | CultureGlow24 Shop`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);
  const galleryImages = product.gallery?.length ? product.gallery : [product.image];

  return (
    <>
        <div className="wrap" style={{ paddingTop: "calc(96px + var(--cg-u) * 4)" }}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/shop">Shop</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className={styles.productLayout}>
            <ProductGallery images={galleryImages} alt={product.alt} />

            <div className={styles.productInfo}>
              <p className={styles.productCategory}>{product.category}</p>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <p className={styles.productPrice}>{product.price}</p>
              <p className={styles.productDescription}>{product.description}</p>

              {product.allergens && product.allergens.length > 0 && (
                <div className={styles.allergenBlock}>
                  <p className={styles.allergenLabel}>Allergen Information</p>
                  <ul className={styles.allergenList}>
                    {product.allergens.map((allergen) => (
                      <li key={allergen}>{allergen}</li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={buildWhatsAppLink(`I'd like to order ${product.name}`)}
                className={styles.orderBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/images/img_whatsappicon.svg" alt="" />
                Order via WhatsApp
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <section className={styles.relatedSection} aria-labelledby="related-h2">
              <h2 className={styles.relatedH2} id="related-h2">
                You Might Also <em>Like</em>
              </h2>
              <div className={styles.relatedGrid}>
                {related.map((p) => (
                  <ShopProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
    </>
    
  );
}

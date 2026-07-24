import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/cms/shop";
import { getPayloadClient } from "@/lib/payload";
import ShopProductCard from "@/components/shop/ShopProductCard";
import ProductGallery from "@/components/shop/ProductGallery";
import { buildWhatsAppLink } from "@/lib/constants";
import styles from "./page.module.css";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "products",
    where: { published: { equals: true } },
    limit: 100,
  });

  return result.docs.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product);
  const galleryImages = product.gallery?.length
    ? product.gallery.map((g: any) => (typeof g.image === "string" ? g.image : g.image?.url))
    : [typeof product.image === "string" ? product.image : product.image?.url];

  return (
    <>
      <div className="wrap" style={{ paddingTop: "calc(96px + var(--cg-u) * 4)" }}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/shop">Shop</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className={styles.productLayout}>
          <ProductGallery images={galleryImages.filter(Boolean)} alt={product.alt || product.name} />

          <div className={styles.productInfo}>
            <p className={styles.productCategory}>{product.category}</p>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.productPrice}>{product.price}</p>
            <p className={styles.productDescription}>{product.description}</p>

            {product.allergens && product.allergens.length > 0 && (
              <div className={styles.allergenBlock}>
                <p className={styles.allergenTitle}>Allergens</p>
                <ul className={styles.allergenList}>
                  {product.allergens.map((a: any, i: number) => (
                    <li key={i}>{typeof a === "string" ? a : a.allergen}</li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={buildWhatsAppLink(product.whatsapp_message || `I'd like to order ${product.name}`)}
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/images/img_whatsappicon.svg" alt="" />
              Order on WhatsApp
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <section className={styles.relatedSection} aria-labelledby="related-h2">
            <h2 className={styles.relatedH2} id="related-h2">You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <ShopProductCard
                  key={p.id}
                  product={{
                    id: String(p.id),
                    name: p.name,
                    slug: p.slug,
                    description: p.description,
                    price: String(p.price),
                    image:
                      typeof p.image === "string" ? { url: p.image } : p.image,
                    badge: p.badge || undefined,
                    category: p.category,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

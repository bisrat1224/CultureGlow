import type { Product } from "@/components/home/ProductsSection/ProductCard";
import { SITE_ORIGIN } from "@/lib/llms-txt";

type ProductJsonLdProps = {
  product: Product;
};

function parsePrice(price: string): number | undefined {
  const match = price.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  if (!match) return undefined;
  return Number.parseFloat(match[1]);
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const amount = parsePrice(product.price);
  const image = product.seoImage || product.image;
  const absoluteImage = image.startsWith("http")
    ? image
    : `${SITE_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription || product.description || product.name,
    image: absoluteImage,
    sku: product.id,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "CultureGlow24",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_ORIGIN}/shop/${product.id}`,
      priceCurrency: "GBP",
      ...(amount !== undefined ? { price: amount.toFixed(2) } : {}),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

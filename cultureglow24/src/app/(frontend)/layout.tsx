import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { getLayoutData } from "@/lib/cms/layout";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seoDefaults, siteSettings } = await getLayoutData();

  return {
    title: {
      default: seoDefaults.default_title,
      template: `%s | ${siteSettings.site_name}`,
    },
    description: seoDefaults.default_description,
    keywords: seoDefaults.default_keywords?.map((k: any) => k.keyword) || [],
    metadataBase: new URL(seoDefaults.metadata_base || "https://cultureglow24.com"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: seoDefaults.default_title,
      description: seoDefaults.default_description,
      type: "website",
      images: seoDefaults.default_og_image
        ? [{ url: typeof seoDefaults.default_og_image === "string" ? seoDefaults.default_og_image : seoDefaults.default_og_image.url }]
        : undefined,
    },
    twitter: {
      card: seoDefaults.twitter_card as any,
      title: seoDefaults.default_title,
      description: seoDefaults.default_description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteSettings, navigation, footer } = await getLayoutData();

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {siteSettings.ga_measurement_id && (
          <GoogleAnalytics measurementId={siteSettings.ga_measurement_id} />
        )}
      </head>
      <body className="flex min-h-full flex-col">
        <Header
          logo={siteSettings.logo}
          navLinks={navigation.links}
          whatsappNumber={siteSettings.whatsapp_number}
        />
        <main className="flex-1">{children}</main>
        <Footer
          siteName={siteSettings.site_name}
          logo={siteSettings.logo}
          tagline={footer.tagline}
          columns={footer.columns}
          copyrightText={footer.copyright_text}
          whatsappNumber={siteSettings.whatsapp_number}
        />
        <ScrollRevealInit />
      </body>
    </html>
  );
}

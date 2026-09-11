import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_Ethiopic } from "next/font/google";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { StructuredData } from "@/components/StructuredData";
import { getGlobalSettings } from "@/lib/contentful/queries";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerif = Noto_Serif_Ethiopic({
  subsets: ["ethiopic", "latin"],
  weight: ["400", "700"],
  variable: "--font-noto",
  display: "swap",
});

const OG_IMAGE = "/og-default.jpg";

export const metadata: Metadata = {
  title: "CultureGlow24 Habesha Food, Beauty & Lifestyle",
  description:
    "Authentic Habesha food, beauty, and lifestyle products. Order via WhatsApp Habesha culture, delivered.",
  keywords: [
    "CultureGlow24",
    "Habesha food",
    "Habesha",
    "injera",
    "Ethiopian restaurant Putney",
    "Ethiopian food London",
  ],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://cultureglow24.com"),
  openGraph: {
    title: "CultureGlow24 Habesha Food, Beauty & Lifestyle",
    description:
      "Authentic Habesha food, beauty, and lifestyle products. Order via WhatsApp.",
    type: "website",
    url: "https://cultureglow24.com",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CultureGlow24 Habesha food" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CultureGlow24, Ethiopian Food, Beauty & Lifestyle",
    description: "Authentic Habesha food, beauty, and lifestyle products.",
    images: [OG_IMAGE],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getGlobalSettings();

  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable} ${inter.variable} ${notoSerif.variable}`}>
      <body className="min-h-full flex flex-col">
        <StructuredData
          telephone={settings.whatsappNumber}
          email={settings.email}
          address={settings.physicalAddress}
        />
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <Header etsyUrl={settings.etsyUrl} />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollRevealInit />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "CultureGlow24 Habesha Food, Beauty & Lifestyle",
  description:
    "Authentic Habesha food, beauty, and lifestyle products. Order via WhatsApp Habesha culture, delivered.",
  keywords: [
    "CultureGlow24",
    "Habesha food",
    "Habesha",
    "injera",
    "Addis Ababa",
  ],
  openGraph: {
    title: "CultureGlow24 Habesha Food, Beauty & Lifestyle",
    description:
      "Authentic Habesha food, beauty, and lifestyle products. Order via WhatsApp.",
    type: "website",
  },
  metadataBase: new URL("https://cultureglow24.com"),
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "CultureGlow24 — Ethiopian & Eritrean Food, Beauty & Lifestyle",
    description: "Authentic Habesha food, beauty, and lifestyle products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&family=Noto+Serif+Ethiopic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollRevealInit />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

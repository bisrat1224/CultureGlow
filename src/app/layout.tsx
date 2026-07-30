import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_Ethiopic } from "next/font/google";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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

export const metadata: Metadata = {
  title: "CultureGlow24 Habesha Food, Beauty & Lifestyle",
  description:
    "Authentic Habesha food, beauty, and lifestyle products. Order via WhatsApp Habesha culture, delivered.",
  keywords: [
    "CultureGlow24",
    "Habesha food",
    "Habesha",
    "injera",
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
    title: "CultureGlow24 — Ethiopian Food, Beauty & Lifestyle",
    description: "Authentic Habesha food, beauty, and lifestyle products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable} ${inter.variable} ${notoSerif.variable}`}>
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

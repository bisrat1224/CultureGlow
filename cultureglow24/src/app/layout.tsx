import type { Metadata } from "next";
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
        {children}
        <ScrollRevealInit />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

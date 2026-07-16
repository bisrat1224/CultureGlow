import type { Metadata } from "next";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import "./globals.css";

// Font loading (Playfair Display, Inter, Noto Serif Ethiopic) is wired up
// via <link> tags below, matching index.html's own approach exactly
// (rather than next/font/google, which self-hosts fonts downloaded at
// build time).

export const metadata: Metadata = {
  title: "CultureGlow24 — Ethiopian & Eritrean Food, Beauty & Lifestyle",
  description:
    "Authentic Habesha food, beauty, and lifestyle products. Order via WhatsApp — Ethiopian and Eritrean culture, delivered.",
  keywords: [
    "CultureGlow24",
    "Ethiopian food",
    "Eritrean food",
    "Habesha",
    "injera",
    "Addis Ababa",
  ],
  openGraph: {
    title: "CultureGlow24 — Ethiopian & Eritrean Food, Beauty & Lifestyle",
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
      </body>
    </html>
  );
}
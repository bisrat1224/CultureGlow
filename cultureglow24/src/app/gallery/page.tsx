import { Header } from "@/components/home/Header/Header";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";

// Stub route only — Gallery's real content (masonry photo grid, lightbox,
// TikTok video grid) is out of scope for this build. This page exists so
// the Header/MobileNav "Gallery" link resolves to something real instead
// of a 404.
export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-cream pt-24">
        <p className="font-serif text-2xl text-charcoal">Gallery — coming soon</p>
      </main>
      <WhatsAppStickyBar />
    </>
  );
}
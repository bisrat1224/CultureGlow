import { Header } from "@/components/home/Header/Header";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";

interface PageStubProps {
  title: string;
}

// Shared stub layout for routes whose real content hasn't been built yet
// (About, Shop, Menu, Catering, Contact, Gallery). Keeps the Header/nav
// and sticky WhatsApp bar live and consistent on every route from day
// one, so clicking a nav link never 404s while a page's real content is
// still pending in a later chunk. Once a page's real chunk lands, that
// page stops using PageStub and gets its own real markup.
export function PageStub({ title }: PageStubProps) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-cream pt-24">
        <p className="font-serif text-2xl text-charcoal">{title} — coming soon</p>
      </main>
      <WhatsAppStickyBar />
    </>
  );
}
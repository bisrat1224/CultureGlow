import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { WhatsAppStickyBar } from "@/components/home/WhatsAppStickyBar/WhatsAppStickyBar";

interface PageStubProps {
  title: string;
}


export function PageStub({ title }: PageStubProps) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-cream pt-24">
        <p className="font-serif text-2xl text-charcoal">{title} — coming soon</p>
      </main>
      <Footer />
      <WhatsAppStickyBar />
    </>
  );
}
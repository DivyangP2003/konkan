import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { KonkanMap } from '@/components/konkan-map';

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />
      <section className="border-b border-[#0d2d1e] bg-[#06150d] px-6 pb-12 pt-32 md:px-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[9px] font-sans uppercase tracking-[0.28em] text-[#f4ecd8]/45 transition-colors hover:text-[#f4ecd8]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Konkan
          </Link>
          <p className="mb-3 text-[10px] font-sans uppercase tracking-[0.42em] text-[#3a9e6e]">
            The living coastline
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl">
            Find your way along the <span className="italic text-[#3a9e6e]">shore.</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-[#f4ecd8]/50">
            Browse the coast by place, story, and experience. Select a marker to discover what makes each stop distinct.
          </p>
        </div>
      </section>
      <KonkanMap />
      <Footer />
    </main>
  );
}
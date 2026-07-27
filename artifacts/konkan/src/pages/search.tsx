import { useLocation } from 'wouter';
import { Navbar } from '@/components/navbar';
import { SearchOverlay } from '@/components/search-overlay';

export default function SearchPage() {
  const [, navigate] = useLocation();

  return (
    <main className="min-h-screen bg-[#020d08]">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-6 pt-24 text-center">
        <div>
          <p className="mb-3 text-[10px] font-sans uppercase tracking-[0.42em] text-[#3a9e6e]">Search Konkan</p>
          <h1 className="font-serif text-5xl text-[#f4ecd8] md:text-7xl">Find your next story.</h1>
        </div>
      </div>
      <SearchOverlay open onClose={() => navigate('/')} />
    </main>
  );
}
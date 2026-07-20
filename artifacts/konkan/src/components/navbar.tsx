import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 flex items-center justify-between px-6 md:px-16 py-6',
        scrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-primary/10 shadow-2xl' : 'bg-transparent'
      )}
    >
      <Link href="/" className="text-3xl font-serif tracking-widest text-[#f4ecd8] font-bold">
        K.
      </Link>
      <div className="hidden md:flex items-center gap-10 text-xs font-sans tracking-[0.2em] uppercase text-[#f4ecd8]/80">
        <a href="#discover" className="hover:text-primary transition-colors duration-300">Discover</a>
        <a href="#culture" className="hover:text-primary transition-colors duration-300">Culture</a>
        <a href="#realms" className="hover:text-primary transition-colors duration-300">Realms</a>
      </div>
      <button className="md:hidden text-[#f4ecd8]">
        <Menu size={24} />
      </button>
    </nav>
  );
}

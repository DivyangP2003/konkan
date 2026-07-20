import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#carousel', label: 'Realms'    },
  { href: '#map',      label: 'Map'       },
  { href: '#discover', label: 'Story'     },
  { href: '#culture',  label: 'Culture'   },
  { href: '#realms',   label: 'Explore'   },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 flex items-center justify-between px-6 md:px-14 py-5',
          scrolled
            ? 'bg-[#020d08]/88 backdrop-blur-lg py-4 border-b border-[#0d2d1e] shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-serif tracking-widest text-[#f4ecd8] font-light select-none"
          style={{ letterSpacing: '0.18em' }}
        >
          K.
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-sans tracking-[0.28em] uppercase">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative text-[#f4ecd8]/60 hover:text-[#f4ecd8] transition-colors duration-300 group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] bg-[#3a9e6e] transition-all duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#map"
          className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase font-sans text-[#020d08] bg-[#3a9e6e] hover:bg-[#4ab57e] px-5 py-2.5 transition-colors duration-300"
        >
          Discover
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#f4ecd8] p-1"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#020d08]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          onClick={close}
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="font-serif text-4xl text-[#f4ecd8]/80 hover:text-[#3a9e6e] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

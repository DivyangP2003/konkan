export function Footer() {
  return (
    <footer className="bg-[#020a08] py-20 px-8 text-center border-t border-primary/10">
      <h2 className="text-4xl md:text-5xl font-serif text-[#f4ecd8] tracking-[0.3em] mb-12">KONKAN</h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-xs tracking-[0.2em] uppercase font-sans text-muted-foreground">
        <a href="#discover" className="hover:text-primary transition-colors">Heritage</a>
        <a href="#culture" className="hover:text-primary transition-colors">Culture</a>
        <a href="#realms" className="hover:text-primary transition-colors">Journeys</a>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-[1px] bg-primary/30" />
        <p className="text-xs text-muted-foreground/60 font-sans tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Konkan Coast. Crafted with reverence.
        </p>
      </div>
    </footer>
  );
}

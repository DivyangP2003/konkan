const facts = [
  'The word "Konkan" derives from the Sanskrit Konkana — the curved shore',
  'The Alphonso mango, born in Konkan soil, is prized as the world\'s finest',
  'Over 720 km of coastline between Maharashtra, Goa and Karnataka',
  'The Western Ghats — a UNESCO World Heritage Site — rise directly behind the coast',
  'Sindhudurg Fort: 48 acres of sea-fortress never captured in 350 years',
  'Olive ridley sea turtles have nested on Velas beach for over 200 years',
  'Konkani cuisine was ranked among Asia\'s most complex spice traditions',
  'The Dashavatar folk theatre form is 2,000 years old and still performed',
  'The Karli backwaters of Tarkarli are clear enough to read through to the bottom',
  'Rabindranath Tagore lived in Karwar — its beauty shaped his Nobel-winning poetry',
  'Malvan\'s marine sanctuary hosts 200+ species of coral and 300+ fish species',
  'The Konkan Railway is considered one of engineering\'s greatest achievements',
  'Harihareshwar is called the Kashi of the South — one of four sacred seats',
  'Sawantwadi\'s lacquerware wooden toys hold a Geographical Indication status',
  'Devbagh Beach near Karwar is accessible only by boat — making it worth the journey',

  // ── New facts — added with the newer realms ──
  'The Konkan Railway crosses over 2,000 bridges and 91 tunnels along its 740 km route',
  'Konkani is spoken in more than a dozen distinct dialects across the coast',
  'Chaul and Rajapur were thriving Arab trading ports centuries before Bombay existed',
  'Portuguese rule in parts of the Konkan lasted over 450 years — Europe\'s longest colonial presence in India',
  'Some coastal towns host a temple, a church and a dargah within a single kilometre',
  'The monsoon here can bring over 3,000 mm of rain between June and September',
  'Wedding mandaps along the coast are still built from coconut fronds and areca leaves',
  'Ratnagiri Fort holds the preserved cell where Savarkar spent years in exile',
  'Lokmanya Tilak, architect of "Swaraj is my birthright," was born in Ratnagiri',
  'Malvan\'s reefs make it one of India\'s most underrated scuba diving destinations',
  'Traditional Konkani wadas are being turned into homestays across the coast',
  'Laterite plateaus atop the Ghats are remnants of ancient Deccan Trap lava flows',
  'Konkani diaspora communities still cook sol kadhi exactly as their grandmothers did',
  'Sacred groves, or deverai, have been protected by belief alone for centuries',
  'Koli fisherwomen tie their sarees in a distinctive knot suited for hauling nets',
  'Dawn fish auctions on Konkan beaches follow rhythms older than any market clock',
  'Konkan was once home to over 300 forts guarding its coastline and river mouths',
  'The poet Keshavsuta, father of modern Marathi poetry, was born in Malgund near Ratnagiri',
];
export function MarqueeTicker({ className = '' }: { className?: string }) {
  // Duplicate for seamless loop
  const items = [...facts, ...facts];
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#020d08] border-y border-[#0d2d1e] py-3 ${className}`}
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020d08] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020d08] to-transparent z-10 pointer-events-none" />
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: 'marquee 80s linear infinite',
          willChange: 'transform',
        }}
      >
        {items.map((fact, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/35 px-8">
              {fact}
            </span>
            <span className="text-[#3a9e6e]/40 text-xs" aria-hidden>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

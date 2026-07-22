import { motion, useMotionValue, useTransform } from 'framer-motion';
import { sections } from '@/data/sections';
import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';

const accentMap: Record<string, string> = {
  history: '#c17f3a', geography: '#3a9e6e', culture: '#a04e7a',
  art: '#c17f3a', music: '#a04e7a', cuisine: '#d45f2a',
  village: '#3a9e6e', festivals: '#a04e7a', 'local-festivals': '#a04e7a',
  tourism: '#2a8fb5', agriculture: '#3a9e6e', ecology: '#3a9e6e',
  ecotourism: '#3a9e6e', 'hidden-gems': '#2a8fb5', adventure: '#d45f2a',
  'flora-fauna': '#3a9e6e', beaches: '#2a8fb5', personalities: '#c17f3a',
  'konkan-railway': '#2a8fb5', 'language-dialects': '#c17f3a',
  'maritime-history': '#2a8fb5', 'religious-mosaic': '#a04e7a',
  monsoon: '#3a9e6e', 'weddings-rituals': '#a04e7a', handicrafts: '#c17f3a',
  'freedom-struggle': '#c17f3a', 'water-sports': '#d45f2a',
  homestays: '#3a9e6e', 'geology-coastline': '#3a9e6e', diaspora: '#c17f3a',
  'wildlife-sanctuaries': '#3a9e6e', 'forts-of-konkan': '#c17f3a',
  'textiles-costume': '#a04e7a', 'fishing-traditions': '#2a8fb5',
  'sacred-groves': '#3a9e6e', 'literature-poets': '#c17f3a',
};

const labelMap: Record<string, string> = {
  history: 'Heritage', geography: 'Landscape', culture: 'Culture',
  art: 'Craft', music: 'Folk', cuisine: 'Cuisine',
  village: 'Life', festivals: 'Celebration', 'local-festivals': 'Occasion',
  tourism: 'Travel', agriculture: 'Farm', ecology: 'Ecology',
  ecotourism: 'Eco', 'hidden-gems': 'Secret', adventure: 'Thrill',
  'flora-fauna': 'Wildlife', beaches: 'Ocean', personalities: 'Legacy',
  'konkan-railway': 'Journey', 'language-dialects': 'Language',
  'maritime-history': 'Maritime', 'religious-mosaic': 'Faith',
  monsoon: 'Monsoon', 'weddings-rituals': 'Rituals', handicrafts: 'Craft',
  'freedom-struggle': 'Freedom', 'water-sports': 'Water',
  homestays: 'Stay', 'geology-coastline': 'Geology', diaspora: 'Diaspora',
  'wildlife-sanctuaries': 'Wildlife', 'forts-of-konkan': 'Forts',
  'textiles-costume': 'Textile', 'fishing-traditions': 'Fishing',
  'sacred-groves': 'Sacred', 'literature-poets': 'Poetry',
};

const layoutPattern = [
  { col: 'md:col-span-2', row: 'md:row-span-2' },
  { col: '',              row: 'md:row-span-2' },
  { col: '',              row: '' },
  { col: '',              row: '' },
  { col: 'md:col-span-2', row: '' },
  { col: 'md:col-span-2', row: 'md:row-span-2' },
  { col: '',              row: '' },
  { col: '',              row: 'md:row-span-2' },
  { col: '',              row: '' },
  { col: 'md:col-span-2', row: '' },
  { col: '',              row: '' },
  { col: '',              row: '' },
];

function PortalCard({
  section,
  index,
}: {
  section: (typeof sections)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx   = useMotionValue(0);
  const my   = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotY = useTransform(mx, [-0.5, 0.5], ['-10deg', '10deg']);
  const accent = accentMap[section.id] ?? '#3a9e6e';
  const label  = labelMap[section.id] ?? '';
  const [, navigate] = useLocation();

  const layout  = layoutPattern[index % layoutPattern.length];
  const isLarge = layout.col.includes('col-span-2') && layout.row.includes('row-span-2');
  const isWide  = layout.col.includes('col-span-2') && !layout.row.includes('row-span-2');
  const isTall  = !layout.col.includes('col-span-2') && layout.row.includes('row-span-2');

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden cursor-pointer ${layout.col} ${layout.row}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: hovered ? rotX : 0,
        rotateY: hovered ? rotY : 0,
        transition: hovered ? 'none' : 'transform 0.5s ease',
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mx.set(0);
        my.set(0);
      }}
      onClick={() => navigate(`${base}/realm/${section.id}`)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 12) * 0.04 }}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={section.image}
          alt={section.title}
          loading="lazy"
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(2,13,8,0.92) 0%, rgba(2,13,8,0.45) 50%, rgba(2,13,8,0.12) 100%)'
            : 'linear-gradient(to top, rgba(2,13,8,0.85) 0%, rgba(2,13,8,0.35) 55%, rgba(2,13,8,0.08) 100%)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Accent line on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-bottom"
        style={{ backgroundColor: accent }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <p
          className="text-[8px] md:text-[9px] tracking-[0.32em] uppercase font-sans mb-1.5"
          style={{ color: accent }}
        >
          {label}
        </p>
        <h3
          className={`font-serif text-[#f4ecd8] leading-tight ${
            isLarge ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
          }`}
        >
          {section.title}
        </h3>

        {/* Description — only on large/wide cards */}
        {(isLarge || isWide) && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.35 }}
            className="mt-2 font-sans text-xs text-[#f4ecd8]/55 leading-relaxed max-w-xs"
          >
            {section.desc}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export function PortalGrid() {
  return (
    <section
      id="realms"
      className="py-20 md:py-28 px-4 md:px-8 bg-[#020d08] relative overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-[10px] tracking-[0.38em] uppercase font-sans text-primary/65 mb-4">
            Explore All Realms
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#f4ecd8] leading-tight">
            Every facet of<br />
            <span className="italic text-primary">one extraordinary land.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm text-[#f4ecd8]/40 font-sans max-w-sm leading-relaxed md:text-right"
        >
          Each realm is a doorway into a different facet of the same extraordinary land. Step through any one of them.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-[170px] gap-3 md:gap-4 grid-flow-dense max-w-[1600px] mx-auto">
        {sections.map((section, index) => (
          <PortalCard key={section.id} section={section} index={index} />
        ))}
      </div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 flex items-center justify-center gap-4"
      >
        <div className="h-[1px] w-16 bg-[#3a9e6e]/15" />
        <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/20">
          {sections.length} Realms of Konkan
        </span>
        <div className="h-[1px] w-16 bg-[#3a9e6e]/15" />
      </motion.div>
    </section>
  );
}

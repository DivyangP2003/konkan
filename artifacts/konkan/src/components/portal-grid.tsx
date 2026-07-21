import { motion, useMotionValue, useTransform } from 'framer-motion';
import { sections } from '@/data/sections';
import { useState, useRef } from 'react';
import { useLocation } from 'wouter';

// Category color map
const accentMap: Record<string, string> = {
  history: '#c17f3a', geography: '#3a9e6e', culture: '#a04e7a',
  art: '#c17f3a', music: '#a04e7a', cuisine: '#d45f2a',
  village: '#3a9e6e', festivals: '#a04e7a', 'local-festivals': '#a04e7a',
  tourism: '#2a8fb5', agriculture: '#3a9e6e', ecology: '#3a9e6e',
  ecotourism: '#3a9e6e', 'hidden-gems': '#2a8fb5', adventure: '#d45f2a',
  'flora-fauna': '#3a9e6e', beaches: '#2a8fb5', personalities: '#c17f3a',

  // ── New realms — batch A ──
  'konkan-railway': '#2a8fb5',
  'language-dialects': '#c17f3a',
  'maritime-history': '#2a8fb5',
  'religious-mosaic': '#a04e7a',
  monsoon: '#3a9e6e',
  'weddings-rituals': '#a04e7a',
  handicrafts: '#c17f3a',
  'freedom-struggle': '#c17f3a',
  'water-sports': '#d45f2a',
  homestays: '#3a9e6e',
  'geology-coastline': '#3a9e6e',
  diaspora: '#c17f3a',

  // ── New realms — batch B ──
  'wildlife-sanctuaries': '#3a9e6e',
  'forts-of-konkan': '#c17f3a',
  'textiles-costume': '#a04e7a',
  'fishing-traditions': '#2a8fb5',
  'sacred-groves': '#3a9e6e',
  'literature-poets': '#c17f3a',
};

const labelMap: Record<string, string> = {
  history: 'Heritage', geography: 'Landscape', culture: 'Culture',
  art: 'Craft', music: 'Folk', cuisine: 'Cuisine',
  village: 'Life', festivals: 'Celebration', 'local-festivals': 'Occasion',
  tourism: 'Travel', agriculture: 'Farm', ecology: 'Ecology',
  ecotourism: 'Eco', 'hidden-gems': 'Secret', adventure: 'Thrill',
  'flora-fauna': 'Wildlife', beaches: 'Ocean', personalities: 'Legacy',

  // ── New realms — batch A ──
  'konkan-railway': 'Journey',
  'language-dialects': 'Language',
  'maritime-history': 'Maritime',
  'religious-mosaic': 'Faith',
  monsoon: 'Monsoon',
  'weddings-rituals': 'Rituals',
  handicrafts: 'Craft',
  'freedom-struggle': 'Freedom',
  'water-sports': 'Water',
  homestays: 'Stay',
  'geology-coastline': 'Geology',
  diaspora: 'Diaspora',

  // ── New realms — batch B ──
  'wildlife-sanctuaries': 'Wildlife',
  'forts-of-konkan': 'Forts',
  'textiles-costume': 'Textile',
  'fishing-traditions': 'Fishing',
  'sacred-groves': 'Sacred',
  'literature-poets': 'Poetry',
};

const layoutPattern = [
  { col: "md:col-span-2", row: "md:row-span-2" },
  { col: "",             row: "md:row-span-2" },
  { col: "",             row: "" },
  { col: "",             row: "" },
  { col: "md:col-span-2", row: "" },
  { col: "md:col-span-2", row: "md:row-span-2" },
  { col: "",             row: "" },
  { col: "",             row: "md:row-span-2" },
  { col: "",             row: "" },
  { col: "md:col-span-2", row: "" },
  { col: "",             row: "" },
  { col: "",             row: "" },
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
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotY = useTransform(mx, [-0.5, 0.5], ['-10deg', '10deg']);
  const accent = accentMap[section.id] ?? '#3a9e6e';
  const label  = labelMap[section.id]  ?? '';

  const layout = layoutPattern[index % layoutPattern.length];
  
  const isLarge =
      layout.col.includes("col-span-2") &&
      layout.row.includes("row-span-2");
  
  const isWide =
      layout.col.includes("col-span-2") &&
      !layout.row.includes("row-span-2");
  
  const isTall =
      !layout.col.includes("col-span-2") &&
      layout.row.includes("row-span-2");
  

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onMouseLeave = () => { setHovered(false); mx.set(0); my.set(0); };
  const [, navigate] = useLocation();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate(`${base}/realm/${section.id}`)}
      style={{ perspective: 900 }}
      className={`
      relative
      group
      cursor-pointer
      col-span-1
      row-span-1
      ${layout.col}
      ${layout.row}
      h-full
      `}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="w-full h-full relative overflow-hidden"
      >
        {/* Image */}
        <img
          src={section.image}
          alt={section.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ filter: hovered ? 'brightness(0.55) saturate(1.2)' : 'brightness(0.5) saturate(1.0)' }}
        />

        {/* Color wash on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${accent}22 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/95 via-[#020d08]/30 to-transparent" />

        {/* Left accent bar */}
        <motion.div
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute left-0 top-0 bottom-0 w-[2px] origin-bottom"
          style={{ backgroundColor: accent }}
        />

        {/* Content */}
        <motion.div
          style={{ translateZ: '30px' }}
          className={`
          absolute inset-0 z-10
          flex flex-col justify-end
          ${
              isLarge
                  ? "p-8"
                  : isTall
                  ? "p-7"
                  : "p-5 md:p-6"
          }
          `}
        >
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span
              className="text-[9px] tracking-[0.3em] uppercase font-sans"
              style={{ color: accent }}
            >
              {label}
            </span>
          </div>

          <h3
            className="font-serif text-[#f4ecd8] leading-tight mb-2"
            style={{
                fontSize: isLarge
                    ? "clamp(1.7rem,2.7vw,2.2rem)"
                    : isWide
                    ? "clamp(1.3rem,2vw,1.6rem)"
                    : "clamp(1.1rem,2vw,1.35rem)"
            }}
          >
            {section.title}
          </h3>

          {/* Description — slides up on hover */}
          <motion.p
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.35 }}
            className={`
            text-xs md:text-sm
            text-[#f4ecd8]/65
            font-sans
            leading-relaxed
            ${
                isLarge
                    ? "line-clamp-5"
                    : isTall
                    ? "line-clamp-4"
                    : isWide
                    ? "line-clamp-3"
                    : "line-clamp-2"
            }
            `}
          >
            {section.desc}
          </motion.p>

          {/* Explore arrow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mt-3 flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase"
            style={{ color: accent }}
          >
            <span>Explore</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M0 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Corner number */}
        <div
          className="absolute top-4 right-4 font-serif text-xs opacity-25"
          style={{ color: '#f4ecd8' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PortalGrid() {

  return (
    <section id="realms" className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#020d08] relative border-t border-[#0d2d1e]">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#3a9e6e] font-sans mb-3">
              {sections.length} Worlds Within One Coast
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-[#f4ecd8] leading-none">
              Realms of <span className="italic text-[#3a9e6e]">Konkan</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#f4ecd8]/45 font-sans text-sm max-w-sm leading-relaxed md:text-right"
          >
            Each realm is a doorway into a different facet of the same extraordinary land. Step through any one of them.
          </motion.p>
        </div>

        <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            auto-rows-[170px]
            gap-4
            grid-flow-dense
            "
        >
            {sections.map((section, index) => (
                <PortalCard
                    key={section.id}
                    section={section}
                    index={index}
                />
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
          <div className="h-[1px] w-16 bg-[#3a9e6e]/20" />
          <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/25">
            More realms coming soon
          </span>
          <div className="h-[1px] w-16 bg-[#3a9e6e]/20" />
        </motion.div>
      </div>
    </section>
  );
}

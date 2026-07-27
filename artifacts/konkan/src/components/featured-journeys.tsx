import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

const journeys = [
  {
    id: 'spiritual',
    label: 'Spiritual Trail',
    subtitle: 'Sacred Coast',
    description:
      'Follow the arc of temples from Ganapatipule to Kunkeshwar — centuries of devotion carved into laterite cliffs.',
    image: '/assets/kunkeshwar-temple.jpg',
    href: '/spiritual',
    accentColor: '#d45f2a',
    stat: '12 Sacred Sites',
  },
  {
    id: 'heritage',
    label: 'Heritage Explorer',
    subtitle: 'Forts & Kingdoms',
    description:
      'Murud-Janjira to Sindhudurg — sea forts that held the Arabian Sea at bay for three centuries.',
    image: '/assets/forts-of-konkan.jpg',
    href: '/heritage',
    accentColor: '#c17f3a',
    stat: '30+ Historic Forts',
  },
  {
    id: 'adventure',
    label: 'Adventure Seeker',
    subtitle: 'Wild & Untamed',
    description:
      'Scuba in Malvan\'s Marine Sanctuary, trek the monsoon Ghats, kayak the Karli backwaters at dawn.',
    image: '/assets/water-sports.jpg',
    href: '/adventure',
    accentColor: '#2a8fb5',
    stat: '20+ Activities',
  },
  {
    id: 'food-culture',
    label: 'Cuisine & Customs',
    subtitle: 'Taste the Coast',
    description:
      'Malvani fish curry, sol kadhi, Alphonso mangoes, cashew feni — an entire civilisation told through food.',
    image: '/assets/konkani-thali.jpg',
    href: '/food',
    accentColor: '#3a9e6e',
    stat: '40+ Dishes',
  },
] as const;

export function FeaturedJourneys() {
  const [, navigate] = useLocation();

  return (
    <section className="py-24 px-6 border-t border-[#0d2d1e]">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#3a9e6e]/60" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#3a9e6e]">
              Curated Journeys
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl text-[#f4ecd8] leading-tight max-w-lg">
              Four Ways to{' '}
              <span className="italic text-[#c17f3a]">Read the Coast</span>
            </h2>
            <p className="font-sans text-sm text-[#f4ecd8]/55 max-w-xs leading-relaxed">
              Each trail distils a different Konkan. Choose one — or weave them together
              into the journey only you could design.
            </p>
          </div>
        </motion.div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {journeys.map((j, i) => (
            <motion.button
              key={j.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => navigate(j.href)}
              className="group relative overflow-hidden text-left w-full border border-[#0d2d1e] hover:border-[#1a4a30] transition-colors duration-500"
            >
              {/* image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={j.image}
                  alt={j.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ '--tw-scale-x': 'var(--scale)', '--tw-scale-y': 'var(--scale)' } as React.CSSProperties}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/50 to-transparent" />

                {/* accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ backgroundColor: j.accentColor }}
                />

                {/* stat pill */}
                <div className="absolute top-4 right-4">
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase font-sans px-2.5 py-1"
                    style={{ backgroundColor: `${j.accentColor}20`, color: j.accentColor, border: `1px solid ${j.accentColor}40` }}
                  >
                    {j.stat}
                  </span>
                </div>

                {/* content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase font-sans mb-2"
                    style={{ color: j.accentColor }}
                  >
                    {j.subtitle}
                  </p>
                  <h3 className="font-serif text-xl text-[#f4ecd8] mb-3 leading-tight">
                    {j.label}
                  </h3>
                  <p className="font-sans text-xs text-[#f4ecd8]/60 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    {j.description}
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-sans translate-y-2 group-hover:translate-y-0 transition-transform duration-400"
                    style={{ color: j.accentColor }}
                  >
                    Begin Trail <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

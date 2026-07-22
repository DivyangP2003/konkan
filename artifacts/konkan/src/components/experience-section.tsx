import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'The Ancestral Echoes',
    desc: 'Wander through ancient temples carved directly from laterite stone, where shadows dance in the flickering light of brass lamps. Every village holds a deity — at the edge of every grove stands a spirit older than memory.',
    img: '/assets/temple-carvings.jpg',
    tag: 'Heritage',
  },
  {
    title: 'The Coastal Harvest',
    desc: 'Taste the fiery kiss of Tirphal and the sour depth of Kokum. From dawn-caught fish to slow-cooked curries, the Konkani kitchen is a mastery of spice and fire — born from the sea, perfected over centuries on the red earth.',
    img: '/assets/konkani-thali.jpg',
    tag: 'Cuisine',
  },
  {
    title: 'The Wild Horizon',
    desc: 'Stand atop dramatic laterite cliffs as the Arabian Sea crashes seventy feet below. Pristine beaches stretch between mangrove labyrinths and dense coastal jungles, each cove a world apart from the last.',
    img: '/assets/ocean-cliffs.jpg',
    tag: 'Landscape',
  },
  {
    title: 'The Green Season',
    desc: 'June transforms Konkan into a different planet. Waterfalls appear overnight on every hillside. Rivers double in width within hours. The Western Ghats turn an impossible shade of green, and the air smells of wet earth and jasmine.',
    img: '/assets/monsoon.jpg',
    tag: 'Monsoon',
  },
  {
    title: 'The Sea Guardians',
    desc: 'Shivaji Maharaj built his sea empire from these shores. Sindhudurg, Vijaydurg, Murud-Janjira — forty-eight acres of ocean fortress, never once captured in three and a half centuries. Still standing. Still watching the horizon.',
    img: '/assets/sindhudurg-fort-walls.jpg',
    tag: 'Forts',
  },
];

export function ExperienceSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-16 bg-background relative overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-7xl mx-auto mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <p className="text-[10px] tracking-[0.38em] uppercase font-sans text-primary/70 mb-4">
            Five Ways to Feel It
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#f4ecd8] leading-tight">
            What Konkan<br />
            <span className="italic text-primary">feels like.</span>
          </h2>
        </div>
        <p className="text-sm font-sans text-[#f4ecd8]/45 max-w-xs leading-relaxed">
          A land that resists summarising. Every facet opens into another. Here are five doorways in.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-28 md:space-y-36">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-100px' }}
                className="w-full lg:w-1/2 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif italic text-3xl text-primary">0{index + 1}</span>
                  <div className="h-[1px] w-10 bg-primary/35" />
                  <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#f4ecd8]/40">
                    {exp.tag}
                  </span>
                </div>
                <h3 className="text-3xl md:text-[2.6rem] font-serif text-[#f4ecd8] leading-tight">
                  {exp.title}
                </h3>
                <p className="text-base md:text-lg text-[#f4ecd8]/65 font-sans leading-relaxed">
                  {exp.desc}
                </p>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.15 }}
                viewport={{ once: true, margin: '-100px' }}
                className="w-full lg:w-1/2 relative overflow-hidden group"
                style={{ height: 'clamp(280px, 44vw, 520px)' }}
              >
                <img
                  src={exp.img}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                />
                {/* Colour wash */}
                <div className="absolute inset-0 bg-[#020d08]/25 group-hover:bg-[#020d08]/10 transition-colors duration-700" />
                {/* Edge fade toward text */}
                <div
                  className={`absolute top-0 bottom-0 w-1/3 ${isEven ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-background to-transparent`}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

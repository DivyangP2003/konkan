import { motion } from 'framer-motion';

const stats = [
  { value: '720', unit: 'km', label: 'of Coastline' },
  { value: '300+', unit: '', label: 'Sea Forts' },
  { value: '2,000', unit: 'yr', label: 'of History' },
  { value: '34', unit: '', label: 'Realms to Explore' },
];

export function StorySection() {
  return (
    <section id="discover" className="relative py-24 md:py-40 px-6 md:px-16 lg:px-32 bg-background overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #3a9e6e 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Main story grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 md:mb-32">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-8 z-10"
          >
            <p className="text-[10px] tracking-[0.42em] uppercase font-sans text-primary/65">
              The Story of a Coast
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-[#f4ecd8] leading-tight">
              Where the jungle<br />
              <span className="text-primary italic">meets the sea.</span>
            </h2>
            <div className="w-20 h-[1px] bg-primary/50" />
            <p className="text-base md:text-lg text-foreground/70 font-sans leading-[1.85]">
              Step off the boat onto a sun-drenched dock. Here, the air is thick with the scent of roasted spices and salt spray. A 720-kilometre stretch of raw, cinematic beauty nestled between the ancient Western Ghats and the untamed Arabian Sea.
            </p>
            <p className="text-base md:text-lg text-foreground/70 font-sans leading-[1.85]">
              Time moves differently under the canopy of coconut and betelnut groves. This is the Konkan coast — India's most breathtaking secret, waiting to be felt, not merely visited.
            </p>

            <motion.a
              href="#realms"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] uppercase text-[#f4ecd8]/55 hover:text-primary transition-colors duration-300"
            >
              Explore all 34 realms
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
                <path d="M0 5h16M11 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Images */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[700px] w-full mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="absolute inset-0 z-10 overflow-hidden group"
            >
              <img
                src="/assets/fishing-village.jpg"
                alt="Konkan Fishing Village"
                className="w-full h-full object-cover shadow-2xl group-hover:scale-[1.04] transition-transform duration-[1200ms]"
              />
              <div className="absolute inset-0 border border-primary/15 m-4 pointer-events-none" />
            </motion.div>
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: -40, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -left-4 md:-left-12 w-[72%] md:w-3/5 h-[58%] z-20 overflow-hidden group shadow-2xl border-4 md:border-8 border-background"
            >
              <img
                src="/assets/spice-plantation.jpg"
                alt="Spice Plantation"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"
              />
            </motion.div>
            {/* Floating stat tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="absolute top-8 -right-2 md:-right-8 z-30 bg-[#020d08] border border-[#0d2d1e] px-5 py-4"
            >
              <p className="font-serif text-3xl text-primary">720</p>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#f4ecd8]/45 mt-1">km of coast</p>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 border border-[#0d2d1e]"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`px-8 py-8 ${i < stats.length - 1 ? 'border-r border-[#0d2d1e]' : ''}`}
            >
              <p className="font-serif text-3xl md:text-4xl text-[#f4ecd8] leading-none mb-1">
                {stat.value}
                {stat.unit && (
                  <span className="text-primary text-xl ml-0.5">{stat.unit}</span>
                )}
              </p>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#f4ecd8]/38 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

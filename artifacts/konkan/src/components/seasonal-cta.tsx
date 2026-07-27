import { motion } from 'framer-motion';
import { CloudRain, Sun, Waves, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

const seasonPills = [
  { icon: CloudRain, label: 'Monsoon', color: '#2a8fb5', months: 'Jun – Sep' },
  { icon: Waves, label: 'Winter', color: '#c17f3a', months: 'Oct – Mar' },
  { icon: Sun, label: 'Summer', color: '#3a9e6e', months: 'Apr – May' },
];

export function SeasonalCTA() {
  const [, navigate] = useLocation();

  return (
    <section className="relative overflow-hidden border-t border-[#0d2d1e]">
      {/* background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/waterfall-forest.jpg"
          alt="Konkan seasons"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08] via-[#020d08]/80 to-[#020d08]/60" />
      </div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#c17f3a]/60" />
              <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#c17f3a]">
                Plan by Season
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#f4ecd8] leading-tight mb-5">
              Every Season,<br />
              a{' '}
              <span className="italic text-[#c17f3a]">Different Konkan</span>
            </h2>
            <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed mb-8 max-w-md">
              Monsoon waterfalls, winter beaches, summer mango orchards — the coast
              transforms across the year. Our seasonal guide tells you exactly when to go,
              what you'll find, and how to make the most of it.
            </p>
            <button
              onClick={() => navigate('/seasonal')}
              className="inline-flex items-center gap-2 bg-[#3a9e6e] text-[#020d08] text-[11px] tracking-[0.25em] uppercase font-sans px-8 py-3 hover:bg-[#4ab57e] transition-colors duration-300"
            >
              View Seasonal Guide <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* right: season cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex gap-3 flex-wrap justify-center lg:justify-end"
          >
            {seasonPills.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.button
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  onClick={() => navigate('/seasonal')}
                  className="flex flex-col items-center gap-3 p-6 border min-w-[120px] group transition-all duration-400 hover:scale-105"
                  style={{
                    borderColor: `${s.color}40`,
                    backgroundColor: `${s.color}08`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = s.color;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${s.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${s.color}40`;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${s.color}08`;
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ backgroundColor: `${s.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-base text-[#f4ecd8]">{s.label}</div>
                    <div
                      className="text-[9px] tracking-widest uppercase font-sans mt-0.5"
                      style={{ color: s.color }}
                    >
                      {s.months}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

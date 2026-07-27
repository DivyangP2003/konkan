import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote:
      'Standing on Murud-Janjira\'s ramparts with the Arabian Sea crashing thirty feet below, I understood why this fort was never taken. It isn\'t just unconquered — it feels unconquerable. One of the most overwhelming travel experiences of my life.',
    name: 'Arjun Mehta',
    origin: 'Delhi',
    role: 'Travel Photographer',
    accentColor: '#c17f3a',
  },
  {
    id: 2,
    quote:
      'I came to Tarkarli for the diving and never wanted to leave. The Marine Sanctuary has visibility like nowhere else on the Indian coast — you are surrounded by an entirely different world. I rebooked my return flight three times.',
    name: 'Sanjana Krishnan',
    origin: 'Bengaluru',
    role: 'Marine Biologist',
    accentColor: '#2a8fb5',
  },
  {
    id: 3,
    quote:
      'Amboli in July: every five metres, another waterfall you\'ve never heard of. The mist comes in and takes the hills away, and when it clears, everything is forty shades of green. I have travelled extensively in the Western Ghats — Amboli in monsoon is in a category of its own.',
    name: 'Priya Kulkarni',
    origin: 'Pune',
    role: 'Botanist & Writer',
    accentColor: '#3a9e6e',
  },
  {
    id: 4,
    quote:
      'The Alphonso mango I ate at a farm outside Devgad tasted nothing like the ones sold in Mumbai. Warm, buttery, intensely fragrant — picked that morning. I bought a case, shipped it home, and have been planning my return every April since.',
    name: 'Rohan D\'Souza',
    origin: 'Mumbai',
    role: 'Food Writer',
    accentColor: '#d45f2a',
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section className="py-24 px-6 border-t border-[#0d2d1e] bg-[#040f08]">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="h-px w-10 bg-[#3a9e6e]/60" />
          <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#3a9e6e]">
            Visitor Voices
          </span>
        </motion.div>

        {/* testimonial display */}
        <div ref={constraintsRef} className="relative">
          {/* large quote mark */}
          <div className="absolute -top-2 -left-2 md:-left-8">
            <Quote
              className="w-14 h-14 md:w-20 md:h-20 opacity-10 rotate-180"
              style={{ color: t.accentColor }}
            />
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pl-6 md:pl-10"
          >
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-[#f4ecd8]/85 leading-relaxed mb-10 italic">
              "{t.quote}"
            </blockquote>

            <div className="flex items-center gap-4">
              {/* avatar placeholder */}
              <div
                className="w-12 h-12 flex items-center justify-center text-lg font-serif font-medium"
                style={{
                  backgroundColor: `${t.accentColor}20`,
                  color: t.accentColor,
                  border: `1px solid ${t.accentColor}40`,
                }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-sans text-sm text-[#f4ecd8] font-medium">{t.name}</div>
                <div className="font-sans text-xs text-[#f4ecd8]/50">
                  {t.role} · {t.origin}
                </div>
              </div>
            </div>
          </motion.div>

          {/* navigation */}
          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-9 h-9 border border-[#0d2d1e] flex items-center justify-center hover:border-[#3a9e6e] hover:text-[#3a9e6e] text-[#f4ecd8]/40 transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300"
                >
                  <div
                    className="h-px transition-all duration-500"
                    style={{
                      width: i === active ? 28 : 12,
                      backgroundColor: i === active ? t.accentColor : '#f4ecd840',
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 border border-[#0d2d1e] flex items-center justify-center hover:border-[#3a9e6e] hover:text-[#3a9e6e] text-[#f4ecd8]/40 transition-colors duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

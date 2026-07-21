import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// ── Voices of the coast ──────────────────────────────────────────────────
// Kept in the original language on purpose — these are folk sayings and
// proverbs passed down orally across Konkani, Malvani and Marathi-speaking
// communities along the coast, not translated so their rhythm stays intact.
const quotes = [
  {
    text: 'जिथे सह्याद्री समुद्राला भेटतो, तिथे स्वर्ग उतरतो.',
    attribution: 'Traditional Konkani saying',
  },
  {
    text: 'आमचो कोकण म्हणजे देवाभूमी, हांगा दगडांतय देव रवता.',
    attribution: 'Malvani proverb',
  },
  {
    text: 'कोकणात पावसाक शिव्या घालतत, पण पावसा बगर कोकण न्हय.',
    attribution: 'Malvani folk saying',
  },
  {
    text: 'माड, फणस आनी उलाशी हांगाच्या मातयेचें खरें दैणें.',
    attribution: 'Konkani coastal proverb',
  },
  {
    text: 'दर्या कधी रिकाम्या हाताने परत पाठवत नाही, फक्त वाट बघायला शिकवतो.',
    attribution: 'Old fisherman\'s saying, Konkan coast',
  },
  {
    text: 'जो कोकण बघता, तो परत परत हांगाच येता.',
    attribution: 'Traditional Malvani saying',
  },
];

export function ParallaxDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(i => (i + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = quotes[quoteIndex];

  return (
    <section ref={ref} id="culture" className="relative h-[70vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 scale-[1.2]"
      >
        <img 
          src="/src/assets/waterfall-forest.jpg" 
          alt="Konkan Forest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-80" />
      </motion.div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="p-8 md:p-16 border border-primary/20 bg-background/20 backdrop-blur-sm min-h-[280px] md:min-h-[260px] flex flex-col items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={quoteIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#f4ecd8] mb-8 leading-snug"
            >
              "{current.text}"
            </motion.h2>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-[1px] bg-primary" />
            <AnimatePresence mode="wait">
              <motion.p
                key={`attr-${quoteIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-primary font-sans tracking-[0.2em] uppercase text-xs font-bold"
              >
                {current.attribution}
              </motion.p>
            </AnimatePresence>
            <div className="w-8 h-[1px] bg-primary" />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIndex(i)}
                aria-label={`Show quote ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === quoteIndex ? 16 : 5,
                  height: 3,
                  borderRadius: 1.5,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: i === quoteIndex ? 'var(--primary, #3a9e6e)' : 'rgba(244,236,216,0.2)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

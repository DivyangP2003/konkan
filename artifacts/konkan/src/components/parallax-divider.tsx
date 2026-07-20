import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ParallaxDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

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
          className="p-8 md:p-16 border border-primary/20 bg-background/20 backdrop-blur-sm"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#f4ecd8] mb-8 leading-snug">
            "The ocean is a master, but the forest is a mother. In Konkan, you are raised by both."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-[1px] bg-primary" />
            <p className="text-primary font-sans tracking-[0.2em] uppercase text-xs font-bold">
              Ancient Coastal Wisdom
            </p>
            <div className="w-8 h-[1px] bg-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';

export function StorySection() {
  return (
    <section id="discover" className="relative py-24 md:py-40 px-6 md:px-16 lg:px-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 z-10"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-[#f4ecd8] leading-tight">
            Where the jungle <br/>
            <span className="text-primary italic">meets the sea.</span>
          </h2>
          <div className="w-24 h-[1px] bg-primary/60" />
          <p className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed">
            Step off the boat onto a sun-drenched dock. Here, the air is thick with the scent of roasted spices and salt spray. A 720-kilometer stretch of raw, cinematic beauty nestled between the ancient Western Ghats and the untamed Arabian Sea.
          </p>
          <p className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed">
            Time moves differently under the canopy of coconut and betelnut groves. This is the Konkan coast—India's most breathtaking secret, waiting to be felt.
          </p>
        </motion.div>
        
        <div className="relative h-[400px] sm:h-[500px] md:h-[700px] w-full mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="absolute inset-0 z-10 rounded-sm overflow-hidden group"
          >
            <img 
              src="/assets/fishing-village.jpg" 
              alt="Konkan Fishing Village" 
              className="w-full h-full object-cover shadow-2xl group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 border border-primary/20 m-4 pointer-events-none mix-blend-overlay" />
          </motion.div>
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: -40, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute -bottom-10 -left-4 md:-left-12 w-[75%] md:w-3/5 h-2/3 z-20 overflow-hidden group shadow-2xl border-4 md:border-8 border-background rounded-sm"
          >
            <img 
              src="/assets/spice-plantation.jpg" 
              alt="Spice Plantation" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

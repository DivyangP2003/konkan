import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'The Ancestral Echoes',
    desc: 'Wander through ancient temples carved directly from laterite stone, where shadows dance in the flickering light of brass lamps. Every village holds a deity, every grove a spirit.',
    img: '/assets/temple-carvings.jpg',
  },
  {
    title: 'The Coastal Harvest',
    desc: 'Taste the fiery kiss of Tirphal and the sour depth of Kokum. From fresh catch to slow-cooked curries, the Konkani kitchen is a mastery of spice and fire, born from the sea and the red earth.',
    img: '/assets/konkani-thali.jpg',
  },
  {
    title: 'The Wild Horizon',
    desc: 'Stand atop dramatic cliffs as the Arabian Sea crashes below. Endless stretches of pristine beaches lie hidden between mangroves and dense coastal jungles.',
    img: '/assets/ocean-cliffs.jpg',
  }
];

export function ExperienceSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-16 bg-background relative">
      <div className="max-w-7xl mx-auto space-y-32">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
            >
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-1/2 space-y-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-primary font-serif italic text-2xl">0{index + 1}</span>
                  <div className="w-12 h-[1px] bg-primary/40" />
                </div>
                <h3 className="text-3xl md:text-5xl font-serif text-[#f4ecd8] leading-tight">
                  {exp.title}
                </h3>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  {exp.desc}
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] overflow-hidden group"
              >
                <img 
                  src={exp.img} 
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
                <div className={`absolute top-0 bottom-0 ${isEven ? 'right-0' : 'left-0'} w-1/2 bg-gradient-to-${isEven ? 'l' : 'r'} from-background to-transparent`} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

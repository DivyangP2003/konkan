import { motion, useMotionValue, useTransform } from 'framer-motion';
import { sections } from '@/data/sections';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

function PortalCard({ section, index }: { section: typeof sections[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative h-80 cursor-pointer w-full"
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full h-full relative rounded-sm overflow-hidden bg-muted/20"
      >
        <img 
          src={section.image} 
          alt={section.title}
          className="w-full h-full object-cover"
        />
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isHovered 
            ? "bg-background/40"
            : "bg-gradient-to-t from-background via-background/60 to-transparent opacity-90"
        )} />
        
        <motion.div 
          style={{ translateZ: "40px" }}
          className="absolute inset-0 z-10 flex flex-col justify-end p-6 pointer-events-none"
        >
          <h3 className="text-xl md:text-2xl font-serif text-[#f4ecd8] mb-2 drop-shadow-md">{section.title}</h3>
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
            <div className="overflow-hidden">
              <p className="text-sm text-[#f4ecd8]/80 font-sans mt-2 mb-2 line-clamp-2 drop-shadow-sm">
                {section.desc}
              </p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-primary/40 mt-2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function PortalGrid() {
  return (
    <section id="realms" className="py-24 md:py-32 px-6 md:px-16 bg-background relative border-t border-border/50">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif text-[#f4ecd8] mb-6"
          >
            Realms of Konkan
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-24 h-[1px] bg-primary mx-auto mb-8 origin-center" 
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground font-sans max-w-3xl mx-auto"
          >
            Step through these portals into a world woven from centuries of coastal life, syncretic beliefs, and the timeless rhythms of nature.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          {sections.map((section, index) => (
            <PortalCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* ===================== */}
      {/* Background Video */}
      {/* ===================== */}

    <video
        poster="https://res.cloudinary.com/wgwu1ii3/video/upload/f_auto,q_auto/v1784647176/hero_v2lw3u.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
    >
        <source
            src="https://res.cloudinary.com/wgwu1ii3/video/upload/so_1,f_auto,q_auto/v1784647176/hero_v2lw3u.mp4"
            type="video/mp4"
        />
    </video>

      {/* ===================== */}
      {/* Dark Overlay */}
      {/* ===================== */}

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.35),
              rgba(0,0,0,0.15),
              rgba(0,0,0,0.45),
              rgba(0,0,0,0.70)
            )
          `,
        }}
      />


      {/* ===================== */}
      {/* Discover Indicator */}
      {/* ===================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center text-white/70"
      >
        <span className="mb-3 text-[10px] uppercase tracking-[0.35em]">
          Discover
        </span>

        <motion.div
          animate={{
            scaleY: [1, 0.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-16 w-[1px] origin-top bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>

      {/* ===================== */}
      {/* Bottom Fade */}
      {/* ===================== */}

      <div
        className="absolute bottom-0 left-0 z-20 h-52 w-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(2,16,13,0.35) 40%, #02100d 100%)",
        }}
      />
    </section>
  );
}

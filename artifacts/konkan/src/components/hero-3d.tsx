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
      {/* Hero Text */}
      {/* ===================== */}

      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-white/70 sm:text-sm"
        >
          The Jewel of India's West Coast
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-[clamp(4rem,14vw,11rem)] font-serif font-light tracking-[0.15em] text-white"
          style={{
            textShadow:
              "0 0 50px rgba(0,0,0,0.7), 0 6px 30px rgba(0,0,0,0.9)",
          }}
        >
          KONKAN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-6 text-base uppercase tracking-[0.25em] text-white/80 sm:text-xl"
        >
          India's Best Kept Secret
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-orange-300 to-transparent"
        />
      </motion.div>

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

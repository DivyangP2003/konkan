import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const textY      = useTransform(scrollY, [0, 600],  [0, 140]);
  const taglineY   = useTransform(scrollY, [0, 600],  [0, 100]);
  const opacity    = useTransform(scrollY, [0, 380],  [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* ── Background Video ───────────────────────────────────────── */}
      <video
        poster="https://res.cloudinary.com/wgwu1ii3/video/upload/so_1,f_auto,q_auto/v1784647176/hero_v2lw3u.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/wgwu1ii3/video/upload/w_3840,f_auto,q_auto/v1784647176/hero_v2lw3u.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Cinematic Overlay ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.42) 65%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ── Hero Text ──────────────────────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.42em" }}
          transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
          className="mb-6 font-sans text-[10px] md:text-[11px] uppercase text-[#f4ecd8]/75"
          style={{ letterSpacing: "0.42em" }}
        >
          Blessed with Nature's Richest Treasures
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[19vw] sm:text-[16vw] md:text-[13vw] lg:text-[11vw] leading-none tracking-tight text-[#800020]"
          style={{ textShadow: "0 4px 40px rgba(0,0,0,0.55)" }}
        >
          KONKAN
        </motion.h1>

        {/* Marathi Tagline */}
        <motion.p
          style={{ y: taglineY }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          className="mt-4 font-serif italic text-base md:text-lg lg:text-xl text-[#f4ecd8]/72"
        >
          येवा&thinsp;,&thinsp; ताक‑भात खावा&thinsp;,&thinsp; अन् आपलोच घर समजा&thinsp;!
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="mt-8 mb-8 h-[1px] w-20 origin-center bg-[#f4ecd8]/30"
        />

        {/* CTA */}
        <motion.a
          href="#discover"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-auto inline-flex items-center gap-3 border border-[#f4ecd8]/25 bg-[#f4ecd8]/6 px-8 py-3 font-sans text-[10px] tracking-[0.32em] uppercase text-[#f4ecd8]/80 backdrop-blur-sm transition-all duration-500 hover:border-[#f4ecd8]/50 hover:bg-[#f4ecd8]/12 hover:text-[#f4ecd8]"
        >
          Begin Journey
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
            <path d="M0 5h14M9 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </motion.div>

      {/* ── Scroll Indicator ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center text-white/55"
      >
        <span className="mb-3 font-sans text-[9px] uppercase tracking-[0.38em]">Discover</span>
        <motion.div
          animate={{ scaleY: [1, 0.28, 1], opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          className="h-14 w-[1px] origin-top bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>

      {/* ── Bottom Fade ────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-20 h-48 w-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(2,13,8,0.38) 45%, #020d08 100%)",
        }}
      />
    </section>
  );
}

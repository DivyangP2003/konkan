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

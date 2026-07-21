import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// CSS-canvas animated hero — no WebGL required
// Arabian Sea sunset + laterite silhouettes + a Konkan sea fort on a rocky islet.
// Signature element: the fort-on-rock silhouette, the single most recognizable
// Konkan coastal landmark (Sindhudurg / Vijaydurg style sea forts).

function AnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles — sea-spray / drifting embers of sunset light, not fireflies
    const PARTICLE_COUNT = 70;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.35,
      r: Math.random() * 2 + 0.4,
      dx: (Math.random() - 0.5) * 0.15,
      dy: -Math.random() * 0.12 - 0.02,
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: Math.random() * 0.006 + 0.002,
      color: Math.random() > 0.6 ? '#FFD9A0' : Math.random() > 0.5 ? '#F2B705' : '#FFF3E0',
    }));

    const draw = () => {
      t += 0.008;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Sky: Arabian Sea sunset — saffron high, burnt-rust low
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#3A1220');
      sky.addColorStop(0.32, '#7A2E1D');
      sky.addColorStop(0.55, '#C9622F');
      sky.addColorStop(0.72, '#EE9A3F');
      sky.addColorStop(1, '#F6C34E');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Sun glow, low on the horizon
      const sunX = W * 0.62, sunY = H * 0.56, sunR = Math.min(W, H) * 0.11;
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR);
      sunGrad.addColorStop(0, 'rgba(255,235,190,0.95)');
      sunGrad.addColorStop(0.35, 'rgba(255,190,110,0.55)');
      sunGrad.addColorStop(0.7, 'rgba(230,120,60,0.18)');
      sunGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR * 0.34, 0, Math.PI * 2);
      ctx.fillStyle = '#FFEFD1';
      ctx.fill();

      // Ocean base — deep teal, warmed near the horizon
      const horizonY = H * 0.58;
      const seaBase = ctx.createLinearGradient(0, horizonY, 0, H);
      seaBase.addColorStop(0, '#0C3C3A');
      seaBase.addColorStop(0.5, '#082A2A');
      seaBase.addColorStop(1, '#041615');
      ctx.fillStyle = seaBase;
      ctx.fillRect(0, horizonY, W, H - horizonY);

      // Sun's reflection path on the water
      const reflectGrad = ctx.createLinearGradient(0, horizonY, 0, H);
      reflectGrad.addColorStop(0, 'rgba(255,200,120,0.35)');
      reflectGrad.addColorStop(0.4, 'rgba(255,170,90,0.16)');
      reflectGrad.addColorStop(1, 'rgba(255,170,90,0.0)');
      ctx.fillStyle = reflectGrad;
      ctx.fillRect(sunX - sunR * 0.9, horizonY, sunR * 1.8, H - horizonY);

      // Wave layers (back → front), warmed with amber highlights
      const waveLayers = [
        { y: H * 0.58, amp: H * 0.014, freq: 0.008, speed: 0.6, color: 'rgba(20,90,80,0.35)', fill: true },
        { y: H * 0.62, amp: H * 0.018, freq: 0.009, speed: 0.85, color: 'rgba(15,70,64,0.42)', fill: true },
        { y: H * 0.67, amp: H * 0.022, freq: 0.011, speed: 1.1, color: 'rgba(8,50,46,0.58)', fill: true },
        { y: H * 0.74, amp: H * 0.026, freq: 0.013, speed: 1.4, color: 'rgba(5,35,32,0.72)', fill: true },
        { y: H * 0.82, amp: H * 0.018, freq: 0.014, speed: 1.7, color: '#041615', fill: true },
        // Amber foam crests catching the sunset
        { y: H * 0.605, amp: H * 0.013, freq: 0.011, speed: 0.9, color: 'rgba(255,200,140,0.14)', fill: false },
        { y: H * 0.67, amp: H * 0.017, freq: 0.013, speed: 1.15, color: 'rgba(255,180,110,0.10)', fill: false },
      ];

      waveLayers.forEach(({ y, amp, freq, speed, color, fill }) => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 3) {
          const waveY = y
            + Math.sin(x * freq + t * speed) * amp
            + Math.sin(x * freq * 1.7 + t * speed * 0.6) * amp * 0.4;
          ctx.lineTo(x, waveY);
        }
        if (fill) {
          ctx.lineTo(W, H);
          ctx.lineTo(0, H);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
        } else {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Drifting spray/light particles
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha += p.alphaDir * p.alphaSpeed;
        if (p.alpha >= 1 || p.alpha <= 0) p.alphaDir *= -1;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < H * 0.3) p.y = H;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.55;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Vignette overlay, warm-toned
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H);
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(20,10,10,0.7)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div ref={ref} className="relative h-[100dvh] w-full overflow-hidden bg-[#2A0F0F]">
      {/* Animated sunset + sea canvas */}
      <AnimatedCanvas />

      {/* Foreground silhouettes: laterite headland, coconut groves, sea fort, fishing boat */}
      <div className="absolute inset-0 z-5 pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="xMidYMax slice"
          style={{ opacity: 0.62 }}
        >
          {/* Laterite headland, left — the red-rock cliff line typical of Malvan/Ratnagiri coast */}
          <path
            d="M0,900 L0,560 Q60,540 110,500 Q150,468 170,420 Q190,470 175,520 Q220,500 240,450 Q260,510 230,560 Q290,540 310,600 L320,900Z"
            fill="#170B0A"
          />

          {/* Dense coconut grove on the headland — clustered, not two lone palms */}
          {[
            { x: 60, s: 1.0 }, { x: 100, s: 0.85 }, { x: 145, s: 1.1 },
            { x: 185, s: 0.75 }, { x: 225, s: 0.95 }, { x: 270, s: 0.8 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x},520) scale(${p.s})`}>
              <path d="M0,380 L6,120 Q8,80 0,50 Q-8,80 -6,120Z" fill="#170B0A" />
              <path d="M0,140 Q-55,90 -85,40 Q-40,60 -8,110Z" fill="#170B0A" />
              <path d="M0,150 Q55,95 90,40 Q45,65 8,120Z" fill="#170B0A" />
              <path d="M0,130 Q-40,70 -55,20 Q-20,45 -5,100Z" fill="#170B0A" />
              <path d="M0,145 Q40,80 60,25 Q25,50 6,105Z" fill="#170B0A" />
              <path d="M0,110 Q-10,55 -35,15 Q-8,35 0,80Z" fill="#170B0A" />
            </g>
          ))}

          {/* Sea fort on a rocky islet — signature element, Sindhudurg/Vijaydurg silhouette */}
          <g transform="translate(940,470)">
            {/* rocky outcrop rising from the water */}
            <path d="M-120,340 Q-100,260 -60,240 Q-20,220 20,232 Q60,244 90,270 Q120,290 130,340 Z" fill="#170B0A" />
            {/* fort curtain wall */}
            <path d="M-70,246 L-70,180 L-58,180 L-58,168 L-46,168 L-46,180 L-34,180 L-34,168 L-22,168 L-22,180 L-10,180 L-10,168 L2,168 L2,180 L14,180 L14,168 L26,168 L26,180 L38,180 L38,246Z" fill="#170B0A" />
            {/* corner bastion, left */}
            <path d="M-92,246 L-92,196 Q-92,182 -78,182 L-70,182 L-70,246Z" fill="#170B0A" />
            {/* corner bastion, right */}
            <path d="M38,246 L38,182 L48,182 Q60,182 60,198 L60,246Z" fill="#170B0A" />
            {/* small watchtower */}
            <path d="M-8,168 L-8,140 Q-8,132 0,132 Q8,132 8,140 L8,168Z" fill="#170B0A" />
            <path d="M-12,140 L12,140 L4,126 L-4,126Z" fill="#170B0A" />
          </g>

          {/* Far, thinner palm silhouette on the right, grounding the frame */}
          <path d="M1420,900 L1410,600 L1430,600Z" fill="#170B0A" />
          <path d="M1415,610 Q1380,560 1390,520 Q1415,555 1418,600Z" fill="#170B0A" />
          <path d="M1415,625 Q1455,570 1445,530 Q1420,565 1416,610Z" fill="#170B0A" />
          <path d="M1415,600 Q1390,635 1370,650 Q1400,620 1412,590Z" fill="#170B0A" />
        </svg>
      </div>

      {/* Traditional Konkani fishing boat, gently bobbing on the water */}
      <motion.svg
        viewBox="0 0 200 90"
        className="absolute z-6 pointer-events-none select-none"
        style={{ width: '9%', left: '30%', top: '66%', opacity: 0.6 }}
        animate={{ y: [0, -5, 0], rotate: [0, 1.2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M20,60 Q60,80 100,80 Q140,80 180,60 L165,72 Q100,90 35,72Z" fill="#170B0A" />
        <path d="M100,60 L100,15 L100,15 Q135,35 100,60Z" fill="#170B0A" />
        <line x1="100" y1="60" x2="100" y2="12" stroke="#170B0A" strokeWidth="2" />
      </motion.svg>

      {/* Text overlay */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="text-[#FFE8C2]/70 text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 font-sans"
        >
          Maharashtra's Arabian Sea Coast
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[clamp(4rem,14vw,11rem)] font-serif text-[#FFF3E0] tracking-[0.15em] font-light leading-none text-center"
          style={{ textShadow: '0 0 90px rgba(240,150,60,0.45), 0 4px 40px rgba(0,0,0,0.7)' }}
        >
          KONKAN
        </motion.h1>

        {/* Subtitle — specific to the region, not generic tropical copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-5 text-base sm:text-xl text-[#FFE8C2]/85 font-sans tracking-[0.25em] uppercase text-center"
        >
          Laterite Cliffs, Sea Forts &amp; Coconut Shores
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 1.3 }}
          className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#F2B705]/70 to-transparent"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-[#FFE8C2]/60"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase mb-3">Discover</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-14 bg-gradient-to-b from-[#FFE8C2]/70 to-transparent origin-top"
        />
      </motion.div>
    </div>
  );
}

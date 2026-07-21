import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// CSS-canvas animated hero — no WebGL required
// Creates animated ocean waves + floating particle fireflies using
// requestAnimationFrame on a plain <canvas> element.

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

    // Particles (fireflies / sea foam)
    const PARTICLE_COUNT = 120;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.2 - 0.15,
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: Math.random() * 0.008 + 0.003,
      color: Math.random() > 0.6 ? '#f2a65a' : Math.random() > 0.5 ? '#6bd4c0' : '#f4ecd8',
    }));

    const draw = () => {
      t += 0.008;
      const W = canvas.width;
      const H = canvas.height;

      // Deep dark background
      ctx.clearRect(0, 0, W, H);

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#020e0b');
      sky.addColorStop(0.45, '#041a14');
      sky.addColorStop(0.7, '#062e22');
      sky.addColorStop(1, '#02100d');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Subtle moonlight glow
      const moonGlow = ctx.createRadialGradient(W * 0.72, H * 0.18, 0, W * 0.72, H * 0.18, W * 0.38);
      moonGlow.addColorStop(0, 'rgba(230,210,170,0.07)');
      moonGlow.addColorStop(0.5, 'rgba(100,180,160,0.04)');
      moonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, W, H);

      // Ocean horizon glow
      const horizonY = H * 0.58;
      const horizonGlow = ctx.createLinearGradient(0, horizonY - H * 0.12, 0, horizonY + H * 0.08);
      horizonGlow.addColorStop(0, 'transparent');
      horizonGlow.addColorStop(0.4, 'rgba(25,120,95,0.12)');
      horizonGlow.addColorStop(0.7, 'rgba(15,80,60,0.18)');
      horizonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, horizonY - H * 0.12, W, H * 0.2);

      // Wave layers (back → front)
      const waveLayers = [
        { y: H * 0.52, amp: H * 0.018, freq: 0.008, speed: 0.6, color: 'rgba(15,80,62,0.35)', fill: true },
        { y: H * 0.56, amp: H * 0.022, freq: 0.009, speed: 0.85, color: 'rgba(20,100,78,0.40)', fill: true },
        { y: H * 0.61, amp: H * 0.026, freq: 0.011, speed: 1.1, color: 'rgba(5,55,42,0.55)', fill: true },
        { y: H * 0.67, amp: H * 0.030, freq: 0.013, speed: 1.4, color: 'rgba(3,40,30,0.70)', fill: true },
        { y: H * 0.74, amp: H * 0.020, freq: 0.014, speed: 1.7, color: '#02100d', fill: true },
        // Foam crests
        { y: H * 0.555, amp: H * 0.016, freq: 0.011, speed: 0.9, color: 'rgba(180,230,215,0.12)', fill: false },
        { y: H * 0.61, amp: H * 0.020, freq: 0.013, speed: 1.15, color: 'rgba(150,210,195,0.09)', fill: false },
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

      // Moon / light orb
      const moonX = W * 0.72, moonY = H * 0.18, moonR = Math.min(W, H) * 0.038;
      const moonGrad = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonR);
      moonGrad.addColorStop(0, 'rgba(255,240,200,0.9)');
      moonGrad.addColorStop(0.4, 'rgba(240,210,160,0.5)');
      moonGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fillStyle = moonGrad;
      ctx.fill();

      // Moon path on water
      const reflectGrad = ctx.createLinearGradient(W * 0.62, H * 0.55, W * 0.82, H * 0.74);
      reflectGrad.addColorStop(0, 'rgba(240,200,130,0.0)');
      reflectGrad.addColorStop(0.3, 'rgba(240,200,130,0.09)');
      reflectGrad.addColorStop(0.6, 'rgba(240,200,130,0.05)');
      reflectGrad.addColorStop(1, 'rgba(240,200,130,0.0)');
      ctx.fillStyle = reflectGrad;
      ctx.fillRect(W * 0.55, H * 0.52, W * 0.35, H * 0.25);

      // Firefly particles
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha += p.alphaDir * p.alphaSpeed;
        if (p.alpha >= 1 || p.alpha <= 0) p.alphaDir *= -1;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Vignette overlay
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H);
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(2,16,13,0.75)');
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
    <div ref={ref} className="relative h-[100dvh] w-full overflow-hidden bg-[#02100d]">
      {/* Animated canvas background */}
      <AnimatedCanvas />

      {/* Foreground: palm silhouettes */}
      <div className="absolute inset-0 z-5 pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="xMidYMax slice"
          style={{ opacity: 0.55 }}
        >
          {/* Left palm */}
          <path d="M120,900 L155,500 Q160,420 130,370 Q100,320 80,280 Q120,310 140,360 Q155,400 152,440 L170,900Z" fill="#010c09" />
          <path d="M152,460 Q80,400 40,330 Q100,360 140,420Z" fill="#010c09" />
          <path d="M152,480 Q200,410 190,340 Q160,380 155,450Z" fill="#010c09" />
          <path d="M152,500 Q100,460 60,400 Q110,430 148,490Z" fill="#010c09" />
          {/* Right side frond */}
          <path d="M1320,900 L1290,520 Q1285,440 1310,390 Q1340,340 1360,300 Q1320,330 1300,380 Q1285,420 1288,460 L1270,900Z" fill="#010c09" />
          <path d="M1288,470 Q1360,410 1400,340 Q1340,370 1300,430Z" fill="#010c09" />
          <path d="M1288,490 Q1240,420 1250,350 Q1280,390 1285,460Z" fill="#010c09" />
          {/* Far right thin tree */}
          <path d="M1420,900 L1410,600 L1430,600Z" fill="#010c09" />
          <path d="M1415,610 Q1380,560 1390,520 Q1415,555 1418,600Z" fill="#010c09" />
          <path d="M1415,625 Q1455,570 1445,530 Q1420,565 1416,610Z" fill="#010c09" />
        </svg>
      </div>

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
          className="text-[#f4ecd8]/60 text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 font-sans"
        >
          The Jewel of India&apos;s West Coast
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[clamp(4rem,14vw,11rem)] font-serif text-[#f4ecd8] tracking-[0.15em] font-light leading-none text-center"
          style={{ textShadow: '0 0 80px rgba(25,120,90,0.4), 0 4px 40px rgba(0,0,0,0.8)' }}
        >
          KONKAN
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-5 text-base sm:text-xl text-[#f4ecd8]/80 font-sans tracking-[0.25em] uppercase text-center"
        >
          India's Best Kept Secret
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 1.3 }}
          className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#f2a65a]/70 to-transparent"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-[#f4ecd8]/50"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase mb-3">Discover</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-14 bg-gradient-to-b from-[#f4ecd8]/60 to-transparent origin-top"
        />
      </motion.div>
    </div>
  );
}

this is hero section, it is looking good but see my webiste is about konkan

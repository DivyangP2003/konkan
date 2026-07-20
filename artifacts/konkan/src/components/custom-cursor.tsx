import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rx = lerp(rx, mx, 0.14);
      ry = lerp(ry, my, 0.14);

      if (dotRef.current) {
        dotRef.current.style.transform  = `translate(${mx - 3}px, ${my - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Scale ring on link/button hover
    const handleEnter = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement)?.closest('a, button, [role="button"]')
      ) {
        ringRef.current?.classList.add('cursor-expanded');
      }
    };
    const handleLeave = () => {
      ringRef.current?.classList.remove('cursor-expanded');
    };
    document.addEventListener('mouseover', handleEnter, { passive: true });
    document.addEventListener('mouseout',  handleLeave, { passive: true });

    // Hide on leave
    const onLeave  = () => { dotRef.current && (dotRef.current.style.opacity  = '0'); ringRef.current && (ringRef.current.style.opacity = '0'); };
    const onEnter2 = () => { dotRef.current && (dotRef.current.style.opacity  = '1'); ringRef.current && (ringRef.current.style.opacity = '1'); };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter2);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout',  handleLeave);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter2);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          backgroundColor: '#3a9e6e',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(58,158,110,0.55)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'opacity 0.2s, width 0.3s, height 0.3s, border-color 0.3s',
          willChange: 'transform',
        }}
      />
      <style>{`
        body { cursor: none !important; }
        a, button, [role="button"] { cursor: none !important; }
        .cursor-ring.cursor-expanded {
          width: 56px !important; height: 56px !important;
          margin-top: -10px; margin-left: -10px;
          border-color: rgba(58,158,110,0.85) !important;
        }
        @media (pointer: coarse) {
          body { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}

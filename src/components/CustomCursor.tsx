'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isTouchRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchRef.current = true;
      return;
    }
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext('2d')!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX, y: e.clientY,
          vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 - 1,
          life: 1, maxLife: 1, size: Math.random() * 3 + 1,
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const style = getComputedStyle(document.documentElement);
      const color = style.getPropertyValue('--cursor-particle').trim();

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= 0.02;
        if (p.life <= 0) return false;
        const alpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = color || 'rgba(139, 58, 26, 0.4)';
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      if (particlesRef.current.length > 150) particlesRef.current = particlesRef.current.slice(-150);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(animId); };
  }, []);

  if (isTouchRef.current) return null;

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true" />
      <div ref={cursorRef} className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75" style={{ borderColor: 'var(--cursor-border)' }} aria-hidden="true" />
    </>
  );
}

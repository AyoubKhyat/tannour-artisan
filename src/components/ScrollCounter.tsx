'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 700, suffix: '+', label: 'Years of Tradition', sub: 'Since the 14th century' },
  { value: 24, suffix: '', label: 'Master Artisans', sub: 'In our atelier' },
  { value: 12, suffix: '', label: 'Unique Pieces', sub: 'In the collection' },
  { value: 100, suffix: '%', label: 'Natural Process', sub: 'Vegetable-tanned' },
];

export default function ScrollCounter() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface-alt relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="w-12 h-px bg-accent/30 mx-auto mb-10 origin-center"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease }}
              className="text-center"
            >
              <p className="font-serif text-4xl md:text-5xl text-accent tracking-wider">
                <Counter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-primary text-sm tracking-[0.15em] uppercase mt-3">{stat.label}</p>
              <p className="text-faint text-xs mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

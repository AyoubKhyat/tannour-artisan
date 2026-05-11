'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const start = useCallback(() => {
    setProgress(0);
    setLoading(true);
    let p = 0;
    const tick = () => {
      p += (90 - p) * 0.1;
      setProgress(p);
    };
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, []);

  const finish = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
  }, []);

  useEffect(() => {
    finish();
  }, [pathname, finish]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href === pathname) return;
      if (cleanup) cleanup();
      cleanup = start();
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      if (cleanup) cleanup();
    };
  }, [pathname, start]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed top-0 left-0 right-0 z-[200] h-[2px] pointer-events-none"
        >
          <motion.div
            className="h-full bg-accent"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
          <div
            className="absolute right-0 top-0 w-24 h-full opacity-50"
            style={{
              background: 'linear-gradient(to left, var(--accent), transparent)',
              boxShadow: '0 0 8px var(--accent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

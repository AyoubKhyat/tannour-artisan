'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        <motion.div className="fixed inset-0 bg-surface z-[100] origin-left" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} exit={{ scaleX: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: 'right' }} aria-hidden="true" />
        <motion.div className="fixed inset-0 bg-surface z-[100] origin-right" initial={{ scaleX: 0 }} animate={{ scaleX: 0 }} exit={{ scaleX: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: 'left' }} aria-hidden="true" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

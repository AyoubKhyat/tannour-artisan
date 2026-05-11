'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-surface">
      <div className="absolute inset-0 leather-grain" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Corner accents */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="absolute top-20 left-10 w-5 h-5 border-t border-l border-accent/15" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }} className="absolute top-20 right-10 w-5 h-5 border-t border-r border-accent/15" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute bottom-20 left-10 w-5 h-5 border-b border-l border-accent/15" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }} className="absolute bottom-20 right-10 w-5 h-5 border-b border-r border-accent/15" />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-accent/10 font-serif text-[12rem] md:text-[16rem] leading-none select-none" aria-hidden="true">
            4
          </span>
          <motion.span
            animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
            transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
            className="text-accent/10 font-serif text-[12rem] md:text-[16rem] leading-none inline-block select-none"
            aria-hidden="true"
          >
            0
          </motion.span>
          <span className="text-accent/10 font-serif text-[12rem] md:text-[16rem] leading-none select-none" aria-hidden="true">
            4
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease }}
          className="w-16 h-px bg-accent/30 mx-auto mb-6 origin-center -mt-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 0.7, ease }}
          className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-4 font-sans"
        >
          Lost in the Medina
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '120%', rotateX: 30 }}
            animate={{ y: '0%', rotateX: 0 }}
            transition={{ delay: 0.6, duration: 1.1, ease }}
            className="font-serif text-3xl md:text-4xl text-primary tracking-wider"
            style={{ transformOrigin: 'bottom' }}
          >
            Page Not Found
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease }}
          className="text-secondary text-sm mt-4 leading-relaxed"
        >
          The path you followed has vanished into the winding streets. Let us guide you back.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-white text-xs tracking-[0.3em] uppercase hover:bg-accent/90 transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span>
            <span>Back Home</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 border border-accent/30 text-accent text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-white transition-all duration-500"
          >
            Browse Shop
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

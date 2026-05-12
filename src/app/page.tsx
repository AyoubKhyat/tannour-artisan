'use client';

import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Marquee from '@/components/Marquee';
import TornDivider from '@/components/TornDivider';
import { HeroSkeleton } from '@/components/SkeletonLoader';
import ScrollCounter from '@/components/ScrollCounter';
import MagneticButton from '@/components/MagneticButton';
import { useI18n } from '@/lib/i18n';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });
const ease = [0.22, 1, 0.36, 1] as const;

function SectionHeading({ label, title, delay = 0 }: { label: string; title: string; delay?: number }) {
  return (
    <div className="text-center mb-16">
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, ease }} viewport={{ once: true }} className="w-12 h-px mx-auto mb-6 origin-center" style={{ backgroundColor: 'var(--accent)' }} />
      <motion.p initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: delay + 0.1, duration: 0.7, ease }} viewport={{ once: true }} className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-4 font-sans">{label}</motion.p>
      <div className="overflow-hidden">
        <motion.h2 initial={{ y: '100%' }} whileInView={{ y: '0%' }} transition={{ delay: delay + 0.2, duration: 0.9, ease }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl text-primary tracking-wider">{title}</motion.h2>
      </div>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: delay + 0.5, duration: 0.8, ease }} viewport={{ once: true }} className="w-24 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto mt-5" />
    </div>
  );
}

function ParallaxImage({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

export default function HomePage() {
  const featured = getFeaturedProducts();
  const craftRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: craftScroll } = useScroll({ target: craftRef, offset: ['start end', 'end start'] });
  const craftBgY = useTransform(craftScroll, [0, 1], ['0%', '15%']);
  const { t, dir } = useI18n();

  const subtitle = t('hero.subtitle');

  return (
    <div dir={dir}>
      {/* ═══ Hero ═══ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-surface">
        <Suspense fallback={<HeroSkeleton />}><HeroScene /></Suspense>

        {/* Corner frames — hidden on small screens */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 1.2, ease }} className="absolute top-16 left-12 right-12 h-px bg-accent/10 origin-left" />
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4, duration: 1.2, ease }} className="absolute bottom-16 left-12 right-12 h-px bg-accent/10 origin-right" />
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.3, duration: 1.2, ease }} className="absolute top-16 bottom-16 left-12 w-px bg-accent/10 origin-top" />
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.5, duration: 1.2, ease }} className="absolute top-16 bottom-16 right-12 w-px bg-accent/10 origin-bottom" />
          <motion.div initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} transition={{ delay: 2, duration: 0.8 }} className="absolute top-14 left-10 w-4 h-4 border-t border-l border-accent/20" />
          <motion.div initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} transition={{ delay: 2.1, duration: 0.8 }} className="absolute top-14 right-10 w-4 h-4 border-t border-r border-accent/20" />
          <motion.div initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} transition={{ delay: 2.2, duration: 0.8 }} className="absolute bottom-14 left-10 w-4 h-4 border-b border-l border-accent/20" />
          <motion.div initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} transition={{ delay: 2.3, duration: 0.8 }} className="absolute bottom-14 right-10 w-4 h-4 border-b border-r border-accent/20" />
        </div>

        {/* Side text */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2, duration: 1 }} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <p className="text-faint text-[10px] tracking-[0.4em] uppercase font-sans [writing-mode:vertical-lr] rotate-180">Established · XIV Century · Marrakesh</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.4, duration: 1 }} className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <p className="text-faint text-[10px] tracking-[0.4em] uppercase font-sans [writing-mode:vertical-lr]">Artisan · Leather · Goods</p>
        </motion.div>

        {/* Hero text with backdrop */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="rounded-2xl px-5 py-8 sm:px-10 sm:py-12 backdrop-blur-md"
            style={{ backgroundColor: 'var(--hero-overlay)' }}
          >
            <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 1, ease }} className="w-16 h-px mx-auto mb-8 origin-center" style={{ backgroundColor: 'var(--accent)', opacity: 0.3 }} />
            <motion.p initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.4, duration: 1, ease }} className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-6 font-sans">{t('hero.since')}</motion.p>
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: '120%', rotateX: 40 }} animate={{ y: '0%', rotateX: 0 }} transition={{ delay: 0.6, duration: 1.2, ease }} className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] sm:tracking-[0.2em] uppercase" style={{ transformOrigin: 'bottom' }}>
                <span className="text-gradient-gold">Tannour</span>
              </motion.h1>
            </div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4, duration: 1, ease }} className="w-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto mt-4" />
            <div className="overflow-hidden mt-4">
              <motion.p initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ delay: 1, duration: 0.9, ease }} className="text-secondary text-sm md:text-base tracking-[0.3em] uppercase font-sans">
                {subtitle.split('').map((char, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 + i * 0.03, duration: 0.3 }}>{char}</motion.span>
                ))}
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.8, duration: 0.8, ease }} className="mt-10">
              <MagneticButton strength={0.25}>
                <Link href="/shop" className="group inline-flex items-center gap-3 px-10 py-4 border border-accent/30 text-accent text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-white transition-all duration-500">
                  <span>{t('hero.cta')}</span>
                  <motion.span initial={{ x: 0 }} animate={{ x: [0, 5, 0] }} transition={{ delay: 2.5, duration: 1.5, repeat: Infinity, repeatDelay: 3 }} className="inline-block" aria-hidden="true">→</motion.span>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 0.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <span className="text-faint text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-10 bg-gradient-to-b from-accent/30 to-transparent" />
        </motion.div>
      </section>

      <Marquee />

      {/* ═══ Featured Products ═══ */}
      <section className="py-24 md:py-32 px-6 leather-grain bg-surface overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeading label={t('home.featured.label')} title={t('home.featured.title')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 60, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * 0.15, duration: 0.7, ease }} viewport={{ once: true, margin: '-50px' }}>
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6, ease }} viewport={{ once: true }} className="text-center mt-16">
            <MagneticButton strength={0.2}>
              <Link href="/shop" className="group inline-flex items-center gap-3 px-10 py-4 border border-accent/20 text-accent/70 text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-white transition-all duration-500">
                <span>{t('home.viewAll')}</span><span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ═══ Heritage Numbers ═══ */}
      <ScrollCounter />

      <TornDivider />

      {/* ═══ Craft Story ═══ */}
      <section ref={craftRef} className="py-24 md:py-32 px-6 relative overflow-hidden bg-surface-alt">
        <motion.div style={{ y: craftBgY }} className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--accent) 0, var(--accent) 1px, transparent 0, transparent 50%)', backgroundSize: '30px 30px' }} />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.2, ease }} viewport={{ once: true, margin: '-100px' }}>
              <ParallaxImage>
                <div className="aspect-[4/5] bg-surface relative overflow-hidden border border-subtle">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.p initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, duration: 1, ease }} viewport={{ once: true }} className="text-accent/20 text-8xl font-serif">T</motion.p>
                      <motion.p initial={{ opacity: 0, letterSpacing: '0em' }} whileInView={{ opacity: 1, letterSpacing: '0.5em' }} transition={{ delay: 0.9, duration: 1, ease }} viewport={{ once: true }} className="text-faint text-xs uppercase mt-4">Est. 14th Century</motion.p>
                    </div>
                  </div>
                  <div className="absolute inset-0 leather-grain" />
                </div>
              </ParallaxImage>
            </motion.div>
            <div>
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.6, ease }} viewport={{ once: true }} className="w-10 h-px mb-6 origin-left" style={{ backgroundColor: 'var(--accent)', opacity: 0.3 }} />
              <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.6, ease }} viewport={{ once: true }} className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-6 font-sans">{t('craft.label')}</motion.p>
              <div className="overflow-hidden">
                <motion.h2 initial={{ y: '100%' }} whileInView={{ y: '0%' }} transition={{ delay: 0.2, duration: 0.9, ease }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl text-primary tracking-wider mb-8">{t('home.craft.heading')}</motion.h2>
              </div>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease }} viewport={{ once: true }} className="text-secondary leading-relaxed mb-6">{t('craft.desc')}</motion.p>
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6, ease }} viewport={{ once: true }}>
                <MagneticButton strength={0.2}>
                  <Link href="/craft" className="group inline-flex items-center gap-3 px-8 py-3 border border-accent/20 text-accent/70 text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-white transition-all duration-500">
                    <span>{t('home.craft.cta')}</span><span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <TornDivider flip />

      {/* ═══ Lookbook Grid ═══ */}
      <section className="py-24 md:py-32 px-6 leather-grain bg-surface overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeading label={t('home.lookbook.label')} title={t('home.lookbook.title')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { aspect: 'aspect-square', span: 'md:col-span-2 md:row-span-2', dir: 'left' },
              { aspect: 'aspect-square', span: '', dir: 'right' },
              { aspect: 'aspect-square', span: '', dir: 'up' },
              { aspect: 'aspect-[3/4]', span: '', dir: 'left' },
              { aspect: 'aspect-[3/4]', span: '', dir: 'right' },
              { aspect: 'aspect-square', span: 'md:col-span-2', dir: 'up' },
            ].map((item, i) => {
              const initPos = item.dir === 'left' ? { x: -60, y: 0 } : item.dir === 'right' ? { x: 60, y: 0 } : { x: 0, y: 60 };
              return (
                <motion.div key={i} className={item.span} initial={{ opacity: 0, ...initPos, scale: 0.9 }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }} transition={{ delay: i * 0.08, duration: 0.7, ease }} viewport={{ once: true, margin: '-30px' }}>
                  <div className={`${item.aspect} bg-surface-alt relative overflow-hidden group border border-subtle`}>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.05, ease }}
                    >
                      <motion.span whileHover={{ scale: 1.3, rotate: 15 }} transition={{ type: 'spring', stiffness: 300 }} className="text-accent/10 font-serif text-6xl group-hover:text-accent/20 transition-colors duration-500">
                        {['◆', '✦', '◇', '▲', '○', '□'][i]}
                      </motion.span>
                    </motion.div>
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}

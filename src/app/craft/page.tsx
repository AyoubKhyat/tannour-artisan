'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TornDivider from '@/components/TornDivider';
import Marquee from '@/components/Marquee';

const ease = [0.22, 1, 0.36, 1] as const;

const timeline = [
  { step: '01', title: 'Selecting the Hides', titleAr: 'اختيار الجلود', description: 'Each morning, our master tanners inspect raw hides from the Atlas region, selecting only those with the tightest grain and fewest imperfections. A single hide must pass seven quality checks before entering the tannery.', duration: '1 Day' },
  { step: '02', title: 'The Lime Baths', titleAr: 'حمام الجير', description: 'Hides are soaked in ancient stone vats filled with a mixture of pigeon lime and water — the same formula used since the 14th century. This removes hair and opens the pores of the leather for tanning.', duration: '3-5 Days' },
  { step: '03', title: 'Vegetable Tanning', titleAr: 'الدباغة النباتية', description: 'Using bark from mimosa and oak trees, the leather is slowly tanned in graduated pits. Unlike chemical processes, vegetable tanning takes weeks but produces leather that ages beautifully and is kind to the earth.', duration: '2-4 Weeks' },
  { step: '04', title: 'Natural Dyeing', titleAr: 'الصباغة الطبيعية', description: 'Colors come from the earth: saffron for yellow, indigo for blue, pomegranate for red, mint for green. Each hide is dyed by hand, massaged until the color penetrates deep into the grain.', duration: '2-3 Days' },
  { step: '05', title: 'Cutting & Stitching', titleAr: 'القطع و الخياطة', description: 'Our artisans cut each piece using brass templates passed down through families. Every stitch is made by hand with waxed linen thread, using a saddle-stitch technique that ensures the piece never unravels.', duration: '1-3 Days' },
  { step: '06', title: 'Finishing & Burnishing', titleAr: 'التشطيب', description: 'Edges are sealed with beeswax and burnished with a bone folder until they gleam. Hardware is attached, final inspections are made, and each piece receives the TANNOUR stamp — a mark of authenticity.', duration: '1 Day' },
];

const artisans = [
  { name: 'Maître Hassan', role: 'Master Tanner', roleAr: 'معلم الدباغة', years: 42, quote: 'The leather speaks to you. You must listen with your hands.' },
  { name: 'Fatima Ouazzani', role: 'Head Stitcher', roleAr: 'رئيسة الخياطة', years: 28, quote: 'Each stitch is a prayer. Rushed work dishonors the animal that gave its hide.' },
  { name: 'Youssef Amrani', role: 'Dye Master', roleAr: 'معلم الصباغة', years: 35, quote: 'I learned the secret of indigo from my grandmother. The color lives in the timing.' },
];

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center mb-20">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease }}
        viewport={{ once: true }}
        className="w-12 h-px bg-accent/30 mx-auto mb-6 origin-center"
      />
      <motion.p
        initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.1, duration: 0.7, ease }}
        viewport={{ once: true }}
        className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-4 font-sans"
      >
        {label}
      </motion.p>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-primary tracking-wider"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}

function ParallaxSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export default function CraftPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Hero with parallax text */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-6 overflow-hidden bg-surface">
        <div className="absolute inset-0 leather-grain" />

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease }}
            className="w-16 h-px bg-accent/30 mx-auto mb-8 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-6 font-sans"
          >
            Our Heritage
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '120%', rotateX: 30 }}
              animate={{ y: '0%', rotateX: 0 }}
              transition={{ delay: 0.35, duration: 1.2, ease }}
              className="font-serif text-3xl sm:text-5xl md:text-7xl text-primary tracking-wider"
              style={{ transformOrigin: 'bottom' }}
            >
              The Art of the Tannery
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto mt-6 mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease }}
            className="text-secondary leading-relaxed max-w-2xl mx-auto"
          >
            Seven centuries of unbroken tradition. In the ancient tanneries of Marrakesh,
            where the air carries the weight of history and the stone vats hold memories
            of ten thousand hides, our artisans transform raw material into living art.
          </motion.p>
        </motion.div>
      </section>

      <TornDivider />

      {/* Timeline */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="The Process" title="From Hide to Heritage" />

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease }}
              viewport={{ once: true }}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-accent/10 origin-top"
            />

            {timeline.map((item, i) => (
              <div key={item.step} className="mb-20 last:mb-0">
                <div className={`relative flex items-start gap-8 md:gap-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                    viewport={{ once: true }}
                    className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-surface border-2 border-accent rounded-full z-10"
                  />

                  <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.5, ease }}
                      viewport={{ once: true }}
                      className="text-accent/10 font-serif text-5xl inline-block"
                    >
                      {item.step}
                    </motion.span>

                    <div className="overflow-hidden">
                      <motion.h3
                        initial={{ y: '100%' }}
                        whileInView={{ y: '0%' }}
                        transition={{ delay: 0.2, duration: 0.7, ease }}
                        viewport={{ once: true }}
                        className="font-serif text-2xl text-primary mt-2"
                      >
                        {item.title}
                      </motion.h3>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5, ease }}
                      viewport={{ once: true }}
                      className="text-faint text-sm mt-1"
                      dir="rtl"
                    >
                      {item.titleAr}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.6, ease }}
                      viewport={{ once: true }}
                      className="text-secondary text-sm leading-relaxed mt-4"
                    >
                      {item.description}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="text-accent/50 text-xs tracking-widest uppercase mt-4"
                    >
                      Duration: {item.duration}
                    </motion.p>
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TornDivider flip />

      {/* Tannery Photos */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden leather-grain bg-surface-alt">
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeading label="The Tannery" title="Where It All Begins" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'The Vats', desc: 'Stone tanning pits, unchanged since the 14th century' },
              { title: 'The Workshop', desc: 'Where cutting and stitching bring designs to life' },
              { title: 'The Drying Terraces', desc: 'Leather drying under the Moroccan sun' },
            ].map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateY: i === 1 ? 0 : i === 0 ? 5 : -5 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8, ease }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <ParallaxSection>
                  <div className="aspect-[4/5] bg-surface relative group overflow-hidden border border-subtle">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="text-accent/15 text-7xl font-serif mb-4 inline-block"
                        >
                          {['◊', '□', '△'][i]}
                        </motion.div>
                        <h3 className="font-serif text-xl text-secondary">{photo.title}</h3>
                        <p className="text-faint text-xs mt-2 leading-relaxed">{photo.desc}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
                  </div>
                </ParallaxSection>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TornDivider />

      {/* Artisans */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="The People" title="Our Artisans" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisans.map((artisan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.7, ease }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -8 }}
              >
                <div className="border border-subtle p-8 hover:border-accent/20 transition-colors duration-500 group bg-card h-full">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true }}
                    className="w-20 h-20 rounded-full bg-surface-alt mx-auto mb-6 flex items-center justify-center border border-subtle"
                  >
                    <span className="text-accent/30 font-serif text-2xl group-hover:text-accent/60 transition-colors">
                      {artisan.name[0]}
                    </span>
                  </motion.div>

                  <h3 className="font-serif text-xl text-primary text-center">{artisan.name}</h3>
                  <p className="text-accent/60 text-xs tracking-widest uppercase text-center mt-1">{artisan.role}</p>
                  <p className="text-faint text-sm text-center mt-1" dir="rtl">{artisan.roleAr}</p>
                  <p className="text-secondary text-xs text-center mt-2">{artisan.years} years of craft</p>

                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-6 text-secondary text-sm italic text-center leading-relaxed border-t border-subtle pt-6"
                  >
                    &ldquo;{artisan.quote}&rdquo;
                  </motion.blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />
    </>
  );
}

'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { useRecentlyViewed } from '@/lib/recentlyViewed';
import ProductCard from '@/components/ProductCard';
import { useI18n } from '@/lib/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { t, dir } = useI18n();
  const { ids } = useRecentlyViewed();
  const scrollRef = useRef<HTMLDivElement>(null);

  const viewed = ids
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6);

  if (viewed.length === 0) return null;

  return (
    <section dir={dir} className="pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="w-12 h-px bg-accent/30 mx-auto mb-6 origin-center"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="text-center text-accent/50 text-xs tracking-[0.5em] uppercase mb-3 font-sans"
        >
          {t('recent.label')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="font-serif text-3xl md:text-4xl text-primary tracking-wider text-center mb-12"
        >
          {t('recent.title')}
        </motion.h2>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {viewed.map((product, i) => (
            <div key={product!.id} className="min-w-[260px] sm:min-w-[280px] snap-start">
              <ProductCard product={product!} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

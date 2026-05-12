'use client';

import { motion } from 'framer-motion';
import { getRelatedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useI18n } from '@/lib/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

export default function RelatedProducts({ productId }: { productId: string }) {
  const { t, dir } = useI18n();
  const related = getRelatedProducts(productId, 4);

  if (related.length === 0) return null;

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
          {t('related.label')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="font-serif text-3xl md:text-4xl text-primary tracking-wider text-center mb-12"
        >
          {t('related.title')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

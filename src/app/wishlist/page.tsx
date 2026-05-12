'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '@/lib/wishlist';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useI18n } from '@/lib/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

export default function WishlistPage() {
  const { t, dir } = useI18n();
  const { items, clearWishlist } = useWishlist();
  const wishlisted = products.filter((p) => items.includes(p.id));

  return (
    <section dir={dir} className="pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-3 font-sans">{t('wishlist.label')}</p>
          <h1 className="font-serif text-4xl md:text-6xl text-primary tracking-wider">{t('wishlist.title')}</h1>
          {wishlisted.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <p className="text-secondary text-sm">
                {t('wishlist.saved', { count: wishlisted.length })}
              </p>
              <button
                onClick={clearWishlist}
                className="text-xs text-faint hover:text-accent transition-colors underline tracking-wider uppercase"
              >
                {t('wishlist.clearAll')}
              </button>
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {wishlisted.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
              className="text-center py-20"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="mx-auto text-faint/30 mb-6"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <p className="text-secondary text-lg mb-2">{t('wishlist.empty')}</p>
              <p className="text-faint text-sm mb-8">{t('wishlist.emptyHint')}</p>
              <Link
                href="/shop"
                className="inline-block px-8 py-4 bg-accent text-white text-sm tracking-[0.3em] uppercase hover:bg-accent/90 transition-colors"
              >
                {t('wishlist.browse')}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {wishlisted.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

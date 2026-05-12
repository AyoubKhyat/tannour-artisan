'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuickView } from '@/lib/quickview';
import { useCart } from '@/lib/cart';
import { useToast } from '@/lib/toast';
import WishlistButton from '@/components/WishlistButton';
import { useI18n } from '@/lib/i18n';

const categoryIcon: Record<string, string> = { bags: '👜', wallets: '💳', belts: '〰️', accessories: '✦' };

export default function QuickViewModal() {
  const { t, dir } = useI18n();
  const { product, close } = useQuickView();
  const { addItem } = useCart();
  const { show } = useToast();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedColor(0);
    setSelectedSize(0);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [product, close]);

  const handleAdd = () => {
    if (!product) return;
    addItem(product, product.colors[selectedColor].name, product.sizes[selectedSize]);
    show(`${product.nameFr} added to bag`);
    close();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/30 z-[70] backdrop-blur-sm"
          />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            dir={dir}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[720px] md:max-h-[85vh] bg-card border border-subtle z-[75] overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.nameFr}`}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-faint hover:text-accent transition-colors"
              aria-label="Close quick view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product visual */}
              <div className="aspect-square bg-surface-alt flex items-center justify-center relative">
                <span className="text-8xl opacity-20" aria-hidden="true">{categoryIcon[product.category]}</span>
                <div className="absolute top-3 right-3 text-xs text-accent/40 tracking-widest uppercase font-sans">{product.category}</div>
              </div>

              {/* Product info */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex-1">
                  <p className="text-accent/50 text-xs tracking-[0.4em] uppercase mb-2 font-sans">{product.category}</p>
                  <h2 className="font-serif text-2xl md:text-3xl text-primary tracking-wider">{product.nameFr}</h2>
                  <p className="text-faint text-sm mt-1 font-sans" dir="rtl">{product.nameDarija}</p>
                  <p className="text-accent font-serif text-2xl mt-4">
                    {product.price.toLocaleString()} <span className="text-sm text-accent/50">MAD</span>
                  </p>
                  <p className="text-secondary text-sm leading-relaxed mt-4 line-clamp-3">{product.description}</p>

                  {/* Colors */}
                  <div className="mt-6">
                    <p className="text-xs text-faint tracking-widest uppercase mb-2">
                      {t('product.leather')}: {product.colors[selectedColor].name}
                    </p>
                    <div className="flex gap-2">
                      {product.colors.map((color, i) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(i)}
                          aria-label={`Select ${color.name} leather`}
                          aria-pressed={i === selectedColor}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            i === selectedColor ? 'border-accent scale-110' : 'border-subtle hover:border-accent/50'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mt-4">
                    <p className="text-xs text-faint tracking-widest uppercase mb-2">{t('product.size')}</p>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size, i) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(i)}
                          aria-pressed={i === selectedSize}
                          className={`px-3 py-1.5 text-xs tracking-wider border transition-all ${
                            i === selectedSize
                              ? 'bg-accent text-white border-accent'
                              : 'border-subtle text-secondary hover:border-subtle-strong'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 bg-accent text-white text-sm tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors"
                  >
                    {t('product.addToBag')}
                  </button>
                  <WishlistButton
                    productId={product.id}
                    productName={product.nameFr}
                    size="md"
                    className="w-12 border border-subtle hover:border-accent transition-colors"
                  />
                </div>

                <Link
                  href={`/product/${product.id}`}
                  onClick={close}
                  className="mt-3 text-center text-xs text-accent/60 tracking-widest uppercase hover:text-accent transition-colors"
                >
                  {t('product.viewDetails')} →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

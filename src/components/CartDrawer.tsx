'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export default function CartDrawer() {
  const { t, dir } = useI18n();
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    const firstBtn = drawerRef.current?.querySelector<HTMLElement>('button');
    firstBtn?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 bg-black/30 z-[60] backdrop-blur-sm" aria-hidden="true" />
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            dir={dir}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-subtle z-[70] flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-subtle">
              <h2 className="font-serif text-xl tracking-[0.2em] uppercase text-accent">{t('cart.title')}</h2>
              <button onClick={closeCart} className="text-faint hover:text-accent transition-colors" aria-label="Close shopping bag">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-faint">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="mt-4 text-sm tracking-wider uppercase">{t('cart.empty')}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item, index) => (
                    <motion.div key={`${item.product.id}-${item.color}-${item.size}`} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 100 }} className="flex gap-4 pb-6 border-b border-subtle">
                      <div className="w-20 h-20 bg-surface-alt rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl text-accent/40 font-serif" aria-hidden="true">{item.product.nameFr[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm text-primary truncate">{item.product.nameFr}</h3>
                        <p className="text-xs text-secondary mt-1">{item.color} · {item.size}</p>
                        <p className="text-sm text-accent mt-1">{item.product.price.toLocaleString()} MAD</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-6 h-6 border border-subtle-strong text-secondary text-xs flex items-center justify-center hover:border-accent hover:text-accent transition-colors" aria-label={`Decrease quantity for ${item.product.nameFr}`}>−</button>
                          <span className="text-sm text-secondary w-4 text-center" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-6 h-6 border border-subtle-strong text-secondary text-xs flex items-center justify-center hover:border-accent hover:text-accent transition-colors" aria-label={`Increase quantity for ${item.product.nameFr}`}>+</button>
                          <button onClick={() => removeItem(index)} className="ml-auto text-faint hover:text-red-500 transition-colors text-xs" aria-label={`Remove ${item.product.nameFr} from bag`}>Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-subtle bg-surface-alt">
                <div className="flex justify-between mb-6">
                  <span className="text-sm text-secondary uppercase tracking-wider">{t('cart.subtotal')}</span>
                  <span className="text-lg font-serif text-accent">{totalPrice.toLocaleString()} MAD</span>
                </div>
                <Link href="/checkout" onClick={closeCart} className="block w-full py-4 bg-accent text-white font-sans text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-opacity text-center">
                  {t('cart.checkout')}
                </Link>
                <p className="text-center text-xs text-faint mt-3">Shipping calculated at checkout</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

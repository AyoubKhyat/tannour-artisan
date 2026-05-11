'use client';

import { useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getProduct } from '@/lib/products';
import { useCart } from '@/lib/cart';
import StitchBorder from '@/components/StitchBorder';
import { ProductViewerSkeleton } from '@/components/SkeletonLoader';

const ProductViewer = dynamic(() => import('@/components/ProductViewer'), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-[80] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] bg-card border border-subtle z-[90] p-8 overflow-y-auto max-h-[80vh] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-serif text-2xl text-accent">Size Guide</h3>
              <button onClick={onClose} className="text-faint hover:text-accent transition-colors" aria-label="Close size guide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-subtle">
                  <th className="text-left py-3 text-accent/60 uppercase tracking-wider text-xs">Size</th>
                  <th className="text-left py-3 text-accent/60 uppercase tracking-wider text-xs">Width</th>
                  <th className="text-left py-3 text-accent/60 uppercase tracking-wider text-xs">Height</th>
                  <th className="text-left py-3 text-accent/60 uppercase tracking-wider text-xs">Depth</th>
                </tr>
              </thead>
              <tbody className="text-secondary">
                <tr className="border-b border-subtle"><td className="py-3">Small</td><td>25cm</td><td>20cm</td><td>10cm</td></tr>
                <tr className="border-b border-subtle"><td className="py-3">Medium</td><td>32cm</td><td>26cm</td><td>12cm</td></tr>
                <tr className="border-b border-subtle"><td className="py-3">Large</td><td>40cm</td><td>32cm</td><td>15cm</td></tr>
                <tr><td className="py-3">One Size</td><td>—</td><td>—</td><td>—</td></tr>
              </tbody>
            </table>
            <p className="text-xs text-faint mt-6">All measurements are approximate. Handcrafted items may vary slightly.</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ProductPage() {
  const params = useParams();
  const product = getProduct(params.id as string);
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-primary mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-accent text-sm tracking-widest uppercase hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, product.colors[selectedColor].name, product.sizes[selectedSize]);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <>
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      <section className="pt-28 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8"
          >
            <Link href="/shop" className="group inline-flex items-center gap-2 text-faint text-xs tracking-widest uppercase hover:text-accent transition-colors">
              <span className="group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span>
              <span>Back to Shop</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            {/* 3D Viewer with clip reveal */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1, delay: 0.2, ease }}
            >
              <Suspense fallback={<ProductViewerSkeleton />}>
                <div role="img" aria-label={`360-degree view of ${product.nameFr}`}>
                <ProductViewer
                  color={product.colors[selectedColor].hex}
                  category={product.category}
                />
                </div>
              </Suspense>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-center text-faint text-xs mt-4 tracking-wider"
              >
                Drag to rotate · 360° View
              </motion.p>
            </motion.div>

            {/* Product Info — staggered reveal */}
            <div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
                className="w-10 h-px bg-accent/30 mb-4 origin-left"
              />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease }}
                className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-3 font-sans"
              >
                {product.category}
              </motion.p>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.4, duration: 0.9, ease }}
                  className="font-serif text-4xl md:text-5xl text-primary tracking-wider"
                >
                  {product.nameFr}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease }}
                className="text-faint text-lg mt-2 font-sans"
                dir="rtl"
              >
                {product.nameDarija}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5, ease }}
              >
                <p className="text-accent font-serif text-3xl mt-6">
                  {product.price.toLocaleString()} <span className="text-lg text-accent/50">MAD</span>
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease }}
                className="text-secondary leading-relaxed mt-6 text-sm"
              >
                {product.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease }}
                className="mt-8 relative"
              >
                <StitchBorder />
                <div className="absolute inset-0 p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <p className="text-xs text-faint tracking-widest uppercase mb-3">
                      Leather: {product.colors[selectedColor].name}
                    </p>
                    <div className="flex gap-3">
                      {product.colors.map((color, i) => (
                        <motion.button
                          key={color.name}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColor(i)}
                          aria-label={`Select ${color.name} leather`}
                          aria-pressed={i === selectedColor}
                          className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                            i === selectedColor ? 'border-accent scale-110' : 'border-subtle hover:border-accent/50'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-faint tracking-widest uppercase">Size</p>
                      <button
                        onClick={() => setSizeGuideOpen(true)}
                        className="text-xs text-accent/50 underline hover:text-accent transition-colors"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size, i) => (
                        <motion.button
                          key={size}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(i)}
                          aria-pressed={i === selectedSize}
                          className={`px-4 py-2 text-xs tracking-wider border transition-all duration-300 ${
                            i === selectedSize
                              ? 'bg-accent text-white border-accent'
                              : 'border-subtle text-secondary hover:border-subtle-strong'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.6, ease }}
              >
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full mt-8 py-5 text-sm tracking-[0.3em] uppercase transition-all duration-500 ${
                    addedAnimation
                      ? 'bg-green-700 text-white border border-green-600'
                      : 'bg-accent text-white hover:bg-accent/90'
                  }`}
                >
                  {addedAnimation ? '✓ Added to Bag' : 'Add to Bag'}
                </motion.button>
              </motion.div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                {[
                  { label: 'Handcrafted', sub: 'By artisans' },
                  { label: 'Vegetable-Tanned', sub: 'Natural process' },
                  { label: 'Free Shipping', sub: 'Morocco-wide' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease }}
                    whileHover={{ y: -3 }}
                    className="py-4 border border-subtle bg-surface-alt/30"
                  >
                    <p className="text-xs text-accent/70 tracking-wider">{item.label}</p>
                    <p className="text-[10px] text-faint mt-1">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

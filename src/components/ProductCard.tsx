'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { useToast } from '@/lib/toast';
import { useQuickView } from '@/lib/quickview';
import { useI18n } from '@/lib/i18n';
import { getAverageRating, getReviewCount } from '@/lib/reviews';
import WishlistButton from '@/components/WishlistButton';
import StarRating from '@/components/StarRating';

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { show } = useToast();
  const { open: openQuickView } = useQuickView();
  const { t } = useI18n();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * 15, y: x * 15 });
  };

  const handleAdd = () => {
    addItem(product, product.colors[0].name, product.sizes[0]);
    show(`${product.nameFr} ${t('product.addedToBag')}`);
  };

  const categoryIcon: Record<string, string> = { bags: '👜', wallets: '💳', belts: '〰️', accessories: '✦' };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setRotation({ x: 0, y: 0 }); setIsHovered(false); }}
        className="group relative"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative bg-card border border-subtle overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, transformStyle: 'preserve-3d', transition: isHovered ? 'none' : 'transform 0.5s ease' }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{ background: `linear-gradient(${105 + rotation.y * 5}deg, transparent 40%, rgba(200,160,90,0.12) 50%, transparent 60%)` }}
            aria-hidden="true"
          />

          <Link href={`/product/${product.id}`} aria-label={`${t('product.viewDetails')} - ${product.nameFr}`}>
            <div className="aspect-[3/4] bg-surface-alt flex items-center justify-center relative overflow-hidden">
              <span className="text-6xl opacity-20 group-hover:opacity-35 transition-opacity group-hover:scale-110 transform duration-500" aria-hidden="true">{categoryIcon[product.category]}</span>
              <div className="absolute top-3 right-3 text-xs text-accent/40 tracking-widest uppercase font-sans">{product.category}</div>
              <div className="absolute top-3 left-3 z-20">
                <WishlistButton productId={product.id} productName={product.nameFr} size="sm" />
              </div>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); openQuickView(product); }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-card/90 backdrop-blur-sm border border-subtle text-xs tracking-[0.15em] uppercase text-secondary hover:text-accent hover:border-accent transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                aria-label={`${t('product.quickView')} ${product.nameFr}`}
              >
                {t('product.quickView')}
              </button>
            </div>
          </Link>

          <div className="p-5">
            <Link href={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
              <h3 className="font-serif text-lg text-primary group-hover:text-accent transition-colors">{product.nameFr}</h3>
              <p className="text-sm text-faint mt-0.5 font-sans" dir="rtl">{product.nameDarija}</p>
            </Link>
            <div className="flex items-center gap-1.5 mt-2">
              <StarRating rating={getAverageRating(product.id)} size={11} className="text-accent" />
              <span className="text-faint text-[10px]">({getReviewCount(product.id)})</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-accent font-serif text-lg">{product.price.toLocaleString()} <span className="text-xs opacity-50">MAD</span></span>
              <button onClick={handleAdd} className="px-4 py-2 text-xs tracking-[0.15em] uppercase border border-subtle-strong text-accent/70 hover:bg-accent hover:text-white transition-all duration-300" aria-label={`${t('product.add')} ${product.nameFr}`}>{t('product.add')}</button>
            </div>
            <div className="flex gap-1.5 mt-3" aria-hidden="true">
              {product.colors.map((color) => (
                <div key={color.name} className="w-4 h-4 rounded-full border border-subtle-strong" style={{ backgroundColor: color.hex }} title={color.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

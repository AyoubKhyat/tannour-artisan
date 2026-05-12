'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { products, ProductCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ShopFilters from '@/components/ShopFilters';
import Marquee from '@/components/Marquee';
import { useI18n } from '@/lib/i18n';

const ease = [0.22, 1, 0.36, 1] as const;
const MIN_PRICE = 0;
const MAX_PRICE = 3500;

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('default');
  const { t, dir } = useI18n();

  const categories: { key: ProductCategory | 'all'; label: string }[] = [
    { key: 'all', label: t('shop.all') },
    { key: 'bags', label: t('shop.bags') },
    { key: 'wallets', label: t('shop.wallets') },
    { key: 'belts', label: t('shop.belts') },
    { key: 'accessories', label: t('shop.accessories') },
  ];

  const handleSearchChange = useCallback((q: string) => setSearchQuery(q), []);
  const handlePriceChange = useCallback((r: [number, number]) => setPriceRange(r), []);
  const handleSortChange = useCallback((s: string) => setSortBy(s), []);

  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) =>
        p.nameFr.toLowerCase().includes(q) ||
        p.nameDarija.includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'name-asc': result = [...result].sort((a, b) => a.nameFr.localeCompare(b.nameFr)); break;
      case 'name-desc': result = [...result].sort((a, b) => b.nameFr.localeCompare(a.nameFr)); break;
    }

    return result;
  }, [activeCategory, searchQuery, priceRange, sortBy]);

  const hasFilters = searchQuery.trim() !== '' || priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE || sortBy !== 'default';

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <div dir={dir}>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden bg-surface">
        <div className="absolute inset-0 leather-grain" />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 1px, transparent 0, transparent 50%)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Corner frames */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" aria-hidden="true">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 1, ease }} className="absolute top-24 left-10 right-10 h-px bg-accent/8 origin-left" />
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 1, ease }} className="absolute bottom-8 left-10 right-10 h-px bg-accent/8 origin-right" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute top-[92px] left-8 w-3 h-3 border-t border-l border-accent/15" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }} className="absolute top-[92px] right-8 w-3 h-3 border-t border-r border-accent/15" />
        </div>

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease }}
              className="w-12 h-px bg-accent/30 mx-auto mb-6 origin-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.15, duration: 0.7, ease }}
              className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-4 font-sans"
            >
              {t('shop.label')}
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '120%', rotateX: 30 }}
                animate={{ y: '0%', rotateX: 0 }}
                transition={{ delay: 0.25, duration: 1.1, ease }}
                className="font-serif text-5xl md:text-7xl text-primary tracking-wider"
                style={{ transformOrigin: 'bottom' }}
              >
                {t('shop.title')}
              </motion.h1>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease }}
              className="w-32 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto mt-5 mb-5"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease }}
              className="text-secondary text-sm tracking-[0.2em] uppercase font-sans"
            >
              {t('shop.subtitle')}
            </motion.p>
          </div>
        </motion.div>
      </section>

      <section className="pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center gap-2 md:gap-4 mb-8 flex-wrap"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease }}
                onClick={() => setActiveCategory(cat.key)}
                aria-pressed={activeCategory === cat.key}
                className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                  activeCategory === cat.key
                    ? 'bg-accent text-white border-accent'
                    : 'border-subtle text-faint hover:border-subtle-strong hover:text-accent'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Search, Price, Sort */}
          <ShopFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            minPrice={MIN_PRICE}
            maxPrice={MAX_PRICE}
          />

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-faint text-xs tracking-wider mb-6"
          >
            {t('shop.showing', { count: filtered.length, total: products.length })}
          </motion.p>

          <div aria-live="polite" className="sr-only">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} shown
          </div>

          {/* Product Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              {searchQuery.trim() ? (
                <>
                  <p className="text-faint text-sm tracking-widest uppercase mb-4">{t('shop.noMatch')} &ldquo;{searchQuery}&rdquo;</p>
                  <button onClick={() => { setSearchQuery(''); }} className="text-xs text-accent underline hover:no-underline">{t('shop.clearSearch')}</button>
                </>
              ) : hasFilters ? (
                <>
                  <p className="text-faint text-sm tracking-widest uppercase mb-4">{t('shop.noRange')}</p>
                  <button onClick={() => { setPriceRange([MIN_PRICE, MAX_PRICE]); setSortBy('default'); }} className="text-xs text-accent underline hover:no-underline">{t('shop.resetFilters')}</button>
                </>
              ) : (
                <p className="text-faint text-sm tracking-widest uppercase">{t('shop.noCategory')}</p>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Marquee />
    </div>
  );
}

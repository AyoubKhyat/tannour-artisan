'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, ProductCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ShopFilters from '@/components/ShopFilters';
import Marquee from '@/components/Marquee';

const ease = [0.22, 1, 0.36, 1] as const;
const MIN_PRICE = 0;
const MAX_PRICE = 3500;

const categories: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'bags', label: 'Bags' },
  { key: 'wallets', label: 'Wallets' },
  { key: 'belts', label: 'Belts' },
  { key: 'accessories', label: 'Accessories' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('default');

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

  return (
    <>
      <section className="pt-32 pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
              Collection
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.25, duration: 0.9, ease }}
                className="font-serif text-5xl md:text-6xl text-primary tracking-wider"
              >
                The Shop
              </motion.h1>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto mt-5"
            />
          </div>

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
            Showing {filtered.length} of {products.length} pieces
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
                  <p className="text-faint text-sm tracking-widest uppercase mb-4">No pieces match &ldquo;{searchQuery}&rdquo;</p>
                  <button onClick={() => { setSearchQuery(''); }} className="text-xs text-accent underline hover:no-underline">Clear search</button>
                </>
              ) : hasFilters ? (
                <>
                  <p className="text-faint text-sm tracking-widest uppercase mb-4">No pieces in this price range</p>
                  <button onClick={() => { setPriceRange([MIN_PRICE, MAX_PRICE]); setSortBy('default'); }} className="text-xs text-accent underline hover:no-underline">Reset filters</button>
                </>
              ) : (
                <p className="text-faint text-sm tracking-widest uppercase">No products in this category</p>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Marquee />
    </>
  );
}

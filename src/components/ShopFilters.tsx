'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

interface ShopFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  minPrice: number;
  maxPrice: number;
}

function DualRangeSlider({ min, max, value, onChange }: {
  min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const leftPct = ((value[0] - min) / (max - min)) * 100;
  const rightPct = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="relative h-8 flex items-center">
      <div ref={trackRef} className="absolute left-0 right-0 h-px bg-subtle" />
      <div className="absolute h-px bg-accent/50" style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }} />
      <input
        type="range"
        min={min}
        max={max}
        step={50}
        value={value[0]}
        onChange={(e) => {
          const v = Math.min(Number(e.target.value), value[1] - 50);
          onChange([v, value[1]]);
        }}
        className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-card [&::-moz-range-thumb]:cursor-grab [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent"
        aria-label="Minimum price"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={50}
        value={value[1]}
        onChange={(e) => {
          const v = Math.max(Number(e.target.value), value[0] + 50);
          onChange([value[0], v]);
        }}
        className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-card [&::-moz-range-thumb]:cursor-grab [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent"
        aria-label="Maximum price"
      />
    </div>
  );
}

export default function ShopFilters({
  searchQuery, onSearchChange,
  priceRange, onPriceRangeChange,
  sortBy, onSortChange,
  minPrice, maxPrice,
}: ShopFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => onSearchChange(localSearch), 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const hasActiveFilters = searchQuery.trim() !== '' || priceRange[0] > minPrice || priceRange[1] < maxPrice || sortBy !== 'default';
  const activeCount = [
    searchQuery.trim() !== '',
    priceRange[0] > minPrice || priceRange[1] < maxPrice,
    sortBy !== 'default',
  ].filter(Boolean).length;

  const clearAll = () => {
    setLocalSearch('');
    onSearchChange('');
    onPriceRangeChange([minPrice, maxPrice]);
    onSortChange('default');
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-0 top-1/2 -translate-y-1/2 text-faint" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search by name, material..."
          className="w-full bg-transparent border-b border-subtle text-primary font-sans text-sm py-3 pl-7 pr-8 placeholder:text-faint focus:border-accent focus:outline-none transition-colors"
          aria-label="Search products"
        />
        {localSearch && (
          <button
            onClick={() => { setLocalSearch(''); onSearchChange(''); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-faint hover:text-accent transition-colors"
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Price Range + Sort */}
      <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
        <div className="flex-1">
          <p className="text-xs text-faint tracking-[0.2em] uppercase mb-2">Price Range</p>
          <DualRangeSlider min={minPrice} max={maxPrice} value={priceRange} onChange={onPriceRangeChange} />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-faint">{priceRange[0].toLocaleString()} MAD</span>
            <span className="text-xs text-faint">{priceRange[1].toLocaleString()} MAD</span>
          </div>
        </div>

        <div className="md:w-48">
          <label htmlFor="sort-select" className="block text-xs text-faint tracking-[0.2em] uppercase mb-2">Sort by</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full bg-transparent border border-subtle text-secondary text-xs tracking-wider px-4 py-2.5 focus:border-accent focus:outline-none transition-colors appearance-none"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
          </select>
        </div>
      </div>

      {/* Active filter pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {searchQuery.trim() && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-accent/20 text-accent/60 text-xs tracking-wider">
              &ldquo;{searchQuery}&rdquo;
              <button onClick={() => { setLocalSearch(''); onSearchChange(''); }} aria-label="Remove search filter" className="hover:text-accent">×</button>
            </span>
          )}
          {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-accent/20 text-accent/60 text-xs tracking-wider">
              {priceRange[0].toLocaleString()}–{priceRange[1].toLocaleString()} MAD
              <button onClick={() => onPriceRangeChange([minPrice, maxPrice])} aria-label="Remove price filter" className="hover:text-accent">×</button>
            </span>
          )}
          {sortBy !== 'default' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-accent/20 text-accent/60 text-xs tracking-wider">
              {sortBy.replace('-', ': ').replace('asc', '↑').replace('desc', '↓')}
              <button onClick={() => onSortChange('default')} aria-label="Remove sort" className="hover:text-accent">×</button>
            </span>
          )}
          <button onClick={clearAll} className="text-xs text-faint hover:text-accent transition-colors underline">Clear all</button>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mb-10"
    >
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex items-center gap-2 mx-auto mb-4 px-4 py-2 border border-subtle text-xs text-secondary tracking-[0.2em] uppercase hover:border-accent/40 transition-colors"
        aria-expanded={mobileOpen}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filters
        {activeCount > 0 && (
          <span className="w-4 h-4 bg-accent text-white text-[10px] rounded-full flex items-center justify-center">{activeCount}</span>
        )}
      </button>

      {/* Desktop: always visible */}
      <div className="hidden md:block">{filterContent}</div>

      {/* Mobile: collapsible */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="md:hidden overflow-hidden"
          >
            {filterContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/products';

const cities = [
  'Casablanca', 'Rabat', 'Fes', 'Tangier', 'Agadir',
  'Essaouira', 'Chefchaouen', 'Ouarzazate', 'Meknes', 'Tetouan',
  'Paris', 'Lyon', 'Dubai', 'London', 'Brussels',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMinutesAgo(): string {
  const mins = Math.floor(Math.random() * 45) + 2;
  return `${mins} min ago`;
}

interface Notification {
  id: number;
  city: string;
  product: string;
  time: string;
}

export default function SocialProof() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [counter, setCounter] = useState(0);

  const showNotification = useCallback(() => {
    const product = randomItem(products);
    setNotification({
      id: Date.now(),
      city: randomItem(cities),
      product: product.nameFr,
      time: randomMinutesAgo(),
    });
    setCounter((c) => c + 1);

    setTimeout(() => setNotification(null), 5000);
  }, []);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('tannour-social-proof-off');
    if (dismissed) return;

    const initialDelay = setTimeout(() => {
      showNotification();
    }, 18000);

    return () => clearTimeout(initialDelay);
  }, [showNotification]);

  useEffect(() => {
    if (counter === 0) return;
    const dismissed = sessionStorage.getItem('tannour-social-proof-off');
    if (dismissed) return;
    if (counter >= 5) return;

    const interval = setTimeout(() => {
      showNotification();
    }, 35000 + Math.random() * 25000);

    return () => clearTimeout(interval);
  }, [counter, showNotification]);

  const dismiss = () => {
    setNotification(null);
    sessionStorage.setItem('tannour-social-proof-off', '1');
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key={notification.id}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 250 }}
          className="fixed bottom-20 left-4 z-[70] max-w-xs bg-card border border-subtle shadow-xl backdrop-blur-md overflow-hidden"
        >
          <div className="flex items-start gap-3 p-4">
            <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-primary text-sm leading-snug">
                Someone in <span className="text-accent font-medium">{notification.city}</span> purchased
              </p>
              <p className="text-accent/80 text-xs font-serif mt-0.5 truncate">{notification.product}</p>
              <p className="text-faint text-[10px] mt-1.5 tracking-wider">{notification.time}</p>
            </div>
            <button
              onClick={dismiss}
              className="text-faint hover:text-accent transition-colors shrink-0 -mt-1 -mr-1 p-1"
              aria-label="Dismiss"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-0.5 bg-accent/30 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

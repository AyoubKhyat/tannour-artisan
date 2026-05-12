'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t, dir } = useI18n();

  useEffect(() => {
    const consent = localStorage.getItem('tannour-cookies');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const respond = (choice: 'accepted' | 'declined') => {
    localStorage.setItem('tannour-cookies', choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[90] border-t border-subtle shadow-2xl backdrop-blur-md"
          style={{ backgroundColor: 'var(--nav-bg)' }}
          role="dialog"
          aria-label="Cookie consent"
          dir={dir}
        >
          <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                <circle cx="15" cy="7" r="1" fill="currentColor" />
                <circle cx="10" cy="15" r="1.5" fill="currentColor" />
                <circle cx="16" cy="13" r="1" fill="currentColor" />
                <circle cx="13" cy="11" r="1" fill="currentColor" />
              </svg>
              <div>
                <p className="text-primary text-sm">{t('cookie.message')}</p>
                <p className="text-faint text-xs mt-0.5">{t('cookie.detail')}</p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => respond('declined')}
                className="px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-secondary border border-subtle hover:border-accent hover:text-accent transition-colors"
              >
                {t('cookie.decline')}
              </button>
              <button
                onClick={() => respond('accepted')}
                className="px-5 py-2.5 text-xs tracking-[0.15em] uppercase bg-accent text-white hover:bg-accent/90 transition-colors"
              >
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import en from './translations/en';
import fr from './translations/fr';
import ar from './translations/ar';

export type Locale = 'en' | 'fr' | 'ar';

const translations: Record<Locale, Record<string, string>> = { en, fr, ar };

export const localeNames: Record<Locale, string> = { en: 'EN', fr: 'FR', ar: 'عربي' };
export const locales: Locale[] = ['en', 'fr', 'ar'];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('tannour-locale') as Locale | null;
      if (stored && locales.includes(stored)) setLocaleState(stored);
    } catch {}
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem('tannour-locale', l); } catch {}
    document.documentElement.lang = l === 'ar' ? 'ar' : l === 'fr' ? 'fr' : 'en';
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    let str = translations[locale][key] || translations.en[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  }, [locale]);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}

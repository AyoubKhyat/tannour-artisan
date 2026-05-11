'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [nlState, setNlState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNlState('error');
      return;
    }
    setNlState('sending');
    await new Promise((r) => setTimeout(r, 1000));
    setNlState('sent');
    setEmail('');
  };

  return (
    <footer className="relative bg-obsidian border-t border-subtle leather-grain" aria-label="Site footer">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Newsletter */}
        <div className="text-center mb-16 pb-16 border-b border-gold/10">
          <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3 font-sans">Stay Connected</p>
          <h2 className="font-serif text-2xl md:text-3xl text-gold tracking-wider mb-3">Join Our World</h2>
          <p className="text-ivory/40 text-sm max-w-md mx-auto mb-8">
            New collections, artisan stories, and exclusive offers delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (nlState === 'error') setNlState('idle'); }}
              placeholder="your@email.com"
              className={`flex-1 bg-transparent border-b ${nlState === 'error' ? 'border-red-500' : 'border-gold/30'} py-3 px-1 text-ivory text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-ivory/20`}
            />
            <AnimatePresence mode="wait">
              {nlState === 'sent' ? (
                <motion.span
                  key="merci"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-3 text-gold text-sm tracking-[0.2em] uppercase"
                >
                  Merci!
                </motion.span>
              ) : (
                <motion.button
                  key="subscribe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="submit"
                  disabled={nlState === 'sending'}
                  className="px-6 py-3 border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors disabled:opacity-50"
                >
                  {nlState === 'sending' ? '...' : 'Subscribe'}
                </motion.button>
              )}
            </AnimatePresence>
          </form>
          {nlState === 'error' && (
            <p className="text-red-400 text-xs mt-2">Please enter a valid email address.</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl tracking-[0.3em] text-gold uppercase mb-4">Tannour</h2>
            <p className="text-ivory/50 text-sm leading-relaxed max-w-md">
              Born in the ancient tanneries of Marrakesh, each piece carries centuries of craft tradition. Vegetable-tanned, hand-stitched, made to endure.
            </p>
          </div>
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-gold/80 mb-6">Navigation</h3>
            <div className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop' },
                { href: '/craft', label: 'Our Craft' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQ & Returns' },
                { href: '/orders', label: 'Orders' },
                { href: '/wishlist', label: 'Wishlist' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-ivory/40 hover:text-gold transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-gold/80 mb-6">Contact</h3>
            <div className="flex flex-col gap-3 text-sm text-ivory/40">
              <p>Derb Dabachi, Medina</p>
              <p>Marrakesh 40000, Morocco</p>
              <a href="mailto:contact@tannour.ma" className="hover:text-gold transition-colors">contact@tannour.ma</a>
              <a href="tel:+212524000000" className="hover:text-gold transition-colors">+212 524 000 000</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gold/10">
          <p className="text-xs text-ivory/30 tracking-wider">&copy; 2024 TANNOUR. All rights reserved.</p>
          <div className="mt-6 md:mt-0" aria-hidden="true">
            <svg className="w-16 h-16 text-gold/30 animate-spin-slow" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <text className="text-[6px] uppercase tracking-[0.3em]" fill="currentColor">
                <textPath href="#stampCircle" startOffset="0%">Made in Marrakesh · Fait à Marrakech · صنع في مراكش · </textPath>
              </text>
              <defs><path id="stampCircle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" /></defs>
              <text className="font-serif text-[12px]" fill="currentColor" textAnchor="middle" x="50" y="54">T</text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

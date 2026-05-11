'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-obsidian border-t border-subtle leather-grain" aria-label="Site footer">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
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
              {[{ href: '/', label: 'Home' }, { href: '/shop', label: 'Shop' }, { href: '/craft', label: 'Our Craft' }].map((link) => (
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

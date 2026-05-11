'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const sections = [
  {
    title: 'Shipping & Delivery',
    items: [
      { q: 'How long does shipping take?', a: 'Within Morocco, orders ship in 2-4 business days. International shipping takes 7-14 business days depending on destination.' },
      { q: 'Do you offer free shipping?', a: 'Yes — all orders within Morocco ship free. International orders over 3,000 MAD also qualify for free shipping.' },
      { q: 'Can I track my order?', a: 'Absolutely. You\'ll receive a tracking number via email once your order ships. You can also check your order status on our Orders page.' },
    ],
  },
  {
    title: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unused items in original condition. Items must be unworn and in their original packaging.' },
      { q: 'How do I start a return?', a: 'Email contact@tannour.ma with your order number and reason for return. We\'ll send you a prepaid return label within 24 hours.' },
      { q: 'Can I exchange for a different size or color?', a: 'Yes, exchanges are free within Morocco. Simply initiate a return and place a new order, or contact us and we\'ll handle it for you.' },
    ],
  },
  {
    title: 'Product & Care',
    items: [
      { q: 'How do I care for my leather goods?', a: 'Apply a natural leather conditioner every 3-6 months. Avoid prolonged exposure to water or direct sunlight. Store in the dust bag provided. Your piece will develop a beautiful patina over time.' },
      { q: 'Are your products truly handmade?', a: 'Every TANNOUR piece is handcrafted by our artisans in Marrakesh. From tanning to stitching, no machines are used in the production process.' },
      { q: 'What is vegetable tanning?', a: 'Vegetable tanning uses natural tannins from tree bark instead of chemicals. It takes weeks longer but produces leather that\'s more durable, develops a rich patina, and is better for the environment.' },
      { q: 'Do your products come with a warranty?', a: 'Yes. All TANNOUR products carry a 2-year warranty against manufacturing defects. This covers stitching, hardware, and structural integrity.' },
    ],
  },
  {
    title: 'Orders & Payment',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), bank transfers, and cash on delivery within Morocco.' },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, the artisans may have already begun preparing your piece.' },
    ],
  },
];

function AccordionItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-subtle">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-primary text-sm pr-4 group-hover:text-accent transition-colors">{question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent/50 shrink-0"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-secondary text-sm leading-relaxed pb-5 pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-3 font-sans">Help Center</p>
          <h1 className="font-serif text-4xl md:text-6xl text-primary tracking-wider">FAQ & Returns</h1>
          <p className="text-secondary text-sm mt-4 max-w-md mx-auto">
            Everything you need to know about your TANNOUR purchase.
          </p>
        </motion.div>

        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.1, duration: 0.5, ease }}
            className="mb-12"
          >
            <h2 className="text-xs text-accent/60 tracking-[0.3em] uppercase mb-4 font-sans">{section.title}</h2>
            <div className="border-t border-subtle">
              {section.items.map((item, qi) => {
                const key = `${si}-${qi}`;
                return (
                  <AccordionItem
                    key={key}
                    question={item.q}
                    answer={item.a}
                    isOpen={openItems.has(key)}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease }}
          className="text-center mt-16 p-8 border border-subtle bg-card"
        >
          <p className="text-primary text-sm mb-1">Still have questions?</p>
          <p className="text-faint text-xs mb-4">Our team responds within 24 hours.</p>
          <a
            href="mailto:contact@tannour.ma"
            className="inline-block px-8 py-3 border border-accent/30 text-accent text-xs tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all duration-500"
          >
            Email Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

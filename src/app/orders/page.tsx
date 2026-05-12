'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getOrders, Order } from '@/lib/orders';
import { useI18n } from '@/lib/i18n';

const ease = [0.22, 1, 0.36, 1] as const;

const statusColor: Record<string, string> = {
  confirmed: 'text-accent border-accent/30',
  processing: 'text-yellow-600 border-yellow-600/30',
  shipped: 'text-green-600 border-green-600/30',
};

export default function OrdersPage() {
  const { t, dir } = useI18n();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <section dir={dir} className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-3 font-sans">{t('orders.label')}</p>
          <h1 className="font-serif text-4xl md:text-6xl text-primary tracking-wider">{t('orders.title')}</h1>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
            className="text-center py-20"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-faint/30 mb-6" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p className="text-secondary text-lg mb-2">{t('orders.empty')}</p>
            <p className="text-faint text-sm mb-8">Your order history will appear here after your first purchase.</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-4 bg-accent text-white text-sm tracking-[0.3em] uppercase hover:bg-accent/90 transition-colors"
            >
              {t('orders.startShopping')}
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                className="border border-subtle bg-card p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-subtle">
                  <div>
                    <p className="text-primary font-serif text-lg">Order #{order.id}</p>
                    <p className="text-faint text-xs mt-0.5">
                      {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`text-[10px] tracking-[0.2em] uppercase border px-3 py-1 self-start ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, j) => (
                    <div key={j} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <span className="text-primary">{item.name}</span>
                        <span className="text-faint ml-2">{item.color} · {item.size} × {item.quantity}</span>
                      </div>
                      <span className="text-secondary">{(item.price * item.quantity).toLocaleString()} MAD</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-3 border-t border-subtle">
                  <span className="text-xs text-faint tracking-widest uppercase">Total</span>
                  <span className="text-accent font-serif">{order.total.toLocaleString()} MAD</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

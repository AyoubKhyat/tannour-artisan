'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart';
import {
  CheckoutFormData, initialFormData,
  validateField, validateAll,
  formatCardNumber, formatExpiry, mockProcessOrder,
} from '@/lib/checkout';
import { saveOrder } from '@/lib/orders';

const ease = [0.22, 1, 0.36, 1] as const;

type Stage = 'form' | 'processing' | 'confirmed';

function Input({ label, name, value, error, type = 'text', onChange, autoComplete }: {
  label: string; name: string; value: string; error?: string;
  type?: string; onChange: (name: string, value: string) => void; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs tracking-[0.2em] uppercase text-faint font-sans mb-2">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full bg-transparent border-b border-subtle text-primary font-sans text-sm py-3 placeholder:text-faint focus:border-accent focus:outline-none transition-colors"
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <p id={`${name}-error`} className="text-red-500 text-xs mt-1" role="alert">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [stage, setStage] = useState<Stage>('form');
  const [orderId, setOrderId] = useState('');

  const handleChange = (name: string, value: string) => {
    let formatted = value;
    if (name === 'cardNumber') formatted = formatCardNumber(value);
    if (name === 'expiry') formatted = formatExpiry(value);
    if (name === 'cvv') formatted = value.replace(/\D/g, '').slice(0, 4);

    setForm((prev) => ({ ...prev, [name]: formatted }));
    if (touched.has(name)) {
      const err = validateField(name as keyof CheckoutFormData, formatted);
      setErrors((prev) => ({ ...prev, [name]: err || undefined }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => new Set(prev).add(name));
    const err = validateField(name as keyof CheckoutFormData, form[name as keyof CheckoutFormData]);
    setErrors((prev) => ({ ...prev, [name]: err || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validateAll(form);
    setErrors(allErrors);
    setTouched(new Set(Object.keys(form)));
    if (Object.keys(allErrors).length > 0) return;

    setStage('processing');
    const result = await mockProcessOrder();
    setOrderId(result.orderId);
    saveOrder(result.orderId, items, totalPrice);
    clearCart();
    setStage('confirmed');
  };

  if (items.length === 0 && stage === 'form') {
    return (
      <section className="pt-32 pb-20 px-6 min-h-screen">
        <div className="max-w-md mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-faint" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <h1 className="font-serif text-3xl text-primary mt-6 tracking-wider">Your Bag is Empty</h1>
            <p className="text-secondary text-sm mt-3">Add some pieces before checking out.</p>
            <Link href="/shop" className="inline-block mt-8 px-10 py-4 border border-accent/30 text-accent text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-white transition-all duration-500">
              Browse Collection
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease }} className="mb-8">
          <Link href="/shop" className="group inline-flex items-center gap-2 text-faint text-xs tracking-widest uppercase hover:text-accent transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span>
            <span>Continue Shopping</span>
          </Link>
        </motion.div>

        <div className="text-center mb-12">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease }} className="w-12 h-px bg-accent/30 mx-auto mb-6 origin-center" />
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ delay: 0.2, duration: 0.9, ease }} className="font-serif text-4xl md:text-5xl text-primary tracking-wider">
              Checkout
            </motion.h1>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {stage === 'confirmed' ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full border-2 border-accent mx-auto flex items-center justify-center mb-8"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
              <h2 className="font-serif text-3xl text-primary tracking-wider mb-3">Thank You</h2>
              <p className="text-secondary text-sm mb-2">Your order has been placed successfully.</p>
              <p className="text-accent font-serif text-lg mb-8">Order #{orderId}</p>
              <p className="text-faint text-xs mb-8">This is a demo — no real payment was processed.</p>
              <Link href="/shop" className="inline-block px-10 py-4 border border-accent/30 text-accent text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-white transition-all duration-500">
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                {/* Form */}
                <div className="lg:col-span-3">
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Contact */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, ease }}
                      className="mb-10"
                    >
                      <h2 className="font-serif text-xl text-primary tracking-wider mb-6">Contact Information</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div onBlur={() => handleBlur('email')} className="sm:col-span-2">
                          <Input label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} autoComplete="email" />
                        </div>
                        <div onBlur={() => handleBlur('phone')} className="sm:col-span-2">
                          <Input label="Phone" name="phone" type="tel" value={form.phone} error={errors.phone} onChange={handleChange} autoComplete="tel" />
                        </div>
                      </div>
                    </motion.div>

                    <div className="w-full h-px bg-accent/10 mb-10" />

                    {/* Shipping */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.6, ease }}
                      className="mb-10"
                    >
                      <h2 className="font-serif text-xl text-primary tracking-wider mb-6">Shipping Address</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div onBlur={() => handleBlur('firstName')}>
                          <Input label="First Name" name="firstName" value={form.firstName} error={errors.firstName} onChange={handleChange} autoComplete="given-name" />
                        </div>
                        <div onBlur={() => handleBlur('lastName')}>
                          <Input label="Last Name" name="lastName" value={form.lastName} error={errors.lastName} onChange={handleChange} autoComplete="family-name" />
                        </div>
                        <div onBlur={() => handleBlur('address')} className="sm:col-span-2">
                          <Input label="Address" name="address" value={form.address} error={errors.address} onChange={handleChange} autoComplete="street-address" />
                        </div>
                        <div onBlur={() => handleBlur('city')}>
                          <Input label="City" name="city" value={form.city} error={errors.city} onChange={handleChange} autoComplete="address-level2" />
                        </div>
                        <div onBlur={() => handleBlur('postalCode')}>
                          <Input label="Postal Code" name="postalCode" value={form.postalCode} error={errors.postalCode} onChange={handleChange} autoComplete="postal-code" />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="country" className="block text-xs tracking-[0.2em] uppercase text-faint font-sans mb-2">Country</label>
                          <select
                            id="country"
                            name="country"
                            value={form.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            autoComplete="country-name"
                            className="w-full bg-transparent border-b border-subtle text-primary font-sans text-sm py-3 focus:border-accent focus:outline-none transition-colors appearance-none"
                          >
                            <option value="Morocco">Morocco</option>
                            <option value="France">France</option>
                            <option value="Spain">Spain</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Germany">Germany</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>

                    <div className="w-full h-px bg-accent/10 mb-10" />

                    {/* Payment */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6, ease }}
                      className="mb-10"
                    >
                      <h2 className="font-serif text-xl text-primary tracking-wider mb-2">Payment</h2>
                      <p className="text-faint text-xs mb-6">This is a demo — no real payment will be processed.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div onBlur={() => handleBlur('cardNumber')} className="sm:col-span-2">
                          <Input label="Card Number" name="cardNumber" value={form.cardNumber} error={errors.cardNumber} onChange={handleChange} autoComplete="cc-number" />
                        </div>
                        <div onBlur={() => handleBlur('expiry')}>
                          <Input label="Expiry (MM/YY)" name="expiry" value={form.expiry} error={errors.expiry} onChange={handleChange} autoComplete="cc-exp" />
                        </div>
                        <div onBlur={() => handleBlur('cvv')}>
                          <Input label="CVV" name="cvv" value={form.cvv} error={errors.cvv} onChange={handleChange} autoComplete="cc-csc" />
                        </div>
                        <div onBlur={() => handleBlur('nameOnCard')} className="sm:col-span-2">
                          <Input label="Name on Card" name="nameOnCard" value={form.nameOnCard} error={errors.nameOnCard} onChange={handleChange} autoComplete="cc-name" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.75, duration: 0.6, ease }}
                    >
                      <button
                        type="submit"
                        disabled={stage === 'processing'}
                        className="w-full py-5 bg-accent text-white text-sm tracking-[0.3em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {stage === 'processing' ? (
                          <span className="inline-flex items-center gap-3">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Processing...
                          </span>
                        ) : (
                          `Place Order · ${totalPrice.toLocaleString()} MAD`
                        )}
                      </button>
                    </motion.div>
                  </form>
                </div>

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease }}
                  className="lg:col-span-2"
                >
                  <div className="lg:sticky lg:top-28 bg-card border border-subtle p-8">
                    <h2 className="font-serif text-xl text-primary tracking-wider mb-6">Order Summary</h2>

                    <div className="flex flex-col gap-4 mb-6">
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-4">
                          <div className="w-14 h-14 bg-surface-alt rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-lg text-accent/40 font-serif" aria-hidden="true">{item.product.nameFr[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-sm text-primary truncate">{item.product.nameFr}</p>
                            <p className="text-xs text-faint mt-0.5">{item.color} · {item.size} · Qty {item.quantity}</p>
                          </div>
                          <p className="text-sm text-accent whitespace-nowrap">{(item.product.price * item.quantity).toLocaleString()} MAD</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-subtle pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Subtotal</span>
                        <span className="text-primary">{totalPrice.toLocaleString()} MAD</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Shipping</span>
                        <span className="text-accent text-xs tracking-wider uppercase">Free</span>
                      </div>
                      <div className="border-t border-subtle pt-3 flex justify-between">
                        <span className="text-sm text-secondary uppercase tracking-wider">Total</span>
                        <span className="text-lg font-serif text-accent">{totalPrice.toLocaleString()} MAD</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

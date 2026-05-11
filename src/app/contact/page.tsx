'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

type FormState = 'idle' | 'sending' | 'sent';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setState('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setState('sent');
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const socials = [
    { label: 'Instagram', href: '#', icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z' },
    { label: 'Facebook', href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
    { label: 'Pinterest', href: '#', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.936.29 1.93.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z' },
  ];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', '35%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden bg-surface">
        <div className="absolute inset-0 leather-grain" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        </div>

        {/* Side text */}
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.8 }} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block" aria-hidden="true">
          <p className="text-faint text-[10px] tracking-[0.4em] uppercase font-sans [writing-mode:vertical-lr] rotate-180">Marrakesh · Morocco</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block" aria-hidden="true">
          <p className="text-faint text-[10px] tracking-[0.4em] uppercase font-sans [writing-mode:vertical-lr]">Atelier · Tannour</p>
        </motion.div>

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease }}
            className="w-16 h-px bg-accent/30 mx-auto mb-8 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-6 font-sans"
          >
            Get in Touch
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '120%', rotateX: 30 }}
              animate={{ y: '0%', rotateX: 0 }}
              transition={{ delay: 0.35, duration: 1.1, ease }}
              className="font-serif text-4xl sm:text-5xl md:text-7xl text-primary tracking-wider"
              style={{ transformOrigin: 'bottom' }}
            >
              Contact
            </motion.h1>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto mt-5 mb-5"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease }}
            className="text-secondary text-sm max-w-lg mx-auto leading-relaxed"
          >
            Visit our atelier in the heart of the Marrakesh medina, or send us a message — we&apos;d love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {state === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl text-primary mb-2">Merci!</h2>
                <p className="text-secondary text-sm">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs text-faint tracking-widest uppercase mb-2">Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-subtle'} py-3 text-primary text-sm focus:outline-none focus:border-accent transition-colors`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs text-faint tracking-widest uppercase mb-2">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-subtle'} py-3 text-primary text-sm focus:outline-none focus:border-accent transition-colors`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs text-faint tracking-widest uppercase mb-2">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className="w-full bg-transparent border-b border-subtle py-3 text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-faint tracking-widest uppercase mb-2">Message *</label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    rows={5}
                    className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-subtle'} py-3 text-primary text-sm focus:outline-none focus:border-accent transition-colors resize-none`}
                    placeholder="Tell us what you need..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={state === 'sending'}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-5 bg-accent text-white text-sm tracking-[0.3em] uppercase hover:bg-accent/90 transition-colors disabled:opacity-60"
                >
                  {state === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="space-y-10"
          >
            {/* Map */}
            <div className="aspect-[4/3] bg-surface-alt border border-subtle overflow-hidden">
              <iframe
                title="TANNOUR Atelier Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-7.995%2C31.625%2C-7.975%2C31.64&layer=mapnik&marker=31.6325%2C-7.985"
                width="100%"
                height="100%"
                className="border-0 grayscale opacity-80"
                loading="lazy"
              />
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs text-accent/60 tracking-widest uppercase mb-3">Visit Us</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Derb Dabachi, Medina<br />
                  Marrakesh 40000<br />
                  Morocco
                </p>
              </div>
              <div>
                <h3 className="text-xs text-accent/60 tracking-widest uppercase mb-3">Reach Out</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <a href="mailto:contact@tannour.ma" className="text-secondary hover:text-accent transition-colors">contact@tannour.ma</a>
                  <a href="tel:+212524000000" className="text-secondary hover:text-accent transition-colors">+212 524 000 000</a>
                </div>
              </div>
              <div>
                <h3 className="text-xs text-accent/60 tracking-widest uppercase mb-3">Hours</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Mon – Sat: 9:00 – 19:00<br />
                  Sunday: Closed
                </p>
              </div>
              <div>
                <h3 className="text-xs text-accent/60 tracking-widest uppercase mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="w-10 h-10 border border-subtle flex items-center justify-center text-secondary hover:text-accent hover:border-accent transition-colors"
                      aria-label={`Follow us on ${s.label}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={s.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
    </>
  );
}

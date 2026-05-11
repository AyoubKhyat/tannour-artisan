'use client';

import { motion } from 'framer-motion';
import { getReviewsForProduct, getAverageRating } from '@/lib/reviews';
import StarRating from '@/components/StarRating';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ReviewSection({ productId }: { productId: string }) {
  const reviews = getReviewsForProduct(productId);
  const avg = getAverageRating(productId);

  return (
    <section className="pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="w-12 h-px bg-accent/30 mx-auto mb-6 origin-center"
        />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="text-center mb-10"
        >
          <p className="text-accent/50 text-xs tracking-[0.5em] uppercase mb-3 font-sans">Feedback</p>
          <h2 className="font-serif text-3xl text-primary tracking-wider mb-4">Customer Reviews</h2>
          <div className="flex items-center justify-center gap-3">
            <StarRating rating={avg} size={18} className="text-accent" />
            <span className="text-primary font-serif text-lg">{avg}</span>
            <span className="text-faint text-sm">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
          </div>
        </motion.div>

        <div className="space-y-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease }}
              className="border border-subtle p-6 bg-card"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-primary text-sm font-sans">{review.author}</p>
                    {review.verified && (
                      <span className="text-accent/60 text-[10px] tracking-wider uppercase border border-accent/20 px-1.5 py-0.5">Verified</span>
                    )}
                  </div>
                  <StarRating rating={review.rating} size={12} className="text-accent mt-1" />
                </div>
                <p className="text-faint text-xs shrink-0">
                  {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <p className="text-secondary text-sm leading-relaxed" dir={/[؀-ۿ]/.test(review.text) ? 'rtl' : 'ltr'}>
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

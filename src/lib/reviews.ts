export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

const reviewPool: Review[] = [
  { id: 'r1', author: 'Sophie M.', rating: 5, date: '2026-03-15', text: 'Absolutely stunning craftsmanship. The leather smell is divine and the stitching is impeccable. Worth every dirham.', verified: true },
  { id: 'r2', author: 'Karim B.', rating: 4, date: '2026-02-28', text: 'Beautiful piece, arrived well-packaged. Slightly larger than expected but the quality is undeniable.', verified: true },
  { id: 'r3', author: 'Marie-Claire D.', rating: 5, date: '2026-04-02', text: 'I bought this as a gift and my husband was thrilled. The patina is already developing beautifully after just a few weeks.', verified: true },
  { id: 'r4', author: 'Youssef A.', rating: 5, date: '2026-01-18', text: 'كالعادة، جودة عالية وحرفية ممتازة. هذا هو المنتج الثالث الذي أشتريه من تنور', verified: true },
  { id: 'r5', author: 'Emma L.', rating: 4, date: '2026-03-22', text: 'Lovely texture and color. The vegetable tanning process really shows — this is genuine artisan work.', verified: false },
  { id: 'r6', author: 'Hassan T.', rating: 5, date: '2026-04-10', text: 'Ordered the cognac and it is even more beautiful in person. Fast shipping within Morocco too.', verified: true },
  { id: 'r7', author: 'Léa P.', rating: 3, date: '2026-02-05', text: 'Good quality but the color was slightly different from what I expected. Customer service was helpful though.', verified: true },
  { id: 'r8', author: 'Omar K.', rating: 5, date: '2026-03-30', text: 'منتج رائع، الجلد ناعم وقوي في نفس الوقت. أنصح به بشدة', verified: true },
];

export function getReviewsForProduct(productId: string): Review[] {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) hash = ((hash << 5) - hash + productId.charCodeAt(i)) | 0;
  const count = 2 + Math.abs(hash % 4);
  const start = Math.abs(hash % reviewPool.length);
  const result: Review[] = [];
  for (let i = 0; i < count; i++) {
    result.push(reviewPool[(start + i) % reviewPool.length]);
  }
  return result;
}

export function getAverageRating(productId: string): number {
  const reviews = getReviewsForProduct(productId);
  if (reviews.length === 0) return 0;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return Math.round(avg * 10) / 10;
}

export function getReviewCount(productId: string): number {
  return getReviewsForProduct(productId).length;
}

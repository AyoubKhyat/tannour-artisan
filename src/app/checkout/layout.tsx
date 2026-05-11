import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase of handcrafted Moroccan leather goods from TANNOUR.',
  openGraph: {
    title: 'Checkout | TANNOUR',
    description: 'Complete your purchase of handcrafted Moroccan leather goods.',
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

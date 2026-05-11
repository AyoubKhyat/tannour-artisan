import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our collection of handcrafted Moroccan leather goods — bags, wallets, belts, and accessories. Vegetable-tanned and hand-stitched in Marrakesh.',
  openGraph: {
    title: 'Shop | TANNOUR',
    description: 'Browse our collection of handcrafted Moroccan leather goods — bags, wallets, belts, and accessories.',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}

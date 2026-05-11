import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Your saved TANNOUR leather goods. Review and manage your wishlist of handcrafted Moroccan pieces.',
  openGraph: {
    title: 'Wishlist | TANNOUR',
    description: 'Your saved TANNOUR leather goods.',
  },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}

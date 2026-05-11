import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product',
  description: 'Explore this handcrafted leather piece from TANNOUR — vegetable-tanned, hand-stitched by Marrakesh artisans. View in 360° and choose your leather and size.',
  openGraph: {
    title: 'Product | TANNOUR',
    description: 'Handcrafted leather goods from the ancient tanneries of Marrakesh. View in 360° and customize.',
  },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}

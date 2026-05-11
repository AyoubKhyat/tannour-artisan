import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order History',
  description: 'View your TANNOUR order history and track your handcrafted leather goods.',
  openGraph: {
    title: 'Order History | TANNOUR',
    description: 'View your TANNOUR order history.',
  },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

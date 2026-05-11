import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ & Returns',
  description: 'Frequently asked questions about TANNOUR leather goods — shipping, returns, care instructions, and more.',
  openGraph: {
    title: 'FAQ & Returns | TANNOUR',
    description: 'Frequently asked questions about TANNOUR leather goods.',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}

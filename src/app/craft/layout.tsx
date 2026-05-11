import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Craft',
  description: 'Seven centuries of leather-making tradition. Discover the ancient vegetable-tanning process, natural dyeing techniques, and the master artisans behind TANNOUR.',
  openGraph: {
    title: 'Our Craft | TANNOUR',
    description: 'Seven centuries of leather-making tradition. Discover the ancient tanning process and master artisans behind TANNOUR.',
  },
};

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return children;
}

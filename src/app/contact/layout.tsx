import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with TANNOUR. Visit our atelier in the Marrakesh medina, send us a message, or connect on social media.',
  openGraph: {
    title: 'Contact | TANNOUR',
    description: 'Get in touch with TANNOUR. Visit our atelier in the Marrakesh medina.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

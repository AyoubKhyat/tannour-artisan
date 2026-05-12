import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0705' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'TANNOUR · Artisan Leather from Marrakesh',
    template: '%s | TANNOUR',
  },
  description: 'Luxury handcrafted leather goods from the ancient tanneries of Marrakesh. Vegetable-tanned, hand-stitched, made to endure.',
  keywords: ['leather goods', 'Marrakesh', 'artisan', 'handcrafted', 'vegetable tanned', 'luxury bags', 'Moroccan leather', 'TANNOUR'],
  authors: [{ name: 'TANNOUR' }],
  creator: 'TANNOUR',
  metadataBase: new URL('https://tannour.ma'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TANNOUR',
    title: 'TANNOUR · Artisan Leather from Marrakesh',
    description: 'Luxury handcrafted leather goods from the ancient tanneries of Marrakesh. Vegetable-tanned, hand-stitched, made to endure.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TANNOUR · Artisan Leather from Marrakesh',
    description: 'Luxury handcrafted leather goods from the ancient tanneries of Marrakesh.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TANNOUR',
  url: 'https://tannour.ma',
  logo: 'https://tannour.ma/logo.png',
  description: 'Luxury handcrafted leather goods from the ancient tanneries of Marrakesh.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Derb Dabachi, Medina',
    addressLocality: 'Marrakesh',
    postalCode: '40000',
    addressCountry: 'MA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+212-524-000-000',
    email: 'contact@tannour.ma',
    contactType: 'customer service',
  },
  sameAs: [
    'https://instagram.com/tannour',
    'https://facebook.com/tannour',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

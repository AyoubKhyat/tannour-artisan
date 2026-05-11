'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { CartProvider } from '@/lib/cart';
import { ThemeProvider } from '@/lib/theme';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/CartDrawer'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <CustomCursor />
        <Navbar />
        <CartDrawer />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
      </CartProvider>
    </ThemeProvider>
  );
}

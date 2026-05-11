'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { CartProvider } from '@/lib/cart';
import { ThemeProvider } from '@/lib/theme';
import { WishlistProvider } from '@/lib/wishlist';
import { ToastProvider } from '@/lib/toast';
import { QuickViewProvider } from '@/lib/quickview';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/CartDrawer'), { ssr: false });
const ToastContainer = dynamic(() => import('@/components/ToastContainer'), { ssr: false });
const QuickViewModal = dynamic(() => import('@/components/QuickViewModal'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });
const NavigationProgress = dynamic(() => import('@/components/NavigationProgress'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <QuickViewProvider>
              <NavigationProgress />
              <CustomCursor />
              <Navbar />
              <CartDrawer />
              <QuickViewModal />
              <ToastContainer />
              <BackToTop />
              <CookieConsent />
              <PageTransition>
                <main className="min-h-screen">{children}</main>
              </PageTransition>
              <Footer />
            </QuickViewProvider>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

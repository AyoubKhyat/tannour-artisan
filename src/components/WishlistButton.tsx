'use client';

import { motion } from 'framer-motion';
import { useWishlist } from '@/lib/wishlist';
import { useToast } from '@/lib/toast';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function WishlistButton({ productId, productName, size = 'sm', className = '' }: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { show } = useToast();
  const active = isWishlisted(productId);
  const iconSize = size === 'sm' ? 18 : 22;

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
        show(
          active ? `${productName} removed from wishlist` : `${productName} saved to wishlist`,
          'info'
        );
      }}
      className={`flex items-center justify-center transition-colors ${
        active ? 'text-red-500' : 'text-faint hover:text-accent'
      } ${className}`}
      aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      aria-pressed={active}
    >
      <motion.svg
        key={active ? 'filled' : 'outline'}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </motion.svg>
    </motion.button>
  );
}

import { CartItem } from './cart';

export interface Order {
  id: string;
  date: string;
  items: { name: string; color: string; size: string; quantity: number; price: number }[];
  total: number;
  status: 'confirmed' | 'processing' | 'shipped';
}

const KEY = 'tannour-orders';

export function saveOrder(orderId: string, items: CartItem[], total: number) {
  const order: Order = {
    id: orderId,
    date: new Date().toISOString(),
    items: items.map((i) => ({
      name: i.product.nameFr,
      color: i.color,
      size: i.size,
      quantity: i.quantity,
      price: i.product.price,
    })),
    total,
    status: 'confirmed',
  };
  try {
    const stored = localStorage.getItem(KEY);
    const orders: Order[] = stored ? JSON.parse(stored) : [];
    orders.unshift(order);
    localStorage.setItem(KEY, JSON.stringify(orders.slice(0, 20)));
  } catch {}
}

export function getOrders(): Order[] {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

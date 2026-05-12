import { products } from '@/lib/products';

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  city: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export interface DailySales {
  date: string;
  revenue: number;
  orders: number;
}

const cities = ['Casablanca', 'Rabat', 'Marrakesh', 'Fes', 'Tangier', 'Agadir', 'Meknes', 'Essaouira'];
const firstNames = ['Youssef', 'Fatima', 'Omar', 'Amina', 'Karim', 'Leila', 'Hassan', 'Nadia', 'Mehdi', 'Sara', 'Adam', 'Zineb', 'Ali', 'Khadija', 'Rachid'];
const lastNames = ['Benali', 'El Amrani', 'Tazi', 'Fassi', 'Alaoui', 'Berrada', 'Chraibi', 'Idrissi', 'Benjelloun', 'Kettani'];
const statuses: AdminOrder['status'][] = ['pending', 'processing', 'shipped', 'delivered'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateOrders(count: number = 50): AdminOrder[] {
  const rand = seededRandom(42);
  const orders: AdminOrder[] = [];

  for (let i = 0; i < count; i++) {
    const itemCount = Math.floor(rand() * 3) + 1;
    const items = [];
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(rand() * products.length)];
      const qty = Math.floor(rand() * 2) + 1;
      items.push({ name: product.nameFr, qty, price: product.price });
      total += product.price * qty;
    }

    const daysAgo = Math.floor(rand() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    orders.push({
      id: `TN-${String(1000 + i).slice(1)}`,
      customer: `${firstNames[Math.floor(rand() * firstNames.length)]} ${lastNames[Math.floor(rand() * lastNames.length)]}`,
      email: `customer${i + 1}@email.com`,
      city: cities[Math.floor(rand() * cities.length)],
      items,
      total,
      status: statuses[Math.floor(rand() * statuses.length)],
      date: date.toISOString().split('T')[0],
    });
  }

  return orders.sort((a, b) => b.date.localeCompare(a.date));
}

export function generateDailySales(days: number = 30): DailySales[] {
  const rand = seededRandom(99);
  const sales: DailySales[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const baseOrders = Math.floor(rand() * 6) + 2;
    const dayOfWeek = date.getDay();
    const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.4 : 1;
    const orders = Math.floor(baseOrders * weekendBoost);
    const avgOrderValue = 1800 + Math.floor(rand() * 2000);

    sales.push({
      date: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      revenue: orders * avgOrderValue,
      orders,
    });
  }

  return sales;
}

export function getInventory() {
  const rand = seededRandom(77);
  return products.map((p) => ({
    ...p,
    stock: Math.floor(rand() * 25) + 3,
    sold: Math.floor(rand() * 80) + 10,
  }));
}

export function getStats(orders: AdminOrder[], sales: DailySales[]) {
  const totalRevenue = sales.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = orders.length;
  const avgOrderValue = Math.round(totalRevenue / totalOrders);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  return { totalRevenue, totalOrders, avgOrderValue, pendingOrders };
}

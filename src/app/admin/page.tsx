'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { generateOrders, generateDailySales, getInventory, getStats, AdminOrder } from '@/lib/adminData';

const RevenueChart = dynamic(() => import('@/components/admin/RevenueChart'), { ssr: false });
const OrdersChart = dynamic(() => import('@/components/admin/OrdersChart'), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

type Tab = 'overview' | 'orders' | 'inventory';

const statusColors: Record<AdminOrder['status'], string> = {
  pending: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
  processing: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  shipped: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  delivered: 'bg-green-500/15 text-green-600 dark:text-green-400',
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [orderFilter, setOrderFilter] = useState<AdminOrder['status'] | 'all'>('all');

  const orders = useMemo(() => generateOrders(50), []);
  const dailySales = useMemo(() => generateDailySales(30), []);
  const inventory = useMemo(() => getInventory(), []);
  const stats = useMemo(() => getStats(orders, dailySales), [orders, dailySales]);

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter((o) => o.status === orderFilter);

  const tabs: { key: Tab; label: string; icon: JSX.Element }[] = [
    {
      key: 'overview',
      label: 'Overview',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></svg>,
    },
    {
      key: 'inventory',
      label: 'Inventory',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>,
    },
  ];

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <p className="text-accent/50 text-xs tracking-[0.4em] uppercase mb-1 font-sans">Dashboard</p>
            <h1 className="font-serif text-3xl md:text-4xl text-primary tracking-wider">Admin Panel</h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-subtle text-xs tracking-[0.15em] uppercase text-secondary hover:text-accent hover:border-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            Back to Store
          </Link>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex gap-1 mb-8 bg-card border border-subtle p-1 w-fit"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-accent text-white'
                  : 'text-secondary hover:text-accent'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Revenue', value: `${(stats.totalRevenue / 1000).toFixed(0)}K MAD`, sub: 'Last 30 days', color: 'text-accent' },
                  { label: 'Orders', value: stats.totalOrders, sub: 'Last 30 days', color: 'text-primary' },
                  { label: 'Avg. Order Value', value: `${stats.avgOrderValue.toLocaleString()} MAD`, sub: 'Per order', color: 'text-primary' },
                  { label: 'Pending', value: stats.pendingOrders, sub: 'Needs attention', color: 'text-yellow-500' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease }}
                    className="bg-card border border-subtle p-6"
                  >
                    <p className="text-faint text-[10px] tracking-[0.3em] uppercase mb-2">{stat.label}</p>
                    <p className={`font-serif text-3xl ${stat.color}`}>{stat.value}</p>
                    <p className="text-faint text-xs mt-1">{stat.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease }}
                  className="bg-card border border-subtle p-6"
                >
                  <h3 className="text-xs tracking-[0.3em] uppercase text-faint mb-6">Revenue (30 days)</h3>
                  <RevenueChart data={dailySales} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease }}
                  className="bg-card border border-subtle p-6"
                >
                  <h3 className="text-xs tracking-[0.3em] uppercase text-faint mb-6">Orders (30 days)</h3>
                  <OrdersChart data={dailySales} />
                </motion.div>
              </div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease }}
                className="bg-card border border-subtle p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs tracking-[0.3em] uppercase text-faint">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-accent hover:underline"
                  >
                    View all
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-subtle">
                        <th className="text-left py-3 text-faint text-[10px] tracking-[0.2em] uppercase">Order</th>
                        <th className="text-left py-3 text-faint text-[10px] tracking-[0.2em] uppercase">Customer</th>
                        <th className="text-left py-3 text-faint text-[10px] tracking-[0.2em] uppercase hidden sm:table-cell">City</th>
                        <th className="text-left py-3 text-faint text-[10px] tracking-[0.2em] uppercase">Total</th>
                        <th className="text-left py-3 text-faint text-[10px] tracking-[0.2em] uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="border-b border-subtle/50 hover:bg-surface-alt/30 transition-colors">
                          <td className="py-3 text-accent font-mono text-xs">{order.id}</td>
                          <td className="py-3 text-primary">{order.customer}</td>
                          <td className="py-3 text-secondary hidden sm:table-cell">{order.city}</td>
                          <td className="py-3 text-primary font-medium">{order.total.toLocaleString()} MAD</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-1 text-[10px] tracking-wider uppercase ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease }}
            >
              {/* Order Filters */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {(['all', 'pending', 'processing', 'shipped', 'delivered'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setOrderFilter(f)}
                    className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-300 ${
                      orderFilter === f
                        ? 'bg-accent text-white border-accent'
                        : 'border-subtle text-faint hover:border-accent hover:text-accent'
                    }`}
                  >
                    {f === 'all' ? `All (${orders.length})` : `${f} (${orders.filter((o) => o.status === f).length})`}
                  </button>
                ))}
              </div>

              <div className="bg-card border border-subtle overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-subtle bg-surface-alt/30">
                        <th className="text-left p-4 text-faint text-[10px] tracking-[0.2em] uppercase">Order</th>
                        <th className="text-left p-4 text-faint text-[10px] tracking-[0.2em] uppercase">Date</th>
                        <th className="text-left p-4 text-faint text-[10px] tracking-[0.2em] uppercase">Customer</th>
                        <th className="text-left p-4 text-faint text-[10px] tracking-[0.2em] uppercase hidden md:table-cell">City</th>
                        <th className="text-left p-4 text-faint text-[10px] tracking-[0.2em] uppercase hidden lg:table-cell">Items</th>
                        <th className="text-left p-4 text-faint text-[10px] tracking-[0.2em] uppercase">Total</th>
                        <th className="text-left p-4 text-faint text-[10px] tracking-[0.2em] uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filteredOrders.map((order, i) => (
                          <motion.tr
                            key={order.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: i * 0.02, duration: 0.3 }}
                            className="border-b border-subtle/50 hover:bg-surface-alt/30 transition-colors"
                          >
                            <td className="p-4 text-accent font-mono text-xs">{order.id}</td>
                            <td className="p-4 text-faint text-xs">{order.date}</td>
                            <td className="p-4">
                              <p className="text-primary">{order.customer}</p>
                              <p className="text-faint text-xs">{order.email}</p>
                            </td>
                            <td className="p-4 text-secondary hidden md:table-cell">{order.city}</td>
                            <td className="p-4 hidden lg:table-cell">
                              <div className="flex flex-col gap-0.5">
                                {order.items.map((item, j) => (
                                  <span key={j} className="text-xs text-secondary">{item.qty}x {item.name}</span>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 text-primary font-medium whitespace-nowrap">{order.total.toLocaleString()} MAD</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 text-[10px] tracking-wider uppercase ${statusColors[order.status]}`}>
                                {order.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {inventory.map((item, i) => {
                  const lowStock = item.stock < 8;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease }}
                      className="bg-card border border-subtle p-5 hover:border-accent/30 transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-faint">{item.category}</span>
                        {lowStock && (
                          <span className="text-[9px] tracking-wider uppercase px-2 py-0.5 bg-red-500/15 text-red-500">Low Stock</span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg text-primary group-hover:text-accent transition-colors">{item.nameFr}</h3>
                      <p className="text-faint text-xs mt-0.5" dir="rtl">{item.nameDarija}</p>
                      <p className="text-accent font-serif text-lg mt-3">{item.price.toLocaleString()} MAD</p>

                      <div className="mt-4 pt-4 border-t border-subtle grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-faint mb-1">In Stock</p>
                          <p className={`text-lg font-medium ${lowStock ? 'text-red-500' : 'text-primary'}`}>{item.stock}</p>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-faint mb-1">Sold</p>
                          <p className="text-lg font-medium text-primary">{item.sold}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${lowStock ? 'bg-red-500' : 'bg-accent'}`}
                            style={{ width: `${Math.min((item.stock / 30) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-1.5 mt-3">
                        {item.colors.map((c) => (
                          <div
                            key={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-subtle"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

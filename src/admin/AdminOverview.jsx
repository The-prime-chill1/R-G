/* ==========================================================================
   R&G COLLECTIONS - ADMIN OVERVIEW DASHBOARD
   Strict Rules: React Icons Only, Zero Emojis, 100% Fully Responsive
   ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiDollarSign, 
  FiShoppingBag, 
  FiBox, 
  FiAlertTriangle 
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext.jsx';

export default function AdminOverview() {
  const { products, orders } = useShop();

  const totalSales = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;
  const lowStockProducts = products.filter(p => p.stockQuantity && p.stockQuantity <= 5);

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount).toLocaleString('en-NG');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Executive Overview</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Real-time sales, order fulfillment, and inventory diagnostics.</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper"><FiDollarSign /></div>
          <div>
            <div className="stat-number-val">{formatNaira(totalSales)}</div>
            <div className="stat-title-label">Total Revenue</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper"><FiShoppingBag /></div>
          <div>
            <div className="stat-number-val">{orders.length}</div>
            <div className="stat-title-label">Total Orders ({pendingOrders} Pending)</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper"><FiBox /></div>
          <div>
            <div className="stat-number-val">{products.length}</div>
            <div className="stat-title-label">Active Catalog Goods</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon-wrapper" style={{ color: lowStockProducts.length > 0 ? 'var(--rg-warning)' : 'var(--rg-gold-400)' }}>
            <FiAlertTriangle />
          </div>
          <div>
            <div className="stat-number-val">{lowStockProducts.length}</div>
            <div className="stat-title-label">Low Stock Alerts</div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="admin-table-card" style={{ marginBottom: '2.5rem' }}>
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', color: '#fff' }}>Recent Client Orders</h2>
          <Link to="/admin/orders" style={{ fontSize: '0.8rem', color: 'var(--rg-gold-300)', textDecoration: 'underline' }}>View All Orders</Link>
        </div>

        {/* Desktop Table View */}
        <div className="admin-desktop-table-view">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client</th>
                <th>Destination</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: 'var(--rg-gray-400)' }}>
                    No orders placed yet. Orders placed by customers will appear here in real-time.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map(o => (
                  <tr key={o.id}>
                    <td><strong>{o.orderNumber || o.id}</strong></td>
                    <td>{o.customerName} ({o.customerPhone})</td>
                    <td>{o.shippingAddress}</td>
                    <td><strong>{formatNaira(o.total)}</strong></td>
                    <td>
                      <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: 'rgba(207,161,53,0.15)', color: 'var(--rg-gold-300)', fontSize: '0.72rem', fontWeight: 800 }}>
                        {o.status || 'Confirmed'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="admin-mobile-cards-view" style={{ padding: '1rem' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--rg-gray-400)' }}>
              No orders placed yet. Orders placed by customers will appear here in real-time.
            </div>
          ) : (
            orders.slice(0, 5).map(o => (
              <div key={o.id} className="admin-item-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#fff' }}>{o.orderNumber || o.id}</strong>
                  <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: 'rgba(207,161,53,0.15)', color: 'var(--rg-gold-300)', fontSize: '0.72rem', fontWeight: 800 }}>
                    {o.status || 'Confirmed'}
                  </span>
                </div>
                <div className="admin-item-card-body">
                  <div>Client: <strong style={{ color: '#fff' }}>{o.customerName}</strong> ({o.customerPhone})</div>
                  <div>Destination: {o.shippingAddress}</div>
                  <div style={{ marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    Amount: <strong style={{ color: 'var(--rg-gold-300)' }}>{formatNaira(o.total)}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

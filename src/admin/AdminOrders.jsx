/* ==========================================================================
   R&G COLLECTIONS - ADMIN ORDER FULFILLMENT & DISPATCH MANAGEMENT
   Strict Rules: React Icons Only, Zero Emojis, 100% Fully Responsive
   ========================================================================== */

import React, { useState } from 'react';
import { FiShoppingBag, FiTruck, FiSearch } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useShop } from '../context/ShopContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useShop();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount || 0).toLocaleString('en-NG');
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    addToast(`Order ${orderId} status set to ${newStatus}.`);
  };

  const filteredOrders = orders.filter(o => 
    (o.orderNumber || o.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.customerPhone || '').includes(searchTerm)
  );

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Client Orders &amp; Dispatch</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Manage order fulfillment status, delivery routes, and client communications.</p>
      </div>

      <div style={{ marginBottom: '1.5rem', maxWidth: '340px' }}>
        <input 
          type="text" 
          placeholder="Search by Order ID, client, or phone..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none', fontSize: '16px' }}
        />
      </div>

      <div className="admin-table-card">
        {/* Desktop Table View */}
        <div className="admin-desktop-table-view">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Client Contact</th>
                <th>Delivery Destination</th>
                <th>Items Ordered</th>
                <th>Total (NGN)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: 'var(--rg-gray-400)' }}>
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td><strong>{order.orderNumber || order.id}</strong></td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div>{order.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--rg-gray-400)' }}>{order.customerPhone}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', display: 'block', maxWidth: '180px' }}>{order.shippingAddress}</span>
                    </td>
                    <td>
                      {Array.isArray(order.items) && order.items.map((it, idx) => (
                        <div key={idx} style={{ fontSize: '0.78rem' }}>
                          {it.name} (Sz: {it.selectedSize}) &times; {it.quantity}
                        </div>
                      ))}
                    </td>
                    <td><strong>{formatNaira(order.total)}</strong></td>
                    <td>
                      <select 
                        value={order.status || 'Confirmed'}
                        onChange={e => handleStatusChange(order.id, e.target.value)}
                        style={{ background: 'var(--rg-surface-elevated)', color: 'var(--rg-gold-300)', border: '1px solid rgba(207,161,53,0.3)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', outline: 'none' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing Atelier</option>
                        <option value="Shipped">Dispatched / In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      {order.customerPhone && (
                        <a 
                          href={`https://wa.me/234${order.customerPhone.replace(/^0/, '')}?text=Hello%20${encodeURIComponent(order.customerName)}%2C%20regarding%20your%20R%26G%20order%20${order.orderNumber || order.id}...`}
                          target="_blank" 
                          rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', background: '#25D366', color: '#fff', borderRadius: '4px', fontSize: '0.75rem' }}
                        >
                          <FaWhatsapp /> Chat
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="admin-mobile-cards-view" style={{ padding: '1rem' }}>
          {filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--rg-gray-400)' }}>
              No orders found.
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="admin-item-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '1rem', letterSpacing: '0.5px' }}>
                      {order.orderNumber || order.id}
                    </strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--rg-gray-400)', marginTop: '2px' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <select 
                    value={order.status || 'Confirmed'}
                    onChange={e => handleStatusChange(order.id, e.target.value)}
                    style={{ background: 'var(--rg-surface-elevated)', color: 'var(--rg-gold-300)', border: '1px solid rgba(207,161,53,0.3)', padding: '5px 8px', borderRadius: '4px', fontSize: '0.75rem', outline: 'none' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="admin-item-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--rg-gray-400)' }}>Client:</span>
                    <strong style={{ color: '#fff' }}>{order.customerName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--rg-gray-400)' }}>Phone:</span>
                    <span>{order.customerPhone}</span>
                  </div>
                  {order.shippingAddress && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--rg-gray-400)' }}>Destination:</span>
                      <span style={{ textAlign: 'right', maxWidth: '200px' }}>{order.shippingAddress}</span>
                    </div>
                  )}
                  <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '6px', marginTop: '4px' }}>
                    <span style={{ color: 'var(--rg-gray-400)', display: 'block', marginBottom: '3px' }}>Items:</span>
                    {Array.isArray(order.items) && order.items.map((it, idx) => (
                      <div key={idx} style={{ fontSize: '0.78rem', color: '#fff' }}>
                        • {it.name} (Sz: {it.selectedSize}) &times; {it.quantity}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ color: 'var(--rg-gray-400)' }}>Total:</span>
                    <strong style={{ color: 'var(--rg-gold-300)', fontSize: '1rem' }}>{formatNaira(order.total)}</strong>
                  </div>
                </div>

                {order.customerPhone && (
                  <div className="admin-item-card-actions">
                    <a 
                      href={`https://wa.me/234${order.customerPhone.replace(/^0/, '')}?text=Hello%20${encodeURIComponent(order.customerName)}%2C%20regarding%20your%20R%26G%20order%20${order.orderNumber || order.id}...`}
                      target="_blank" 
                      rel="noreferrer"
                      style={{ background: '#25D366', color: '#fff', border: 'none' }}
                    >
                      <FaWhatsapp size={16} /> Contact Client on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

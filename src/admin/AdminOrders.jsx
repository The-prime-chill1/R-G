/* ==========================================================================
   R&G COLLECTIONS - ADMIN ORDER FULFILLMENT & DISPATCH MANAGEMENT
   ========================================================================== */

import React, { useState } from 'react';
import { FiShoppingBag, FiTruck, FiCheck, FiX, FiSearch } from 'react-icons/fi';
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
        <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Client Orders & Dispatch</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Manage order fulfillment status, delivery routes, and client communications.</p>
      </div>

      <div style={{ marginBottom: '1.5rem', maxWidth: '340px' }}>
        <input 
          type="text" 
          placeholder="Search by Order ID, client, or phone..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
        />
      </div>

      <div className="admin-table-card">
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
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--rg-gray-400)' }}>
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
    </div>
  );
}

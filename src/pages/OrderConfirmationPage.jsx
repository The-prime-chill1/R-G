/* ==========================================================================
   R&G COLLECTIONS - ORDER CONFIRMATION RECEIPT PAGE
   ========================================================================== */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiTruck, FiArrowRight, FiPrinter } from 'react-icons/fi';
import { useShop } from '../context/ShopContext.jsx';
import '../styles/checkout.css';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useShop();

  const order = orders.find(o => o.id === orderId || o.orderNumber === orderId) || {
    id: orderId || 'RGO-' + Date.now().toString(36).toUpperCase(),
    orderNumber: orderId || 'RGO-' + Date.now().toString(36).toUpperCase(),
    customerName: 'Valued Client',
    customerEmail: 'Client Email',
    shippingAddress: 'Lagos Express Hub',
    status: 'Confirmed',
    total: 97000,
    items: [],
    createdAt: new Date().toISOString()
  };

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount || 0).toLocaleString('en-NG');
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem' }}>
      <div className="confirmation-card">
        <div className="confirmation-icon-box">
          <FiCheckCircle />
        </div>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--rg-gold-500)', display: 'block', marginBottom: '0.4rem' }}>
          TRANSACTION COMPLETED
        </span>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Thank You for Your Order</h1>
        <p style={{ color: 'var(--rg-gray-600)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Your order has been registered into our atelier dispatch queue. A confirmation receipt has been sent to your contact details.
        </p>

        {/* Order Details Box */}
        <div style={{ background: 'var(--rg-ivory)', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)', padding: '1.75rem', textAlign: 'left', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--rg-gray-200)', paddingBottom: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <span>Order Reference:</span>
            <strong>{order.orderNumber || order.id}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--rg-gray-200)', paddingBottom: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <span>Order Status:</span>
            <span style={{ color: 'var(--rg-success)', fontWeight: 800 }}>{order.status || 'Confirmed / In Preparation'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--rg-gray-200)', paddingBottom: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <span>Recipient:</span>
            <span>{order.customerName}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--rg-gray-200)', paddingBottom: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <span>Delivery Destination:</span>
            <span style={{ maxWidth: '300px', textAlign: 'right' }}>{order.shippingAddress}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--rg-black)' }}>
            <span>Total Paid:</span>
            <span>{formatNaira(order.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary"
            onClick={() => window.print()}
          >
            <FiPrinter /> Print Receipt
          </button>
          <Link to="/shop" className="btn-primary">
            <span>Continue Shopping</span> <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

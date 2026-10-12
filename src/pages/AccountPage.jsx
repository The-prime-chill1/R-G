/* ==========================================================================
   R&G COLLECTIONS - CUSTOMER ACCOUNT DASHBOARD
   ========================================================================== */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiUser, 
  FiShoppingBag, 
  FiHeart, 
  FiLogOut, 
  FiMapPin, 
  FiShield 
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import { useShop } from '../context/ShopContext.jsx';

export default function AccountPage() {
  const { currentUser, logout, isAdmin } = useAuth();
  const { orders } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const customerOrders = orders.filter(o => 
    o.customerEmail === currentUser?.email || o.customerId === currentUser?.uid
  );

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount || 0).toLocaleString('en-NG');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', borderBottom: '1px solid var(--rg-gray-200)', paddingBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--rg-gold-500)', display: 'block' }}>
            CLIENT PORTAL
          </span>
          <h1 style={{ fontSize: '2.2rem', textTransform: 'uppercase' }}>
            Welcome, {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Client'}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {isAdmin && (
            <Link to="/admin" className="btn-secondary" style={{ color: 'var(--rg-gold-500)', borderColor: 'var(--rg-gold-400)' }}>
              Open Admin Suite
            </Link>
          )}
          <button className="btn-secondary" onClick={handleLogout}>
            <FiLogOut /> Sign Out
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Navigation Sidebar */}
        <aside style={{ background: 'var(--rg-ivory)', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)', padding: '1rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>
              <button 
                onClick={() => setActiveTab('orders')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  background: activeTab === 'orders' ? 'var(--rg-black)' : 'transparent',
                  color: activeTab === 'orders' ? '#fff' : 'var(--rg-black)'
                }}
              >
                <FiShoppingBag /> Order History ({customerOrders.length})
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('profile')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  background: activeTab === 'profile' ? 'var(--rg-black)' : 'transparent',
                  color: activeTab === 'profile' ? '#fff' : 'var(--rg-black)'
                }}
              >
                <FiUser /> Account Profile
              </button>
            </li>
          </ul>
        </aside>

        {/* Content Area */}
        <main>
          {activeTab === 'orders' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Order Receipts</h3>

              {customerOrders.length === 0 ? (
                <div style={{ padding: '3.5rem 1rem', textAlign: 'center', background: '#fff', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)' }}>
                  <FiShoppingBag style={{ fontSize: '2.5rem', color: 'var(--rg-gray-400)', marginBottom: '0.75rem' }} />
                  <h4>No orders placed yet</h4>
                  <p style={{ color: 'var(--rg-gray-500)', fontSize: '0.88rem', margin: '0.5rem 0 1.5rem' }}>When you complete a purchase, your tracking receipt will display here.</p>
                  <Link to="/shop" className="btn-primary">Browse Catalog</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {customerOrders.map(order => (
                    <div key={order.id} style={{ background: '#fff', border: '1px solid var(--rg-gray-200)', padding: '1.5rem', borderRadius: 'var(--radius-xs)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #f4f4f5', paddingBottom: '0.75rem' }}>
                        <div>
                          <strong>{order.orderNumber || order.id}</strong>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--rg-gray-500)' }}>
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.1)', color: 'var(--rg-success)', fontSize: '0.75rem', fontWeight: 800 }}>
                            {order.status || 'Confirmed'}
                          </span>
                          <strong style={{ display: 'block', marginTop: '4px' }}>{formatNaira(order.total)}</strong>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--rg-gray-600)' }}>
                        Destination: {order.shippingAddress}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div style={{ background: '#fff', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)', padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Profile Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div><strong>Email:</strong> {currentUser?.email}</div>
                <div><strong>Name:</strong> {currentUser?.displayName || 'Valued Client'}</div>
                <div><strong>Client Tier:</strong> <span style={{ color: 'var(--rg-gold-500)', fontWeight: 800 }}>Private Circle</span></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

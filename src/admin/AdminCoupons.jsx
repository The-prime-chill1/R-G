/* ==========================================================================
   R&G COLLECTIONS - ADMIN COUPONS & DISCOUNTS MANAGEMENT
   ========================================================================== */

import React, { useState } from 'react';
import { FiPlus, FiPercent, FiTrash2 } from 'react-icons/fi';
import { useToast } from '../context/ToastContext.jsx';

export default function AdminCoupons() {
  const { addToast } = useToast();
  const [coupons, setCoupons] = useState([
    { code: 'RGEXCLUSIVE', percentage: 10, minSpend: 50000, active: true },
    { code: 'WELCOME10', percentage: 10, minSpend: 0, active: true },
    { code: 'VIP20', percentage: 20, minSpend: 150000, active: false }
  ]);

  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('');

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!code || !percentage) return;

    setCoupons([...coupons, {
      code: code.trim().toUpperCase(),
      percentage: Number(percentage),
      minSpend: 0,
      active: true
    }]);

    addToast(`Coupon ${code.toUpperCase()} created.`);
    setCode('');
    setPercentage('');
  };

  const handleToggle = (couponCode) => {
    setCoupons(coupons.map(c => c.code === couponCode ? { ...c, active: !c.active } : c));
    addToast('Coupon status updated.');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Coupons & Promo Codes</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Create seasonal percentage discounts and VIP codes.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        <div className="admin-table-card">
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase' }}>Configured Coupons</h3>
          </div>

          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c.code}>
                  <td><strong>{c.code}</strong></td>
                  <td>{c.percentage}% OFF</td>
                  <td>
                    <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: c.active ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: c.active ? 'var(--rg-success)' : 'var(--rg-error)', fontSize: '0.72rem', fontWeight: 800 }}>
                      {c.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleToggle(c.code)}
                      style={{ padding: '4px 8px', background: 'var(--rg-surface-elevated)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      {c.active ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Form */}
        <div style={{ background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>+ Create Coupon Code</h3>

          <form onSubmit={handleAddCoupon}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Coupon Code *</label>
              <input 
                type="text" 
                placeholder="e.g. SUMMER15"
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Percentage Discount (%) *</label>
              <input 
                type="number" 
                placeholder="15"
                value={percentage}
                onChange={e => setPercentage(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              <FiPlus /> Save Coupon Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   R&G COLLECTIONS - ADMIN COUPONS & DISCOUNTS MANAGEMENT
   Strict Rules: React Icons Only, Zero Emojis, Zero Seeded Dummy Data
   All coupon codes are created manually by the administrator.
   ========================================================================== */

import React, { useState, useEffect } from 'react';
import { FiPlus, FiPercent, FiTrash2, FiTag } from 'react-icons/fi';
import { useToast } from '../context/ToastContext.jsx';

const STORAGE_KEY = 'rg_coupons_data';

export default function AdminCoupons() {
  const { addToast } = useToast();

  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Clean out any stale seeded sample coupons
      const isStale = parsed.some(c => c.code === 'RGEXCLUSIVE' || c.code === 'WELCOME10' || c.code === 'VIP20');
      if (isStale) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('');

  const saveCoupons = (updated) => {
    setCoupons(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save coupons to local storage', e);
    }
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    const discountPct = Number(percentage);

    if (!cleanCode) {
      addToast('Please enter a coupon code.', 'error');
      return;
    }

    if (isNaN(discountPct) || discountPct <= 0 || discountPct > 90) {
      addToast('Please enter a discount percentage between 1% and 90%.', 'error');
      return;
    }

    if (coupons.some(c => c.code === cleanCode)) {
      addToast(`Coupon code ${cleanCode} already exists.`, 'error');
      return;
    }

    const updated = [
      ...coupons,
      {
        code: cleanCode,
        percentage: discountPct,
        minSpend: 0,
        active: true,
        createdAt: new Date().toISOString()
      }
    ];

    saveCoupons(updated);
    addToast(`Coupon "${cleanCode}" (${discountPct}% OFF) created successfully.`);
    setCode('');
    setPercentage('');
  };

  const handleToggle = (couponCode) => {
    const updated = coupons.map(c => 
      c.code === couponCode ? { ...c, active: !c.active } : c
    );
    saveCoupons(updated);
    const toggled = updated.find(c => c.code === couponCode);
    addToast(`Coupon ${couponCode} is now ${toggled?.active ? 'Active' : 'Disabled'}.`);
  };

  const handleDelete = (couponCode) => {
    if (window.confirm(`Are you sure you want to permanently delete coupon "${couponCode}"?`)) {
      const updated = coupons.filter(c => c.code !== couponCode);
      saveCoupons(updated);
      addToast(`Coupon "${couponCode}" deleted.`);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Coupons & Promo Codes</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Create seasonal percentage discounts and VIP codes.</p>
      </div>

      <div className="admin-coupons-grid">
        <div className="admin-table-card">
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase' }}>Configured Coupons</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--rg-gold-400)', fontWeight: 700 }}>
              {coupons.length} Active Codes
            </span>
          </div>

          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: 'var(--rg-gray-400)' }}>
                    <div style={{ 
                      width: 48, 
                      height: 48, 
                      margin: '0 auto 1rem', 
                      borderRadius: '50%', 
                      background: 'rgba(212,175,55,0.1)', 
                      border: '1px solid rgba(212,175,55,0.25)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: 'var(--rg-gold-400)' 
                    }}>
                      <FiTag size={22} />
                    </div>
                    <div style={{ color: '#fff', fontWeight: 700, marginBottom: '0.35rem', fontSize: '1rem' }}>
                      No Promo Coupons Yet
                    </div>
                    <p style={{ fontSize: '0.82rem', maxWidth: '340px', margin: '0 auto', color: 'var(--rg-gray-400)', lineHeight: 1.5 }}>
                      No coupons currently created. Use the form on the right to create your first client discount or seasonal campaign code.
                    </p>
                  </td>
                </tr>
              ) : (
                coupons.map(c => (
                  <tr key={c.code}>
                    <td><strong style={{ color: '#fff', letterSpacing: '0.5px' }}>{c.code}</strong></td>
                    <td style={{ color: 'var(--rg-gold-300)', fontWeight: 700 }}>{c.percentage}% OFF</td>
                    <td>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '3px 8px', 
                        borderRadius: '4px', 
                        background: c.active ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', 
                        color: c.active ? 'var(--rg-success)' : 'var(--rg-error)', 
                        fontSize: '0.72rem', 
                        fontWeight: 800 
                      }}>
                        {c.active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button 
                          onClick={() => handleToggle(c.code)}
                          style={{ 
                            padding: '4px 10px', 
                            background: 'var(--rg-surface-elevated)', 
                            color: '#fff', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem', 
                            cursor: 'pointer' 
                          }}
                        >
                          {c.active ? 'Disable' : 'Enable'}
                        </button>
                        <button 
                          onClick={() => handleDelete(c.code)}
                          title="Delete Coupon"
                          style={{ 
                            padding: '4px 8px', 
                            background: 'rgba(239,68,68,0.1)', 
                            color: 'var(--rg-error)', 
                            border: '1px solid rgba(239,68,68,0.25)', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Form */}
        <div style={{ background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#fff' }}>+ Create Coupon Code</h3>

          <form onSubmit={handleAddCoupon}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Coupon Code *
              </label>
              <input 
                type="text" 
                placeholder="e.g. SUMMER15"
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  background: 'var(--rg-surface-elevated)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#fff', 
                  borderRadius: '4px', 
                  outline: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Percentage Discount (%) *
              </label>
              <input 
                type="number" 
                placeholder="15"
                min="1"
                max="90"
                value={percentage}
                onChange={e => setPercentage(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  background: 'var(--rg-surface-elevated)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#fff', 
                  borderRadius: '4px', 
                  outline: 'none' 
                }}
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

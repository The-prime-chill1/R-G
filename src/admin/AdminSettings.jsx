/* ==========================================================================
   R&G COLLECTIONS - ADMIN STORE SETTINGS & CONTACT CONFIGURATION
   ========================================================================== */

import React, { useState } from 'react';
import { FiSave, FiSettings, FiCheck } from 'react-icons/fi';
import { useToast } from '../context/ToastContext.jsx';

export default function AdminSettings() {
  const { addToast } = useToast();

  const [settings, setSettings] = useState({
    brandName: 'R & G Collections',
    primaryPhone: '09045231629',
    secondaryPhone: '07060610938',
    contactEmail: 'rasakanu2008@gmail.com',
    freeShippingThreshold: 100000,
    deliveryFeeStandard: 3500,
    announcementText: 'Complimentary Express Delivery to Lagos, Akure & Achievers University on orders over NGN 100,000'
  });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('rg_store_settings', JSON.stringify(settings));
    addToast('Store configuration settings saved successfully.');
  };

  return (
    <div style={{ maxWidth: '750px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Store Settings & Contact</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Configure live store details, WhatsApp routing, and shipping thresholds.</p>
      </div>

      <div style={{ background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '2.5rem' }}>
        <form onSubmit={handleSave}>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
            Brand & Contact Numbers
          </h3>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Brand Label Name</label>
            <input 
              type="text" 
              value={settings.brandName}
              onChange={e => setSettings({ ...settings, brandName: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Primary WhatsApp (Lagos/Owo)</label>
              <input 
                type="text" 
                value={settings.primaryPhone}
                onChange={e => setSettings({ ...settings, primaryPhone: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Secondary Phone (Akure)</label>
              <input 
                type="text" 
                value={settings.secondaryPhone}
                onChange={e => setSettings({ ...settings, secondaryPhone: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Admin Contact Email</label>
            <input 
              type="email" 
              value={settings.contactEmail}
              onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
              required
            />
          </div>

          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
            Shipping Rules & Top Announcement
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Standard Delivery Fee (NGN)</label>
              <input 
                type="number" 
                value={settings.deliveryFeeStandard}
                onChange={e => setSettings({ ...settings, deliveryFeeStandard: Number(e.target.value) })}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Free Delivery Over (NGN)</label>
              <input 
                type="number" 
                value={settings.freeShippingThreshold}
                onChange={e => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Header Announcement Text</label>
            <input 
              type="text" 
              value={settings.announcementText}
              onChange={e => setSettings({ ...settings, announcementText: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
            <FiSave /> Save Store Configuration
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   R&G COLLECTIONS - ADMIN CATEGORIES & LOOKBOOKS MANAGEMENT
   ========================================================================== */

import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiTag } from 'react-icons/fi';
import { useShop } from '../context/ShopContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function AdminCategories() {
  const { categories, lookbooks } = useShop();
  const { addToast } = useToast();

  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImg, setNewCatImg] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    addToast(`Category "${newCatName}" created successfully.`);
    setNewCatName('');
    setNewCatDesc('');
    setNewCatImg('');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Categories & Collections</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Manage catalog taxonomy, descriptions, and cover imagery.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* Categories List */}
        <div className="admin-table-card">
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase' }}>Active Categories ({categories.length})</h3>
          </div>

          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Slug</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={cat.image} alt={cat.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                      <strong>{cat.name}</strong>
                    </div>
                  </td>
                  <td><code>{cat.slug || cat.id}</code></td>
                  <td><span style={{ fontSize: '0.78rem', color: 'var(--rg-gray-400)' }}>{cat.description}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Category Form */}
        <div style={{ background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>+ Add New Category</h3>

          <form onSubmit={handleAddCategory}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Category Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Ceremonial Agbadas"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Description</label>
              <input 
                type="text" 
                placeholder="Short tagline..."
                value={newCatDesc}
                onChange={e => setNewCatDesc(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Cover Image URL</label>
              <input 
                type="text" 
                placeholder="https://..."
                value={newCatImg}
                onChange={e => setNewCatImg(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              <FiPlus /> Save Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

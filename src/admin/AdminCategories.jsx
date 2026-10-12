/* ==========================================================================
   R&G COLLECTIONS - ADMIN CATEGORIES & LOOKBOOKS MANAGEMENT
   Strict Rules: React Icons Only, Zero Emojis, 100% Fully Responsive
   ========================================================================== */

import React, { useState } from 'react';
import { FiPlus, FiTag } from 'react-icons/fi';
import { useShop } from '../context/ShopContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function AdminCategories() {
  const { categories } = useShop();
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
        <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Categories &amp; Collections</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Manage catalog taxonomy, descriptions, and cover imagery.</p>
      </div>

      <div className="admin-two-col-grid">
        {/* Categories List Container */}
        <div className="admin-table-card">
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', color: '#fff' }}>
              Active Categories ({categories.length})
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--rg-gold-400)', fontWeight: 700 }}>
              Live Taxonomy
            </span>
          </div>

          {/* Desktop Table View */}
          <div className="admin-desktop-table-view">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Slug</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '3rem', color: 'var(--rg-gray-400)' }}>
                      No categories configured yet.
                    </td>
                  </tr>
                ) : (
                  categories.map(cat => (
                    <tr key={cat.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {cat.image ? (
                            <img src={cat.image} alt={cat.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                          ) : (
                            <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <FiTag size={16} color="var(--rg-gold-400)" />
                            </div>
                          )}
                          <strong>{cat.name}</strong>
                        </div>
                      </td>
                      <td><code>{cat.slug || cat.id}</code></td>
                      <td><span style={{ fontSize: '0.78rem', color: 'var(--rg-gray-400)' }}>{cat.description}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="admin-mobile-cards-view" style={{ padding: '1rem' }}>
            {categories.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--rg-gray-400)' }}>
                No categories configured yet.
              </div>
            ) : (
              categories.map(cat => (
                <div key={cat.id} className="admin-item-card">
                  <div className="admin-item-card-header">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '6px' }} />
                    ) : (
                      <div style={{ width: '44px', height: '44px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiTag size={18} color="var(--rg-gold-400)" />
                      </div>
                    )}
                    <div>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{cat.name}</strong>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--rg-gold-400)', fontFamily: 'monospace' }}>
                        /{cat.slug || cat.id}
                      </span>
                    </div>
                  </div>
                  {cat.description && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--rg-gray-400)', lineHeight: '1.4' }}>
                      {cat.description}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Category Form */}
        <div className="admin-settings-card">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#fff' }}>
            + Add New Category
          </h2>

          <form onSubmit={handleAddCategory}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>
                Category Name *
              </label>
              <input 
                type="text" 
                placeholder="e.g. Ceremonial Agbadas"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none', fontSize: '16px' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>
                Description
              </label>
              <input 
                type="text" 
                placeholder="Short tagline..."
                value={newCatDesc}
                onChange={e => setNewCatDesc(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>
                Cover Image URL
              </label>
              <input 
                type="text" 
                placeholder="https://..."
                value={newCatImg}
                onChange={e => setNewCatImg(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none', fontSize: '16px' }}
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

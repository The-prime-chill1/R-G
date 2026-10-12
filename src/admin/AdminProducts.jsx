/* ==========================================================================
   R&G COLLECTIONS - ADMIN PRODUCT & IMAGE POSTING MANAGEMENT
   Strict Rules: React Icons Only, Zero Emojis, Multi-Image Upload Dropzone
   ========================================================================== */

import React, { useState, useRef } from 'react';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiUploadCloud, 
  FiX, 
  FiCheck, 
  FiSearch 
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { compressImageFile } from '../services/storage.js';

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useShop();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [formFields, setFormFields] = useState({
    name: '',
    category: 'native',
    price: '',
    originalPrice: '',
    sizes: 'S, M, L, XL, XXL',
    swatches: '#09090b, #262626, #cfa135',
    tag: 'New Arrival',
    image: '',
    gallery: [],
    description: '',
    stockQuantity: 20,
    inStock: true
  });

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount || 0).toLocaleString('en-NG');
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormFields({
      name: '',
      category: 'native',
      price: '',
      originalPrice: '',
      sizes: 'S, M, L, XL, XXL',
      swatches: '#09090b, #262626, #cfa135',
      tag: 'New Arrival',
      image: '',
      gallery: [],
      description: '',
      stockQuantity: 20,
      inStock: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingItem(product);
    setFormFields({
      name: product.name || '',
      category: product.category || 'native',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : 'Standard',
      swatches: Array.isArray(product.swatches) ? product.swatches.join(', ') : '',
      tag: product.tag || 'New',
      image: product.image || '',
      gallery: Array.isArray(product.gallery) ? product.gallery : [],
      description: product.description || '',
      stockQuantity: product.stockQuantity || 15,
      inStock: product.inStock !== false
    });
    setIsModalOpen(true);
  };

  // Primary Image Upload
  const handlePrimaryFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const compressedDataUrl = await compressImageFile(file);
      setFormFields(prev => ({ ...prev, image: compressedDataUrl }));
      addToast('Cover image compressed and prepared.');
    } catch (err) {
      addToast('Image compression failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Gallery Additional Images Upload
  const handleGalleryFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setUploading(true);
      const results = [];
      for (const file of files) {
        const compressed = await compressImageFile(file);
        results.push(compressed);
      }
      setFormFields(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...results]
      }));
      addToast(`Added ${files.length} angle photo(s).`);
    } catch (err) {
      addToast('Failed to process gallery images.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveGalleryPhoto = (idx) => {
    setFormFields(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx)
    }));
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formFields.image) {
      addToast('Please upload a cover image or provide an image URL.', 'error');
      return;
    }

    const payload = {
      name: formFields.name.trim(),
      slug: formFields.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: formFields.category,
      categoryLabel: categories.find(c => c.id === formFields.category)?.name || 'Garment',
      price: Number(formFields.price),
      originalPrice: formFields.originalPrice ? Number(formFields.originalPrice) : null,
      sizes: formFields.sizes.split(',').map(s => s.trim()).filter(Boolean),
      swatches: formFields.swatches.split(',').map(s => s.trim()).filter(Boolean),
      tag: formFields.tag.trim() || 'New Arrival',
      image: formFields.image,
      gallery: formFields.gallery || [],
      description: formFields.description.trim(),
      stockQuantity: Number(formFields.stockQuantity) || 10,
      inStock: formFields.inStock,
      sku: editingItem?.sku || `RG-${formFields.category.toUpperCase().substr(0, 3)}-${Math.floor(100 + Math.random() * 900)}`
    };

    if (editingItem) {
      await updateProduct(editingItem.id, payload);
      addToast('Product and images updated successfully.');
    } else {
      await addProduct(payload);
      addToast('New product posted to live catalog.');
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) {
      await deleteProduct(id);
      addToast('Product removed.');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.categoryLabel || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Manage Catalog & Photos</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>Upload new garments, manage high-resolution photos, adjust pricing and inventory.</p>
        </div>

        <button className="btn-primary" onClick={handleOpenAdd}>
          <FiPlus /> Post New Good & Upload Photos
        </button>
      </div>

      {/* Search Filter */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
        <div style={{ position: 'relative', maxWidth: '340px', width: '100%' }}>
          <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rg-gray-400)' }} />
          <input 
            type="text" 
            placeholder="Search goods by name or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.4rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-table-card">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Good / Cover Photo</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--rg-gray-400)' }}>
                  No goods found matching your search.
                </td>
              </tr>
            ) : (
              filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={product.image} alt={product.name} style={{ width: '48px', height: '56px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <div>
                        <strong>{product.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--rg-gray-400)' }}>
                          Sizes: {Array.isArray(product.sizes) ? product.sizes.join(', ') : 'Standard'}
                        </span>
                        {product.gallery && product.gallery.length > 0 && (
                          <span style={{ fontSize: '0.7rem', color: 'var(--rg-gold-400)' }}>+{product.gallery.length} angle photos</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{product.categoryLabel || product.category}</td>
                  <td><strong>{formatNaira(product.price)}</strong></td>
                  <td>{product.stockQuantity || 10} units</td>
                  <td>
                    <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: product.inStock !== false ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: product.inStock !== false ? 'var(--rg-success)' : 'var(--rg-error)', fontSize: '0.72rem', fontWeight: 800 }}>
                      {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        style={{ padding: '4px 8px', background: 'var(--rg-surface-elevated)', color: 'var(--rg-gold-300)', border: '1px solid rgba(207,161,53,0.3)', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        <FiEdit /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        style={{ padding: '4px 8px', background: 'rgba(239,68,68,0.15)', color: 'var(--rg-error)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', zIndex: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: 'var(--rg-charcoal)', border: '1px solid rgba(207,161,53,0.3)', borderRadius: '8px', maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>
                {editingItem ? 'Edit Product & Photos' : 'Post New Good & Upload Photos'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: '#fff', fontSize: '1.25rem' }}><FiX /></button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Good / Item Name *</label>
                <input 
                  type="text" 
                  value={formFields.name}
                  onChange={e => setFormFields({ ...formFields, name: e.target.value })}
                  placeholder="e.g. Imperial Obsidian Kaftan"
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Category *</label>
                  <select 
                    value={formFields.category}
                    onChange={e => setFormFields({ ...formFields, category: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Tag / Badge</label>
                  <input 
                    type="text" 
                    value={formFields.tag}
                    onChange={e => setFormFields({ ...formFields, tag: e.target.value })}
                    placeholder="Bestseller, Essential, Exclusive"
                    style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Price (NGN) *</label>
                  <input 
                    type="number" 
                    value={formFields.price}
                    onChange={e => setFormFields({ ...formFields, price: e.target.value })}
                    placeholder="65000"
                    style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Original Price (Optional)</label>
                  <input 
                    type="number" 
                    value={formFields.originalPrice}
                    onChange={e => setFormFields({ ...formFields, originalPrice: e.target.value })}
                    placeholder="80000"
                    style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Cover Photo Upload Zone */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(207,161,53,0.3)', padding: '1.25rem', borderRadius: '6px', marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gold-400)', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Main Cover Image (Device Upload or URL) *
                </label>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handlePrimaryFile} 
                  style={{ display: 'none' }} 
                />

                {!formFields.image ? (
                  <div 
                    className="admin-image-dropzone"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <FiUploadCloud style={{ fontSize: '2rem', color: 'var(--rg-gold-400)' }} />
                    <strong>Click to browse device or camera photo</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--rg-gray-400)' }}>Auto-compressed for instant high-speed rendering</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={formFields.image} alt="Preview" style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        style={{ padding: '0.4rem 0.85rem', background: 'var(--rg-surface-elevated)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', marginRight: '8px' }}
                      >
                        Change Photo
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setFormFields({ ...formFields, image: '' })}
                        style={{ padding: '0.4rem 0.85rem', background: 'rgba(239,68,68,0.2)', color: 'var(--rg-error)', border: 'none', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '0.85rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--rg-gray-400)', display: 'block', marginBottom: '0.3rem' }}>Or paste an image web URL:</span>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={formFields.image}
                    onChange={e => setFormFields({ ...formFields, image: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Additional Angle Photos */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '1rem', borderRadius: '6px', marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#fff', marginBottom: '0.35rem' }}>
                  Additional Angle Photos (Optional Gallery)
                </label>

                <input 
                  type="file" 
                  ref={galleryInputRef} 
                  accept="image/*" 
                  multiple 
                  onChange={handleGalleryFiles} 
                  style={{ display: 'none' }} 
                />

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {(formFields.gallery || []).map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '60px', height: '75px', borderRadius: '4px', overflow: 'hidden' }}>
                      <img src={img} alt="Angle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveGalleryPhoto(idx)}
                        style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.8)', color: '#fff', width: '18px', height: '18px', borderRadius: '50%', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}

                  <button 
                    type="button"
                    onClick={() => galleryInputRef.current && galleryInputRef.current.click()}
                    style={{ width: '60px', height: '75px', border: '1px dashed var(--rg-gold-400)', background: 'rgba(207,161,53,0.05)', color: 'var(--rg-gold-400)', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', cursor: 'pointer' }}
                  >
                    <FiPlus />
                    <span>Angle</span>
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Available Sizes (Comma-separated)</label>
                <input 
                  type="text" 
                  value={formFields.sizes}
                  onChange={e => setFormFields({ ...formFields, sizes: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Color Swatch Hex Codes (Comma-separated)</label>
                <input 
                  type="text" 
                  value={formFields.swatches}
                  onChange={e => setFormFields({ ...formFields, swatches: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.35rem' }}>Description</label>
                <textarea 
                  rows={3}
                  value={formFields.description}
                  onChange={e => setFormFields({ ...formFields, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--rg-surface)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ background: 'var(--rg-gold-gradient)', color: '#000', border: 'none' }}>
                  {editingItem ? 'Save Updates' : 'Post Good & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

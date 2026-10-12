/* ==========================================================================
   R&G COLLECTIONS - PRODUCT GRID COMPONENT
   ========================================================================== */

import React from 'react';
import ProductCard from './ProductCard.jsx';
import '../styles/product-card.css';

export default function ProductGrid({ products = [], columns = 4, onQuickView }) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#faf9f6', border: '1px solid #e4e4e7', borderRadius: '4px' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Goods Found</h3>
        <p style={{ color: 'var(--rg-gray-500)', fontSize: '0.9rem' }}>Try clearing filters or checking other categories.</p>
      </div>
    );
  }

  return (
    <div className={`product-grid-${columns}`}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onQuickView={onQuickView} 
        />
      ))}
    </div>
  );
}

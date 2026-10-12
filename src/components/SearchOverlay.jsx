/* ==========================================================================
   R&G COLLECTIONS - SEARCH OVERLAY COMPONENT
   ========================================================================== */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { useShop } from '../context/ShopContext.jsx';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, products } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const matchingSuggestions = products.filter(p => 
    query.trim() && p.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="search-overlay-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div className="search-box-card" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
          <FiSearch style={{ fontSize: '1.4rem', color: 'var(--rg-black)' }} />
          <input 
            type="text" 
            placeholder="Search Senator suits, linen shirts, loafers..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button 
            type="button" 
            onClick={() => setIsSearchOpen(false)}
            style={{ fontSize: '1.25rem', color: 'var(--rg-gray-500)' }}
            aria-label="Close search overlay"
          >
            <FiX />
          </button>
        </form>

        {matchingSuggestions.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.75rem' }}>
              Suggested Goods
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {matchingSuggestions.map(item => (
                <div 
                  key={item.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.4rem', borderRadius: '4px', background: '#f8f8fa' }}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigate(`/product/${item.slug || item.id}`);
                  }}
                >
                  <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '2px' }} />
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem' }}>{item.name}</h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--rg-gray-500)' }}>NGN {Number(item.price).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

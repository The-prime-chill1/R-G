/* ==========================================================================
   R&G COLLECTIONS - WISHLIST PAGE
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount).toLocaleString('en-NG');
  };

  const handleMoveToBag = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--rg-ivory)', color: 'var(--rg-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem' }}>
          <FiHeart />
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--rg-gray-500)', maxWidth: '420px', margin: '0 auto 2rem', fontSize: '0.92rem' }}>
          Explore our seasonal sartorial edits and save your favorite garments for later.
        </p>
        <Link to="/shop" className="btn-primary" style={{ padding: '1rem 2rem' }}>
          <span>Explore Catalog</span> <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem' }}>
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--rg-gray-200)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Saved Goods ({wishlist.length})</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {wishlist.map(item => (
          <div key={item.id} style={{ background: '#fff', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
            <div style={{ height: '320px', position: 'relative' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button 
                onClick={() => toggleWishlist(item)}
                style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', color: 'var(--rg-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                aria-label="Remove from wishlist"
              >
                <FiTrash2 />
              </button>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--rg-gold-500)' }}>{item.categoryLabel || 'Essentials'}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', margin: '0.25rem 0 0.5rem' }}>
                <Link to={`/product/${item.slug || item.id}`}>{item.name}</Link>
              </h3>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1.25rem' }}>{formatNaira(item.price)}</div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '0.75rem' }}
                onClick={() => handleMoveToBag(item)}
              >
                <FiShoppingBag /> Move to Shopping Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

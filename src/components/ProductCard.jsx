/* ==========================================================================
   R&G COLLECTIONS - PRODUCT CARD COMPONENT
   Strict Rules: React Icons Only, Zero Emojis, High-Fashion Editorial Layout
   ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import '../styles/product-card.css';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount).toLocaleString('en-NG');
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="rg-product-card">
      <div className="product-media-wrapper">
        <Link to={`/product/${product.slug || product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-primary-img"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </Link>

        {/* Badge Overlays */}
        <div className="product-badge-overlay">
          {product.tag && <span className="badge-tag badge-gold">{product.tag}</span>}
          {product.discount && <span className="badge-tag badge-sale">{product.discount}</span>}
        </div>

        {/* Wishlist Icon */}
        <button 
          className={`product-wishlist-trigger ${isLiked ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart style={{ fill: isLiked ? 'currentColor' : 'none' }} />
        </button>

        {/* Quick View Bar */}
        <div className="product-quick-actions-bar">
          <button 
            className="btn-quick-view"
            onClick={() => onQuickView && onQuickView(product)}
          >
            <FiEye style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Quick View
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="product-info-box">
        <span className="product-category-hint">{product.categoryLabel || 'Essentials'}</span>
        <h4 className="product-card-title">
          <Link to={`/product/${product.slug || product.id}`}>{product.name}</Link>
        </h4>

        <div className="product-pricing-row">
          <span className="price-current">{formatNaira(product.price)}</span>
          {product.originalPrice && (
            <span className="price-original">{formatNaira(product.originalPrice)}</span>
          )}
        </div>

        {/* Swatch dots */}
        {Array.isArray(product.swatches) && product.swatches.length > 0 && (
          <div className="product-swatches-row">
            {product.swatches.map((color, idx) => (
              <span 
                key={idx} 
                className="color-swatch-dot" 
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        <button 
          className="btn-card-add-cart"
          onClick={handleQuickAdd}
        >
          <FiShoppingBag /> Add to Bag
        </button>
      </div>
    </div>
  );
}

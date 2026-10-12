/* ==========================================================================
   R&G COLLECTIONS - QUICK VIEW MODAL COMPONENT (MULTI-ANGLE IMAGE GALLERY)
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React, { useState } from 'react';
import { FiX, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(Array.isArray(product.sizes) ? product.sizes[0] : 'Standard');
  const [selectedColor, setSelectedColor] = useState(Array.isArray(product.swatches) ? product.swatches[0] : '#000000');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount).toLocaleString('en-NG');
  };

  const handleOrderWhatsApp = () => {
    const msg = `*R & G COLLECTIONS - PRODUCT INQUIRY*\n` +
                `-----------------------------------\n` +
                `Item: ${product.name}\n` +
                `Price: ${formatNaira(product.price)}\n` +
                `Size: ${selectedSize}\n` +
                `-----------------------------------\n` +
                `Hello, I would like to order this item. Please confirm availability and delivery dispatch.`;
    window.open(`https://wa.me/2349045231629?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="product-modal-backdrop active" onClick={onClose}>
      <div className="product-modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <FiX />
        </button>

        {/* Gallery Col */}
        <div className="modal-gallery-col">
          <div className="modal-main-img-wrap">
            <img 
              src={allImages[activeImgIdx] || product.image} 
              alt={product.name} 
              className="modal-main-img" 
            />
          </div>

          {allImages.length > 1 && (
            <div className="modal-thumbs-row">
              {allImages.map((src, idx) => (
                <button 
                  key={idx}
                  className={`modal-thumb-btn ${activeImgIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveImgIdx(idx)}
                >
                  <img src={src} alt="Angle thumbnail" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Col */}
        <div className="modal-info-col">
          <div className="modal-tag">{product.tag || 'R&G ESSENTIAL'}</div>
          <h3 className="modal-title">{product.name}</h3>
          <div className="modal-price">{formatNaira(product.price)}</div>

          <p className="modal-desc">
            {product.description || 'Crafted with premium sartorial fabrics tailored for R&G Collections.'}
          </p>

          {/* Sizes */}
          {Array.isArray(product.sizes) && product.sizes.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="modal-sizes-title">Select Size:</div>
              <div className="modal-sizes-row">
                {product.sizes.map(sz => (
                  <button 
                    key={sz}
                    className={`modal-size-pill ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            <button 
              className="btn-primary"
              onClick={() => {
                addToCart(product, selectedSize, selectedColor);
                onClose();
              }}
            >
              <FiShoppingBag /> Add to Shopping Bag
            </button>

            <button 
              className="btn-modal-wa"
              onClick={handleOrderWhatsApp}
            >
              <FaWhatsapp style={{ marginRight: '6px', verticalAlign: 'middle', fontSize: '1.1rem' }} /> Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

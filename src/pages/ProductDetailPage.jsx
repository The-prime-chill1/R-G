/* ==========================================================================
   R&G COLLECTIONS - PRODUCT DETAIL PAGE
   Strict Rules: React Icons Only, Zero Emojis, Image Zoom Gallery, Size Guide
   ========================================================================== */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiHeart, 
  FiShoppingBag, 
  FiTruck, 
  FiScissors, 
  FiShield, 
  FiArrowLeft 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SizeGuideModal from '../components/SizeGuideModal.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { useShop } from '../context/ShopContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import '../styles/product-detail.css';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { products } = useShop();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const product = products.find(p => p.slug === slug || p.id === slug);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImageIdx(0);
      setSelectedSize(Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
      setSelectedColor(Array.isArray(product.swatches) && product.swatches.length > 0 ? product.swatches[0] : '#000000');
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Good Not Found</h2>
        <p style={{ color: 'var(--rg-gray-500)', marginBottom: '2rem' }}>The item you are searching for is unavailable or archived.</p>
        <Link to="/shop" className="btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean);
  const isLiked = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount).toLocaleString('en-NG');
  };

  const handleOrderWhatsApp = () => {
    const msg = `*R & G COLLECTIONS - PRODUCT INQUIRY*\n` +
                `-----------------------------------\n` +
                `Item: ${product.name}\n` +
                `SKU: ${product.sku || 'RG-ESSENTIAL'}\n` +
                `Selected Size: ${selectedSize}\n` +
                `Price: ${formatNaira(product.price)}\n` +
                `-----------------------------------\n` +
                `Hello, I would like to order this item. Please confirm delivery dispatch.`;
    window.open(`https://wa.me/2349045231629?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor);
    navigate('/checkout');
  };

  return (
    <div className="container product-detail-container">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--rg-gray-500)', marginBottom: '2rem' }}>
        <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <FiArrowLeft /> Back to Shop
        </Link>
        <span>/</span>
        <Link to={`/shop?cat=${product.category}`}>{product.categoryLabel || 'Collection'}</Link>
        <span>/</span>
        <span style={{ color: 'var(--rg-black)', fontWeight: 700 }}>{product.name}</span>
      </div>

      <div className="product-detail-grid">
        {/* Left Column: Image Gallery */}
        <div className="product-gallery-sticky">
          {allImages.length > 1 && (
            <div className="gallery-thumbnails-col">
              {allImages.map((src, idx) => (
                <button 
                  key={idx}
                  className={`gallery-thumb-item ${activeImageIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIdx(idx)}
                >
                  <img src={src} alt={`${product.name} angle ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}

          <div className="gallery-main-view">
            <img 
              src={allImages[activeImageIdx] || product.image} 
              alt={product.name} 
            />
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="product-detail-info">
          <div className="detail-tag-badge">{product.tag || 'R&G BESPOKE'}</div>
          <h1 className="detail-product-title">{product.name}</h1>

          <div className="detail-pricing-box">
            <span className="detail-price-main">{formatNaira(product.price)}</span>
            {product.originalPrice && (
              <span className="detail-price-discount">{formatNaira(product.originalPrice)}</span>
            )}
            {product.discount && (
              <span className="badge-tag badge-sale">{product.discount}</span>
            )}
          </div>

          <p className="detail-description">
            {product.description || 'Master-crafted luxury garment tailored with the highest density fabrics and impeccable finishing.'}
          </p>

          {/* Sizes */}
          {Array.isArray(product.sizes) && product.sizes.length > 0 && (
            <div className="detail-option-group">
              <div className="detail-option-header">
                <span className="detail-option-label">Select Size: {selectedSize}</span>
                <button 
                  className="btn-size-guide-modal"
                  onClick={() => setSizeGuideOpen(true)}
                >
                  Size Guide & Measurements
                </button>
              </div>

              <div className="detail-sizes-row">
                {product.sizes.map(sz => (
                  <button 
                    key={sz}
                    className={`detail-size-btn ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Tones */}
          {Array.isArray(product.swatches) && product.swatches.length > 0 && (
            <div className="detail-option-group">
              <div className="detail-option-label" style={{ marginBottom: '0.65rem' }}>
                Fabric Tone:
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.swatches.map((col, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedColor(col)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: col,
                      border: selectedColor === col ? '2px solid var(--rg-black)' : '1px solid #ccc',
                      outline: selectedColor === col ? '2px solid var(--rg-gold-400)' : 'none',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="detail-cta-actions">
            <button 
              className="btn-primary btn-detail-add-bag"
              onClick={() => addToCart(product, selectedSize, selectedColor)}
            >
              <FiShoppingBag /> Add to Shopping Bag
            </button>

            <button 
              className="btn-detail-buy-now"
              onClick={handleBuyNow}
            >
              Instant Paystack Checkout
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className="btn-secondary" 
                style={{ flex: 1, padding: '0.85rem' }}
                onClick={handleOrderWhatsApp}
              >
                <FaWhatsapp style={{ color: '#25D366' }} /> Order on WhatsApp
              </button>

              <button 
                className={`btn-secondary ${isLiked ? 'btn-gold' : ''}`}
                style={{ width: '54px', padding: 0 }}
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist item"
              >
                <FiHeart style={{ fill: isLiked ? 'currentColor' : 'none' }} />
              </button>
            </div>
          </div>

          {/* Guarantee Specs */}
          <div className="detail-meta-specs">
            <div><FiTruck style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Express Same-Day & Next-Day Dispatch across Lagos, Akure, & Owo</div>
            <div><FiScissors style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Bespoke sizing adjustments available on request</div>
            <div><FiShield style={{ marginRight: '6px', verticalAlign: 'middle' }} /> 100% Guaranteed Premium Nigerian & Italian Textiles</div>
            <div style={{ marginTop: '0.5rem' }}>SKU: <strong>{product.sku || 'RG-LUX-001'}</strong></div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--rg-gray-200)', paddingTop: '3.5rem' }}>
          <div className="section-top-bar">
            <h3 className="section-title">Complete The Wardrobe</h3>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}

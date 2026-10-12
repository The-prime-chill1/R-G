/* ==========================================================================
   R&G COLLECTIONS - CART DRAWER COMPONENT
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiX, 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiArrowRight, 
  FiShoppingBag 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext.jsx';
import '../styles/cart-drawer.css';

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    discountAmount, 
    grandTotal 
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount).toLocaleString('en-NG');
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div 
        className="cart-drawer-backdrop" 
        onClick={() => setIsCartOpen(false)}
      />

      <div className="cart-drawer-panel" role="dialog" aria-label="Shopping Cart">
        {/* Header */}
        <div className="cart-drawer-header">
          <h3>Shopping Bag ({cartItems.length})</h3>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ fontSize: '1.25rem', color: 'var(--rg-black)' }}
            aria-label="Close cart drawer"
          >
            <FiX />
          </button>
        </div>

        {/* Items List */}
        <div className="cart-items-scroll-area">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--rg-gray-500)' }}>
              <FiShoppingBag style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--rg-gray-400)' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--rg-black)' }}>
                Your bag is empty
              </h4>
              <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>Explore our new arrivals and curated lookbooks.</p>
              <button 
                className="btn-primary"
                onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.itemKey} className="cart-item-row">
                <div className="cart-item-thumb">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-variant-spec">
                    Size: {item.selectedSize} | Tone: <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.selectedColor, verticalAlign: 'middle', border: '1px solid #ccc' }} />
                  </div>
                  <div className="cart-item-price">{formatNaira(item.price)}</div>

                  <div className="cart-quantity-selector">
                    <button 
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <FiMinus />
                    </button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button 
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <button 
                  className="cart-item-remove-btn"
                  onClick={() => removeFromCart(item.itemKey)}
                  aria-label="Remove item from bag"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="cart-summary-line" style={{ color: 'var(--rg-gold-500)' }}>
                <span>Discount</span>
                <span>-{formatNaira(discountAmount)}</span>
              </div>
            )}

            <div className="cart-summary-line">
              <span>Estimated Delivery</span>
              <span>{deliveryFee === 0 ? 'COMPLIMENTARY' : formatNaira(deliveryFee)}</span>
            </div>

            <div className="cart-summary-line total">
              <span>Total</span>
              <span>{formatNaira(grandTotal)}</span>
            </div>

            <button 
              className="btn-primary btn-checkout-drawer"
              onClick={handleGoToCheckout}
            >
              <span>Proceed to Checkout</span> <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

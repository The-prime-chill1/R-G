/* ==========================================================================
   R&G COLLECTIONS - SHOPPING CART CONTEXT
   Handles cart items, variants (size, color), quantities, coupons & totals
   ========================================================================== */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext.jsx';

const CartContext = createContext(null);
const LOCAL_CART_KEY = 'rg_cart_items';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(LOCAL_CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize = '', selectedColor = '', quantity = 1) => {
    const sizeToUse = selectedSize || (Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    const colorToUse = selectedColor || (Array.isArray(product.swatches) && product.swatches.length > 0 ? product.swatches[0] : '#000000');
    const itemKey = `${product.id}-${sizeToUse}-${colorToUse}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, {
        itemKey,
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        categoryLabel: product.categoryLabel,
        selectedSize: sizeToUse,
        selectedColor: colorToUse,
        quantity
      }];
    });

    addToast(`Added ${product.name} to cart.`);
    setIsCartOpen(true);
  };

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems(prev => prev.map(item => item.itemKey === itemKey ? { ...item, quantity: newQuantity } : item));
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
    addToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
    localStorage.removeItem(LOCAL_CART_KEY);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    try {
      const stored = localStorage.getItem('rg_coupons_data');
      const coupons = stored ? JSON.parse(stored) : [];
      const match = coupons.find(c => c.code.toUpperCase() === cleanCode && c.active);
      if (match) {
        setAppliedCoupon({ code: match.code, percentage: Number(match.percentage) });
        addToast(`Coupon "${match.code}" applied: ${match.percentage}% discount.`);
        return true;
      }
    } catch (e) {
      console.warn('Coupon lookup error:', e);
    }

    addToast('Invalid or inactive coupon code.', 'error');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode('');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  const deliveryFee = subtotal > 100000 ? 0 : (cartItems.length > 0 ? 3500 : 0);
  const calculatedDiscount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.percentage / 100)) : 0;
  const grandTotal = Math.max(0, subtotal - calculatedDiscount + deliveryFee);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      deliveryFee,
      discountAmount: calculatedDiscount,
      grandTotal,
      totalCount,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      couponCode,
      setCouponCode
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

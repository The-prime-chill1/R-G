/* ==========================================================================
   R&G COLLECTIONS - WISHLIST CONTEXT
   ========================================================================== */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext.jsx';

const WishlistContext = createContext(null);
const LOCAL_WISHLIST_KEY = 'rg_wishlist_items';

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(LOCAL_WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      addToast(`Removed ${product.name} from wishlist.`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      addToast(`Saved ${product.name} to wishlist.`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      toggleWishlist,
      isInWishlist,
      wishlistCount: wishlist.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

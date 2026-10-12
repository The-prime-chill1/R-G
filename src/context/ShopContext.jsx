/* ==========================================================================
   R&G COLLECTIONS - CATALOG & SHOP CONTEXT
   Synchronizes products, categories, collections & live filters
   ========================================================================== */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from '../services/firebase.js';
import { RG_LOOKBOOKS } from '../data/sampleData.js';

const ShopContext = createContext(null);
const LOCAL_PRODUCTS_KEY = 'rg_goods_catalog';
const LOCAL_CATEGORIES_KEY = 'rg_categories_data';
const LOCAL_ORDERS_KEY = 'rg_orders_data';

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lookbooks, setLookbooks] = useState(RG_LOOKBOOKS);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load catalog on mount
  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    setLoading(true);
    let loadedProducts = [];
    let loadedCategories = [];
    let loadedOrders = [];

    // 1. Try Firebase Firestore
    if (db) {
      try {
        const prodSnap = await getDocs(collection(db, 'products'));
        if (!prodSnap.empty) {
          prodSnap.forEach(d => loadedProducts.push({ id: d.id, ...d.data() }));
        }

        const catSnap = await getDocs(collection(db, 'categories'));
        if (!catSnap.empty) {
          catSnap.forEach(d => loadedCategories.push({ id: d.id, ...d.data() }));
        }

        const orderSnap = await getDocs(collection(db, 'orders'));
        if (!orderSnap.empty) {
          orderSnap.forEach(d => loadedOrders.push({ id: d.id, ...d.data() }));
        }
      } catch (err) {
        // Silent fallback to local storage
      }
    }

    // 2. Fallback to localStorage — never fall back to hardcoded sample data
    if (loadedProducts.length === 0) {
      const localP = localStorage.getItem(LOCAL_PRODUCTS_KEY);
      if (localP) {
        const parsed = JSON.parse(localP);
        // Discard if it's the old sample data (ids start with 'rg-prod-')
        const isStale = parsed.length > 0 && parsed[0].id?.startsWith('rg-prod-');
        if (!isStale) {
          loadedProducts = parsed;
        } else {
          localStorage.removeItem(LOCAL_PRODUCTS_KEY);
        }
      }
      // Otherwise stay empty — admin will upload products
    }

    if (loadedCategories.length === 0) {
      const localC = localStorage.getItem(LOCAL_CATEGORIES_KEY);
      loadedCategories = localC ? JSON.parse(localC) : [];
    }

    if (loadedOrders.length === 0) {
      const localO = localStorage.getItem(LOCAL_ORDERS_KEY);
      loadedOrders = localO ? JSON.parse(localO) : [];
    }

    setProducts(loadedProducts);
    setCategories(loadedCategories);
    setOrders(loadedOrders);
    setLoading(false);
  };

  // Product CRUD
  const addProduct = async (productData) => {
    const id = 'rg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 4);
    const newProduct = {
      id,
      ...productData,
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await setDoc(doc(db, 'products', id), newProduct);
      } catch (e) {
        console.warn('Firestore set product fallback:', e.message);
      }
    }

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
    return newProduct;
  };

  const updateProduct = async (id, updatedFields) => {
    if (db) {
      try {
        await updateDoc(doc(db, 'products', id), updatedFields);
      } catch (e) {
        console.warn('Firestore update product fallback:', e.message);
      }
    }

    const updated = products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setProducts(updated);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
  };

  const deleteProduct = async (id) => {
    if (db) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (e) {
        console.warn('Firestore delete product fallback:', e.message);
      }
    }

    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
  };

  // Order Placement
  const placeOrder = async (orderPayload) => {
    const orderId = 'RGO-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    const order = {
      id: orderId,
      orderNumber: orderId,
      ...orderPayload,
      status: 'Confirmed',
      paymentStatus: orderPayload.paymentStatus || 'Paid',
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await setDoc(doc(db, 'orders', orderId), order);
      } catch (e) {
        console.warn('Firestore save order fallback:', e.message);
      }
    }

    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedOrders));
    return order;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (db) {
      try {
        await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      } catch (e) {
        console.warn('Firestore update order status fallback:', e.message);
      }
    }

    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
  };

  return (
    <ShopContext.Provider value={{
      products,
      categories,
      lookbooks,
      orders,
      searchTerm,
      setSearchTerm,
      isSearchOpen,
      setIsSearchOpen,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      placeOrder,
      updateOrderStatus,
      refreshCatalog: loadCatalog
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}

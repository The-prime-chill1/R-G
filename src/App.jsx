/* ==========================================================================
   R&G COLLECTIONS - ROOT APPLICATION COMPONENT
   Strict Rules: React Router, React Icons Only, Zero Emojis, Zero Tailwind
   Guest checkout only — no customer accounts.
   ========================================================================== */

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout & Global Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SearchOverlay from './components/SearchOverlay.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import { AdminRoute } from './components/ProtectedRoute.jsx';

// Context Providers
import { ToastProvider } from './context/ToastContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ShopProvider } from './context/ShopContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

// Storefront Pages
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import { AdminLoginPage } from './pages/AuthPages.jsx';

// Admin Suite Pages
import AdminLayout from './admin/AdminLayout.jsx';
import AdminOverview from './admin/AdminOverview.jsx';
import AdminProducts from './admin/AdminProducts.jsx';
import AdminOrders from './admin/AdminOrders.jsx';
import AdminCategories from './admin/AdminCategories.jsx';
import AdminCoupons from './admin/AdminCoupons.jsx';
import AdminSettings from './admin/AdminSettings.jsx';

// Global Styles
import './styles/global.css';

function MainLayout({ children }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    return children;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ShopProvider>
          <CartProvider>
            <WishlistProvider>
              <MainLayout>
                <Routes>
                  {/* Public Storefront Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route path="/collections" element={<CollectionsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />

                  {/* Admin Login Only — no customer accounts */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />

                  {/* Admin Protected Dashboard Routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <AdminRoute>
                        <AdminLayout />
                      </AdminRoute>
                    }
                  >
                    <Route index element={<AdminOverview />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="coupons" element={<AdminCoupons />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* 404 Catch All */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </MainLayout>
            </WishlistProvider>
          </CartProvider>
        </ShopProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

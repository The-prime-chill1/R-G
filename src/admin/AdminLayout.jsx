/* ==========================================================================
   R&G COLLECTIONS - ADMIN DASHBOARD LAYOUT & NAVIGATION
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  FiGrid, 
  FiBox, 
  FiShoppingBag, 
  FiTag, 
  FiPercent, 
  FiSettings, 
  FiLogOut, 
  FiExternalLink,
  FiUser
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/admin.css';

export default function AdminLayout() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout-root">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-brand-title">R & G</div>
          <span style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--rg-gray-400)' }}>
            Admin Master Suite
          </span>
        </div>

        <ul className="admin-nav-menu">
          <li>
            <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
              <FiGrid /> Dashboard Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
              <FiBox /> Manage Goods & Photos
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
              <FiShoppingBag /> Client Orders & Dispatch
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
              <FiTag /> Categories & Lookbooks
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/coupons" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
              <FiPercent /> Promo & Coupons
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
              <FiSettings /> Store Settings & Contact
            </NavLink>
          </li>
        </ul>

        <div className="admin-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--rg-gray-400)' }}>
            <FiUser /> <span>{currentUser?.email || 'Admin'}</span>
          </div>
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rg-error)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <FiLogOut /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="admin-main-wrapper">
        <header className="admin-top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>
            <span>Portal</span> / <strong style={{ color: '#fff' }}>R&G Collections Management</strong>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link 
              to="/" 
              target="_blank" 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--rg-gold-300)', fontWeight: 700 }}
            >
              <FiExternalLink /> Live Public Storefront
            </Link>
          </div>
        </header>

        <main className="admin-body-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ==========================================================================
   R&G COLLECTIONS - ADMIN DASHBOARD LAYOUT & NAVIGATION
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React, { useState, useEffect } from 'react';
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
  FiUser,
  FiCalendar,
  FiClock,
  FiUsers
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/admin.css';

import { subscribeToVisitorCount, getCurrentVisitorCount } from '../services/presence.js';

export default function AdminLayout() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // Live Telemetry: Clock, Date, and Real-Time Active Visitors
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(() => getCurrentVisitorCount());

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Subscribe to real live visitor presence
    const unsubscribePresence = subscribeToVisitorCount((count) => {
      setVisitorCount(count);
    });

    return () => {
      clearInterval(clockTimer);
      unsubscribePresence();
    };
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--rg-gray-400)' }}>
              <span>Portal</span> / <strong style={{ color: '#fff' }}>R&G Collections Management</strong>
            </div>

            {/* Live Header Telemetry: Visitors, Date, and Real-Time Clock */}
            <div className="admin-header-telemetry">
              <div className="telemetry-item telemetry-visitors" title="Live Active Storefront Visitors">
                <span className="admin-status-dot"></span>
                <FiUsers size={13} />
                <span className="telemetry-val">{visitorCount}</span>
                <span className="telemetry-lbl">Live Visitors</span>
              </div>
              <div className="telemetry-item telemetry-datetime" title="Atelier Real-Time Clock & Date">
                <FiCalendar size={13} />
                <span className="telemetry-date">{formattedDate}</span>
                <span className="telemetry-sep">•</span>
                <FiClock size={13} />
                <span className="telemetry-time">{formattedTime}</span>
              </div>
            </div>
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

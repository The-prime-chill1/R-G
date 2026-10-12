/* ==========================================================================
   R&G COLLECTIONS — FLOATING PILL NAVBAR
   Inspired by ChillTech floating capsule navbar style
   Pure CSS, Zero Emojis, react-icons only, 100% Responsive
   ========================================================================== */

import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FiSearch,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiHome,
  FiGrid,
  FiScissors,
  FiBook,
  FiUser
} from 'react-icons/fi';
import { useCart } from '../context/CartContext.jsx';
import { useShop } from '../context/ShopContext.jsx';
import '../styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useShop();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/',            label: 'Home',        icon: <FiHome />,      exact: true  },
    { to: '/shop',        label: 'Shop',         icon: <FiGrid />                   },
    { to: '/collections', label: 'Collections',  icon: <FiBook />                   },
    { to: '/about',       label: 'About',        icon: <FiUser />                   },
    { to: '/contact',     label: 'Contact',      icon: <FiScissors />               },
  ];

  return (
    <>


      {/* FLOATING PILL NAVBAR */}
      <div className={`rg-pill-nav-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="rg-pill-navbar" aria-label="Main Navigation">

          {/* LEFT: Logo + Brand */}
          <Link to="/" className="rg-pill-brand" aria-label="R&G Home">
            <div className="rg-pill-logo-badge">
              <span>RG</span>
            </div>
            <span className="rg-pill-brand-name">R&amp;G</span>
          </Link>

          {/* CENTER: Nav Links */}
          <ul className="rg-pill-nav-list" role="list">
            {navLinks.map(({ to, label, icon, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `rg-pill-nav-item ${isActive ? 'rg-pill-nav-item--active' : ''}`
                  }
                >
                  <span className="rg-pill-nav-icon">{icon}</span>
                  <span className="rg-pill-nav-label">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* RIGHT: Search + Cart only — no login, no account */}
          <div className="rg-pill-actions">
            <button
              className="rg-pill-action-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              title="Search"
            >
              <FiSearch />
            </button>

            <button
              className="rg-pill-action-btn rg-pill-cart-btn rg-pill-action-rel"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              title="Cart"
            >
              <FiShoppingBag />
              {totalCount > 0 && (
                <span className="rg-pill-badge">{totalCount}</span>
              )}
              <span className="rg-cart-label">CART</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="rg-pill-hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <>
          <div
            className="rg-mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="rg-mobile-drawer">
            <div className="rg-mobile-drawer-top">
              <span className="rg-mobile-brand">R&amp;G</span>
              <button
                className="rg-mobile-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>
            <ul className="rg-mobile-links">
              {navLinks.map(({ to, label, icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rg-mobile-link"
                  >
                    <span className="rg-mobile-link-icon">{icon}</span>
                    {label}
                  </Link>
                </li>
              ))}

            </ul>

            <div className="rg-mobile-drawer-actions">
              <button
                className="rg-mobile-action-btn rg-mobile-cart-btn"
                onClick={() => { setIsCartOpen(true); setMobileMenuOpen(false); }}
              >
                <FiShoppingBag /> View Cart ({totalCount})
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

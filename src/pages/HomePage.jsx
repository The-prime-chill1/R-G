/* ==========================================================================
   R&G COLLECTIONS - MINIMALIST EDITORIAL HOME PAGE
   High-Fashion Editorial Aesthetic with Animated Statement Hero
   Pure Clean CSS, Zero Emojis, 100% Responsive
   ========================================================================== */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTruck, 
  FiPackage, 
  FiAward, 
  FiLock,
  FiCheckCircle
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ProductGrid from '../components/ProductGrid.jsx';
import QuickViewModal from '../components/QuickViewModal.jsx';
import { useShop } from '../context/ShopContext.jsx';
import { RG_LOOKBOOKS, RG_TESTIMONIALS } from '../data/sampleData.js';
import '../styles/editorial-home.css';

// Signature photography assets
const HERO_OUTFIT_IMAGE = '/hero-outfit.png';

export default function HomePage() {
  const { products, lookbooks } = useShop();
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const bestOfProducts = products.slice(0, 4);

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG');
  };

  const handleOrderLook = (look) => {
    const itemsList = look.items.map(i => `${i.name} (${formatNaira(i.price)})`).join(', ');
    const msg = `*R&G COLLECTIONS - LOOKBOOK INQUIRY*\n` +
                `-----------------------------------\n` +
                `Look: ${look.title} - ${look.subtitle}\n` +
                `Items Included: ${itemsList}\n` +
                `Total: ${formatNaira(look.total)}\n` +
                `-----------------------------------\n` +
                `Hello, I would like to order this full lookbook set. Please advise on delivery.`;
    window.open(`https://wa.me/2349045231629?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleScrollToVibes = (e) => {
    e.preventDefault();
    const target = document.getElementById('vibes-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="editorial-home-wrapper">
      {/* 1. CINEMATIC STATEMENT HERO WITH LOADING ANIMATION (USER REQUEST) */}
      <section className="editorial-hero">
        {/* Boutique closet background layer with zoom entrance */}
        <div className="hero-bg-layer" />

        {/* Ambient gold glow behind center letters */}
        <div className="hero-ambient-glow" />

        {/* Top-Left Floating Tagline */}
        <div className="hero-floating-top-left">
          <span>FASHION</span>
          <span>THAT MOVES</span>
          <span className="hero-tagline-underline">WITH YOU.</span>
        </div>

        {/* Giant Centered Display Typography with Loading Entrance */}
        <div className="hero-statement-center">
          <div className="hero-giant-bg-text" aria-label="R & G">
            <span className="hero-letter hero-letter-r">R</span>
            <span className="hero-letter hero-letter-amp">&amp;</span>
            <span className="hero-letter hero-letter-g">G</span>
          </div>
          {/* Luxury loading progress beam */}
          <div className="hero-loading-beam" />
        </div>

        {/* Bottom-Left Floating CTAs */}
        <div className="hero-floating-bottom-left">
          <Link to="/shop" className="btn-hero-solid">
            SHOP NOW
          </Link>
          <a href="#vibes-section" onClick={handleScrollToVibes} className="btn-hero-underlined">
            EXPLORE NEW IN
          </a>
        </div>

        {/* Bottom-Right Seasonal Tag */}
        <div className="hero-floating-bottom-right">
          <span>NEW</span>
          <span>COLLECTION</span>
          <span className="hero-season-underline">2027</span>
        </div>
      </section>

      {/* 2. EDITORIAL SPLIT SECTION — EXACT SPECIFICATION FROM USER (IMAGE 1) */}
      <section className="editorial-vibes-section" id="vibes-section">
        <div className="editorial-vibes-container">
          {/* Left Content Pane */}
          <div className="vibes-content-pane">
            <div className="vibes-sub-label">
              NEW SEASON
            </div>

            <h2 className="vibes-main-heading">
              <span>NEW</span>
              <span>VIBES</span>
            </h2>

            <p className="vibes-desc">
              Discover everything new and now. Precision cuts, luxury fabrics, and contemporary sartorial tailoring.
            </p>

            <Link to="/shop" className="btn-vibes-solid">
              EXPLORE COLLECTION
            </Link>
          </div>

          {/* Right Media Pane — Styled Luxury Editorial Frame */}
          <div className="vibes-media-pane">
            <div className="vibes-image-frame">
              <img 
                src={HERO_OUTFIT_IMAGE} 
                alt="R&G Bespoke Capsule Outfit" 
                className="vibes-media-img"
              />
              <div className="vibes-frame-pill">
                <span>SIGNATURE CAPSULE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE ASSURANCE ICONS STRIP */}
      <section className="value-pillars-strip">
        <div className="container">
          <div className="pillars-grid">
            <div className="pillar-item">
              <div className="pillar-icon-box">
                <FiTruck />
              </div>
              <div className="pillar-text">
                <h4>FAST DELIVERY</h4>
                <p>Quick & safe delivery</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <FiPackage />
              </div>
              <div className="pillar-text">
                <h4>EASY RETURNS</h4>
                <p>Within 15 days</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <FiAward />
              </div>
              <div className="pillar-text">
                <h4>QUALITY ASSURED</h4>
                <p>Best fashion, best quality</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <FiLock />
              </div>
              <div className="pillar-text">
                <h4>SECURE PAYMENT</h4>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST OF R&G PRODUCT SHOWCASE - only shown when admin has uploaded products */}
      {bestOfProducts.length > 0 && (
        <section className="best-of-section">
          <div className="container">
            <div className="best-of-header">
              <h2 className="best-of-title">BEST OF R&amp;G</h2>
              <Link to="/shop" className="best-of-view-all">
                VIEW ALL
              </Link>
            </div>
            <ProductGrid
              products={bestOfProducts}
              columns={4}
              onQuickView={prod => setSelectedQuickView(prod)}
            />
          </div>
        </section>
      )}

      {/* 5. WARDROBE LOOKBOOKS - only shown when lookbooks exist */}
      {lookbooks && lookbooks.length > 0 && (
        <section style={{ background: '#09090b', color: '#fff', padding: '5rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--rg-gold-400)', marginBottom: '0.4rem' }}>
                  STYLED ENSEMBLES
                </div>
                <h2 style={{ fontSize: '2rem', color: '#fff' }}>Wardrobe Edits & Lookbooks</h2>
              </div>
              <Link to="/collections" style={{ color: 'var(--rg-gold-300)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'underline' }}>
                View Archive
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {RG_LOOKBOOKS.map(look => (
                <div key={look.id} style={{ background: '#141417', borderRadius: 'var(--radius-xs)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ height: '340px', overflow: 'hidden' }}>
                    <img src={look.image} alt={look.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.75rem' }}>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--rg-gold-400)', fontWeight: 800 }}>{look.subtitle}</span>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.35rem', color: '#fff', margin: '0.4rem 0 1rem', fontWeight: 800 }}>{look.title}</h3>

                    <ul style={{ listStyle: 'none', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#a1a1aa' }}>
                      {look.items.map((it, i) => (
                        <li key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{it.name}</span>
                          <strong style={{ color: '#fff' }}>{formatNaira(it.price)}</strong>
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#a1a1aa' }}>Full Look Set</span>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--rg-gold-300)' }}>{formatNaira(look.total)}</div>
                      </div>
                      <button 
                        className="btn-primary"
                        style={{ background: 'var(--rg-gold-gradient)', color: '#000', border: 'none', padding: '0.65rem 1.25rem', fontWeight: 800 }}
                        onClick={() => handleOrderLook(look)}
                      >
                        <FaWhatsapp /> Shop Look
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CLIENT TESTIMONIALS */}
      <section style={{ background: '#faf9f6', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--rg-gold-500)' }}>
              CLIENT REVIEWS
            </span>
            <h2 style={{ fontSize: '2rem', marginTop: '0.4rem', fontWeight: 900 }}>Endorsed by Gentlemen of Substance</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {RG_TESTIMONIALS.map(t => (
              <div key={t.id} style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-xs)', border: '1px solid #e4e4e7' }}>
                <div style={{ color: 'var(--rg-gold-400)', display: 'flex', gap: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <FiCheckCircle /> <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#09090b', textTransform: 'uppercase' }}>Verified Client</span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#52525b', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{t.comment}"
                </p>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 800 }}>{t.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#71717a' }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedQuickView && (
        <QuickViewModal 
          product={selectedQuickView} 
          onClose={() => setSelectedQuickView(null)} 
        />
      )}
    </div>
  );
}

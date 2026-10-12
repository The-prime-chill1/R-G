/* ==========================================================================
   R&G COLLECTIONS - ABOUT & BRAND ATELIER STORY
   Strict Rules: React Icons Only, Zero Emojis, 100% Fully Responsive
   ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiScissors, FiAward } from 'react-icons/fi';
import '../styles/about.css';

export default function AboutPage() {
  React.useEffect(() => {
    document.title = "The Atelier & Sartorial Heritage | R&G Collections";
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="about-hero-section">
        <div className="container-narrow">
          <span className="about-eyebrow">
            THE R&amp;G HERITAGE
          </span>
          <h1 className="about-hero-title">
            The Essence of Modern Sartorial Power
          </h1>
          <p className="about-hero-sub">
            Founded and led by <strong style={{ color: '#fff' }}>RAJ — Rasaq Annu Jamiu</strong>, R&amp;G Collections is a premium Nigerian fashion label built to dress men of substance with dignity, structure, and uncompromising quality.
          </p>
        </div>
      </section>

      {/* Main Story Content */}
      <section className="section-spacer container-narrow">
        {/* Founder Card */}
        <div className="about-founder-card">
          <div className="about-founder-avatar">
            RAJ
          </div>
          <div className="about-founder-content">
            <div className="about-founder-role">Founder &amp; Creative Director</div>
            <h2 className="about-founder-name">Rasaq Annu Jamiu</h2>
            <p className="about-founder-bio">
              RAJ built R&amp;G Collections from a singular vision — that Nigerian men deserve fashion that commands respect. With a deep appreciation for sartorial craft, he leads every design decision, sourcing, and brand direction personally.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.02rem', color: 'var(--rg-gray-600)', lineHeight: '1.9' }}>
          <p>
            <strong>R&amp;G Collections</strong> was founded with an unyielding mandate: to dress gentlemen of substance with absolute dignity, architectural structure, and uncompromising quality.
          </p>
          <p>
            In a landscape crowded with mass-produced menswear, R&amp;G stands apart as an atelier where every seam, buttonhole, and lapel is given rigorous attention. Our Senator suits and ceremonial Kaftans utilize high-density cashmere blends sourced for their breathability in tropical climates and remarkable drape.
          </p>
          <p>
            Our footwear atelier collaborates with master artisans to produce handmade Blake-stitched loafers, monk-straps, and orthopedic cross-palms using hand-burnished calfskin that molds to the wearer's feet over time.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="about-pillars-grid">
          <div className="about-pillar-card">
            <div style={{ fontSize: '1.75rem', color: 'var(--rg-gold-500)', marginBottom: '1rem' }}><FiScissors /></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Bespoke Precision</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-600)' }}>Every cut is balanced for the modern male silhouette, ensuring effortless movement and confidence.</p>
          </div>

          <div className="about-pillar-card">
            <div style={{ fontSize: '1.75rem', color: 'var(--rg-gold-500)', marginBottom: '1rem' }}><FiAward /></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Artisanal Integrity</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-600)' }}>We reject fleeting fast-fashion trends in favor of timeless designs built to last for generations.</p>
          </div>

          <div className="about-pillar-card">
            <div style={{ fontSize: '1.75rem', color: 'var(--rg-gold-500)', marginBottom: '1rem' }}><FiShield /></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Pan-African Reach</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-600)' }}>Headquartered across Lagos and Akure with dedicated rapid dispatch to Achievers University Owo.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/shop" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
            <span>Explore The Collection</span> <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   R&G COLLECTIONS - ABOUT & BRAND ATELIER STORY
   ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiScissors, FiAward } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'var(--rg-black)', color: '#fff', padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="container-narrow">
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--rg-gold-400)', display: 'block', marginBottom: '1rem' }}>
            THE R&amp;G HERITAGE
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', color: '#fff' }}>
            The Essence of Modern Sartorial Power
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--rg-gray-400)', lineHeight: '1.8', maxWidth: '680px', margin: '0 auto' }}>
            Founded and led by <strong style={{ color: '#fff' }}>RAJ — Rasaq Annu Jamiu</strong>, R&amp;G Collections is a premium Nigerian fashion label built to dress men of substance with dignity, structure, and uncompromising quality.
          </p>
        </div>
      </section>

      {/* Main Story Content */}
      <section className="section-spacer container-narrow">
        {/* Founder Card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', background: 'var(--rg-black)', borderRadius: 'var(--radius-xs)', padding: '2.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c96d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, color: '#09090b', flexShrink: 0, fontFamily: 'var(--font-sans)', letterSpacing: '1px' }}>
            RAJ
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--rg-gold-400)', marginBottom: '0.35rem' }}>Founder &amp; Creative Director</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Rasaq Annu Jamiu</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--rg-gray-400)', lineHeight: '1.7', maxWidth: '520px', margin: 0 }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          <div style={{ padding: '2rem', background: 'var(--rg-ivory)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--rg-gray-200)' }}>
            <div style={{ fontSize: '1.75rem', color: 'var(--rg-gold-500)', marginBottom: '1rem' }}><FiScissors /></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Bespoke Precision</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-600)' }}>Every cut is balanced for the modern male silhouette, ensuring effortless movement and confidence.</p>
          </div>

          <div style={{ padding: '2rem', background: 'var(--rg-ivory)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--rg-gray-200)' }}>
            <div style={{ fontSize: '1.75rem', color: 'var(--rg-gold-500)', marginBottom: '1rem' }}><FiAward /></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Artisanal Integrity</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-600)' }}>We reject fleeting fast-fashion trends in favor of timeless designs built to last for generations.</p>
          </div>

          <div style={{ padding: '2rem', background: 'var(--rg-ivory)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--rg-gray-200)' }}>
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

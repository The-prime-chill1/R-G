/* ==========================================================================
   R&G COLLECTIONS - COLLECTIONS & LOOKBOOKS PAGE
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { RG_LOOKBOOKS } from '../data/sampleData.js';

export default function CollectionsPage() {
  const formatNaira = (amount) => {
    return 'NGN ' + Number(amount).toLocaleString('en-NG');
  };

  const handleOrderLook = (look) => {
    const itemsList = look.items.map(i => `${i.name} (${formatNaira(i.price)})`).join(', ');
    const msg = `*R & G COLLECTIONS - LOOKBOOK INQUIRY*\n` +
                `-----------------------------------\n` +
                `Look: ${look.title} - ${look.subtitle}\n` +
                `Items Included: ${itemsList}\n` +
                `Total: ${formatNaira(look.total)}\n` +
                `-----------------------------------\n` +
                `Hello, I would like to order this full lookbook set. Please advise on sizing.`;
    window.open(`https://wa.me/2349045231629?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--rg-gold-500)', display: 'block', marginBottom: '0.5rem' }}>
          ARCHIVE & EDITORIAL LOOKS
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase' }}>Wardrobe Lookbooks</h1>
        <p style={{ color: 'var(--rg-gray-600)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
          Explore curated full outfits designed for evening occasions, boardrooms, and weekend leisure.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {RG_LOOKBOOKS.map((look, index) => (
          <div 
            key={look.id}
            style={{
              display: 'grid',
              gridTemplateColumns: index % 2 === 0 ? '1.1fr 1fr' : '1fr 1.1fr',
              gap: '3rem',
              alignItems: 'center',
              background: 'var(--rg-ivory)',
              padding: '2.5rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--rg-gray-200)'
            }}
          >
            <div style={{ order: index % 2 === 0 ? 1 : 2, height: '420px', overflow: 'hidden', borderRadius: 'var(--radius-xs)' }}>
              <img src={look.image} alt={look.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--rg-gold-500)' }}>
                {look.subtitle}
              </span>
              <h2 style={{ fontSize: '2.2rem', margin: '0.5rem 0 1rem' }}>{look.title}</h2>
              <p style={{ color: 'var(--rg-gray-600)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Engineered for maximum visual harmony, combining tailored native or casual silhouettes with handcrafted Italian calfskin footwear.
              </p>

              <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--rg-gray-200)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--rg-gray-400)', marginBottom: '0.65rem' }}>
                  Pieces in this Look:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {look.items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                      <span>{item.name}</span>
                      <strong>{formatNaira(item.price)}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--rg-gray-500)' }}>Complete Set</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--rg-black)' }}>{formatNaira(look.total)}</div>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ background: 'var(--rg-gold-gradient)', color: '#000', border: 'none' }}
                  onClick={() => handleOrderLook(look)}
                >
                  <FaWhatsapp /> Order Look on WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

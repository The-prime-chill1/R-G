/* ==========================================================================
   R&G COLLECTIONS - COLLECTIONS & LOOKBOOKS PAGE
   Strict Rules: React Icons Only, Zero Emojis, 100% Fully Responsive
   ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { RG_LOOKBOOKS } from '../data/sampleData.js';
import '../styles/collections.css';

export default function CollectionsPage() {
  React.useEffect(() => {
    document.title = "Wardrobe Edits & Lookbooks | R&G Collections";
  }, []);

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
    <div className="container collections-page-container">
      <div className="collections-header">
        <span className="collections-eyebrow">
          ARCHIVE &amp; EDITORIAL LOOKS
        </span>
        <h1 className="collections-title">Wardrobe Lookbooks</h1>
        <p className="collections-subtitle">
          Explore curated full outfits designed for evening occasions, boardrooms, and weekend leisure.
        </p>
      </div>

      <div className="collections-list">
        {RG_LOOKBOOKS.map((look, index) => {
          const isReverse = index % 2 !== 0;
          return (
            <article 
              key={look.id}
              className={`lookbook-card ${isReverse ? 'reverse-layout' : ''}`}
            >
              <div className="lookbook-image-col">
                <img 
                  src={look.image} 
                  alt={`${look.title} - ${look.subtitle}`} 
                  className="lookbook-image" 
                  loading="lazy"
                />
              </div>

              <div className="lookbook-content-col">
                <span className="lookbook-tag">
                  {look.subtitle}
                </span>
                <h2 className="lookbook-name">{look.title}</h2>
                <p className="lookbook-desc">
                  Engineered for maximum visual harmony, combining tailored native or casual silhouettes with handcrafted Italian calfskin footwear.
                </p>

                <div className="lookbook-pieces-box">
                  <div className="lookbook-pieces-header">
                    Pieces in this Look:
                  </div>
                  <ul className="lookbook-pieces-list">
                    {look.items.map((item, idx) => (
                      <li key={idx} className="lookbook-piece-item">
                        <span className="lookbook-piece-name">{item.name}</span>
                        <span className="lookbook-piece-price">{formatNaira(item.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lookbook-action-row">
                  <div className="lookbook-price-block">
                    <span className="lookbook-price-label">Complete Set</span>
                    <div className="lookbook-total-price">{formatNaira(look.total)}</div>
                  </div>

                  <button 
                    type="button"
                    className="lookbook-order-btn" 
                    onClick={() => handleOrderLook(look)}
                    aria-label={`Order ${look.title} complete look on WhatsApp`}
                  >
                    <FaWhatsapp size={17} />
                    <span>Order Look on WhatsApp</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================================
   R&G COLLECTIONS - WHATSAPP FLOATING CONCIERGE BUTTON
   Strict Rules: React Icons Only, Zero Emojis, 100% Fully Responsive
   ========================================================================== */

import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const handleOpenWhatsApp = () => {
    window.open(
      'https://wa.me/2349045231629?text=Hello%20R%26G%20Collections%2C%20I%20would%20like%20to%20inquire%20about%20your%20menswear%20collection.',
      '_blank'
    );
  };

  return (
    <div className="rg-whatsapp-float-container">
      <style>{`
        .rg-whatsapp-float-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 990;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .rg-whatsapp-tooltip {
          background: #09090b;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 0.45rem 0.9rem;
          border-radius: 100px;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(6px) scale(0.95);
          transition: opacity 0.22s ease, transform 0.22s ease;
          pointer-events: none;
          box-shadow: 0 4px 18px rgba(0,0,0,0.22);
        }
        .rg-whatsapp-float-container:hover .rg-whatsapp-tooltip {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .rg-whatsapp-btn {
          background: #09090b;
          color: #ffffff;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.55rem;
          border: 2px solid rgba(255,255,255,0.12);
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 24px rgba(0,0,0,0.35);
        }
        .rg-whatsapp-btn:hover {
          background: linear-gradient(135deg, #c9a84c, #e8c96d);
          color: #09090b;
          border-color: #c9a84c;
          box-shadow: 0 8px 30px rgba(201,168,76,0.45);
          transform: scale(1.08) translateY(-2px);
        }
        @media (max-width: 600px) {
          .rg-whatsapp-float-container {
            bottom: 18px;
            right: 18px;
          }
          .rg-whatsapp-btn {
            width: 46px;
            height: 46px;
            font-size: 1.35rem;
          }
          .rg-whatsapp-tooltip {
            display: none;
          }
        }
      `}</style>

      {/* Tooltip Label */}
      <div className="rg-whatsapp-tooltip">
        Chat with Concierge
      </div>

      {/* Main Button */}
      <button
        type="button"
        className="rg-whatsapp-btn"
        onClick={handleOpenWhatsApp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat with R&G Collections on WhatsApp"
        title="Chat with Concierge on WhatsApp"
      >
        <FaWhatsapp />
      </button>
    </div>
  );
}

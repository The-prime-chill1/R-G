/* ==========================================================================
   R&G COLLECTIONS - WHATSAPP FLOATING CONCIERGE BUTTON
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMessageCircle, FiX } from 'react-icons/fi';

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const handleOpenWhatsApp = () => {
    window.open(
      'https://wa.me/2349045231629?text=Hello%20R%26G%20Collections%2C%20I%20would%20like%20to%20inquire%20about%20your%20menswear%20collection.',
      '_blank'
    );
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      zIndex: 990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px',
    }}>
      {/* Tooltip Label */}
      <div style={{
        background: '#09090b',
        color: '#fff',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        padding: '0.45rem 0.9rem',
        borderRadius: '100px',
        whiteSpace: 'nowrap',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.95)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
        pointerEvents: 'none',
        boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
      }}>
        Chat with Concierge
      </div>

      {/* Main Button */}
      <button
        onClick={handleOpenWhatsApp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat with R&G Collections on WhatsApp"
        title="Chat with Concierge on WhatsApp"
        style={{
          background: hovered
            ? 'linear-gradient(135deg, #c9a84c, #e8c96d)'
            : '#09090b',
          color: hovered ? '#09090b' : '#ffffff',
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.55rem',
          border: hovered
            ? '2px solid #c9a84c'
            : '2px solid rgba(255,255,255,0.12)',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          boxShadow: hovered
            ? '0 8px 30px rgba(201,168,76,0.45)'
            : '0 6px 24px rgba(0,0,0,0.35)',
          transform: hovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
        }}
      >
        <FaWhatsapp />
      </button>
    </div>
  );
}

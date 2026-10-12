/* ==========================================================================
   R&G COLLECTIONS - 404 NOT FOUND PAGE
   ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '5rem', fontFamily: 'var(--font-serif)', fontWeight: 900, color: 'var(--rg-gold-400)', lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', margin: '1rem 0 0.5rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--rg-gray-500)', maxWidth: '420px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
        The luxury garment or destination you are seeking has been moved or archived.
      </p>
      <Link to="/" className="btn-primary" style={{ padding: '1rem 2rem' }}>
        <span>Return to Storefront</span> <FiArrowRight />
      </Link>
    </div>
  );
}

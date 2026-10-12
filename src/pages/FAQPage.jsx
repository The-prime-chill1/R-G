/* ==========================================================================
   R&G COLLECTIONS - FAQ & CLIENT CARE PAGE
   ========================================================================== */

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import { RG_FAQS } from '../data/sampleData.js';

export default function FAQPage() {
  React.useEffect(() => {
    document.title = "Atelier Guidelines & FAQ | R&G Collections";
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const filteredFaqs = RG_FAQS.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-narrow" style={{ padding: '3.5rem 1.5rem 6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--rg-gold-500)', display: 'block', marginBottom: '0.5rem' }}>
          CLIENT SUPPORT
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase' }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--rg-gray-600)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
          Find fast answers regarding orders, Paystack payments, delivery timelines, and sizing.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '480px', margin: '2rem auto 0' }}>
          <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rg-gray-400)' }} />
          <input 
            type="text" 
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', border: '1px solid var(--rg-gray-300)', borderRadius: 'var(--radius-xs)', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx}
              style={{
                border: '1px solid var(--rg-gray-200)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                background: '#fff'
              }}
            >
              <button 
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  background: isOpen ? 'var(--rg-ivory)' : '#fff',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--rg-black)'
                }}
              >
                <span>{faq.question}</span>
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {isOpen && (
                <div style={{ padding: '1.25rem 1.5rem', color: 'var(--rg-gray-600)', fontSize: '0.9rem', lineHeight: '1.7', borderTop: '1px solid var(--rg-gray-200)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--rg-gold-500)', marginBottom: '0.4rem' }}>
                    {faq.category}
                  </div>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================================
   R&G COLLECTIONS - CONTACT & ATELIER SHOWROOMS PAGE
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React, { useState } from 'react';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiSend, 
  FiCheckCircle 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { RG_LOCATIONS } from '../data/sampleData.js';
import { useToast } from '../context/ToastContext.jsx';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Fitting Appointment',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    addToast('Your inquiry has been dispatched to R&G concierge.');
    setFormData({ name: '', email: '', phone: '', subject: 'Bespoke Fitting Appointment', message: '' });
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 4rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--rg-gold-500)', display: 'block', marginBottom: '0.5rem' }}>
          CONCIERGE & ATELIERS
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase' }}>Connect with R&G</h1>
        <p style={{ color: 'var(--rg-gray-600)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
          Schedule a private fitting, inquire about our current menswear edits, or order custom tailored pieces.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }}>
        {/* Contact Form */}
        <div style={{ background: '#fff', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)', padding: '2.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Send a Direct Inquiry</h3>

          {sent ? (
            <div style={{ padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px', textAlign: 'center', color: 'var(--rg-success)' }}>
              <FiCheckCircle style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
              <h4>Message Received</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--rg-gray-600)', marginTop: '0.5rem' }}>Our bespoke concierge will reach out via phone or email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-input-label">Full Name *</label>
                <input 
                  type="text" 
                  className="form-text-input" 
                  placeholder="e.g. Chief Adebayo Adeleke"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-input-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-text-input" 
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-input-label">Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    className="form-text-input" 
                    placeholder="09045231629"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-input-label">Subject</label>
                <select 
                  className="form-text-input"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="Bespoke Fitting Appointment">Bespoke Fitting Appointment</option>
                  <option value="Order Tracking & Status">Order Tracking & Status</option>
                  <option value="Campus Dispatch (Achievers Univ)">Campus Dispatch (Achievers Univ)</option>
                  <option value="Footwear Sizing Consultation">Footwear Sizing Consultation</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label className="form-input-label">Message Details *</label>
                <textarea 
                  className="form-text-input" 
                  rows={4} 
                  placeholder="Provide any specific sizing notes or questions..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.95rem' }}>
                <FiSend /> Send Message to Concierge
              </button>
            </form>
          )}
        </div>

        {/* Locations List */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Our Regional Hubs</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {RG_LOCATIONS.map((loc, idx) => (
              <div key={idx} style={{ background: 'var(--rg-ivory)', border: '1px solid var(--rg-gray-200)', padding: '1.75rem', borderRadius: 'var(--radius-xs)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--rg-black)', marginBottom: '0.35rem' }}>{loc.city}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--rg-gold-500)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.85rem' }}>{loc.area}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--rg-gray-600)' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <FiMapPin style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{loc.address}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <FiClock style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{loc.hours}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <FiPhone style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{loc.phone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <a href={`tel:${loc.phone}`} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Call Hub</a>
                  <a href={`https://wa.me/234${loc.phone.replace(/^0/, '')}?text=Hello%20R%26G%20Collections`} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', background: '#25D366', borderColor: '#25D366' }}>
                    <FaWhatsapp /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

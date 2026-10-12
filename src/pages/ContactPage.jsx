/* ==========================================================================
   R&G COLLECTIONS - CONTACT & ATELIER SHOWROOMS PAGE
   Strict Rules: React Icons Only, Zero Emojis, 100% Fully Responsive
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
import '../styles/contact.css';

export default function ContactPage() {
  React.useEffect(() => {
    document.title = "Private Concierge & Contact | R&G Collections";
  }, []);

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
    <div className="container contact-page-container">
      <div className="contact-page-header">
        <span className="contact-page-eyebrow">
          CONCIERGE &amp; ATELIERS
        </span>
        <h1 className="contact-page-title">Connect with R&amp;G</h1>
        <p className="contact-page-sub">
          Schedule a private fitting, inquire about our current menswear edits, or order custom tailored pieces.
        </p>
      </div>

      <div className="contact-layout-grid">
        {/* Contact Form */}
        <div className="contact-form-card">
          <h2 className="contact-card-title">Send a Direct Inquiry</h2>

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
        <div className="contact-locations-col">
          <h2 className="contact-card-title">Our Regional Hubs</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {RG_LOCATIONS.map((loc, idx) => (
              <div key={idx} className="contact-location-card">
                <h3 className="contact-location-city">{loc.city}</h3>
                <div className="contact-location-area">{loc.area}</div>

                <div className="contact-location-details">
                  <div className="contact-location-row">
                    <FiMapPin style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{loc.address}</span>
                  </div>
                  <div className="contact-location-row">
                    <FiClock style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="contact-location-row">
                    <FiPhone style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{loc.phone}</span>
                  </div>
                </div>

                <div className="contact-location-actions">
                  <a href={`tel:${loc.phone}`} className="btn-secondary" style={{ padding: '0.65rem 1rem', fontSize: '0.8rem' }}>Call Hub</a>
                  <a href={`https://wa.me/234${loc.phone.replace(/^0/, '')}?text=Hello%20R%26G%20Collections`} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.65rem 1rem', fontSize: '0.8rem', background: '#25D366', borderColor: '#25D366' }}>
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

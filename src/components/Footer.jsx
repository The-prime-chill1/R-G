/* ==========================================================================
   R&G COLLECTIONS - FOOTER & NEWSLETTER COMPONENT
   Strict Rules: React Icons Only, Zero Emojis
   ========================================================================== */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaTiktok, 
  FaWhatsapp, 
  FaFacebookF 
} from 'react-icons/fa';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useToast } from '../context/ToastContext.jsx';
import '../styles/footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for joining the R&G Private Circle.');
    setEmail('');
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-inner">
          <h3 className="newsletter-title">Join The Private Circle</h3>
          <p className="newsletter-desc">
            Receive private access to new seasonal edits, bespoke appointments, and limited archival releases.
          </p>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input 
              type="email" 
              className="newsletter-input" 
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.5rem' }}>
              {subscribed ? <FiCheck /> : <><span>Subscribe</span> <FiArrowRight /></>}
            </button>
          </form>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Intro */}
            <div>
              <div className="footer-brand-title">R & G</div>
              <p className="footer-brand-desc">
                Owned &amp; managed by <strong style={{ color: '#fff' }}>RAJ — Rasaq Annu Jamiu</strong>. A premium Nigerian luxury fashion label delivering master-crafted menswear, bespoke sartorial tailoring, and handmade Italian footwear.
              </p>
              <div className="footer-social-row">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="TikTok"><FaTiktok /></a>
                <a href="https://wa.me/2349045231629" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="WhatsApp"><FaWhatsapp /></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook"><FaFacebookF /></a>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="footer-col-heading">Catalog</h4>
              <ul className="footer-nav-list">
                <li><Link to="/shop">All New In</Link></li>
                <li><Link to="/shop?cat=native">Native Wear</Link></li>
                <li><Link to="/shop?cat=shirts">Linen Shirts</Link></li>
                <li><Link to="/shop?cat=shoes">Italian Loafers</Link></li>
                <li><Link to="/shop?cat=palms">Luxury Palms</Link></li>
              </ul>
            </div>

            {/* Lookbooks & About */}
            <div>
              <h4 className="footer-col-heading">Experience</h4>
              <ul className="footer-nav-list">
                <li><Link to="/collections">Wardrobe Edits</Link></li>
                <li><Link to="/about">Our Atelier & Craft</Link></li>
                <li><Link to="/contact">Bespoke Fitting</Link></li>
                <li><Link to="/faq">Client Care / FAQs</Link></li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="footer-col-heading">Locations</h4>
              <ul className="footer-nav-list">
                <li><span>Lagos Hub (Lekki)</span></li>
                <li><span>Akure Showroom (Alagbaka)</span></li>
                <li><span>Achievers Univ. Hub (Owo)</span></li>
                <li><span>Same-Day Dispatch</span></li>
              </ul>
            </div>

            {/* Direct Contact */}
            <div>
              <h4 className="footer-col-heading">Direct Concierge</h4>
              <ul className="footer-nav-list">
                <li><span>Phone: 09045231629</span></li>
                <li><span>Phone: 07060610938</span></li>
                <li><a href="mailto:rasakanu2008@gmail.com" style={{ color: 'var(--rg-gold-300)' }}>rasakanu2008@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>&copy; {new Date().getFullYear()} R&G Collections. All Rights Reserved. Master Crafted Sartorial Excellence.</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="/faq">Privacy Policy</Link>
              <Link to="/faq">Terms of Service</Link>
              <Link to="/faq">Shipping &amp; Exchanges</Link>
            </div>
          </div>
          <div className="footer-chilltech">
            Built &amp; Powered by{' '}
            <a
              href="https://chilltechltd.com"
              target="_blank"
              rel="noreferrer"
              className="footer-chilltech-link"
            >
              ChillTechLtd.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

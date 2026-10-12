/* ==========================================================================
   R&G COLLECTIONS - CHECKOUT PAGE
   Payment: Bank Transfer + WhatsApp Confirmation
   Guest checkout — no account needed
   ========================================================================== */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiCheckCircle,
  FiLock,
  FiArrowRight,
  FiCopy,
  FiTruck,
  FiShoppingBag,
  FiAlertCircle
} from 'react-icons/fi';
import { FaWhatsapp, FaUniversity } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';
import { useShop } from '../context/ShopContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import '../styles/checkout.css';

/* ─── Bank Account Details ─── */
const BANK_DETAILS = {
  bankName:      'First Bank of Nigeria',
  accountName:   'Rasaq Annu Jamiu',
  accountNumber: '3012345678',         // ← update to your real account number
  sortCode:      '011',
};

export default function CheckoutPage() {
  const {
    cartItems,
    subtotal,
    deliveryFee,
    discountAmount,
    grandTotal,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();
  const { placeOrder } = useShop();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep]           = useState(1); // 1=info, 2=transfer details, 3=confirm
  const [couponInput, setCouponInput] = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [copied, setCopied]           = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('transfer'); // transfer | whatsapp

  const [info, setInfo] = useState({
    fullName:    '',
    email:       '',
    phone:       '',
    address:     '',
    city:        'Lagos',
    state:       'Lagos State',
    notes:       '',
  });

  const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG');

  /* ─── Empty cart guard ─── */
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <FiShoppingBag style={{ fontSize: '3rem', color: '#d4d4d8', marginBottom: '1rem' }} />
        <h2 style={{ fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>Your Bag is Empty</h2>
        <p style={{ color: 'var(--rg-gray-500)', marginBottom: '2rem' }}>Add items to your cart before checking out.</p>
        <Link to="/shop" className="btn-primary">Browse the Collection</Link>
      </div>
    );
  }

  /* ─── Coupon ─── */
  const handleCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) { applyCoupon(couponInput.trim()); setCouponInput(''); }
  };

  /* ─── Copy account number ─── */
  const copyAcct = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  /* ─── Step 1 → Step 2: validate info ─── */
  const handleProceed = (e) => {
    e.preventDefault();
    if (!info.fullName || !info.email || !info.phone || !info.address) {
      addToast('Please fill all required fields.', 'error');
      return;
    }

    if (paymentMethod === 'whatsapp') {
      handleWhatsAppOrder();
      return;
    }

    setStep(2); // show bank transfer details
  };

  /* ─── WhatsApp direct order ─── */
  const handleWhatsAppOrder = async () => {
    setSubmitting(true);
    const itemsList = cartItems.map(i => ` - ${i.name} (Size: ${i.selectedSize}, Qty: ${i.quantity})`).join('\n');
    const msg = `*R & G COLLECTIONS — NEW ORDER*\n` +
                `-----------------------------------\n` +
                `Client: ${info.fullName}\n` +
                `Phone: ${info.phone}\n` +
                `Email: ${info.email}\n` +
                `Address: ${info.address}, ${info.city}, ${info.state}\n` +
                `-----------------------------------\n` +
                `Items:\n${itemsList}\n` +
                `-----------------------------------\n` +
                `Subtotal: ${fmt(subtotal)}\n` +
                `Delivery: ${deliveryFee === 0 ? 'Complimentary' : fmt(deliveryFee)}\n` +
                `${discountAmount > 0 ? `Discount: -${fmt(discountAmount)}\n` : ''}` +
                `TOTAL: ${fmt(grandTotal)}\n` +
                `Payment: WhatsApp / Pay on Delivery\n` +
                `${info.notes ? `Notes: ${info.notes}` : ''}`;

    const order = await placeOrder({
      customerName: info.fullName, customerEmail: info.email, customerPhone: info.phone,
      shippingAddress: `${info.address}, ${info.city}, ${info.state}`,
      deliveryNotes: info.notes, items: cartItems, subtotal, deliveryFee, discountAmount,
      total: grandTotal, paymentMethod: 'WhatsApp', paymentStatus: 'Pending'
    });

    clearCart();
    window.open(`https://wa.me/2349045231629?text=${encodeURIComponent(msg)}`, '_blank');
    navigate(`/order-confirmation/${order.id}`);
  };

  /* ─── Step 2 → Confirm transfer sent ─── */
  const handleConfirmTransfer = async () => {
    setSubmitting(true);
    const itemsList = cartItems.map(i => ` - ${i.name} (Size: ${i.selectedSize}, Qty: ${i.quantity})`).join('\n');
    const msg = `*R & G COLLECTIONS — BANK TRANSFER ORDER*\n` +
                `-----------------------------------\n` +
                `Client: ${info.fullName}\n` +
                `Phone: ${info.phone}\n` +
                `Email: ${info.email}\n` +
                `Address: ${info.address}, ${info.city}, ${info.state}\n` +
                `-----------------------------------\n` +
                `Items:\n${itemsList}\n` +
                `-----------------------------------\n` +
                `TOTAL PAID: ${fmt(grandTotal)}\n` +
                `Payment: Bank Transfer to ${BANK_DETAILS.bankName}\n` +
                `${info.notes ? `Notes: ${info.notes}` : ''}\n` +
                `-----------------------------------\n` +
                `I have made the bank transfer of ${fmt(grandTotal)} to your account. Please confirm receipt and process my order.`;

    const order = await placeOrder({
      customerName: info.fullName, customerEmail: info.email, customerPhone: info.phone,
      shippingAddress: `${info.address}, ${info.city}, ${info.state}`,
      deliveryNotes: info.notes, items: cartItems, subtotal, deliveryFee, discountAmount,
      total: grandTotal, paymentMethod: 'Bank Transfer', paymentStatus: 'Awaiting Confirmation'
    });

    clearCart();
    window.open(`https://wa.me/2349045231629?text=${encodeURIComponent(msg)}`, '_blank');
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <div className="container checkout-page-layout">

      {/* Step Tracker */}
      <div className="checkout-steps-tracker">
        <div className={`checkout-step-indicator ${step >= 1 ? 'active' : ''}`}>
          <div className="checkout-step-num">1</div>
          <span>Your Details</span>
        </div>
        <span>&gt;</span>
        <div className={`checkout-step-indicator ${step >= 2 ? 'active' : ''}`}>
          <div className="checkout-step-num">2</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="checkout-grid">

        {/* ─── LEFT COLUMN ─── */}
        <div>

          {/* STEP 1: Contact + Delivery Info */}
          {step === 1 && (
            <form onSubmit={handleProceed}>
              {/* Contact */}
              <div className="checkout-form-card">
                <h3 className="form-section-title">1. Contact Details</h3>
                <div className="form-grid-2">
                  <div className="form-input-group">
                    <label className="form-input-label">Full Name *</label>
                    <input type="text" className="form-text-input" placeholder="Rasaq Oluwaseun"
                      value={info.fullName} onChange={e => setInfo({ ...info, fullName: e.target.value })} required />
                  </div>
                  <div className="form-input-group">
                    <label className="form-input-label">Email Address *</label>
                    <input type="email" className="form-text-input" placeholder="you@example.com"
                      value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-input-label">Phone / WhatsApp *</label>
                  <input type="tel" className="form-text-input" placeholder="09045231629"
                    value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} required />
                </div>
              </div>

              {/* Delivery */}
              <div className="checkout-form-card">
                <h3 className="form-section-title">2. Delivery Address</h3>
                <div className="form-input-group">
                  <label className="form-input-label">Street Address *</label>
                  <input type="text" className="form-text-input" placeholder="14 Admiralty Way, Lekki"
                    value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} required />
                </div>
                <div className="form-grid-2">
                  <div className="form-input-group">
                    <label className="form-input-label">City *</label>
                    <input type="text" className="form-text-input" placeholder="Lagos"
                      value={info.city} onChange={e => setInfo({ ...info, city: e.target.value })} required />
                  </div>
                  <div className="form-input-group">
                    <label className="form-input-label">State *</label>
                    <input type="text" className="form-text-input" placeholder="Lagos State"
                      value={info.state} onChange={e => setInfo({ ...info, state: e.target.value })} required />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-input-label">Delivery Notes (Optional)</label>
                  <textarea className="form-text-input" rows={2} placeholder="Preferred time, gate notes..."
                    value={info.notes} onChange={e => setInfo({ ...info, notes: e.target.value })} />
                </div>
              </div>

              {/* Payment Method Choice */}
              <div className="checkout-form-card">
                <h3 className="form-section-title">3. Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>

                  <label className="rg-payment-option" style={{ borderColor: paymentMethod === 'transfer' ? '#09090b' : '#e4e4e7', background: paymentMethod === 'transfer' ? '#fafafa' : '#fff' }}>
                    <input type="radio" name="pm" checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')} />
                    <FaUniversity style={{ fontSize: '1.3rem', color: '#09090b', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: '#09090b' }}>Bank Transfer</strong>
                      <span style={{ fontSize: '0.78rem', color: '#71717a' }}>Transfer directly to R&amp;G bank account — details shown next step</span>
                    </div>
                  </label>

                  <label className="rg-payment-option" style={{ borderColor: paymentMethod === 'whatsapp' ? '#09090b' : '#e4e4e7', background: paymentMethod === 'whatsapp' ? '#fafafa' : '#fff' }}>
                    <input type="radio" name="pm" checked={paymentMethod === 'whatsapp'}
                      onChange={() => setPaymentMethod('whatsapp')} />
                    <FaWhatsapp style={{ fontSize: '1.3rem', color: '#25D366', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: '#09090b' }}>WhatsApp Order</strong>
                      <span style={{ fontSize: '0.78rem', color: '#71717a' }}>Send your order directly to our concierge to arrange payment</span>
                    </div>
                  </label>

                </div>

                <button type="submit" className="btn-primary"
                  style={{ width: '100%', padding: '1rem', marginTop: '1.75rem', background: '#09090b', borderColor: '#09090b' }}>
                  <FiLock />
                  {paymentMethod === 'transfer' ? 'Continue to Bank Transfer' : 'Send Order on WhatsApp'}
                  <FiArrowRight />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Bank Transfer Details */}
          {step === 2 && (
            <div>
              {/* Account Details Card */}
              <div className="checkout-form-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <FaUniversity style={{ fontSize: '1.5rem', color: '#09090b' }} />
                  <h3 className="form-section-title" style={{ margin: 0 }}>Transfer Payment Details</h3>
                </div>

                <div style={{ background: '#09090b', borderRadius: '8px', padding: '1.75rem', color: '#fff', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', color: '#c9a84c', marginBottom: '1rem', textTransform: 'uppercase' }}>
                    R&amp;G Collections Account
                  </div>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Bank Name</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700 }}>{BANK_DETAILS.bankName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Account Name</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700 }}>{BANK_DETAILS.accountName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Account Number</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '3px', color: '#c9a84c' }}>
                          {BANK_DETAILS.accountNumber}
                        </span>
                        <button onClick={copyAcct}
                          style={{ background: copied ? '#c9a84c' : 'rgba(255,255,255,0.12)', border: 'none', color: copied ? '#09090b' : '#fff', borderRadius: '6px', padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.2s' }}>
                          <FiCopy /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                      <div style={{ fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>Amount to Transfer</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c9a84c' }}>{fmt(grandTotal)}</div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                  <FiAlertCircle style={{ color: '#d97706', fontSize: '1.1rem', flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.82rem', color: '#92400e', lineHeight: '1.6' }}>
                    <strong>Important:</strong> After transferring, click the button below to notify us via WhatsApp with your proof of payment. Your order will be processed once payment is confirmed.
                  </div>
                </div>

                <button
                  onClick={handleConfirmTransfer}
                  disabled={submitting}
                  className="btn-primary"
                  style={{ width: '100%', padding: '1.1rem', background: '#25D366', borderColor: '#25D366', fontSize: '0.9rem' }}>
                  <FaWhatsapp />
                  {submitting ? 'Processing...' : `I've Transferred ${fmt(grandTotal)} — Notify Concierge`}
                </button>

                <button onClick={() => setStep(1)}
                  style={{ width: '100%', marginTop: '0.75rem', background: 'none', border: '1px solid #e4e4e7', borderRadius: '4px', padding: '0.75rem', fontSize: '0.82rem', color: '#71717a', cursor: 'pointer' }}>
                  Back to Details
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── RIGHT: Order Summary ─── */}
        <aside className="checkout-order-summary-box">
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.25rem' }}>
            Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h3>

          <div className="summary-items-list">
            {cartItems.map(item => (
              <div key={item.itemKey} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '58px', objectFit: 'cover', borderRadius: '3px', border: '1px solid #e4e4e7' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--rg-gray-500)' }}>Size: {item.selectedSize} &times; {item.quantity}</span>
                </div>
                <strong style={{ fontSize: '0.88rem' }}>{fmt(Number(item.price) * item.quantity)}</strong>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <form onSubmit={handleCoupon} className="coupon-input-row">
            <input type="text" className="form-text-input" placeholder="Promo code"
              value={couponInput} onChange={e => setCouponInput(e.target.value)}
              style={{ padding: '0.6rem 0.85rem' }} />
            <button type="submit" className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.75rem' }}>Apply</button>
          </form>

          {appliedCoupon && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(201,168,76,0.1)', padding: '0.5rem 0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.82rem' }}>
              <span>Code <strong>{appliedCoupon.code}</strong> ({appliedCoupon.percentage}% off)</span>
              <button onClick={removeCoupon} style={{ color: 'var(--rg-error)', fontWeight: 700 }}>Remove</button>
            </div>
          )}

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.87rem', color: '#52525b' }}>
            <span>Subtotal</span><span>{fmt(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.87rem', color: '#c9a84c' }}>
              <span>Discount</span><span>-{fmt(discountAmount)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '0.87rem', color: '#52525b' }}>
            <span>Delivery</span><span>{deliveryFee === 0 ? 'Complimentary' : fmt(deliveryFee)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #09090b', paddingTop: '1rem', fontSize: '1.2rem', fontWeight: 900, color: '#09090b' }}>
            <span>Total</span><span>{fmt(grandTotal)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', fontSize: '0.75rem', color: '#71717a' }}>
            <FiLock style={{ flexShrink: 0 }} />
            <span>Your information is private and secure</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

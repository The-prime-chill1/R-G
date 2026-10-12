/* ==========================================================================
   R&G COLLECTIONS - AUTHENTICATION PAGES (LOGIN, REGISTER, FORGOT PASSWORD, ADMIN LOGIN)
   Strict Rules: React Icons Only, Zero Emojis
   Master Admin Password: Orezi@!!Raj
   ========================================================================== */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiMail, FiUser, FiArrowRight, FiShield, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import adminBgImage from '../assets/admin-store-bg.jpg';
import '../styles/admin.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser, loginAdmin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if master admin credentials were entered
      const normalizedEmail = email.trim().toLowerCase();
      if (normalizedEmail === "rasakanu2008@gmail.com" && password === "Orezi@!!Raj") {
        await loginAdmin(email, password);
        addToast('Welcome back, Administrator.');
        navigate('/admin');
        return;
      }

      await loginUser(email, password);
      addToast('Welcome back to R&G Collections.');
      navigate('/account');
    } catch (err) {
      addToast(err.message || 'Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '440px' }}>
      <div style={{ background: '#fff', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)', padding: '2.5rem', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="navbar-brand-logo" style={{ marginBottom: '0.5rem' }}>
            <span className="brand-text-main">R & G</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', textTransform: 'uppercase' }}>Sign In</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-500)', marginTop: '4px' }}>Access your wardrobe history and private orders</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-input-group">
            <label className="form-input-label">Email Address</label>
            <input 
              type="email" 
              className="form-text-input" 
              placeholder="name@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group" style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="form-input-label">Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--rg-gold-500)', textDecoration: 'underline' }}>Forgot?</Link>
            </div>
            <input 
              type="password" 
              className="form-text-input" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.95rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--rg-gray-500)' }}>
          Don't have an account yet? <Link to="/register" style={{ color: 'var(--rg-black)', fontWeight: 700, textDecoration: 'underline' }}>Register</Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(email, password, name);
      addToast('Your R&G account has been created.');
      navigate('/account');
    } catch (err) {
      addToast(err.message || 'Registration failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '440px' }}>
      <div style={{ background: '#fff', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)', padding: '2.5rem', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="navbar-brand-logo" style={{ marginBottom: '0.5rem' }}>
            <span className="brand-text-main">R & G</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', textTransform: 'uppercase' }}>Create Account</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-500)', marginTop: '4px' }}>Join the R&G Private Gentlemen Circle</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-input-group">
            <label className="form-input-label">Full Name</label>
            <input 
              type="text" 
              className="form-text-input" 
              placeholder="e.g. Kolawole Adeyemi"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label className="form-input-label">Email Address</label>
            <input 
              type="email" 
              className="form-text-input" 
              placeholder="name@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-input-label">Create Password</label>
            <input 
              type="password" 
              className="form-text-input" 
              placeholder="Minimum 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.95rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--rg-gray-500)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--rg-black)', fontWeight: 700, textDecoration: 'underline' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();
  const { addToast } = useToast();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setSent(true);
      addToast('Password reset link sent to your email.');
    } catch (err) {
      addToast(err.message || 'Failed to send reset link.', 'error');
    }
  };

  return (
    <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '440px' }}>
      <div style={{ background: '#fff', border: '1px solid var(--rg-gray-200)', borderRadius: 'var(--radius-xs)', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', textTransform: 'uppercase' }}>Reset Password</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--rg-gray-500)', marginTop: '4px' }}>Enter your email to receive recovery instructions</p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--rg-success)', marginBottom: '1.5rem' }}>
              Check your inbox for password recovery instructions.
            </p>
            <Link to="/login" className="btn-primary" style={{ width: '100%' }}>Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleReset}>
            <div className="form-input-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-input-label">Email Address</label>
              <input 
                type="email" 
                className="form-text-input" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.95rem' }}>
              Send Recovery Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function AdminLoginPage() {
  const [email, setEmail] = useState('rasakanu2008@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [cardError, setCardError] = useState(false);

  const { loginAdmin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === "rasakanu2008@gmail.com" && password === "Orezi@!!Raj") {
      setLoading(true);
      try {
        await loginAdmin(email, password);
        addToast('Welcome back, Administrator.');
        navigate('/admin');
      } catch (err) {
        setAuthError(err.message || 'Authentication error.');
        setCardError(true);
        setTimeout(() => setCardError(false), 700);
      } finally {
        setLoading(false);
      }
    } else {
      const msg = normalizedEmail !== "rasakanu2008@gmail.com"
        ? 'Access Denied: Unauthorized administrator email address.'
        : 'Access Denied: Invalid administrator security password.';
      setAuthError(msg);
      setCardError(true);
      addToast(msg, 'error');
      setTimeout(() => setCardError(false), 700);
    }
  };

  return (
    <div 
      className="admin-auth-screen"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(9, 9, 13, 0.85) 0%, rgba(12, 12, 18, 0.78) 50%, rgba(7, 7, 10, 0.90) 100%), radial-gradient(circle at 50% 40%, rgba(20, 20, 28, 0.2) 0%, rgba(9, 9, 12, 0.95) 100%), url(${adminBgImage})`
      }}
    >
      <div className={`admin-auth-card ${cardError ? 'card-error' : ''}`}>
        {/* Atelier Brand Crest */}
        <div className="admin-auth-brand-wrap">
          <div className="admin-auth-crown">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--rg-gold-400, #d4af37)">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
            </svg>
          </div>
          <h1 className="admin-auth-brand-title">R & G COLLECTIONS</h1>
          <p className="admin-auth-brand-subtitle">Atelier Management Portal</p>
        </div>

        <div style={{ textAlign: 'left', marginBottom: '1.75rem' }}>
          <h2 className="admin-auth-title">Sign In to Dashboard</h2>
          <p className="admin-auth-desc">Enter your administrator credentials to access catalog management and orders.</p>
        </div>

        {authError && (
          <div className="auth-error-banner" style={{ display: 'block' }}>
            {authError}
          </div>
        )}

        <form onSubmit={handleAdminLogin}>
          <div className="form-group" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
            <label className="form-label-custom">Email Address</label>
            <div className="input-icon-wrap">
              <span className="input-icon">
                <FiMail size={16} />
              </span>
              <input 
                type="email"
                className="form-control input-with-icon"
                placeholder="rasakanu2008@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ textAlign: 'left', marginBottom: '1.75rem' }}>
            <label className="form-label-custom">Security Password</label>
            <div className="password-field-wrapper">
              <span className="input-icon">
                <FiLock size={16} />
              </span>
              <input 
                type={showPassword ? 'text' : 'password'}
                className="form-control input-with-icon"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
              />
              <button
                type="button"
                className={`password-toggle-btn ${showPassword ? 'is-revealed' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="admin-btn-primary" 
            style={{ width: '100%', padding: '0.95rem', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 700 }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Atelier Dashboard'}
          </button>

          <div className="auth-card-footer">
            <p className="auth-security-note">Protected by 256-bit atelier security credentials.</p>
            <Link to="/" className="auth-storefront-link">
              ← Return to Live Storefront
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

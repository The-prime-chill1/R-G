/* ==========================================================================
   R&G COLLECTIONS - TOAST NOTIFICATION CONTEXT (REACT ICONS ONLY)
   ========================================================================== */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import '../styles/toast.css';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-portal-root" aria-live="polite">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-item-bubble ${toast.type}`}>
            <span className="toast-icon-slot">
              {toast.type === 'success' && <FiCheckCircle />}
              {toast.type === 'error' && <FiAlertCircle />}
              {toast.type === 'info' && <FiInfo />}
            </span>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)} 
              style={{ color: '#a1a1aa', cursor: 'pointer', display: 'flex' }}
              aria-label="Close notification"
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

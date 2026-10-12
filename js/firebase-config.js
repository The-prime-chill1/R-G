/* ==========================================================================
   R & G COLLECTIONS - FIREBASE CONFIGURATION
   ========================================================================== */

// Default Firebase Configuration (Can be updated dynamically via Admin Settings)
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyD-rgcollections-demo-key-2026",
  authDomain: "rg-collections-male.firebaseapp.com",
  projectId: "rg-collections-male",
  storageBucket: "rg-collections-male.appspot.com",
  messagingSenderId: "847291048291",
  appId: "1:847291048291:web:a9f73bc401b"
};

// Retrieve active Firebase config from localStorage or defaults
function getFirebaseConfig() {
  const saved = localStorage.getItem('rg_firebase_config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing saved Firebase config, using default', e);
    }
  }
  return DEFAULT_FIREBASE_CONFIG;
}

// Save custom Firebase config from admin panel
function saveFirebaseConfig(configObj) {
  localStorage.setItem('rg_firebase_config', JSON.stringify(configObj));
}

// Initialize Firebase if library is available
let firebaseApp = null;
let firestoreDb = null;
let isFirebaseConnected = false;

function initFirebaseApp() {
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    try {
      const config = getFirebaseConfig();
      if (!firebase.apps || firebase.apps.length === 0) {
        firebaseApp = firebase.initializeApp(config);
      } else {
        firebaseApp = firebase.app();
      }
      if (firebase.firestore) {
        firestoreDb = firebase.firestore();
        isFirebaseConnected = true;
        console.log('Firebase initialized successfully for R & G Collections.');
      }
    } catch (err) {
      console.warn('Firebase init warning (falling back to hybrid local store):', err.message);
      isFirebaseConnected = false;
    }
  } else {
    console.info('Firebase SDK not loaded, using high-performance local store fallback.');
  }
}

// Auto init on load
initFirebaseApp();

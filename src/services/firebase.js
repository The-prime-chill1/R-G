/* ==========================================================================
   R&G COLLECTIONS - FIREBASE CONFIGURATION & SERVICE WRAPPERS
   Production-ready with LocalStorage fallbacks for zero-setup resilience
   ========================================================================== */

import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevResilience",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rg-collections-luxury.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rg-collections-luxury",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rg-collections-luxury.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef"
};

const isFirebaseLive = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== "AIzaSyDummyKeyForDevResilience" &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

let app = null;
let db = null;
let auth = null;
let storage = null;

if (isFirebaseLive) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } catch (e) {
    console.info("Firebase live sync offline, running in local storage mode.");
  }
}

export { 
  app, 
  db, 
  auth, 
  storage, 
  isFirebaseLive as isConfigured,
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  ref,
  uploadString,
  getDownloadURL
};

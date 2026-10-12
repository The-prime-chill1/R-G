/* ==========================================================================
   R&G COLLECTIONS - AUTHENTICATION & ROLE CONTEXT
   Supports Firebase Auth + Master Admin Role Authentication
   ========================================================================== */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from '../services/firebase.js';

const AuthContext = createContext(null);

const ADMIN_MASTER_EMAIL = "rasakanu2008@gmail.com";
const ADMIN_MASTER_PASS = "Orezi@!!Raj";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem('rg_admin_authenticated') === 'true'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    if (auth) {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
          if (user.email === ADMIN_MASTER_EMAIL || sessionStorage.getItem('rg_admin_authenticated') === 'true') {
            setIsAdmin(true);
          }
        } else {
          // Check local session for persistent admin bypass
          const localAdmin = sessionStorage.getItem('rg_admin_authenticated') === 'true';
          setIsAdmin(localAdmin);
          if (localAdmin) {
            setCurrentUser({
              email: ADMIN_MASTER_EMAIL,
              displayName: "R&G Master Administrator",
              uid: "rg-admin-master-uid"
            });
          } else {
            setCurrentUser(null);
          }
        }
        setLoading(false);
      });
    } else {
      // Fallback local session check
      const localAdmin = sessionStorage.getItem('rg_admin_authenticated') === 'true';
      if (localAdmin) {
        setIsAdmin(true);
        setCurrentUser({
          email: ADMIN_MASTER_EMAIL,
          displayName: "R&G Master Administrator",
          uid: "rg-admin-master-uid"
        });
      }
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const loginAdmin = async (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedMasterEmail = ADMIN_MASTER_EMAIL.toLowerCase();

    if (normalizedEmail === normalizedMasterEmail && password === ADMIN_MASTER_PASS) {
      sessionStorage.setItem('rg_admin_authenticated', 'true');
      setIsAdmin(true);
      setCurrentUser({
        email: ADMIN_MASTER_EMAIL,
        displayName: "R&G Master Administrator",
        uid: "rg-admin-master-uid"
      });
      return { success: true };
    }

    if (auth && normalizedEmail === normalizedMasterEmail) {
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        if (userCred.user.email?.toLowerCase() === normalizedMasterEmail) {
          sessionStorage.setItem('rg_admin_authenticated', 'true');
          setIsAdmin(true);
          return { success: true };
        }
      } catch (err) {
        // Handled below
      }
    }

    if (normalizedEmail !== normalizedMasterEmail) {
      throw new Error('Access Denied: Unauthorized administrator email address.');
    }
    throw new Error('Access Denied: Invalid administrator security password.');
  };

  const loginUser = async (email, password) => {
    if (auth) {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCred.user);
      return userCred.user;
    }
    const mockUser = { email, displayName: email.split('@')[0], uid: 'user-' + Date.now() };
    setCurrentUser(mockUser);
    return mockUser;
  };

  const registerUser = async (email, password, displayName) => {
    if (auth) {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCred.user, { displayName });
      }
      setCurrentUser(userCred.user);
      return userCred.user;
    }
    const mockUser = { email, displayName: displayName || email.split('@')[0], uid: 'user-' + Date.now() };
    setCurrentUser(mockUser);
    return mockUser;
  };

  const resetPassword = async (email) => {
    if (auth) {
      await sendPasswordResetEmail(auth, email);
    }
    return true;
  };

  const logout = async () => {
    sessionStorage.removeItem('rg_admin_authenticated');
    setIsAdmin(false);
    if (auth) {
      await signOut(auth);
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAdmin,
      loading,
      loginAdmin,
      loginUser,
      registerUser,
      resetPassword,
      logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

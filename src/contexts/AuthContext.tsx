import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase/client';
import { supabase } from '@/integrations/supabase/client';
import { setUser, setLoading } from '@/store/slices/authSlice';
import type { User } from '@/store/slices/authSlice';
import SparkLoader from '@/components/ui/SparkLoader';

const AuthContext = createContext<{ user: User | null }>({ user: null });
export const useAuth = () => useContext(AuthContext);

// Race a promise against a timeout
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Safety net — unblock the app after 1.5s max
    const safetyTimer = setTimeout(() => {
      dispatch(setLoading(false));
      setIsInitialized(true);
    }, 1500);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      clearTimeout(safetyTimer);

      if (firebaseUser) {
        // ── Step 1: Unblock the app immediately with Firebase data ──────────
        // Don't wait for Firestore — let the user through right away
        const immediateUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || null,
          role: 'student',
          avatar_url: firebaseUser.photoURL || null,
          wallet: 0,
          minutes: 0,
          daily_free_minutes_used: 0,
          last_free_minutes_reset: null,
        };
        dispatch(setUser(immediateUser));
        setCurrentUser(immediateUser);
        dispatch(setLoading(false));
        setIsInitialized(true);

        // ── Step 2: Fetch full profile in background (non-blocking) ─────────
        try {
          let profileData: Partial<User> = {};

          // Try Firestore (1.5s timeout)
          try {
            const profileRef = doc(db, 'profiles', firebaseUser.uid);
            const snap = await withTimeout(getDoc(profileRef), 1500);
            if (snap && snap.exists()) {
              profileData = snap.data() as Partial<User>;
            }
          } catch (_) {}

          // Fallback to Supabase if no role found (1.5s timeout)
          if (!profileData.role) {
            try {
              const result = await withTimeout(
                supabase.from('profiles').select('*').eq('id', firebaseUser.uid).maybeSingle(),
                1500
              );
              if (result?.data) profileData = result.data;
            } catch (_) {}
          }

          // Create profile if still missing
          if (!profileData.role) {
            const newProfile = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              full_name: firebaseUser.displayName || null,
              role: 'student' as const,
              avatar_url: firebaseUser.photoURL || null,
              wallet: 0, minutes: 0,
              daily_free_minutes_used: 0,
              last_free_minutes_reset: null,
            };
            withTimeout(setDoc(doc(db, 'profiles', firebaseUser.uid), newProfile), 2000)
              .catch(() => {});
            profileData = newProfile;
          }

          // Update Redux + context with full profile data
          const fullUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            full_name: profileData.full_name || firebaseUser.displayName || null,
            role: (profileData.role || 'student') as User['role'],
            avatar_url: profileData.avatar_url || firebaseUser.photoURL || null,
            wallet: profileData.wallet || 0,
            minutes: profileData.minutes || 0,
            daily_free_minutes_used: profileData.daily_free_minutes_used || 0,
            last_free_minutes_reset: profileData.last_free_minutes_reset || null,
          };
          dispatch(setUser(fullUser));
          setCurrentUser(fullUser);
        } catch (err) {
          console.error('Background profile fetch failed:', err);
        }
      } else {
        dispatch(setUser(null));
        setCurrentUser(null);
        dispatch(setLoading(false));
        setIsInitialized(true);
      }
    });

    return () => {
      clearTimeout(safetyTimer);
      unsubscribe();
    };
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <SparkLoader text="Wisora" color="white" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

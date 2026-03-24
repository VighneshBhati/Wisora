import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/integrations/firebase/client';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useLocation, useSearchParams } from 'react-router-dom';
import { buildOAuthCallbackUrl } from '@/utils/authRedirect';

// ── Login ──────────────────────────────────────────────────────────────────
export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(friendlyError(msg));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed';
      setError(friendlyError(msg));
    }
  };

  return {
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    loading, error,
    isAuthenticated, user, isLoading, location,
    handleLogin, handleGoogleLogin,
  };
}

// ── Signup ─────────────────────────────────────────────────────────────────
export function useSignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'student' as 'student' | 'teacher',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update display name
      await updateProfile(firebaseUser, { displayName: formData.fullName });

      // Create Firestore profile
      await setDoc(doc(db, 'profiles', firebaseUser.uid), {
        id: firebaseUser.uid,
        email: formData.email,
        full_name: formData.fullName,
        role: formData.role,
        phone_number: formData.phone,
        avatar_url: null,
        wallet: 0,
        minutes: 0,
        daily_free_minutes_used: 0,
        last_free_minutes_reset: null,
        created_at: new Date().toISOString(),
      });

      setSuccess('Account created successfully! You are now signed in.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Signup failed';
      setError(friendlyError(msg));
    } finally {
      setLoading(false);
    }
  };

  return {
    formData, setFormData,
    showPassword, setShowPassword,
    loading, error, success,
    isAuthenticated, user,
    handleSignup,
  };
}

// ── Helper ─────────────────────────────────────────────────────────────────
function friendlyError(msg: string): string {
  if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential'))
    return 'Invalid email or password.';
  if (msg.includes('email-already-in-use'))
    return 'An account with this email already exists.';
  if (msg.includes('weak-password'))
    return 'Password should be at least 6 characters.';
  if (msg.includes('invalid-email'))
    return 'Please enter a valid email address.';
  if (msg.includes('popup-closed-by-user'))
    return 'Sign-in popup was closed. Please try again.';
  return msg;
}

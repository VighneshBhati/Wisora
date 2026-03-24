import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { SEOHead } from '@/components/seo';

// Firebase uses popup-based OAuth so this callback page is mostly a fallback.
// It just waits for AuthContext to initialize and redirects accordingly.
export const AuthCallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        const path = user.role === 'teacher' ? '/teacher/dashboard'
          : user.role === 'admin' ? '/admin/dashboard'
          : '/student/dashboard';
        navigate(path, { replace: true });
      } else {
        navigate('/auth/login', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    </>
  );
};

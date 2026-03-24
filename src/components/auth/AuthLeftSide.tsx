import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PLATFORM_NAME } from '@/data/constants';
import { useTranslation } from 'react-i18next';
import AuthSection from '@/pages/auth/AuthSection';
import { useLoginForm, useSignupForm } from '@/hooks/useAuthForms';
import { useTenant } from '@/contexts/TenantContext';
import { getIntendedDestination } from '@/utils/authRedirect';

interface AuthLeftSideProps {
  mode: 'login' | 'signup' | 'buttons';
  setMode: (mode: 'login' | 'signup' | 'buttons') => void;
  onLegalLink: (tab: string) => void;
}

export const AuthLeftSide: React.FC<AuthLeftSideProps> = ({ 
  mode, 
  setMode, 
  onLegalLink 
}) => {
  const { t } = useTranslation('other');
  const { teacher } = useTenant();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Auth form hooks
  const login = useLoginForm();
  const signup = useSignupForm();
  
  // Get the next parameter from URL
  const nextParam = searchParams.get('next');

  // Handle authentication redirects — redirect whenever user becomes authenticated,
  // regardless of mode (covers Google popup which can fire from any mode)
  useEffect(() => {
    const user = login.user || signup.user;
    const isAuthenticated = login.isAuthenticated || signup.isAuthenticated;
    if (isAuthenticated && user) {
      const redirectPath = getIntendedDestination(nextParam, user);
      navigate(redirectPath, { replace: true });
    }
  }, [login.isAuthenticated, login.user, signup.isAuthenticated, signup.user, navigate, nextParam]);

  return (
    <div className="w-full h-screen md:w-1/2 bg-transparent flex flex-col min-h-0 relative">
      {/* Main Content Container - Takes available space and handles overflow */}
      <div className="flex-1 w-full max-w-lg mx-auto flex flex-col items-start pt-4 md:pt-16 px-2 gap-8 min-h-0 overflow-hidden">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center mb-8">
            <span className="text-4xl font-extrabold tracking-tight text-primary">{PLATFORM_NAME}</span>
            <span className="text-4xl font-extrabold tracking-tight text-primary">.</span>
          </div>
        </Link>

        {/* Heading */}
        <div className="flex-shrink-0">
          {mode === 'buttons' ? (
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-8 leading-tight">
              Your knowledge.<br />Your future.
            </h1>
          ) : mode === 'login' ? (
            <>
              <h1 className="text-5xl md:text-6xl font-black text-foreground leading-tight">
                Welcome Back
              </h1>
              <span className="text-muted-foreground text-base mt-[-20px]">
                Sign in to your account
              </span>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl font-black text-foreground leading-tight">
                Get started
              </h1>
              <span className="text-muted-foreground text-base mt-[-20px]">
                Create a new account
              </span>
            </>
          )}
        </div>

        {/* Auth Content - Flexible container that can grow/shrink */}
        <div className="flex-1 w-full flex flex-col justify-start min-h-0">
          {/* Buttons or Forms */}
          {mode === 'buttons' ? (
            <div className="flex flex-col gap-4 w-full">
              <Button 
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold text-lg py-4 rounded-full w-full shadow-md transition-all" 
                onClick={() => setMode('signup')}
              >
                {t('authModal.createAccount')}
              </Button>
              <Button 
                variant="outline" 
                className="border border-border text-foreground font-semibold text-lg py-4 rounded-full w-full bg-background hover:bg-muted hover:text-primary transition-all" 
                onClick={() => setMode('login')}
              >
                {t('authModal.signIn')}
              </Button>
            </div>
          ) : (
            <div className="w-full">
              <AuthSection 
                login={login} 
                signup={signup} 
                mode={mode} 
                setMode={setMode} 
                hasTenant={!!teacher} 
              />
            </div>
          )}

          {/* Disclaimer - Fixed at bottom of content area */}
          <div className="mt-auto pt-6 pb-2">
            <p className="text-xs text-muted-foreground text-center w-full">
              {t('authModal.byContinuing')} 
              <button 
                onClick={() => onLegalLink('terms')} 
                className="underline hover:text-primary px-1"
              >
                {t('authModal.terms')}
              </button> 
              {t('authModal.and')} 
              <button 
                onClick={() => onLegalLink('privacy')} 
                className="underline hover:text-primary px-1"
              >
                {t('authModal.privacy')}
              </button>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <footer className="w-full mx-auto text-xs text-muted-foreground border-t border-border pt-6 pb-4 flex-shrink-0" style={{background: 'inherit'}}>
        <div className="flex flex-row gap-6 mb-2 justify-center">
          <button 
            onClick={() => onLegalLink('terms')} 
            className="hover:underline hover:text-primary"
          >
            {t('authModal.footerLinks.terms')}
          </button>
          <span>|</span>
          <button 
            onClick={() => onLegalLink('privacy')} 
            className="hover:underline hover:text-primary"
          >
            {t('authModal.footerLinks.privacy')}
          </button>
          <span>|</span>
          <button 
            onClick={() => onLegalLink('help')} 
            className="hover:underline hover:text-primary"
          >
            {t('authModal.footerLinks.helpCenter')}
          </button>
          <span>|</span>
          <button 
            onClick={() => onLegalLink('contact')} 
            className="hover:underline hover:text-primary"
          >
            {t('authModal.footerLinks.contact')}
          </button>
        </div>
        <div className="text-xs text-muted-foreground text-center w-full">
          {t('authModal.copyright')}
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineArrowOutward } from 'react-icons/md';
import SocialLinksCard from './SocialLinksCard';
import { PLATFORM_NAME } from '@/data/constants';
import PoliciesModal from '../PoliciesModal';
import type { RootState } from '@/store/store';
import { useTenant } from '@/contexts/TenantContext';

// Footer Component
const Footer: React.FC = () => {
  const [isPoliciesModalOpen, setIsPoliciesModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState('privacy');
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role || 'student';
  const { teacher, slug } = useTenant();

  const handleLegalLinkClick = (tab: string) => {
    setActiveLegalTab(tab);
    setIsPoliciesModalOpen(true);
  };

  const handleClosePoliciesModal = () => {
    setIsPoliciesModalOpen(false);
  };

  // Function to get appropriate navigation links based on user role
  const getPlatformLinks = () => {
    if (!isAuthenticated) {
      return [
        { label: 'Browse Experts', path: '/teachers' },
        { label: 'Book a Session', path: '/auth/signup' },
        { label: 'Institutional Access', path: '/auth/signup' },
        { label: 'For Senior Experts', path: '/auth/signup' },
        { label: 'Pricing', path: '/auth/signup' },
      ];
    }

    if (userRole === 'teacher') {
      return [
        { label: 'Expert Dashboard', path: '/teacher/dashboard' },
        { label: 'My Sessions', path: '/teacher/courses' },
        { label: 'Booking Requests', path: '/teacher/chapters' },
        { label: 'Earnings', path: '/teacher/invoices' },
        { label: 'Analytics', path: '/teacher/analytics' },
      ];
    }

    // Student / Personal role
    return [
      { label: 'Dashboard', path: '/student/dashboard' },
      { label: 'My Sessions', path: '/student/courses' },
      { label: 'Browse Experts', path: '/teachers' },
      { label: 'Subscription', path: '/student/store' },
      { label: 'Invoices', path: '/student/transactions' },
    ];
  };

  const platformLinks = getPlatformLinks();

  return (
    <>
      <div className="flex flex-col md:flex-row bg-black text-white p-8 md:p-16 gap-8 justify-between px-6 md:px-20 xl:px-44">
        <div className="flex flex-col gap-8 text-gray-300/85 max-w-[300px]">
          {/* Tenant Logo and Name (if tenant exists) */}
          {teacher && slug && (
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={`/${slug}/logo.png`}
                  alt={`${teacher.display_name} Logo`} 
                  className="cursor-pointer h-10 w-10"
                  onError={(e) => {
                    // Hide the image if tenant logo doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-white font-semibold text-xl">{teacher.display_name}</span>
              </div>
            </div>
          )}
          
          {/* Platform Logo and Name (smaller if tenant exists) */}
          <div className={`flex items-center space-x-3 ${teacher && slug ? 'opacity-70' : ''}`}>
            <img 
              src="/assests/logo.png" 
              alt="Logo" 
              className={`cursor-pointer ${teacher && slug ? 'h-8 w-8' : 'h-12 w-12'}`}
            />
            <a 
              href="https://kia.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-white font-semibold hover:opacity-80 transition-opacity ${teacher && slug ? 'text-lg' : 'text-2xl'}`}
            >
              {PLATFORM_NAME}
            </a>
          </div>
          <div>
            India's expert guidance platform — verified professionals, real answers.{" "}
            <div className="font-semibold text-white hover:underline text-lg">
              <a href="https://kia.in">
                KIA — Know It All <MdOutlineArrowOutward className="inline" />
              </a>
            </div>
          </div>
          <SocialLinksCard />
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-bold text-lg">Platform</div>
          {platformLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-gray-300/85 hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-bold text-lg">Company</div>
          <Link to="/about"   className="text-gray-300/85 hover:text-white transition-colors cursor-pointer">About</Link>
          <Link to="/mission" className="text-gray-300/85 hover:text-white transition-colors cursor-pointer">Mission</Link>
          <Link to="/contact" className="text-gray-300/85 hover:text-white transition-colors cursor-pointer">Contact</Link>
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-bold text-lg">Legal</div>
          <div 
            className="cursor-pointer text-gray-300/85 hover:text-white transition-colors"
            onClick={() => handleLegalLinkClick('privacy')}
          >
            Privacy
          </div>
          <div 
            className="cursor-pointer text-gray-300/85 hover:text-white transition-colors"
            onClick={() => handleLegalLinkClick('terms')}
          >
            Terms
          </div>
          <div 
            className="cursor-pointer text-gray-300/85 hover:text-white transition-colors"
            onClick={() => handleLegalLinkClick('help')}
          >
            Security
          </div>
        </div>
      </div>

      <PoliciesModal
        isOpen={isPoliciesModalOpen}
        onClose={handleClosePoliciesModal}
        initialTab={activeLegalTab}
      />
    </>
  );
};

export default Footer;

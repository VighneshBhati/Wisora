import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useRandomBackground } from "../../hooks/useRandomBackground";
import { PremiumCourseCard } from '@/components/courses/PremiumCourseCard';
import { SEOHead } from '@/components/seo';
import { useTranslation } from 'react-i18next';
import PoliciesModal from '@/components/landing/PoliciesModal';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { AuthLeftSide } from '@/components/auth/AuthLeftSide';
import { getDefaultRedirectPath } from '@/utils/authRedirect';

// Fallback dummy data when no real sessions are available
const fallbackCards = [
  {
    title: 'Career Guidance Session',
    author: 'Priya Sharma — HR Director',
    desc: 'Get expert advice on career transitions, resume building, and interview prep.',
    category: 'Career',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80',
    tags: ['₹99 Trial', 'Popular'],
  },
  {
    title: 'Finance & Investment',
    author: 'Rajesh Mehta — CFP',
    desc: 'Understand mutual funds, SIPs, and personal finance from a certified expert.',
    category: 'Finance',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80',
    tags: ['New'],
  },
  {
    title: 'Legal Consultation',
    author: 'Adv. Sunita Rao',
    desc: 'Get clarity on contracts, property law, and business compliance.',
    category: 'Law',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80',
    tags: ['₹149 Trial'],
  },
  {
    title: 'Startup Mentorship',
    author: 'Vikram Nair — Founder',
    desc: 'From idea to MVP — get real founder insights for your startup journey.',
    category: 'Entrepreneurship',
    thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80',
    tags: ['Popular'],
  },
  {
    title: 'Medical Career Advice',
    author: 'Dr. Ananya Iyer — MBBS, MD',
    desc: 'Guidance on NEET, PG entrance, and medical career paths in India.',
    category: 'Healthcare',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    tags: ['New'],
  },
  {
    title: 'Tech Interview Prep',
    author: 'Arjun Kapoor — Senior SDE',
    desc: 'Crack FAANG interviews with real DSA and system design guidance.',
    category: 'Technology',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
    tags: ['₹99 Trial'],
  },
];

// Interface for real course data
interface RealCourse {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  cover_image_url: string | null;
  price: number;
  enrollment_code: string | null;
  created_at: string;
  instructor_id: string;
  profiles?: {
    full_name: string;
  };
}

// Interface for processed course data
interface ProcessedCourse {
  title: string;
  author: string;
  desc: string;
  category: string;
  thumbnail: string;
  tags: string[];
}

function useVerticalCarousel(cards: ProcessedCourse[], direction = 'down', speed = 1) {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const max = cards.length * 260; // card height + gap
        let next = prev + (direction === 'down' ? speed : -speed);
        if (next > max) next = 0;
        if (next < 0) next = max;
        return next;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [cards.length, direction, speed]);
  return [offset, ref];
}

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const [mode, setMode] = useState<'login' | 'signup' | 'buttons'>('buttons');
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [activeTab, setActiveTab] = useState('terms');
  const [courses, setCourses] = useState<ProcessedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const bgClass = useRandomBackground();
  const { teacher } = useTenant();

  // If already authenticated, redirect away from auth pages
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      navigate(getDefaultRedirectPath(user), { replace: true });
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  // Fetch courses based on tenant status
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      let coursesQuery = supabase
        .from('courses')
        .select(`
          *,
          profiles!courses_instructor_id_fkey(full_name)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(12); // Limit to 12 courses for performance

      // If there's a tenant, fetch only their courses
      if (teacher?.user_id) {
        coursesQuery = coursesQuery.eq('instructor_id', teacher.user_id);
      }

      const { data: coursesData, error: coursesError } = await coursesQuery;

      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
        // Fallback to dummy data on error
        setCourses(fallbackCards);
        return;
      }

      if (coursesData && coursesData.length > 0) {
        // Process real course data to match the expected format
        const processedCourses: ProcessedCourse[] = coursesData.map((course: RealCourse) => ({
          title: course.title,
          author: course.profiles?.full_name || 'Course Instructor',
          desc: course.description || 'No description available',
          category: course.category || 'General',
          thumbnail: course.cover_image_url || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
          tags: [course.price === 0 ? 'Free' : 'Premium', 'Active'],
        }));
        
        // Only use fallback data if there are NO courses at all
        setCourses(processedCourses);
      } else {
        // No courses found, use fallback data
        setCourses(fallbackCards);
      }
    } catch (error) {
      console.error('Error in fetchCourses:', error);
      // Fallback to dummy data on error
      setCourses(fallbackCards);
    } finally {
      setLoading(false);
    }
  }, [teacher?.user_id]);

  // Fetch courses on component mount and when tenant changes
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);


  useEffect(() => {
    if (location.pathname.endsWith('/login')) setMode('login');
    else if (location.pathname.endsWith('/signup')) setMode('signup');
    else setMode('buttons');
  }, [location.pathname]);

  const handleLegalLink = (tab: string) => {
    setActiveTab(tab);
    setShowLegalModal(true);
  };

  // Split cards for two carousels, ensuring both have courses
  const leftCards = courses.filter((_, i) => i % 2 === 0);
  const rightCards = courses.filter((_, i) => i % 2 === 1);
  
  // Handle course distribution for carousels
  let finalLeftCards = leftCards;
  let finalRightCards = rightCards;
  
  if (courses.length === 1) {
    // Single course: show it in both carousels
    finalLeftCards = [courses[0]];
    finalRightCards = [courses[0]];
  } else if (courses.length > 0) {
    if (leftCards.length === 0 && rightCards.length > 0) {
      // If left is empty, move half of right to left
      const half = Math.ceil(rightCards.length / 2);
      finalLeftCards = rightCards.slice(0, half);
      finalRightCards = rightCards.slice(half);
    } else if (rightCards.length === 0 && leftCards.length > 0) {
      // If right is empty, move half of left to right
      const half = Math.ceil(leftCards.length / 2);
      finalRightCards = leftCards.slice(0, half);
      finalLeftCards = leftCards.slice(half);
    }
  }
  
  const [leftOffset, leftRef] = useVerticalCarousel(finalLeftCards, 'down', 1);
  const [rightOffset, rightRef] = useVerticalCarousel(finalRightCards, 'up', 1);

  return (
    <>
      <SEOHead />
      <div className={bgClass + " h-screen min-h-screen flex flex-col md:flex-row overflow-hidden"}>
      {/* Left Column - Unified Component */}
      <AuthLeftSide 
        mode={mode} 
        setMode={setMode} 
        onLegalLink={handleLegalLink} 
      />


      
      {/* Right Column: Two vertical carousels */}
      <div className="hidden md:flex w-full md:w-1/2 gap-4 px-4 h-screen items-stretch">
        {/* Left Carousel - Hidden on md, visible on xl */}
        <div className="hidden xl:flex flex-1 overflow-hidden relative h-full">
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col gap-6 absolute top-0 left-0 w-full"
            style={{ transform: `translateY(-${leftOffset}px)` }}
          >
            {finalLeftCards.concat(finalLeftCards).map((course, i) => (
              <PremiumCourseCard
                key={i}
                id={String(i)}
                title={course.title}
                description={course.desc}
                category={course.category}
                status={course.tags[0] || 'Active'}
                instructor_name={course.author}
                enrollment_count={Math.floor(Math.random() * 1000)}
                is_enrolled={false}
                enrollment_code={"DEMO" + i}
                cover_image_url={course.thumbnail}
                created_at={new Date().toISOString()}
                price={Math.floor(Math.random() * 100) + 10}
                isHovering={false}
                onPreview={() => {}}
                onEnroll={() => {}}
                avatar_url={undefined}
              />
            ))}
          </div>
        </div>
        {/* Right Carousel - Centered on md, right side on xl */}
        <div className="flex-1 overflow-hidden relative h-full">
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col gap-6 absolute top-0 left-0 w-full"
            style={{ transform: `translateY(-${rightOffset}px)` }}
          >
            {finalRightCards.concat(finalRightCards).map((course, i) => (
              <PremiumCourseCard
                key={i}
                id={String(i)}
                title={course.title}
                description={course.desc}
                category={course.category}
                status={course.tags[0] || 'Active'}
                instructor_name={course.author}
                enrollment_count={Math.floor(Math.random() * 1000)}
                is_enrolled={false}
                enrollment_code={"DEMO" + i}
                cover_image_url={course.thumbnail}
                created_at={new Date().toISOString()}
                price={Math.floor(Math.random() * 100) + 10}
                isHovering={false}
                onPreview={() => {}}
                onEnroll={() => {}}
                avatar_url={undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      <PoliciesModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
        initialTab={activeTab}
      />
      </div>
    </>
  );
};

export default Auth; 
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Search, Star, Users, Clock, CheckCircle } from 'lucide-react';
import { useRandomBackground } from "../../hooks/useRandomBackground";
import { PremiumCourseCard } from '@/components/courses/PremiumCourseCard';
import WavesHeroHeader from '@/components/ui/WavesHeroHeader';
import { useTenant } from '@/contexts/TenantContext';
import { CourseCardSkeleton } from '@/components/student/skeletons/CourseCardSkeleton';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';
import { useEnrollment } from '@/hooks/useEnrollment';
import { useSecureAvailableCourses } from '@/lib/hooks/secure-student-hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import FloatingCard from '@/components/ui/FloatingCard';
import styled from 'styled-components';

const GlowCourseCard = styled.div`
  position: relative;
  width: 100%;
  background-color: #212121;
  border-radius: 1rem;
  border: #212121 0.2rem solid;
  transition: all 0.4s ease-in;
  box-shadow: 0.4rem 0.4rem 0.6rem #00000040;
  cursor: pointer;

  &:hover {
    transform: translateY(-1.5rem);
    border: #f2295bf0 0.2em solid;
    border-radius: 2.5rem 0 2.5rem 0;
  }

  .card-inner {
    position: relative;
    z-index: 2;
    padding: 20px 18px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .icon {
    width: 28px;
    height: 28px;
    color: rgba(255,255,255,0.4);
    margin-bottom: 4px;
  }

  .title {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    line-height: 1.3;
    text-transform: capitalize;
  }

  .category {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    font-weight: 500;
  }

  .instructor {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
  }

  .enrolled {
    font-size: 11px;
    color: rgba(255,255,255,0.25);
  }

  .price {
    font-size: 16px;
    font-weight: 700;
    color: #f2295b;
    margin-top: 4px;
  }
`;

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  instructor_name: string;
  enrollment_count: number;
  is_enrolled: boolean;
  enrollment_code: string;
  cover_image_url?: string;
  created_at?: string;
  price?: number;
  instructor_id?: string;
  avatar_url?: string; // NEW
}

interface RawCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  instructor_id: string;
  enrollment_code: string;
  cover_image_url?: string;
  created_at?: string;
  price?: number;
  profiles?: { full_name?: string };
}

const DUMMY_COURSES: Course[] = [
  { id: 'dc1', title: 'Crack Product Management Interviews', description: 'End-to-end PM interview prep — case studies, metrics, product design, and behavioural rounds with a Google PM.', category: 'Career Growth', status: 'published', instructor_name: 'Rahul Sharma', enrollment_count: 1240, is_enrolled: false, enrollment_code: 'PM2026', price: 1999 },
  { id: 'dc2', title: 'Machine Learning from Scratch', description: 'Build ML models from linear regression to transformers. Hands-on Python notebooks, real datasets, and career guidance.', category: 'Tech & Engineering', status: 'published', instructor_name: 'Priya Nair', enrollment_count: 2180, is_enrolled: false, enrollment_code: 'ML2026', price: 2499 },
  { id: 'dc3', title: 'CFA Level 1 Masterclass', description: 'Comprehensive CFA Level 1 prep with a charterholder. Ethics, quant, equity, fixed income — all covered with mock exams.', category: 'Finance & Law', status: 'published', instructor_name: 'Arjun Mehta', enrollment_count: 870, is_enrolled: false, enrollment_code: 'CFA2026', price: 3499 },
  { id: 'dc4', title: 'UX Portfolio That Gets You Hired', description: 'Build a standout UX portfolio from scratch. Case study writing, Figma prototypes, and recruiter-tested presentation tips.', category: 'Creative Arts', status: 'published', instructor_name: 'Sneha Kapoor', enrollment_count: 640, is_enrolled: false, enrollment_code: 'UX2026', price: 1499 },
  { id: 'dc5', title: 'DSA & System Design for FAANG', description: 'Master data structures, algorithms, and large-scale system design. 200+ problems, mock interviews, and live doubt sessions.', category: 'Tech & Engineering', status: 'published', instructor_name: 'Vikram Iyer', enrollment_count: 3100, is_enrolled: false, enrollment_code: 'DSA2026', price: 2999 },
  { id: 'dc6', title: 'Zero to Funded: Startup Playbook', description: 'From idea validation to seed funding. Learn GTM strategy, pitch decks, investor outreach, and team building from a 2x founder.', category: 'Entrepreneurship', status: 'published', instructor_name: 'Meera Joshi', enrollment_count: 520, is_enrolled: false, enrollment_code: 'STARTUP2026', price: 1999 },
];

export const Courses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const bgClass = useRandomBackground();
  const { teacher } = useTenant();
  const { enrollInCourse, isEnrolling } = useEnrollment();
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Use secure hook for fetching courses
  const { data, isLoading, error } = useSecureAvailableCourses(user, teacher);
  const rawCourses = useMemo(() => (data as any)?.courses || [], [data]);
  const courses = useMemo(() => rawCourses.length > 0 ? rawCourses : DUMMY_COURSES, [rawCourses]);

  // Dynamic categories from course data
  const courseCategories = Array.from(new Set(courses.map((c: any) => c.category).filter(Boolean)));
  const categories = ['All', ...courseCategories];

  // Handle error from secure hook
  useEffect(() => {
    if (error) {
      toast({
        title: t('courses.error'),
        description: t('courses.failedToLoadCourses'),
        variant: 'destructive',
      });
    }
  }, [error, toast, t]);

  const handleEnrollInCourse = async (courseId: string) => {
    // Find the course to determine its price
    const course = courses.find(c => c.id === courseId);
    if (!course) {
      toast({
        title: 'Error',
        description: 'Course not found',
        variant: 'destructive',
      });
      return;
    }

    // Determine enrollment source based on course price
    const source = course.price === 0 ? 'direct' : 'wallet';
    
    const success = await enrollInCourse(courseId, { source });
    if (success) {
      // The secure hook will automatically refetch data
      // No need to manually refresh
    }
  };

  // Use useMemo for filtered courses to prevent unnecessary re-renders
  const filteredCourses = useMemo(() => {
    return courses.filter((course: Course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (course.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (course.enrollment_code || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  return (
    <>
      <SEOHead />
      <div className={bgClass + " min-h-screen bg-gradient-to-br from-background via-background to-primary/5 "}>
        {/* Header - full width, top of page */}
        <WavesHeroHeader
          title={<span className='text-primary dark:text-white'>{t('courses.title')}</span>}
          description={t('courses.subtitle')}
        />
      <div className="container mx-auto px-2 sm:px-4 space-y-8">
        {/* Filters - overlap header */}
        <Card className="glass-card w-full max-w-full -mt-12">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('courses.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row flex-wrap gap-2">
                {categories.map((category: string) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full md:w-auto ${
                      selectedCategory === category
                        ? 'bg-primary text-white font-bold border-2 border-primary shadow-lg px-5 py-2 rounded-full transition-all duration-200 hover:bg-primary/80 hover:text-white'
                        : 'bg-background text-foreground border border-border hover:bg-primary/10 hover:text-primary px-5 py-2 rounded-full transition-all duration-200'
                    }`}
                    variant="ghost"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid or Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
            {[...Array(6)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 w-full max-w-full px-2">
            {filteredCourses.map((course: Course) => {
              const isDummy = course.id.startsWith('dc');
              return isDummy ? (
                <GlowCourseCard key={course.id} onClick={() => navigate('/teachers')}>
                    <div className="card-inner">
                      <BookOpen className="icon" />
                      <div className="title">{course.title}</div>
                      <div className="category">{course.category}</div>
                      <div className="instructor">{course.instructor_name}</div>
                      <div className="enrolled">{course.enrollment_count?.toLocaleString()} enrolled</div>
                      <div className="price">₹{course.price?.toLocaleString()}</div>
                    </div>
                  </GlowCourseCard>
              ) : (
                <PremiumCourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  category={course.category}
                  status={course.status}
                  instructor_name={course.instructor_name}
                  enrollment_count={course.enrollment_count}
                  is_enrolled={course.is_enrolled}
                  enrollment_code={course.enrollment_code}
                  cover_image_url={course.cover_image_url}
                  created_at={course.created_at}
                  price={course.price}
                  avatar_url={course.avatar_url}
                  onPreview={() => navigate(`/courses/${course.id}`)}
                  onEnroll={() => handleEnrollInCourse(course.id)}
                  onContinue={() => navigate(`/courses/${course.id}`)}
                />
              );
            })}
          </div>
        )}

        {!isLoading && filteredCourses.length === 0 && (
          <Card className="glass-card w-full max-w-full">
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('courses.noCoursesFound')}</h3>
              <p className="text-muted-foreground">
                {t('courses.tryAdjustingSearchCriteria')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </>
  );
};

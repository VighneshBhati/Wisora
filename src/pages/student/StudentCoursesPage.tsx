
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Trophy, Play, Sparkles, Search, Calendar, Clock, Star } from 'lucide-react';
import type { RootState } from '@/store/store';
import { useTenant } from '@/contexts/TenantContext';
import DashboardModernHeader from '@/components/ui/DashboardModernHeader';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useSecureStudentEnrolledCourses } from '@/lib/hooks/secure-student-hooks';
import { PremiumCourseCard } from '@/components/courses/PremiumCourseCard';
import { CourseCardSkeleton } from '@/components/student/skeletons/CourseCardSkeleton';
import { useTranslation } from 'react-i18next';
import type { User } from '@supabase/supabase-js';
import { SEOHead } from '@/components/seo';
import GlowBorderCard from '@/components/ui/GlowBorderCard';

interface EnrolledCourse {
  id: string;
  course: {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    instructor_name?: string;
    cover_image_url?: string;
    enrollment_code?: string;
    created_at: string;
    instructor_id?: string;
    profiles?: { full_name?: string };
    avatar_url?: string;
  };
  enrolled_at: string;
  progress?: number;
  totalLessons?: number;
  completedLessons?: number;
  enrollment_count?: number;
}

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const DUMMY_SESSIONS = [
  { id: 'ds1', expert: 'Rahul Sharma', domain: 'Product Management', date: 'Mar 25, 2026', time: '3:00 PM', duration: '60 min', status: 'confirmed', avatar: '👨‍💼', price: 199, category: 'Career Growth' },
  { id: 'ds2', expert: 'Priya Nair', domain: 'Data Science & ML', date: 'Mar 28, 2026', time: '11:00 AM', duration: '45 min', status: 'pending', avatar: '👩‍💻', price: 299, category: 'Tech & Engineering' },
  { id: 'ds3', expert: 'Arjun Mehta', domain: 'Finance & Investing', date: 'Mar 15, 2026', time: '2:00 PM', duration: '60 min', status: 'completed', avatar: '👨‍🏫', price: 149, category: 'Finance & Law' },
  { id: 'ds4', expert: 'Sneha Kapoor', domain: 'UX Design', date: 'Apr 2, 2026', time: '4:00 PM', duration: '30 min', status: 'confirmed', avatar: '👩‍🎨', price: 199, category: 'Creative Arts' },
  { id: 'ds5', expert: 'Vikram Iyer', domain: 'DSA & System Design', date: 'Apr 5, 2026', time: '6:00 PM', duration: '90 min', status: 'pending', avatar: '👨‍💻', price: 349, category: 'Tech & Engineering' },
  { id: 'ds6', expert: 'Meera Joshi', domain: 'Startup Strategy', date: 'Mar 10, 2026', time: '10:00 AM', duration: '60 min', status: 'completed', avatar: '👩‍🚀', price: 249, category: 'Entrepreneurship' },
];

export const StudentCoursesPage = () => {
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);
  const { teacher } = useTenant();
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const { data: enrolledCourses, isLoading, error } = useSecureStudentEnrolledCourses(supabaseUser, teacher);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');

  // Get Supabase user on component mount
  useEffect(() => {
    const getSupabaseUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setSupabaseUser(user);
    };
    getSupabaseUser();
  }, []);

  const courseCategories = Array.from(new Set(enrolledCourses?.map(e => e.course.category).filter(Boolean) || []));
  const categories = ['All', ...courseCategories];

  useEffect(() => {
    if (error) {
      // Only log — don't show destructive toast for empty DB (new users)
      console.error('Error fetching courses:', error);
    }
  }, [error]);

  const filteredCourses = enrolledCourses?.filter((enrollment) => {
    const course = enrollment.course;
    if (!course) return false;
    
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.enrollment_code || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  // Child component to show course card with real progress
  const StudentCourseCardWithProgress = ({ enrollment, userId }: { enrollment: EnrolledCourse, userId: string }) => {
    const progress = useCourseProgress(enrollment.course?.id || '', userId);
    
    if (!enrollment.course) return null;
    
    return (
      <PremiumCourseCard
        key={enrollment.id}
        id={enrollment.course.id}
        title={enrollment.course.title}
        description={enrollment.course.description}
        category={enrollment.course.category}
        status="Active"
        instructor_name={enrollment.course.instructor_name}
        enrollment_count={enrollment.enrollment_count || 0}
        is_enrolled={true}
        enrollment_code={enrollment.course.enrollment_code || ""}
        cover_image_url={enrollment.course.cover_image_url}
        created_at={enrollment.course.created_at}
        price={enrollment.course.price}
        progress={progress.progressPercentage}
        isHovering={true}
        avatar_url={enrollment.course.avatar_url}
        onPreview={() => {}}
        onEnroll={() => {}}
        onContinue={() => {
          navigate(`/courses/${enrollment.course.id}`);
        }}
      />
    );
  };

  return (
    <>
      <SEOHead />
      <DashboardLayout>
      <DashboardModernHeader
        title="My Sessions"
        subtitle="Your booked and upcoming expert sessions"
        buttonText="Explore Experts"
        onButtonClick={() => navigate('/teachers')}
      />
      <div className="space-y-6">
        {/* Search and Filters as a row with dropdown */}
        <Card className="glass-card w-full max-w-full">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Search input */}
              <div className="w-full sm:flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                  <Input
                    type="text"
                    placeholder="Search by session name or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass w-full"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
              </div>
              {/* Dropdown for categories */}
              <div className={`w-full sm:w-auto ${searchFocused ? 'hidden sm:block' : ''}`}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 w-full sm:min-w-[140px] justify-between"
                    >
                      <span>{selectedCategory}</span>
                      <ChevronDown className="h-4 w-4 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onSelect={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category
                            ? 'bg-primary-500 text-white font-semibold'
                            : ''
                        }
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((enrollment) => (
              <StudentCourseCardWithProgress key={enrollment.id} enrollment={enrollment as EnrolledCourse} userId={supabaseUser?.id || ''} />
            ))}
          </div>
        ) : (
          /* Dummy sessions shown when no real data */
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DUMMY_SESSIONS.filter(s =>
              (selectedCategory === 'All' || s.category === selectedCategory) &&
              (s.expert.toLowerCase().includes(searchTerm.toLowerCase()) || s.domain.toLowerCase().includes(searchTerm.toLowerCase()))
            ).map((session) => (
              <GlowBorderCard key={session.id} onClick={() => navigate('/teachers')}>
                <div className="flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{session.avatar}</div>
                      <div>
                        <div className="font-bold text-sm text-white">{session.expert}</div>
                        <div className="text-xs text-white/50">{session.domain}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[session.status]}`}>
                      {session.status}
                    </span>
                  </div>
                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{session.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{session.time}</span>
                    <span>{session.duration}</span>
                  </div>
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="text-xs text-white/30">{session.category}</span>
                    <span className="text-sm font-bold text-emerald-400">₹{session.price}</span>
                  </div>
                </div>
              </GlowBorderCard>
            ))}
          </div>
        )}
      </div>
      </DashboardLayout>
    </>
  );
};

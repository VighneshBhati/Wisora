
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Calendar, BookOpen, ImageDown } from 'lucide-react';
import { toast } from 'sonner';
import { useRandomBackground } from '@/hooks/useRandomBackground';
import WavesHeroHeader from '@/components/ui/WavesHeroHeader';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { TeacherCardSkeleton } from '@/components/student/skeletons/TeacherCardSkeleton';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo';
import FloatingCard from '@/components/ui/FloatingCard';
import GlowBorderCard from '@/components/ui/GlowBorderCard';

interface Teacher {
  id: string;
  user_id: string;
  slug: string;
  display_name: string;
  bio: string | null;
  specialization: string | null;
  experience_years: number | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  is_active: boolean;
  course_count?: number;
}

// TeachersFilterBar reusable component
interface TeachersFilterBarProps {
  searchTerm: string;
  onSearchTermChange: (v: string) => void;
  selectedSpecialization: string;
  onSpecializationChange: (v: string) => void;
  specializations: string[];
}
const TeachersFilterBar: React.FC<TeachersFilterBarProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedSpecialization,
  onSpecializationChange,
  specializations,
}) => {
  const [searchFocused, setSearchFocused] = React.useState(false);
  const { t } = useTranslation('dashboard');

  return (
    <div className="w-full mb-12">
      <div className="glass-card flex flex-row items-center gap-4 p-4 shadow-lg border border-primary/10 bg-background/90 w-full">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t('teachersPage.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-12 py-3 rounded-xl bg-background/80 border border-primary/20 focus:ring-2 focus:ring-primary/30"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
        {/* Hide filter on small screens when search is focused */}
        <div className={`transition-all duration-200 ${searchFocused ? 'hidden sm:block' : ''} w-full sm:w-56`}>
          <Select value={selectedSpecialization} onValueChange={onSpecializationChange}>
            <SelectTrigger className="w-full rounded-xl border border-primary/20 bg-background/80 focus:ring-2 focus:ring-primary/30">
              <SelectValue>{selectedSpecialization === 'All' ? t('teachersPage.allSpecializations') : selectedSpecialization}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {specializations.map(spec => (
                <SelectItem key={spec} value={spec}>
                  {spec === 'All' ? t('teachersPage.allSpecializations') : spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

const DUMMY_EXPERTS: Teacher[] = [
  { id: 'd1', user_id: 'd1', slug: 'rahul-sharma', display_name: 'Rahul Sharma', bio: 'Ex-Google PM with 12 years in product strategy. Helped 300+ professionals crack top product roles.', specialization: 'Product Management', experience_years: 12, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 48 },
  { id: 'd2', user_id: 'd2', slug: 'priya-nair', display_name: 'Priya Nair', bio: 'Data Scientist at Meta. Specialises in ML pipelines, career transitions into AI, and interview prep.', specialization: 'Data Science & ML', experience_years: 9, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 61 },
  { id: 'd3', user_id: 'd3', slug: 'arjun-mehta', display_name: 'Arjun Mehta', bio: 'CFA charterholder and ex-investment banker. Guides students through finance careers and CFA prep.', specialization: 'Finance & Law', experience_years: 15, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 33 },
  { id: 'd4', user_id: 'd4', slug: 'sneha-kapoor', display_name: 'Sneha Kapoor', bio: 'Senior UX Lead at Flipkart. Mentors designers on portfolio building, system design, and growth.', specialization: 'UX & Design', experience_years: 8, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 27 },
  { id: 'd5', user_id: 'd5', slug: 'vikram-iyer', display_name: 'Vikram Iyer', bio: 'IIT Bombay alumnus, SDE-3 at Amazon. Specialises in DSA, system design, and FAANG interview coaching.', specialization: 'Tech & Engineering', experience_years: 11, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 72 },
  { id: 'd6', user_id: 'd6', slug: 'meera-joshi', display_name: 'Meera Joshi', bio: 'Founder of two EdTech startups. Advises early-stage founders on GTM, fundraising, and team building.', specialization: 'Entrepreneurship', experience_years: 10, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 19 },
  { id: 'd7', user_id: 'd7', slug: 'karan-bhatia', display_name: 'Karan Bhatia', bio: 'Corporate lawyer turned legal consultant. Helps startups with compliance, contracts, and IP strategy.', specialization: 'Finance & Law', experience_years: 14, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 22 },
  { id: 'd8', user_id: 'd8', slug: 'ananya-singh', display_name: 'Ananya Singh', bio: 'Clinical psychologist and wellness coach. Guides professionals through burnout, stress, and career anxiety.', specialization: 'Health & Wellness', experience_years: 7, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 41 },
  { id: 'd9', user_id: 'd9', slug: 'rohan-das', display_name: 'Rohan Das', bio: 'National award-winning filmmaker and creative director. Mentors in storytelling, branding, and content.', specialization: 'Creative Arts', experience_years: 13, profile_image_url: null, cover_image_url: null, is_active: true, course_count: 16 },
];

export const TeachersPage = () => {
  const { t } = useTranslation('dashboard');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const bgClass = useRandomBackground();

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    filterTeachers();
  }, [searchTerm, teachers, selectedSpecialization]);

  const fetchTeachers = async () => {
    try {
      // First, get all active teachers
      const { data: teachersData, error: teachersError } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (teachersError) {
        setTeachers(DUMMY_EXPERTS);
        setLoading(false);
        return;
      }

      // Then, for each teacher, count their courses
      const teachersWithCourseCount = await Promise.all(
        (teachersData || []).map(async (teacher) => {
          const { count } = await supabase
            .from('courses')
            .select('*', { count: 'exact', head: true })
            .eq('instructor_id', teacher.user_id)
            .eq('status', 'published');

          return {
            ...teacher,
            course_count: count || 0
          };
        })
      );

      setTeachers(teachersWithCourseCount.length > 0 ? teachersWithCourseCount : DUMMY_EXPERTS);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers(DUMMY_EXPERTS);
    } finally {
      setLoading(false);
    }
  };

  const filterTeachers = () => {
    let filtered = teachers;
    if (searchTerm.trim()) {
      filtered = filtered.filter(teacher =>
        teacher.display_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSpecialization !== 'All') {
      filtered = filtered.filter(teacher =>
        teacher.specialization === selectedSpecialization
      );
    }
    setFilteredTeachers(filtered);
  };

  const specializations = React.useMemo(() => {
    const specs = teachers
      .map(t => t.specialization)
      .filter(Boolean);
    return ['All', ...Array.from(new Set(specs))];
  }, [teachers]);

  return (
    <>
      <SEOHead />
      <div className={`min-h-screen ${bgClass}`}>
        {/* Full-width header */}
        <WavesHeroHeader
        title={<>
          Browse Our <span className="text-primary-500 dark:text-primary-400">Verified Experts</span>
        </>}
        description="Connect with background-checked industry veterans, retired professionals, and domain specialists ready to guide you."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12">
          <TeachersFilterBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            selectedSpecialization={selectedSpecialization}
            onSpecializationChange={setSelectedSpecialization}
            specializations={specializations}
          />
        </div>
        {/* Teachers Grid or Skeletons */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <TeacherCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {searchTerm ? t('teachersPage.no_teachers_matching_search') : t('teachersPage.no_teachers_available')}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeachers.map((teacher) => {
              const isDummy = teacher.id.startsWith('d');
              const cardInner = (
                <Card className="h-full rounded-3xl border-0 glass-card shadow-xl bg-background/80 group-hover:scale-[1.03] group-hover:shadow-2xl transition-all duration-200 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Cover Image */}
                    <div className="relative h-32 sm:h-36 bg-gradient-to-r from-primary to-primary-400">
                      {teacher.cover_image_url ? (
                        <img src={teacher.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/40 bg-muted">
                          <ImageDown className="w-10 h-10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    {/* Profile Info */}
                    <div className="flex flex-col items-center -mt-10 px-6">
                      <Avatar className="w-20 h-20 border-4 border-background shadow-lg bg-white">
                        <AvatarImage src={teacher.profile_image_url || undefined} />
                        <AvatarFallback className="text-2xl">
                          {teacher.display_name ? teacher.display_name.charAt(0).toUpperCase() : '?'}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg text-foreground mt-3 mb-1 truncate w-full text-center">
                        {teacher.display_name || t('teachersPage.unnamed_teacher')}
                      </h3>
                      {teacher.specialization && (
                        <Badge variant="secondary" className="mb-2 text-xs bg-primary/10 text-primary border-primary/20">
                          {teacher.specialization}
                        </Badge>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        {teacher.experience_years && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {teacher.experience_years} yrs experience
                          </div>
                        )}
                        {(teacher.course_count ?? 0) > 0 && (
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {teacher.course_count} sessions
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Bio */}
                    {teacher.bio && (
                      <p className="text-muted-foreground text-sm mt-3 px-6 pb-6 line-clamp-2 text-center">
                        {teacher.bio}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );

              return isDummy ? (
                <GlowBorderCard key={teacher.id}>
                  <div className="flex flex-col items-start gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xl font-black text-white self-center mb-1">
                      {teacher.display_name.charAt(0)}
                    </div>
                    {/* Name + specialization */}
                    <div className="w-full text-center">
                      <div className="font-bold text-base text-white leading-tight">{teacher.display_name}</div>
                      <div className="text-xs text-white/55 font-medium mt-0.5">{teacher.specialization}</div>
                    </div>
                    {/* Meta */}
                    <div className="text-xs text-white/35 w-full text-center">
                      {teacher.experience_years} yrs · {teacher.course_count} sessions
                    </div>
                    {/* Bio */}
                    <p className="text-xs text-white/50 line-clamp-3 leading-relaxed">{teacher.bio}</p>
                    {/* CTA */}
                    <Link to={`/teachers/${teacher.slug}`} className="w-full mt-1 py-1.5 rounded-md text-center text-xs font-semibold text-white/80 block"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      View Profile
                    </Link>
                  </div>
                </GlowBorderCard>
              ) : (
                <Link key={teacher.id} to={`/teachers/${teacher.slug}`} className="group">
                  {cardInner}
                </Link>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </>
  );
};

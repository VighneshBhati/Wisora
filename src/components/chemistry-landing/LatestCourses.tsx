import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { CourseCarousel, type Course } from './CourseCarousel';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { useTeacherCoursesByTenant } from '@/hooks/useTeacherCoursesByTenant';

// No Courses Indicator Component
const NoCoursesIndicator = () => {
  const { t } = useTranslation('landing');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="text-center max-w-md mx-auto">

        <h3 className="text-2xl font-bold text-foreground mb-4">
          {t('courses.noCourses.title')}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t('courses.noCourses.subtitle')}
        </p>
      </div>
    </motion.div>
  );
};

export const LatestCourses = () => {
  const { t } = useTranslation('landing');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();
  const { teacher } = useTenant();


  // Fetch real courses using the hook
  const { courses: realCourses, loading: coursesLoading, error: coursesError } = useTeacherCoursesByTenant({
    instructorId: teacher?.user_id,
    limit: 6, // Limit to 6 courses for the carousel
    includeEnrollmentCount: true
  });

  // Transform real courses to match the Course interface expected by CourseCarousel
  const transformedCourses: Course[] = realCourses.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description || '',
    category: course.category || '',
    status: course.status || 'published',
    instructor_name: teacher?.display_name || 'Instructor',
    enrollment_count: course.enrollment_count,
    is_enrolled: false,
    enrollment_code: course.enrollment_code || '',
    cover_image_url: course.cover_image_url || undefined,
    created_at: course.created_at,
    price: course.price || 0,
    instructor_id: course.instructor_id,
    avatar_url: teacher?.profile_image_url || undefined,
  }));

  // Use real courses if available, otherwise show no courses indicator
  const hasRealCourses = transformedCourses.length > 0;
  const coursesData = hasRealCourses ? transformedCourses : [];

  const handleCourseClick = (course: Course) => {
    console.log('Course clicked:', course);
    // Navigate to course details
    navigate(`/courses/${course.id}`);
  };

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      <div className="container-responsive relative z-10">
        <SectionHeader
          title={t('courses.title')}
          subtitle={t('courses.subtitle')}
          variant="premium"
        />
      </div>

      {/* Full Width Course Carousel or No Courses Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 w-full px-3 lg:px-12"
      >
        {coursesLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : coursesError ? (
          <div className="text-center text-destructive py-20">
            <p className="text-lg">Error loading courses: {coursesError}</p>
            <p className="text-sm text-muted-foreground mt-2">Showing sample courses instead</p>
          </div>
        ) : !hasRealCourses ? (
          <NoCoursesIndicator />
        ) : (
          <CourseCarousel
            courses={coursesData}
            showArrows={true}
            showDots={true}
            autoPlay={true}
            itemsPerView={{
              mobile: 1,
              tablet: 2,
              desktop: 3
            }}
            onCourseClick={handleCourseClick}
            className="w-full"
          />
        )}
      </motion.div>

      {/* Bottom CTA - Only show when there are courses */}
      {hasRealCourses && (
        <div className="container-responsive relative z-10">
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <Button size="lg" className="btn-secondary" onClick={() => navigate('/courses')}>
              {t('courses.viewAll')}
            </Button>
          </motion.div>
        </div>
      )}
    </section>
  );
};
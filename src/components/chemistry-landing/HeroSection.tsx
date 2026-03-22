import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Star, Play, BookOpen, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTenant } from '@/contexts/TenantContext';
import type { RootState } from '@/store/store';

// Lazy load the teacher image
const about_techer = '/pola/about-teacher.png';

// Stats will be moved inside component to use translations

// Optimized image component with lazy loading
const LazyTeacherImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.01, // Much lower threshold for faster loading
    rootMargin: '50px', // Start loading 50px before the element comes into view
    onChange: (inView) => setIsInView(inView)
  });

  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = src;
    }
  }, [isInView, isLoaded, src]);

  // Preload the image immediately on mobile to avoid scroll issues
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (isMobile && !isLoaded) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = src;
    }
  }, [src, isLoaded]);

  return (
    <div ref={ref} className={className}>
      {isLoaded && (
        <img src={src} alt={alt} className="w-full h-auto object-contain" />
      )}
    </div>
  );
};

export const HeroSection = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { teacher } = useTenant();
  const userRole = user?.role || 'student';
  const shouldReduceMotion = useReducedMotion();
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '98%', label: t('hero.studentSuccessRate') },
    { number: '4.9/5', label: t('hero.studentRating') },
    { number: '4+', label: t('hero.teachingExperience') },
    { number: '50+', label: t('hero.completedCourses') },
  ];

  // Function to get CTA buttons based on authentication and role
  const getCTAButtons = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Button 
            size="sm" 
            variant="default"
            className='border border-white text-sm sm:text-base'
            onClick={() => navigate('/auth/signup')}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            {t('hero.startLearning')}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm"
            className="text-sm sm:text-base"
            onClick={() => navigate('/courses')}
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            {t('hero.watchSample')}
          </Button>
        </>
      );
    }

    if (userRole === 'student') {
      return (
        <>
          <Button 
            size="sm" 
            variant="default"
            className='border border-white text-sm sm:text-base'
            onClick={() => navigate('/student/dashboard')}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            {t('hero.continueLearning')}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm"
            className="text-sm sm:text-base"
            onClick={() => navigate('/courses')}
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            {t('hero.browseCourses')}
          </Button>
        </>
      );
    }

    if (userRole === 'teacher') {
      return (
        <>
          <Button 
            size="sm" 
            variant="default"
            className='border border-white text-sm sm:text-base'
            onClick={() => navigate('/teacher/dashboard')}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            {t('hero.manageDashboard')}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm"
            className="text-sm sm:text-base"
            onClick={() => navigate('/teacher/courses')}
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            {t('hero.createCourse')}
          </Button>
        </>
      );
    }

    // Fallback for other roles
    return (
      <>
        <Button 
          size="sm" 
          variant="default"
          className='border border-white text-sm sm:text-base'
          onClick={() => navigate('/dashboard')}
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          {t('hero.goToDashboard')}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        </Button>
        
        <Button 
          variant="secondary" 
          size="sm"
          className="text-sm sm:text-base"
          onClick={() => navigate('/courses')}
        >
          <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          {t('hero.explorePlatform')}
        </Button>
      </>
    );
  };

  // Get teacher name and specialization dynamically
  const teacherName = teacher?.display_name || 'Dr. Ahmed Mohamed Hassan';
  const teacherSpecialization = teacher?.specialization || 'Chemistry';

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-16 lg:pt-0" ref={ref}>
      <div className="w-full px-4 lg:px-8 relative z-10">
        {/* <SectionHeader
          title="تعرف على المدرس"
          subtitle="خبرة طويلة وشغف حقيقي لتعليم الكيمياء بطريقة مبسطة وممتعة"
          variant="premium"
        /> */}

        <div className="relative min-h-[600px] flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0">
          {/* Left Card - Full Height with Primary Background */}
          <motion.div
            className="relative w-full lg:w-2/3 h-[90vh] lg:h-[600px] bg-primary rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-between"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3 }}
          >
            {/* Hero Text Content */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-white flex-1 flex flex-col justify-center">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                  {t('hero.title', { specialization: teacherSpecialization })}
                  <span className="block text-white">{t('hero.subtitle')}</span>
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed opacity-90 mb-4 sm:mb-6 md:mb-8"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
              >
                {t('hero.joinThousands', { teacherName })}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.8 }}
              >
                {getCTAButtons()}
              </motion.div>

            </div>

            {/* Stats Section at Bottom */}
            <motion.div
              className="hidden lg:grid grid-cols-4 gap-6 mt-8 pb-8 lg:pb-0"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-white/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Image inside card on mobile */}
            <motion.div
              className="flex justify-center items-end mt-auto -mx-4 sm:-mx-6 md:-mx-8 lg:hidden"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.8 }}
            >
              <LazyTeacherImage
                src={about_techer}
                alt={teacherName}
                className="w-full h-auto max-h-64 sm:max-h-72 md:max-h-80"
              />
            </motion.div>
          </motion.div>

          {/* Image - Hidden on mobile, overlapping on desktop */}
          <motion.div
            className="hidden lg:flex lg:absolute lg:-right-8 lg:top-1/3 lg:-translate-y-1/2 lg:w-[900px] z-20"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.5 }}
          >
            {/* Teacher Image */}
            <LazyTeacherImage
              src={about_techer}
              alt={teacherName}
              className="w-full h-auto"
            />
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

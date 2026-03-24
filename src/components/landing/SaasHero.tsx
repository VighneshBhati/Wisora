import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa';
import type { RootState } from '@/store/store';
import GradientBlinds from '@/components/react-bits/GradientBlinds/GradientBlinds';

const SaasHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role || 'student';

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Function to get CTA buttons based on authentication and role
  const getCTAButtons = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Button 
            className="text-white bg-black py-2 px-4 rounded-sm cursor-pointer"
            onClick={() => navigate('/auth/signup')}
          >
            Book a Session
          </Button>
          <Button 
            variant="outline"
            className="text-black hover:text-black bg-white border-white hover:bg-white/90 py-2 px-4 rounded-sm cursor-pointer"
            onClick={() => navigate('/teachers')}
          >
            Browse Experts
            <FaArrowRight className="h-3 w-3 inline ml-2" />
          </Button>
        </>
      );
    }

    if (userRole === 'student') {
      return (
        <>
          <Button 
            className="text-white bg-black py-2 px-4 rounded-sm cursor-pointer"
            onClick={() => navigate('/student/dashboard')}
          >
            Continue Learning
          </Button>
          <Button 
            variant="outline"
            className="text-black hover:text-black bg-white border-white hover:bg-white/90 py-2 px-4 rounded-sm cursor-pointer"
            onClick={() => navigate('/courses')}
          >
            Browse Courses
            <FaArrowRight className="h-3 w-3 inline ml-2" />
          </Button>
        </>
      );
    }

    if (userRole === 'teacher') {
      return (
        <>
          <Button 
            className="text-white bg-black py-2 px-4 rounded-sm cursor-pointer"
            onClick={() => navigate('/teacher/dashboard')}
          >
            Manage
          </Button>
          <Button 
            variant="outline"
            className="text-black hover:text-black bg-white border-white hover:bg-white/90 py-2 px-4 rounded-sm cursor-pointer"
            onClick={() => navigate('/teacher/courses')}
          >
            Create Course
            <FaArrowRight className="h-3 w-3 inline ml-2" />
          </Button>
        </>
      );
    }

    // Fallback for other roles
    return (
      <>
        <Button 
          className="text-white bg-black py-2 px-4 rounded-sm cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
        <Button 
          variant="outline"
          className="text-black hover:text-black bg-white border-white hover:bg-white/90 py-2 px-4 rounded-sm cursor-pointer"
          onClick={() => navigate('/courses')}
        >
          Explore Platform
          <FaArrowRight className="h-3 w-3 inline ml-2" />
        </Button>
      </>
    );
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen pt-16 relative overflow-hidden bg-black"
    >
      {/* Full background GradientBlinds component */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={20}
          noise={0.5}
          blindCount={16}
          blindMinWidth={60}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-7rem)] md:h-[calc(100vh-7rem)] p-4 sm:p-8 md:p-10 lg:p-20 pointer-events-none">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-16 w-full max-w-7xl mx-auto text-center">
          <div className="w-full max-w-[600px]">
            <div className="text-white border-2 w-fit py-0.5 px-1.5 lg:text-lg rounded-sm border-white/60 mx-auto bg-black/20 backdrop-blur-sm">
              Wisora
            </div>
            <div className="text-5xl md:text-7xl font-black my-7 text-white tracking-tighter drop-shadow-2xl" style={{ textShadow: '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)' }}>
              Talk to Real Experience
            </div>
            <div className="text-xl lg:text-2xl tracking-tighter text-white font-semibold drop-shadow-xl" style={{ textShadow: '0 0 15px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)' }}>
              Get 1:1 guidance from verified industry veterans — retired professionals, senior experts, and domain specialists. Real answers in 20 minutes, not 3-month courses.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 text-lg pointer-events-auto">
              {getCTAButtons()}
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasHero;

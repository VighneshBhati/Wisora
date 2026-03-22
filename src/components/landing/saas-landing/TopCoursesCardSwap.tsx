import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaPlay } from 'react-icons/fa';
import { getTopCourses } from '@/lib/queries';
import { CourseData } from './types';
import CardSwap, { Card } from '@/components/react-bits/CardSwap/CardSwap';

const FALLBACK_SESSIONS: CourseData[] = [
  {
    id: '1',
    title: 'Career Guidance Session',
    description: 'Get expert advice on career transitions, resume building, and interview preparation from an experienced HR Director.',
    cover_image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    price: 99,
    profiles: { full_name: 'Priya Sharma' },
    enrollments: [{ count: 1240 }],
  },
  {
    id: '2',
    title: 'Finance & Investment Planning',
    description: 'Understand mutual funds, SIPs, and personal finance from a certified financial planner with 15+ years of experience.',
    cover_image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    price: 149,
    profiles: { full_name: 'Rajesh Mehta' },
    enrollments: [{ count: 890 }],
  },
  {
    id: '3',
    title: 'Tech Interview Prep',
    description: 'Crack FAANG interviews with real DSA and system design guidance from a Senior SDE at a top tech company.',
    cover_image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    price: 99,
    profiles: { full_name: 'Arjun Kapoor' },
    enrollments: [{ count: 2100 }],
  },
  {
    id: '4',
    title: 'Startup Mentorship',
    description: 'From idea to MVP — get real founder insights for your startup journey from a serial entrepreneur.',
    cover_image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    price: 199,
    profiles: { full_name: 'Vikram Nair' },
    enrollments: [{ count: 560 }],
  },
  {
    id: '5',
    title: 'Medical Career Advice',
    description: 'Guidance on NEET, PG entrance, and medical career paths in India from an experienced MBBS, MD doctor.',
    cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    price: 149,
    profiles: { full_name: 'Dr. Ananya Iyer' },
    enrollments: [{ count: 730 }],
  },
];

// TopCoursesCardSwap Component
const TopCoursesCardSwap: React.FC = () => {
  const { data: fetchedCourses, isLoading } = useQuery<CourseData[]>({
    queryKey: ['topCourses'],
    queryFn: getTopCourses,
    initialData: [],
  });
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  // Use fetched courses if available, otherwise fallback
  const courses = (fetchedCourses && fetchedCourses.length > 0) ? fetchedCourses : FALLBACK_SESSIONS;

  // Ensure component is ready after data loads
  useEffect(() => {
    if (courses && courses.length > 0 && !isLoading) {
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [courses, isLoading]);

  if (isLoading) {
    return (
      <div className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="font-medium">
              <div className="text-black border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">Featured Sessions</div>
              <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">Browse Top Expert Sessions</div>
              <div className="text-lg md:text-xl text-black">Loading sessions...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white relative overflow-hidden">
      {/* Premium Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric Pattern Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, #002499 1px, transparent 1px),
              linear-gradient(180deg, #002499 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-32 left-20 w-24 h-24 border border-blue-200/20 rotate-45 opacity-30"></div>
        <div className="absolute top-48 right-32 w-16 h-16 bg-blue-100/20 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-indigo-200/15 rotate-12 opacity-25"></div>
        <div className="absolute bottom-48 right-1/4 w-28 h-28 bg-purple-100/15 transform rotate-45 opacity-30"></div>
        
        {/* Large Pattern Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/8 rounded-full blur-3xl"></div>
        
        {/* Animated Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-200/15 rounded-full blur-2xl"
          animate={{
            y: [10, -10, 10],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content Container - Side by Side Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Header Section */}
          <div className="font-medium text-center lg:text-left">
            <div className="text-black border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80 mx-auto lg:mx-0">
              Featured Sessions
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
              Browse Top Expert Sessions
            </div>
            <div className="text-lg md:text-xl text-black">
              Book a session with our top-rated verified experts. Real guidance, real outcomes.
            </div>
          </div>

          {/* Right Side - CardSwap Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div style={{  position: 'relative' }} className='h-[300px] xs:h-[500px] sm:h-[500px] md:h-[700px] lg:h-[600px]'>
              {/* Key prop forces reinitialization when courses change */}
              <CardSwap
                key={`courses-${courses.length}-${isReady}`}
                cardDistance={60}
                verticalDistance={70}
                delay={2000}
                pauseOnHover={false}
                onCardClick={(idx) => {
                  const course = courses[idx];
                  if (course) {
                    navigate(`/courses/${course.id}`);
                  }
                }}
              >
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    customClass="bg-white shadow-3xl border-2 border-gray-300 overflow-hidden cursor-pointer"
                    style={{ width: '420px', height: '500px' }}
                  >
                    {/* Course Thumbnail Section */}
                    <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      {course.cover_image_url ? (
                        <img
                          src={course.cover_image_url}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <FaPlay className="text-5xl text-gray-400" />
                        </div>
                      )}
                      
                      {/* Premium overlay with sophisticated gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                      
                      {/* Premium badge with enhanced styling */}
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-gray-900 px-5 py-3 text-sm font-bold shadow-xl border border-gray-300">
                        {course.price === 0 ? 'Free' : `₹${course.price}`}
                      </div>
                    </div>

                    {/* Course Content Section */}
                    <div className="p-10 bg-white">
                      {/* Course Title - Primary Hierarchy */}
                      <h3 className="text-3xl font-bold text-gray-900 mb-6 line-clamp-2 leading-tight tracking-tight">
                        {course.title}
                      </h3>

                      {/* Instructor Name - Secondary Hierarchy */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-base font-bold shadow-xl">
                          {course.profiles?.full_name?.[0] || 'I'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                            Expert
                          </span>
                          <span className="text-xl font-bold text-gray-800">
                            {course.profiles?.full_name || 'Course Instructor'}
                          </span>
                        </div>
                      </div>

                      {/* Course Description */}
                      {course.description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {course.description}
                        </p>
                      )}

                      {/* Enrollment Count */}
                      {course.enrollments && course.enrollments[0] && (
                        <div className="mt-6 text-sm text-gray-500">
                          <span className="font-semibold">{course.enrollments[0].count}</span> clients booked
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </div>

      {/* View All Courses CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.4 }}
        className="flex justify-center pb-16 relative z-10 mt-40 lg:mt-16"
      >
        <Button 
          className="text-white bg-black py-2 px-4 rounded-sm cursor-pointer"
          onClick={() => navigate('/teachers')}
        >
          Browse All Experts
        </Button>
      </motion.div>
    </div>
  );
};

export default TopCoursesCardSwap;

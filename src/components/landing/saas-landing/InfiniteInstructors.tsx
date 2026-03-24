import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getFeaturedInstructors } from '@/lib/queries';
import InfiniteMenu from '../../react-bits/InfiniteMenu/InfiniteMenu';

// Infinite Instructors Component
const InfiniteInstructors: React.FC = () => {
  const navigate = useNavigate();
  const { data: instructors, isLoading, isError } = useQuery({
    queryKey: ['featuredInstructors'],
    queryFn: getFeaturedInstructors,
  });

  const fallbackItems = [
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      link: '/teachers',
      title: 'Arjun Kapoor',
      description: 'Senior SDE — Tech Interview Coach'
    },
    {
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      link: '/teachers',
      title: 'Adv. Sunita Rao',
      description: 'Legal Consultant'
    },
    {
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      link: '/teachers',
      title: 'Vikram Nair',
      description: 'Startup Founder & Mentor'
    },
  ];

  if (isLoading) {
    return (
      <div className="pt-20 bg-white">
        <div className="flex flex-col items-center font-medium px-8 mx-auto md:w-[550px] lg:w-[630px]">
          <div className="text-black border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">Verified Experts</div>
          <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">Explore Our Experts in 3D</div>
          <div className="text-center text-lg mb-8 md:text-xl text-black">Loading amazing experts...</div>
        </div>
      </div>
    );
  }

  const menuItems = (!isError && instructors && instructors.length > 0)
    ? instructors.map((instructor) => ({
        image: instructor.profile_image_url || `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80`,
        link: `/teachers/${instructor.slug}`,
        title: instructor.display_name || 'Expert',
        description: instructor.specialization || 'Verified Expert',
      }))
    : fallbackItems;

  return (
    <div className="pt-20 bg-white relative overflow-hidden">
      {/* Clean white background - patterns removed */}

      <div className="flex flex-col items-center font-medium px-8 mx-auto md:w-[550px] lg:w-[630px] relative z-10">
        <div className="text-black border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80">
          Verified Experts
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
          Explore Our Experts in 3D
        </div>
        <div className="text-center text-lg mb-8 md:text-xl text-black">
          Interact with our verified experts in an immersive 3D experience. Click and drag to explore, and find the right professional for your needs.
        </div>
      </div>

      {/* Infinite Menu Container - Responsive Height */}
      <div className="relative w-full h-[400px] md:h-screen">
        <InfiniteMenu items={menuItems} />
      </div>

      {/* Browse All Experts CTA */}
      <div className="flex justify-center pb-16 relative z-10 mt-6">
        <Button 
          className="text-white bg-black py-2 px-4 rounded-sm cursor-pointer"
          onClick={() => navigate('/teachers')}
        >
          Browse All Experts
        </Button>
      </div>
    </div>
  );
};

export default InfiniteInstructors;

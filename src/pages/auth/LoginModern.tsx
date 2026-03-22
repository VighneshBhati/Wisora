import React from 'react';
import { Button } from '@/components/ui/button';
import { Apple, Play } from 'lucide-react';

const courses = [
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
  // ...more placeholder cards
];

const LoginModern: React.FC = () => (
  <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-[#fdeef7]">
    {/* Left Column */}
    <div className="w-full md:w-2/5 flex flex-col justify-between px-8 py-12 md:py-20">
      <div>
        {/* Logo */}
        <div className="flex items-center mb-10">
          <span className="text-4xl font-extrabold tracking-tight text-[#5C4DFF]">LEARN</span>
          <span className="text-4xl font-extrabold tracking-tight text-primary-500">.</span>
        </div>
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-black text-black mb-10 leading-tight">
          Your knowledge.<br />Your future.
        </h1>
        {/* Buttons */}
        <div className="flex flex-col gap-4 mb-4">
          <Button className="bg-[#5C4DFF] hover:bg-[#4b3ed6] text-white font-bold text-lg py-4 rounded-full w-full shadow-md transition-all">
            Create Account
          </Button>
          <Button variant="outline" className="border border-gray-300 text-black font-semibold text-lg py-4 rounded-full w-full bg-white hover:bg-gray-100 transition-all">
            Sign In
          </Button>
        </div>
        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mb-8">
          By continuing, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
        {/* App Store Buttons */}
        <div className="flex gap-4 mb-8">
          <a href="#" className="flex items-center px-5 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-900 transition-all">
            <Apple className="w-6 h-6 mr-2" />
            <span className="font-semibold">App Store</span>
          </a>
          <a href="#" className="flex items-center px-5 py-3 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition-all">
            <Play className="w-6 h-6 mr-2 text-[#5C4DFF]" />
            <span className="font-semibold text-black">Play Store</span>
          </a>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-8 text-xs text-gray-400 flex flex-wrap gap-4 items-center">
        <a href="#" className="hover:underline">Terms</a>
        <span>|</span>
        <a href="#" className="hover:underline">Privacy</a>
        <span>|</span>
        <a href="#" className="hover:underline">Help Center</a>
        <span>|</span>
        <a href="#" className="hover:underline">Contact</a>
        <span className="ml-auto">©2025 LearnX LMS</span>
      </footer>
    </div>
    {/* Right Column */}
    <div className="w-full md:w-3/5 bg-transparent px-4 py-12 md:py-20 flex items-start overflow-x-auto">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-0 flex flex-col hover:scale-[1.03] hover:shadow-2xl transition-all cursor-pointer min-w-[260px]"
          >
            <div className="h-40 w-full rounded-t-2xl overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-primary-100 text-primary-600 rounded-full font-semibold">{course.category}</span>
                {course.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-purple-100 text-[#5C4DFF] rounded-full font-semibold">{tag}</span>
                ))}
              </div>
              <h3 className="text-lg font-bold mb-1 text-gray-900">{course.title}</h3>
              <div className="text-xs text-gray-500 mb-2">By {course.author}</div>
              <p className="text-sm text-gray-700 mb-3 flex-1">{course.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LoginModern; 
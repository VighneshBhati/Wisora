import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialData } from './types';

// Testimonials Component
const Testimonials: React.FC = () => {
  const testimonials: TestimonialData[] = [
    {
      id: 1,
      text: "I was confused about switching from IT to finance. Booked a 30-min session with a retired ICICI banker and got a complete roadmap. Worth every rupee.",
      name: "Rahul Sharma",
      handle: "Career Switcher, Pune",
      avatar: "/assests/avatar-1.png"
    },
    {
      id: 2,
      text: "As a CA, I joined KIA to share my 25 years of tax expertise. The platform is clean, the clients are serious, and the earnings are great. Highly recommend for retired professionals.",
      name: "CA Priya Mehta",
      handle: "Chartered Accountant, Mumbai",
      avatar: "/assests/avatar-6.png"
    },
    {
      id: 3,
      text: "Our college signed up for the institutional plan. Students now get real industry guidance before placements. The on-campus visit feature is a game changer.",
      name: "Prof. Anand Kumar",
      handle: "Placement Head, Delhi University",
      avatar: "/assests/avatar-3.png"
    },
    {
      id: 4,
      text: "I needed legal advice on a startup contract. Found a retired High Court advocate on KIA. 20 minutes, ₹299, and I had complete clarity. No lawyer fees, no waiting.",
      name: "Sneha Patel",
      handle: "Startup Founder, Ahmedabad",
      avatar: "/assests/avatar-7.png"
    },
    {
      id: 5,
      text: "The Bronze trial session was just ₹99. I tested the platform with a stock market expert and was blown away. Upgraded to a full session the same day.",
      name: "Vikram Singh",
      handle: "Retail Investor, Jaipur",
      avatar: "/assests/avatar-2.png"
    },
    {
      id: 6,
      text: "After 30 years at RBI, I wanted to give back. KIA made it easy to set my availability, price my sessions, and connect with people who genuinely need guidance.",
      name: "Retired RBI Officer",
      handle: "Banking & Finance Expert",
      avatar: "/assests/avatar-5.png"
    },
    {
      id: 7,
      text: "The group session feature is brilliant. 10 students, one expert, ₹149 each. Our entire batch got career clarity in one hour. Incredibly cost-effective.",
      name: "Arjun Nair",
      handle: "Final Year Student, Bangalore",
      avatar: "/assests/avatar-4.png"
    },
    {
      id: 8,
      text: "I was skeptical at first, but the verification process gave me confidence. Every expert has proven credentials. This is not just another mentoring app.",
      name: "Meera Joshi",
      handle: "HR Professional, Hyderabad",
      avatar: "/assests/avatar-8.png"
    },
    {
      id: 9,
      text: "Got guidance on export documentation from a retired DGFT officer. Saved my business from a compliance mistake that could have cost lakhs. Absolutely invaluable.",
      name: "Suresh Agarwal",
      handle: "Export Business Owner, Surat",
      avatar: "/assests/avatar-9.png"
    }
  ];

  const renderTestimonial = (testimonial: TestimonialData) => (
    <div key={testimonial.id} className="shadow-xl w-[310px] rounded-2xl p-8">
      <div className="font-medium pb-4 text-black">{testimonial.text}</div>
      <div className="flex items-center gap-3">
        <img src={testimonial.avatar} alt="Avatar" className="h-12 w-12" />
        <div>
          <div className="font-semibold text-black">{testimonial.name}</div>
          <div className="text-black">{testimonial.handle}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 bg-white">
      <div className="flex flex-col items-center px-28 pb-16">
        <div className="text-black border-2 w-fit p-0.5 px-3 text-sm rounded-xl font-semibold border-slate-300/80">
          Testimonials
        </div>
        <div className="text-4xl lg:text-5xl pt-6 font-bold tracking-tighter text-center bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text">
          What our users say
        </div>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_top,transparent,black,transparent)] h-[750px] mb-12 md:mb-28 lg:mb-36">
        <motion.div
          animate={{
            translateY: "-50%",
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <div className="flex items-center justify-center overflow-x-hidden pb-4 gap-4">
            <div className="hidden md:block">
              {renderTestimonial(testimonials[0])}
              <div className="my-6">{renderTestimonial(testimonials[1])}</div>
              {renderTestimonial(testimonials[2])}
            </div>

            <div>
              {renderTestimonial(testimonials[3])}
              <div className="my-6">{renderTestimonial(testimonials[4])}</div>
              {renderTestimonial(testimonials[5])}
            </div>

            <div className="hidden md:block">
              {renderTestimonial(testimonials[6])}
              {renderTestimonial(testimonials[7])}
              {renderTestimonial(testimonials[8])}
            </div>
          </div>

          <div className="flex items-center justify-center overflow-x-hidden gap-4">
            <div className="hidden md:block">
              {renderTestimonial(testimonials[0])}
              <div className="my-6">{renderTestimonial(testimonials[1])}</div>
              {renderTestimonial(testimonials[2])}
            </div>

            <div>
              {renderTestimonial(testimonials[3])}
              <div className="my-6">{renderTestimonial(testimonials[4])}</div>
              {renderTestimonial(testimonials[5])}
            </div>

            <div className="hidden md:block">
              {renderTestimonial(testimonials[6])}
              {renderTestimonial(testimonials[7])}
              {renderTestimonial(testimonials[8])}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;

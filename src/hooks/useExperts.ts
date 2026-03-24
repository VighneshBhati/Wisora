import { useState, useEffect } from 'react';

export interface Expert {
  id: string;
  display_name: string;
  specialization: string;
  bio: string;
  experience_years: number;
  profile_image_url: string | null;
  rate_per_session: number;
  available: boolean;
  slug: string;
  is_custom: boolean; // added by user
}

const STORAGE_KEY = 'wisora_custom_experts';

const DEFAULT_EXPERTS: Expert[] = [
  { id: 'd1', display_name: 'Rahul Sharma', specialization: 'Product Management', bio: 'Ex-Google PM with 12 years in product strategy. Helped 300+ professionals crack top product roles.', experience_years: 12, profile_image_url: null, rate_per_session: 8, available: true, slug: 'rahul-sharma', is_custom: false },
  { id: 'd2', display_name: 'Priya Nair', specialization: 'Data Science & ML', bio: 'Data Scientist at Meta. Specialises in ML pipelines, career transitions into AI, and interview prep.', experience_years: 9, profile_image_url: null, rate_per_session: 12, available: true, slug: 'priya-nair', is_custom: false },
  { id: 'd3', display_name: 'Arjun Mehta', specialization: 'Finance & Law', bio: 'CFA charterholder and ex-investment banker. Guides students through finance careers and CFA prep.', experience_years: 15, profile_image_url: null, rate_per_session: 10, available: false, slug: 'arjun-mehta', is_custom: false },
  { id: 'd4', display_name: 'Sneha Kapoor', specialization: 'UX & Design', bio: 'Senior UX Lead at Flipkart. Mentors designers on portfolio building, system design, and growth.', experience_years: 8, profile_image_url: null, rate_per_session: 9, available: true, slug: 'sneha-kapoor', is_custom: false },
  { id: 'd5', display_name: 'Vikram Iyer', specialization: 'Tech & Engineering', bio: 'IIT Bombay alumnus, SDE-3 at Amazon. Specialises in DSA, system design, and FAANG interview coaching.', experience_years: 11, profile_image_url: null, rate_per_session: 14, available: true, slug: 'vikram-iyer', is_custom: false },
  { id: 'd6', display_name: 'Meera Joshi', specialization: 'Entrepreneurship', bio: 'Founder of two EdTech startups. Advises early-stage founders on GTM, fundraising, and team building.', experience_years: 10, profile_image_url: null, rate_per_session: 11, available: true, slug: 'meera-joshi', is_custom: false },
];

export const useExperts = () => {
  const [customExperts, setCustomExperts] = useState<Expert[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const allExperts = [...DEFAULT_EXPERTS, ...customExperts];

  const addExpert = (expert: Omit<Expert, 'id' | 'slug' | 'is_custom'>) => {
    const newExpert: Expert = {
      ...expert,
      id: `custom_${Date.now()}`,
      slug: expert.display_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      is_custom: true,
    };
    const updated = [...customExperts, newExpert];
    setCustomExperts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newExpert;
  };

  const removeExpert = (id: string) => {
    const updated = customExperts.filter(e => e.id !== id);
    setCustomExperts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { allExperts, customExperts, addExpert, removeExpert };
};

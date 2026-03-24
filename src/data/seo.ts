import { PLATFORM_NAME } from './constants';

export type Language = 'en' | 'ar';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
}

export interface RouteSEOConfig {
  [key: string]: {
    [lang in Language]: SEOMetadata;
  };
}

// Base SEO configuration for all routes
export const BASE_SEO_CONFIG: RouteSEOConfig = {
  // Home/Landing page
  '/': {
    en: {
      title: `${PLATFORM_NAME} - Talk to Real Experience`,
      description: `${PLATFORM_NAME}  connects you with verified industry veterans for 1:1 expert guidance. Real answers in 20 minutes from retired professionals, senior executives, and domain specialists.`,
      keywords: 'expert guidance, verified advisors, 1:1 mentoring, career advice, industry veterans, professional consultation, India',
      ogType: 'website',
      ogImage: '/og-image.png',
      canonical: 'https://wisora.in/',
    },
    ar: {
      title: `${PLATFORM_NAME} - Talk to Real Experience`,
      description: `${PLATFORM_NAME}  connects you with verified industry veterans for 1:1 expert guidance. Real answers in 20 minutes from retired professionals, senior executives, and domain specialists.`,
      keywords: 'expert guidance, verified advisors, 1:1 mentoring, career advice, industry veterans, professional consultation',
      ogType: 'website',
      ogImage: '/og-image.png',
      canonical: 'https://wisora.in/',
    },
  },

  // Auth pages
  '/auth': {
    en: {
      title: `Sign In | ${PLATFORM_NAME}`,
      description: 'Sign in to your account and access your personalized learning experience.',
      keywords: 'sign in, login, authentication, user account, learning platform',
      ogType: 'website',
      canonical: 'https://wisora.in/auth',
    },
    ar: {
      title: `ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ | ${PLATFORM_NAME}`,
      description: 'Ø³Ø¬Ù„ Ø¯Ø®ÙˆÙ„Ùƒ Ø¥Ù„Ù‰ Ø­Ø³Ø§Ø¨Ùƒ ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ ØªØ¬Ø±Ø¨Ø© Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ø´Ø®ØµÙŠØ©.',
      keywords: 'ØªØ³Ø¬ÙŠÙ„ Ø¯Ø®ÙˆÙ„ØŒ Ù…ØµØ§Ø¯Ù‚Ø©ØŒ Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ØŒ Ù…Ù†ØµØ© Ø§Ù„ØªØ¹Ù„Ù…',
      ogType: 'website',
      canonical: 'https://wisora.in/auth',
    },
  },

  // Courses page
  '/courses': {
    en: {
      title: `Courses | ${PLATFORM_NAME}`,
      description: 'Explore our comprehensive collection of courses designed to enhance your learning journey.',
      keywords: 'online courses, learning materials, educational content, skill development',
      ogType: 'website',
      canonical: 'https://wisora.in/courses',
    },
    ar: {
      title: `Ø§Ù„Ø¯ÙˆØ±Ø§Øª | ${PLATFORM_NAME}`,
      description: 'Ø§Ø³ØªÙƒØ´Ù Ù…Ø¬Ù…ÙˆØ¹ØªÙ†Ø§ Ø§Ù„Ø´Ø§Ù…Ù„Ø© Ù…Ù† Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ù…ØµÙ…Ù…Ø© Ù„ØªØ¹Ø²ÙŠØ² Ø±Ø­Ù„Ø© Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.',
      keywords: 'Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø¹Ø¨Ø± Ø§Ù„Ø¥Ù†ØªØ±Ù†ØªØŒ Ø§Ù„Ù…ÙˆØ§Ø¯ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØŒ ØªØ·ÙˆÙŠØ± Ø§Ù„Ù…Ù‡Ø§Ø±Ø§Øª',
      ogType: 'website',
      canonical: 'https://wisora.in/courses',
    },
  },

  // Teacher dashboard
  '/teacher/dashboard': {
    en: {
      title: `Teacher Dashboard | ${PLATFORM_NAME}`,
      description: 'Manage your courses, track student progress, and create engaging learning experiences.',
      keywords: 'teacher dashboard, course management, student progress, educational tools',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/dashboard',
    },
    ar: {
      title: `Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ù…Ø¹Ù„Ù… | ${PLATFORM_NAME}`,
      description: 'Ø£Ø¯Ø± Ø¯ÙˆØ±Ø§ØªÙƒØŒ ØªØªØ¨Ø¹ ØªÙ‚Ø¯Ù… Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ ÙˆØ£Ù†Ø´Ø¦ ØªØ¬Ø§Ø±Ø¨ ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ø¬Ø°Ø§Ø¨Ø©.',
      keywords: 'Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ù…Ø¹Ù„Ù…ØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ ØªÙ‚Ø¯Ù… Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/dashboard',
    },
  },

  // Teacher courses
  '/teacher/courses': {
    en: {
      title: `My Courses | ${PLATFORM_NAME}`,
      description: 'Create, edit, and manage your courses with our comprehensive course management tools.',
      keywords: 'course creation, course management, teaching tools, educational content',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/courses',
    },
    ar: {
      title: `Ø¯ÙˆØ±Ø§ØªÙŠ | ${PLATFORM_NAME}`,
      description: 'Ø£Ù†Ø´Ø¦ ÙˆØ¹Ø¯Ù„ ÙˆØ£Ø¯Ø± Ø¯ÙˆØ±Ø§ØªÙƒ Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø£Ø¯ÙˆØ§Øª Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ø´Ø§Ù…Ù„Ø© Ù„Ø¯ÙŠÙ†Ø§.',
      keywords: 'Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ Ø£Ø¯ÙˆØ§Øª Ø§Ù„ØªØ¯Ø±ÙŠØ³ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/courses',
    },
  },





  // Teacher groups (dynamic route)
  '/teacher/groups/dynamic': {
    en: {
      title: `Group Management | ${PLATFORM_NAME}`,
      description: 'Create and manage study groups to enhance student collaboration and learning.',
      keywords: 'group management, study groups, student collaboration, educational communities',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/groups',
    },
    ar: {
      title: `Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§Øª | ${PLATFORM_NAME}`,
      description: 'Ø£Ù†Ø´Ø¦ ÙˆØ£Ø¯Ø± Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ù„ØªØ¹Ø²ÙŠØ² ØªØ¹Ø§ÙˆÙ† Ø§Ù„Ø·Ù„Ø§Ø¨ ÙˆØ§Ù„ØªØ¹Ù„Ù….',
      keywords: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§ØªØŒ Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø©ØŒ ØªØ¹Ø§ÙˆÙ† Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ Ø§Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/groups',
    },
  },

  // Teacher groups (list page)
  '/teacher/groups': {
    en: {
      title: `My Groups | ${PLATFORM_NAME}`,
      description: 'Manage your study groups and create collaborative learning environments.',
      keywords: 'study groups, group management, collaborative learning, educational communities',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/groups',
    },
    ar: {
      title: `Ù…Ø¬Ù…ÙˆØ¹Ø§ØªÙŠ | ${PLATFORM_NAME}`,
      description: 'Ø£Ø¯Ø± Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ ÙˆØ£Ù†Ø´Ø¦ Ø¨ÙŠØ¦Ø§Øª Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„ØªØ¹Ø§ÙˆÙ†ÙŠØ©.',
      keywords: 'Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø©ØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§ØªØŒ Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„ØªØ¹Ø§ÙˆÙ†ÙŠØŒ Ø§Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/groups',
    },
  },

  // Teacher chapters (list page)
  '/teacher/chapters': {
    en: {
      title: `My Chapters | ${PLATFORM_NAME}`,
      description: 'Organize your courses into structured chapters for better learning outcomes.',
      keywords: 'chapter management, course organization, structured learning, educational structure',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/chapters',
    },
    ar: {
      title: `ÙØµÙˆÙ„ÙŠ | ${PLATFORM_NAME}`,
      description: 'Ù†Ø¸Ù… Ø¯ÙˆØ±Ø§ØªÙƒ ÙÙŠ ÙØµÙˆÙ„ Ù…Ù†Ø¸Ù…Ø© Ù„ØªØ­Ù‚ÙŠÙ‚ Ù†ØªØ§Ø¦Ø¬ ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ø£ÙØ¶Ù„.',
      keywords: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙØµÙˆÙ„ØŒ ØªÙ†Ø¸ÙŠÙ… Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ù…Ù†Ø¸Ù…ØŒ Ø§Ù„Ù‡ÙŠÙƒÙ„ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/chapters',
    },
  },

  // Teacher codes
  '/teacher/codes': {
    en: {
      title: `Access Codes | ${PLATFORM_NAME}`,
      description: 'Create and manage access codes for your courses and content.',
      keywords: 'access codes, course codes, student access, educational codes',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/codes',
    },
    ar: {
      title: `Ø±Ù…ÙˆØ² Ø§Ù„ÙˆØµÙˆÙ„ | ${PLATFORM_NAME}`,
      description: 'Ø£Ù†Ø´Ø¦ ÙˆØ£Ø¯Ø± Ø±Ù…ÙˆØ² Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ø¯ÙˆØ±Ø§ØªÙƒ ÙˆÙ…Ø­ØªÙˆØ§Ùƒ.',
      keywords: 'Ø±Ù…ÙˆØ² Ø§Ù„ÙˆØµÙˆÙ„ØŒ Ø±Ù…ÙˆØ² Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ ÙˆØµÙˆÙ„ Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ Ø§Ù„Ø±Ù…ÙˆØ² Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/codes',
    },
  },

  // Teacher analytics
  '/teacher/analytics': {
    en: {
      title: `Analytics Dashboard | ${PLATFORM_NAME}`,
      description: 'Track student performance and course analytics to improve your teaching.',
      keywords: 'analytics, student performance, course statistics, teaching insights',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/analytics',
    },
    ar: {
      title: `Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­Ù„ÙŠÙ„Ø§Øª | ${PLATFORM_NAME}`,
      description: 'ØªØªØ¨Ø¹ Ø£Ø¯Ø§Ø¡ Ø§Ù„Ø·Ù„Ø§Ø¨ ÙˆØªØ­Ù„ÙŠÙ„Ø§Øª Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ù„ØªØ­Ø³ÙŠÙ† ØªØ¯Ø±ÙŠØ³Ùƒ.',
      keywords: 'Ø§Ù„ØªØ­Ù„ÙŠÙ„Ø§ØªØŒ Ø£Ø¯Ø§Ø¡ Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ Ø¥Ø­ØµØ§Ø¦ÙŠØ§Øª Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ Ø±Ø¤Ù‰ Ø§Ù„ØªØ¯Ø±ÙŠØ³',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/analytics',
    },
  },

  // Teacher schedule
  '/teacher/schedule': {
    en: {
      title: `Teaching Schedule | ${PLATFORM_NAME}`,
      description: 'Manage your teaching schedule and upcoming sessions.',
      keywords: 'teaching schedule, session management, time management, educational planning',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/schedule',
    },
    ar: {
      title: `Ø¬Ø¯ÙˆÙ„ Ø§Ù„ØªØ¯Ø±ÙŠØ³ | ${PLATFORM_NAME}`,
      description: 'Ø£Ø¯Ø± Ø¬Ø¯ÙˆÙ„ Ø§Ù„ØªØ¯Ø±ÙŠØ³ Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ ÙˆØ§Ù„Ø¬Ù„Ø³Ø§Øª Ø§Ù„Ù‚Ø§Ø¯Ù…Ø©.',
      keywords: 'Ø¬Ø¯ÙˆÙ„ Ø§Ù„ØªØ¯Ø±ÙŠØ³ØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¬Ù„Ø³Ø§ØªØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙˆÙ‚ØªØŒ Ø§Ù„ØªØ®Ø·ÙŠØ· Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/schedule',
    },
  },

  // Teacher notifications
  '/teacher/notifications': {
    en: {
      title: `Notifications | ${PLATFORM_NAME}`,
      description: 'Stay updated with important notifications about your courses and students.',
      keywords: 'notifications, course updates, student alerts, teaching notifications',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/notifications',
    },
    ar: {
      title: `Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª | ${PLATFORM_NAME}`,
      description: 'Ø§Ø¨Ù‚ Ù…Ø­Ø¯Ø«Ù‹Ø§ Ø¨Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø§Ù„Ù…Ù‡Ù…Ø© Ø­ÙˆÙ„ Ø¯ÙˆØ±Ø§ØªÙƒ ÙˆØ·Ù„Ø§Ø¨Ùƒ.',
      keywords: 'Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§ØªØŒ ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø§Ù„ØªØ¯Ø±ÙŠØ³',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/notifications',
    },
  },

  // Teacher colors
  '/teacher/colors': {
    en: {
      title: `Branding & Colors | ${PLATFORM_NAME}`,
      description: 'Customize your platform colors and branding to match your style.',
      keywords: 'branding, custom colors, platform customization, visual identity',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/colors',
    },
    ar: {
      title: `Ø§Ù„Ø¹Ù„Ø§Ù…Ø© Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© ÙˆØ§Ù„Ø£Ù„ÙˆØ§Ù† | ${PLATFORM_NAME}`,
      description: 'Ø®ØµØµ Ø£Ù„ÙˆØ§Ù† Ù…Ù†ØµØªÙƒ ÙˆØ¹Ù„Ø§Ù…ØªÙƒ Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© Ù„ØªØ·Ø§Ø¨Ù‚ Ø£Ø³Ù„ÙˆØ¨Ùƒ.',
      keywords: 'Ø§Ù„Ø¹Ù„Ø§Ù…Ø© Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ©ØŒ Ø§Ù„Ø£Ù„ÙˆØ§Ù† Ø§Ù„Ù…Ø®ØµØµØ©ØŒ ØªØ®ØµÙŠØµ Ø§Ù„Ù…Ù†ØµØ©ØŒ Ø§Ù„Ù‡ÙˆÙŠØ© Ø§Ù„Ø¨ØµØ±ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/colors',
    },
  },

  // Teacher students
  '/teacher/students': {
    en: {
      title: `My Students | ${PLATFORM_NAME}`,
      description: 'Manage and track your students across all your courses.',
      keywords: 'student management, student tracking, course enrollment, educational oversight',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/students',
    },
    ar: {
      title: `Ø·Ù„Ø§Ø¨ÙŠ | ${PLATFORM_NAME}`,
      description: 'Ø£Ø¯Ø± ÙˆØªØªØ¨Ø¹ Ø·Ù„Ø§Ø¨Ùƒ ÙÙŠ Ø¬Ù…ÙŠØ¹ Ø¯ÙˆØ±Ø§ØªÙƒ.',
      keywords: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ ØªØªØ¨Ø¹ Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ Ø§Ù„Ø¥Ø´Ø±Ø§Ù Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/students',
    },
  },

  // Teacher multiplayer quiz
  '/teacher/multiplayer-quiz': {
    en: {
      title: `Quiz Management | ${PLATFORM_NAME}`,
      description: 'Create and manage multiplayer quiz games for your students.',
      keywords: 'quiz management, multiplayer games, educational games, interactive learning',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/multiplayer-quiz',
    },
    ar: {
      title: `Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª | ${PLATFORM_NAME}`,
      description: 'Ø£Ù†Ø´Ø¦ ÙˆØ£Ø¯Ø± Ø£Ù„Ø¹Ø§Ø¨ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ù„Ø§Ø¹Ø¨ÙŠÙ† Ù„Ø·Ù„Ø§Ø¨Ùƒ.',
      keywords: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§ØªØŒ Ø§Ù„Ø£Ù„Ø¹Ø§Ø¨ Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ù„Ø§Ø¹Ø¨ÙŠÙ†ØŒ Ø§Ù„Ø£Ù„Ø¹Ø§Ø¨ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©ØŒ Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/multiplayer-quiz',
    },
  },

  // Teacher invoices
  '/teacher/invoices': {
    en: {
      title: `Invoice Management | ${PLATFORM_NAME}`,
      description: 'Manage and track all your course invoices, confirm payments, and enroll students automatically.',
      keywords: 'invoice management, payment tracking, student enrollment, course billing, payment confirmation',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/invoices',
    },
    ar: {
      title: `Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙÙˆØ§ØªÙŠØ± | ${PLATFORM_NAME}`,
      description: 'Ø£Ø¯Ø± ÙˆØªØªØ¨Ø¹ Ø¬Ù…ÙŠØ¹ ÙÙˆØ§ØªÙŠØ± Ø¯ÙˆØ±Ø§ØªÙƒØŒ Ø£ÙƒØ¯ Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø§ØªØŒ ÙˆØ³Ø¬Ù„ Ø§Ù„Ø·Ù„Ø§Ø¨ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹.',
      keywords: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙÙˆØ§ØªÙŠØ±ØŒ ØªØªØ¨Ø¹ Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø§ØªØŒ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ ÙÙˆØªØ±Ø© Ø§Ù„Ø¯ÙˆØ±Ø§ØªØŒ ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø¯ÙØ¹',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/invoices',
    },
  },

  // Invoice detail page (dynamic)
  '/invoices/dynamic': {
    en: {
      title: `Invoice Details | ${PLATFORM_NAME}`,
      description: 'View detailed information about your invoice, payment status, and enrollment details.',
      keywords: 'invoice details, payment status, enrollment information, course access, payment history',
      ogType: 'website',
      canonical: 'https://wisora.in/invoices',
    },
    ar: {
      title: `ØªÙØ§ØµÙŠÙ„ Ø§Ù„ÙØ§ØªÙˆØ±Ø© | ${PLATFORM_NAME}`,
      description: 'Ø¹Ø±Ø¶ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ù…ÙØµÙ„Ø© Ø­ÙˆÙ„ ÙØ§ØªÙˆØ±ØªÙƒ ÙˆØ­Ø§Ù„Ø© Ø§Ù„Ø¯ÙØ¹ ÙˆØªÙØ§ØµÙŠÙ„ Ø§Ù„ØªØ³Ø¬ÙŠÙ„.',
      keywords: 'ØªÙØ§ØµÙŠÙ„ Ø§Ù„ÙØ§ØªÙˆØ±Ø©ØŒ Ø­Ø§Ù„Ø© Ø§Ù„Ø¯ÙØ¹ØŒ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„ØªØ³Ø¬ÙŠÙ„ØŒ Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ù„Ø¯ÙˆØ±Ø©ØŒ Ø³Ø¬Ù„ Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø§Øª',
      ogType: 'website',
      canonical: 'https://wisora.in/invoices',
    },
  },



  // Student dashboard
  '/student/dashboard': {
    en: {
      title: `Student Dashboard | ${PLATFORM_NAME}`,
      description: 'Track your learning progress, access your courses, and manage your educational journey.',
      keywords: 'student dashboard, learning progress, course access, educational tracking',
      ogType: 'website',
      canonical: 'https://wisora.in/student/dashboard',
    },
    ar: {
      title: `Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø·Ø§Ù„Ø¨ | ${PLATFORM_NAME}`,
      description: 'ØªØªØ¨Ø¹ ØªÙ‚Ø¯Ù… ØªØ¹Ù„Ù…ÙƒØŒ ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¯ÙˆØ±Ø§ØªÙƒØŒ ÙˆØ£Ø¯Ø± Ø±Ø­Ù„ØªÙƒ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©.',
      keywords: 'Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø·Ø§Ù„Ø¨ØŒ ØªÙ‚Ø¯Ù… Ø§Ù„ØªØ¹Ù„Ù…ØŒ Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ù„Ø¯ÙˆØ±Ø§ØªØŒ Ø§Ù„ØªØªØ¨Ø¹ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/student/dashboard',
    },
  },

  // Student courses
  '/student/courses': {
    en: {
      title: `My Learning | ${PLATFORM_NAME}`,
      description: 'Access your enrolled courses and continue your learning journey.',
      keywords: 'enrolled courses, learning progress, student portal, educational access',
      ogType: 'website',
      canonical: 'https://wisora.in/student/courses',
    },
    ar: {
      title: `ØªØ¹Ù„Ù…ÙŠ | ${PLATFORM_NAME}`,
      description: 'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ù…Ø³Ø¬Ù„Ø© ÙˆØ§Ø³ØªÙ…Ø± ÙÙŠ Ø±Ø­Ù„Ø© Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.',
      keywords: 'Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ù…Ø³Ø¬Ù„Ø©ØŒ ØªÙ‚Ø¯Ù… Ø§Ù„ØªØ¹Ù„Ù…ØŒ Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø·Ø§Ù„Ø¨ØŒ Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/student/courses',
    },
  },

  // Student chapters
  '/student/chapters': {
    en: {
      title: `My Chapters | ${PLATFORM_NAME}`,
      description: 'Access your enrolled learning chapters and structured educational content.',
      keywords: 'enrolled chapters, learning chapters, structured content, student portal',
      ogType: 'website',
      canonical: 'https://wisora.in/student/chapters',
    },
    ar: {
      title: `ÙØµÙˆÙ„ÙŠ | ${PLATFORM_NAME}`,
      description: 'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ ÙØµÙˆÙ„ Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ù…Ø³Ø¬Ù„Ø© ÙˆØ§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ Ø§Ù„Ù…Ù†Ø¸Ù….',
      keywords: 'Ø§Ù„ÙØµÙˆÙ„ Ø§Ù„Ù…Ø³Ø¬Ù„Ø©ØŒ ÙØµÙˆÙ„ Ø§Ù„ØªØ¹Ù„Ù…ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ù†Ø¸Ù…ØŒ Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø·Ø§Ù„Ø¨',
      ogType: 'website',
      canonical: 'https://wisora.in/student/chapters',
    },
  },

  // Student groups
  '/student/groups': {
    en: {
      title: `My Study Groups | ${PLATFORM_NAME}`,
      description: 'Access your study groups, collaborate with peers, and enhance your learning experience.',
      keywords: 'study groups, collaboration, peer learning, student portal, educational communities',
      ogType: 'website',
      canonical: 'https://wisora.in/student/groups',
    },
    ar: {
      title: `Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ø§Ù„Ø®Ø§ØµØ© Ø¨ÙŠ | ${PLATFORM_NAME}`,
      description: 'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ø§Ù„Ø®Ø§ØµØ© Ø¨ÙƒØŒ ØªØ¹Ø§ÙˆÙ† Ù…Ø¹ Ø²Ù…Ù„Ø§Ø¦ÙƒØŒ ÙˆØ­Ø³Ù† ØªØ¬Ø±Ø¨Ø© Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.',
      keywords: 'Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø©ØŒ Ø§Ù„ØªØ¹Ø§ÙˆÙ†ØŒ Ø§Ù„ØªØ¹Ù„Ù… Ù…Ù† Ø§Ù„Ø£Ù‚Ø±Ø§Ù†ØŒ Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø·Ø§Ù„Ø¨ØŒ Ø§Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/student/groups',
    },
  },

  // Student transactions
  '/student/transactions': {
    en: {
      title: `My Invoices & Transactions | ${PLATFORM_NAME}`,
      description: 'View your purchase invoices, transaction history, wallet balance, and financial activity.',
      keywords: 'invoices, transactions, wallet balance, financial history, student portal, credits, purchase history',
      ogType: 'website',
      canonical: 'https://wisora.in/student/transactions',
    },
    ar: {
      title: `ÙÙˆØ§ØªÙŠØ±ÙŠ ÙˆÙ…Ø¹Ø§Ù…Ù„Ø§ØªÙŠ | ${PLATFORM_NAME}`,
      description: 'Ø¹Ø±Ø¶ ÙÙˆØ§ØªÙŠØ± Ø§Ù„Ø´Ø±Ø§Ø¡ ÙˆØ³Ø¬Ù„ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ ÙˆØ±ØµÙŠØ¯ Ø§Ù„Ù…Ø­ÙØ¸Ø© ÙˆØ§Ù„Ù†Ø´Ø§Ø· Ø§Ù„Ù…Ø§Ù„ÙŠ.',
      keywords: 'Ø§Ù„ÙÙˆØ§ØªÙŠØ±ØŒ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§ØªØŒ Ø±ØµÙŠØ¯ Ø§Ù„Ù…Ø­ÙØ¸Ø©ØŒ Ø§Ù„Ø³Ø¬Ù„ Ø§Ù„Ù…Ø§Ù„ÙŠØŒ Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø·Ø§Ù„Ø¨ØŒ Ø§Ù„Ø±ØµÙŠØ¯ØŒ Ø³Ø¬Ù„ Ø§Ù„Ù…Ø´ØªØ±ÙŠØ§Øª',
      ogType: 'website',
      canonical: 'https://wisora.in/student/transactions',
    },
  },

  // Chapters
  '/chapters': {
    en: {
      title: `Chapters | ${PLATFORM_NAME}`,
      description: 'Explore organized learning chapters and structured educational content.',
      keywords: 'learning chapters, structured content, educational organization, course structure',
      ogType: 'website',
      canonical: 'https://wisora.in/chapters',
    },
    ar: {
      title: `Ø§Ù„ÙØµÙˆÙ„ | ${PLATFORM_NAME}`,
      description: 'Ø§Ø³ØªÙƒØ´Ù ÙØµÙˆÙ„ Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ù…Ù†Ø¸Ù…Ø© ÙˆØ§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ Ø§Ù„Ù…Ù†Ø¸Ù….',
      keywords: 'ÙØµÙˆÙ„ Ø§Ù„ØªØ¹Ù„Ù…ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ù†Ø¸Ù…ØŒ Ø§Ù„ØªÙ†Ø¸ÙŠÙ… Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØŒ Ù‡ÙŠÙƒÙ„ Ø§Ù„Ø¯ÙˆØ±Ø©',
      ogType: 'website',
      canonical: 'https://wisora.in/chapters',
    },
  },

  // Groups
  '/groups': {
    en: {
      title: `Study Groups | ${PLATFORM_NAME}`,
      description: 'Join study groups, collaborate with peers, and enhance your learning experience.',
      keywords: 'study groups, collaboration, peer learning, group study, educational communities',
      ogType: 'website',
      canonical: 'https://wisora.in/groups',
    },
    ar: {
      title: `Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø© | ${PLATFORM_NAME}`,
      description: 'Ø§Ù†Ø¶Ù… Ø¥Ù„Ù‰ Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø©ØŒ ØªØ¹Ø§ÙˆÙ† Ù…Ø¹ Ø²Ù…Ù„Ø§Ø¦ÙƒØŒ ÙˆØ­Ø³Ù† ØªØ¬Ø±Ø¨Ø© Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.',
      keywords: 'Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ø¯Ø±Ø§Ø³Ø©ØŒ Ø§Ù„ØªØ¹Ø§ÙˆÙ†ØŒ Ø§Ù„ØªØ¹Ù„Ù… Ù…Ù† Ø§Ù„Ø£Ù‚Ø±Ø§Ù†ØŒ Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ø§Ù„Ø¬Ù…Ø§Ø¹ÙŠØ©ØŒ Ø§Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/groups',
    },
  },

  // Questions
  '/questions': {
    en: {
      title: `Q&A | ${PLATFORM_NAME}`,
      description: 'Ask questions, get answers, and engage with the learning community.',
      keywords: 'questions and answers, learning community, educational support, student help',
      ogType: 'website',
      canonical: 'https://wisora.in/questions',
    },
    ar: {
      title: `Ø§Ù„Ø£Ø³Ø¦Ù„Ø© ÙˆØ§Ù„Ø£Ø¬ÙˆØ¨Ø© | ${PLATFORM_NAME}`,
      description: 'Ø§Ø·Ø±Ø­ Ø§Ù„Ø£Ø³Ø¦Ù„Ø©ØŒ Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø§ØªØŒ ÙˆØªÙØ§Ø¹Ù„ Ù…Ø¹ Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„ØªØ¹Ù„Ù….',
      keywords: 'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© ÙˆØ§Ù„Ø¥Ø¬Ø§Ø¨Ø§ØªØŒ Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„ØªØ¹Ù„Ù…ØŒ Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØŒ Ù…Ø³Ø§Ø¹Ø¯Ø© Ø§Ù„Ø·Ù„Ø§Ø¨',
      ogType: 'website',
      canonical: 'https://wisora.in/questions',
    },
  },

  // Teachers
  '/teachers': {
    en: {
      title: `Our Teachers | ${PLATFORM_NAME}`,
      description: 'Meet our experienced educators and discover their expertise and courses.',
      keywords: 'teachers, educators, instructors, teaching expertise, educational professionals',
      ogType: 'website',
      canonical: 'https://wisora.in/teachers',
    },
    ar: {
      title: `Ù…Ø¹Ù„Ù…ÙˆÙ†Ø§ | ${PLATFORM_NAME}`,
      description: 'ØªØ¹Ø±Ù Ø¹Ù„Ù‰ Ù…Ø¹Ù„Ù…ÙŠÙ†Ø§ Ø°ÙˆÙŠ Ø§Ù„Ø®Ø¨Ø±Ø© ÙˆØ§ÙƒØªØ´Ù Ø®Ø¨Ø±Ø§ØªÙ‡Ù… ÙˆØ¯ÙˆØ±Ø§ØªÙ‡Ù….',
      keywords: 'Ø§Ù„Ù…Ø¹Ù„Ù…ÙˆÙ†ØŒ Ø§Ù„Ù…Ø±Ø¨ÙˆÙ†ØŒ Ø§Ù„Ù…Ø¯Ø±Ø¨ÙˆÙ†ØŒ Ø®Ø¨Ø±Ø© Ø§Ù„ØªØ¯Ø±ÙŠØ³ØŒ Ø§Ù„Ù…ØªØ®ØµØµÙˆÙ† Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠÙˆÙ†',
      ogType: 'website',
      canonical: 'https://wisora.in/teachers',
    },
  },

  // Settings
  '/dashboard/settings': {
    en: {
      title: `Settings | ${PLATFORM_NAME}`,
      description: 'Customize your account settings and preferences.',
      keywords: 'account settings, preferences, user configuration, platform settings',
      ogType: 'website',
      canonical: 'https://wisora.in/dashboard/settings',
    },
    ar: {
      title: `Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª | ${PLATFORM_NAME}`,
      description: 'Ø®ØµØµ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø­Ø³Ø§Ø¨Ùƒ ÙˆØªÙØ¶ÙŠÙ„Ø§ØªÙƒ.',
      keywords: 'Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø­Ø³Ø§Ø¨ØŒ Ø§Ù„ØªÙØ¶ÙŠÙ„Ø§ØªØŒ ØªÙƒÙˆÙŠÙ† Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ØŒ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…Ù†ØµØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/dashboard/settings',
    },
  },

  // Redeem
  '/redeem': {
    en: {
      title: `Redeem Code | ${PLATFORM_NAME}`,
      description: 'Redeem your access code to unlock premium content and features.',
      keywords: 'redeem code, access code, premium content, unlock features',
      ogType: 'website',
      canonical: 'https://wisora.in/redeem',
    },
    ar: {
      title: `Ø§Ø³ØªØ¨Ø¯Ø§Ù„ Ø§Ù„ÙƒÙˆØ¯ | ${PLATFORM_NAME}`,
      description: 'Ø§Ø³ØªØ¨Ø¯Ù„ ÙƒÙˆØ¯ Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ Ù„ÙØªØ­ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ù…ÙŠØ² ÙˆØ§Ù„Ù…ÙŠØ²Ø§Øª.',
      keywords: 'Ø§Ø³ØªØ¨Ø¯Ø§Ù„ Ø§Ù„ÙƒÙˆØ¯ØŒ ÙƒÙˆØ¯ Ø§Ù„ÙˆØµÙˆÙ„ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ù…ÙŠØ²ØŒ ÙØªØ­ Ø§Ù„Ù…ÙŠØ²Ø§Øª',
      ogType: 'website',
      canonical: 'https://wisora.in/redeem',
    },
  },

  // Multiplayer Quiz
  '/multiplayer-quiz': {
    en: {
      title: `Multiplayer Quiz | ${PLATFORM_NAME}`,
      description: 'Challenge your friends in real-time multiplayer quizzes and test your knowledge.',
      keywords: 'multiplayer quiz, real-time gaming, knowledge testing, educational games',
      ogType: 'website',
      canonical: 'https://wisora.in/multiplayer-quiz',
    },
    ar: {
      title: `Ø§Ø®ØªØ¨Ø§Ø± Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„Ù„Ø§Ø¹Ø¨ÙŠÙ† | ${PLATFORM_NAME}`,
      description: 'ØªØ­Ø¯Ù‰ Ø£ØµØ¯Ù‚Ø§Ø¦Ùƒ ÙÙŠ Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ù„Ø§Ø¹Ø¨ÙŠÙ† ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ ÙˆØ§Ø®ØªØ¨Ø± Ù…Ø¹Ø±ÙØªÙƒ.',
      keywords: 'Ø§Ø®ØªØ¨Ø§Ø± Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„Ù„Ø§Ø¹Ø¨ÙŠÙ†ØŒ Ø£Ù„Ø¹Ø§Ø¨ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠØŒ Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ù…Ø¹Ø±ÙØ©ØŒ Ø§Ù„Ø£Ù„Ø¹Ø§Ø¨ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/multiplayer-quiz',
    },
  },

  // Store
  '/student/store': {
    en: {
      title: `Learning Store | ${PLATFORM_NAME}`,
      description: 'Discover premium courses, tools, and resources to enhance your learning.',
      keywords: 'learning store, premium courses, educational resources, learning tools',
      ogType: 'website',
      canonical: 'https://wisora.in/student/store',
    },
    ar: {
      title: `Ù…ØªØ¬Ø± Ø§Ù„ØªØ¹Ù„Ù… | ${PLATFORM_NAME}`,
      description: 'Ø§ÙƒØªØ´Ù Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ù…Ù…ÙŠØ²Ø© ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ù…ÙˆØ§Ø±Ø¯ Ù„ØªØ¹Ø²ÙŠØ² ØªØ¹Ù„Ù…Ùƒ.',
      keywords: 'Ù…ØªØ¬Ø± Ø§Ù„ØªØ¹Ù„Ù…ØŒ Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ù…Ù…ÙŠØ²Ø©ØŒ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©ØŒ Ø£Ø¯ÙˆØ§Øª Ø§Ù„ØªØ¹Ù„Ù…',
      ogType: 'website',
      canonical: 'https://wisora.in/student/store',
    },
  },

  // Course View (dynamic route)
  '/courses/dynamic': {
    en: {
      title: `Course Details | ${PLATFORM_NAME}`,
      description: 'Explore course content, lessons, and learning materials.',
      keywords: 'course details, course content, lessons, learning materials, educational content',
      ogType: 'website',
      canonical: 'https://wisora.in/courses',
    },
    ar: {
      title: `ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø¯ÙˆØ±Ø© | ${PLATFORM_NAME}`,
      description: 'Ø§Ø³ØªÙƒØ´Ù Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¯ÙˆØ±Ø© ÙˆØ§Ù„Ø¯Ø±ÙˆØ³ ÙˆØ§Ù„Ù…ÙˆØ§Ø¯ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©.',
      keywords: 'ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø¯ÙˆØ±Ø©ØŒ Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¯ÙˆØ±Ø©ØŒ Ø§Ù„Ø¯Ø±ÙˆØ³ØŒ Ø§Ù„Ù…ÙˆØ§Ø¯ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/courses',
    },
  },

  // Course Progress (dynamic route)
  '/courses/progress': {
    en: {
      title: `Course Progress | ${PLATFORM_NAME}`,
      description: 'Track your learning progress and continue your educational journey.',
      keywords: 'course progress, learning progress, educational tracking, student progress',
      ogType: 'website',
      canonical: 'https://wisora.in/courses',
    },
    ar: {
      title: `ØªÙ‚Ø¯Ù… Ø§Ù„Ø¯ÙˆØ±Ø© | ${PLATFORM_NAME}`,
      description: 'ØªØªØ¨Ø¹ ØªÙ‚Ø¯Ù… ØªØ¹Ù„Ù…Ùƒ ÙˆØ§Ø³ØªÙ…Ø± ÙÙŠ Ø±Ø­Ù„ØªÙƒ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©.',
      keywords: 'ØªÙ‚Ø¯Ù… Ø§Ù„Ø¯ÙˆØ±Ø©ØŒ ØªÙ‚Ø¯Ù… Ø§Ù„ØªØ¹Ù„Ù…ØŒ Ø§Ù„ØªØªØ¨Ø¹ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØŒ ØªÙ‚Ø¯Ù… Ø§Ù„Ø·Ø§Ù„Ø¨',
      ogType: 'website',
      canonical: 'https://wisora.in/courses',
    },
  },

  // Student Notifications
  '/student/notifications': {
    en: {
      title: `My Notifications | ${PLATFORM_NAME}`,
      description: 'Stay updated with your learning notifications and important updates.',
      keywords: 'notifications, learning updates, student alerts, educational notifications',
      ogType: 'website',
      canonical: 'https://wisora.in/student/notifications',
    },
    ar: {
      title: `Ø¥Ø´Ø¹Ø§Ø±Ø§ØªÙŠ | ${PLATFORM_NAME}`,
      description: 'Ø§Ø¨Ù‚ Ø¹Ù„Ù‰ Ø§Ø·Ù„Ø§Ø¹ Ø¨Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø§Ù„ØªØ¹Ù„Ù… ÙˆØ§Ù„ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ù…Ù‡Ù…Ø©.',
      keywords: 'Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§ØªØŒ ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„ØªØ¹Ù„Ù…ØŒ ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ø§Ù„Ø·Ø§Ù„Ø¨ØŒ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©',
      ogType: 'website',
      canonical: 'https://wisora.in/student/notifications',
    },
  },





  // Teacher Profile (dynamic route)
  '/teachers/dynamic': {
    en: {
      title: `Teacher Profile | ${PLATFORM_NAME}`,
      description: 'Learn more about this expert teacher and explore their courses and expertise.',
      keywords: 'teacher profile, instructor bio, teacher courses, educator background',
      ogType: 'profile',
      canonical: 'https://wisora.in/teachers',
    },
    ar: {
      title: `Ù…Ù„Ù Ø§Ù„Ù…Ø¹Ù„Ù… | ${PLATFORM_NAME}`,
      description: 'ØªØ¹Ø±Ù Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø²ÙŠØ¯ Ø­ÙˆÙ„ Ù‡Ø°Ø§ Ø§Ù„Ù…Ø¹Ù„Ù… Ø§Ù„Ø®Ø¨ÙŠØ± ÙˆØ§Ø³ØªÙƒØ´Ù Ø¯ÙˆØ±Ø§ØªÙ‡ ÙˆØ®Ø¨Ø±Ø§ØªÙ‡.',
      keywords: 'Ù…Ù„Ù Ø§Ù„Ù…Ø¹Ù„Ù…ØŒ Ø³ÙŠØ±Ø© Ø§Ù„Ù…Ø¯Ø±Ø¨ØŒ Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ù…Ø¹Ù„Ù…ØŒ Ø®Ù„ÙÙŠØ© Ø§Ù„Ù…Ø±Ø¨ÙŠ',
      ogType: 'profile',
      canonical: 'https://wisora.in/teachers',
    },
  },

  // Teacher Course Detail (dynamic route)
  '/teacher/courses/dynamic': {
    en: {
      title: `Course Management | ${PLATFORM_NAME}`,
      description: 'Manage your course content, lessons, quizzes, and student enrollments.',
      keywords: 'course management, lesson management, quiz management, student enrollments, course content',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/courses',
    },
    ar: {
      title: `Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø© | ${PLATFORM_NAME}`,
      description: 'Ø£Ø¯Ø± Ù…Ø­ØªÙˆÙ‰ Ø¯ÙˆØ±ØªÙƒ ÙˆØ§Ù„Ø¯Ø±ÙˆØ³ ÙˆØ§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª ÙˆØªØ³Ø¬ÙŠÙ„Ø§Øª Ø§Ù„Ø·Ù„Ø§Ø¨.',
      keywords: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø©ØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯Ø±ÙˆØ³ØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§ØªØŒ ØªØ³Ø¬ÙŠÙ„Ø§Øª Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¯ÙˆØ±Ø©',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/courses',
    },
  },

  // Teacher Course Management (dynamic route)
  '/teacher/courses/manage/dynamic': {
    en: {
      title: `Course Management | ${PLATFORM_NAME}`,
      description: 'Comprehensive course management tools for lessons, quizzes, and student progress.',
      keywords: 'course management, lesson editor, quiz editor, student progress, course administration',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/courses',
    },
    ar: {
      title: `Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø© | ${PLATFORM_NAME}`,
      description: 'Ø£Ø¯ÙˆØ§Øª Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„Ø´Ø§Ù…Ù„Ø© Ù„Ù„Ø¯Ø±ÙˆØ³ ÙˆØ§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª ÙˆØªÙ‚Ø¯Ù… Ø§Ù„Ø·Ù„Ø§Ø¨.',
      keywords: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø©ØŒ Ù…Ø­Ø±Ø± Ø§Ù„Ø¯Ø±ÙˆØ³ØŒ Ù…Ø­Ø±Ø± Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§ØªØŒ ØªÙ‚Ø¯Ù… Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¯ÙˆØ±Ø©',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/courses',
    },
  },

  // Teacher Chapter Management (dynamic route)
  '/teacher/chapters/dynamic': {
    en: {
      title: `Chapter Management | ${PLATFORM_NAME}`,
      description: 'Organize and manage your learning chapters with comprehensive tools.',
      keywords: 'chapter management, learning organization, educational structure, course chapters',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/chapters',
    },
    ar: {
      title: `Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙØµÙˆÙ„ | ${PLATFORM_NAME}`,
      description: 'Ù†Ø¸Ù… ÙˆØ£Ø¯Ø± ÙØµÙˆÙ„ Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ Ø¨Ø£Ø¯ÙˆØ§Øª Ø´Ø§Ù…Ù„Ø©.',
      keywords: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙØµÙˆÙ„ØŒ ØªÙ†Ø¸ÙŠÙ… Ø§Ù„ØªØ¹Ù„Ù…ØŒ Ø§Ù„Ù‡ÙŠÙƒÙ„ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØŒ ÙØµÙˆÙ„ Ø§Ù„Ø¯ÙˆØ±Ø§Øª',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/chapters',
    },
  },

  // Teacher Student Detail (dynamic route)
  '/teacher/students/dynamic': {
    en: {
      title: `Student Profile | ${PLATFORM_NAME}`,
      description: 'View detailed student information, progress, and performance analytics.',
      keywords: 'student profile, student progress, performance analytics, student management, educational tracking',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/students',
    },
    ar: {
      title: `Ù…Ù„Ù Ø§Ù„Ø·Ø§Ù„Ø¨ | ${PLATFORM_NAME}`,
      description: 'Ø¹Ø±Ø¶ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø·Ø§Ù„Ø¨ Ø§Ù„ØªÙØµÙŠÙ„ÙŠØ© ÙˆØ§Ù„ØªÙ‚Ø¯Ù… ÙˆØªØ­Ù„ÙŠÙ„Ø§Øª Ø§Ù„Ø£Ø¯Ø§Ø¡.',
      keywords: 'Ù…Ù„Ù Ø§Ù„Ø·Ø§Ù„Ø¨ØŒ ØªÙ‚Ø¯Ù… Ø§Ù„Ø·Ø§Ù„Ø¨ØŒ ØªØ­Ù„ÙŠÙ„Ø§Øª Ø§Ù„Ø£Ø¯Ø§Ø¡ØŒ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ Ø§Ù„ØªØªØ¨Ø¹ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/teacher/students',
    },
  },



  // Group Detail (dynamic route)
  '/groups/dynamic': {
    en: {
      title: `Study Group | ${PLATFORM_NAME}`,
      description: 'Join this study group to collaborate with peers and enhance your learning experience.',
      keywords: 'study group, group learning, peer collaboration, educational community',
      ogType: 'website',
      canonical: 'https://wisora.in/groups',
    },
    ar: {
      title: `Ù…Ø¬Ù…ÙˆØ¹Ø© Ø§Ù„Ø¯Ø±Ø§Ø³Ø© | ${PLATFORM_NAME}`,
      description: 'Ø§Ù†Ø¶Ù… Ø¥Ù„Ù‰ Ù…Ø¬Ù…ÙˆØ¹Ø© Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ù‡Ø°Ù‡ Ù„Ù„ØªØ¹Ø§ÙˆÙ† Ù…Ø¹ Ø§Ù„Ø£Ù‚Ø±Ø§Ù† ÙˆØªØ¹Ø²ÙŠØ² ØªØ¬Ø±Ø¨Ø© Ø§Ù„ØªØ¹Ù„Ù….',
      keywords: 'Ù…Ø¬Ù…ÙˆØ¹Ø© Ø§Ù„Ø¯Ø±Ø§Ø³Ø©ØŒ Ø§Ù„ØªØ¹Ù„Ù… Ø§Ù„Ø¬Ù…Ø§Ø¹ÙŠØŒ Ø§Ù„ØªØ¹Ø§ÙˆÙ† Ø¨ÙŠÙ† Ø§Ù„Ø£Ù‚Ø±Ø§Ù†ØŒ Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠ',
      ogType: 'website',
      canonical: 'https://wisora.in/groups',
    },
  },

  // Auth Callback
  '/auth/callback': {
    en: {
      title: `Authentication | ${PLATFORM_NAME}`,
      description: 'Processing your authentication request. Please wait while we complete your login.',
      keywords: 'authentication, login processing, auth callback, user verification',
      ogType: 'website',
      canonical: 'https://wisora.in/auth/callback',
    },
    ar: {
      title: `Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø© | ${PLATFORM_NAME}`,
      description: 'Ù…Ø¹Ø§Ù„Ø¬Ø© Ø·Ù„Ø¨ Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø© Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± Ø¨ÙŠÙ†Ù…Ø§ Ù†ÙƒÙ…Ù„ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„.',
      keywords: 'Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø©ØŒ Ù…Ø¹Ø§Ù„Ø¬Ø© ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ØŒ Ø§Ø³ØªØ¯Ø¹Ø§Ø¡ Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø©ØŒ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…',
      ogType: 'website',
      canonical: 'https://wisora.in/auth/callback',
    },
  },

  // Codes Redirect
  '/codes': {
    en: {
      title: `Access Codes | ${PLATFORM_NAME}`,
      description: 'Redirecting to code redemption page. Enter your access code to unlock premium content.',
      keywords: 'access codes, code redemption, premium content, unlock features',
      ogType: 'website',
      canonical: 'https://wisora.in/codes',
    },
    ar: {
      title: `Ø±Ù…ÙˆØ² Ø§Ù„ÙˆØµÙˆÙ„ | ${PLATFORM_NAME}`,
      description: 'Ø¥Ø¹Ø§Ø¯Ø© ØªÙˆØ¬ÙŠÙ‡ Ø¥Ù„Ù‰ ØµÙØ­Ø© Ø§Ø³ØªØ¨Ø¯Ø§Ù„ Ø§Ù„ÙƒÙˆØ¯. Ø£Ø¯Ø®Ù„ Ø±Ù…Ø² Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ Ù„ÙØªØ­ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ù…ÙŠØ².',
      keywords: 'Ø±Ù…ÙˆØ² Ø§Ù„ÙˆØµÙˆÙ„ØŒ Ø§Ø³ØªØ¨Ø¯Ø§Ù„ Ø§Ù„ÙƒÙˆØ¯ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ù…Ù…ÙŠØ²ØŒ ÙØªØ­ Ø§Ù„Ù…ÙŠØ²Ø§Øª',
      ogType: 'website',
      canonical: 'https://wisora.in/codes',
    },
  },

  // Unauthorized
  '/unauthorized': {
    en: {
      title: `Access Denied | ${PLATFORM_NAME}`,
      description: 'You do not have permission to access this resource. Please contact an administrator for assistance.',
      keywords: 'access denied, unauthorized, permission error, access control',
      ogType: 'website',
      canonical: 'https://wisora.in/unauthorized',
    },
    ar: {
      title: `Ø§Ù„ÙˆØµÙˆÙ„ Ù…Ø±ÙÙˆØ¶ | ${PLATFORM_NAME}`,
      description: 'Ù„ÙŠØ³ Ù„Ø¯ÙŠÙƒ Ø¥Ø°Ù† Ù„Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ±Ø¯. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø©.',
      keywords: 'Ø§Ù„ÙˆØµÙˆÙ„ Ù…Ø±ÙÙˆØ¶ØŒ ØºÙŠØ± Ù…ØµØ±Ø­ØŒ Ø®Ø·Ø£ ÙÙŠ Ø§Ù„Ø¥Ø°Ù†ØŒ Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„ÙˆØµÙˆÙ„',
      ogType: 'website',
      canonical: 'https://wisora.in/unauthorized',
    },
  },

  // Not Found
  '*': {
    en: {
      title: `Page Not Found | ${PLATFORM_NAME}`,
      description: 'The page you are looking for could not be found.',
      keywords: '404, page not found, error page',
      ogType: 'website',
      canonical: 'https://wisora.in/404',
    },
    ar: {
      title: `Ø§Ù„ØµÙØ­Ø© ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ø© | ${PLATFORM_NAME}`,
      description: 'Ø§Ù„ØµÙØ­Ø© Ø§Ù„ØªÙŠ ØªØ¨Ø­Ø« Ø¹Ù†Ù‡Ø§ ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ø©.',
      keywords: '404ØŒ ØµÙØ­Ø© ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ø©ØŒ ØµÙØ­Ø© Ø®Ø·Ø£',
      ogType: 'website',
      canonical: 'https://wisora.in/404',
    },
  },
};

// Function to get SEO metadata for a specific route and language
export const getSEOMetadata = (
  route: string,
  language: Language,
  tenantName?: string
): SEOMetadata => {
  // Find the best matching route
  let config = BASE_SEO_CONFIG[route];
  
  if (!config) {
    // Handle dynamic routes with parameters
    if (route.startsWith('/courses/') && route.includes('/progress')) {
      // Course progress route
      config = BASE_SEO_CONFIG['/courses/progress'];
    } else if (route.startsWith('/courses/') && route.split('/').length === 3) {
      // Course detail route (e.g., /courses/123)
      config = BASE_SEO_CONFIG['/courses/dynamic'];
    } else if (route.startsWith('/chapters/') && route.split('/').length === 3) {
      // Chapter detail route (e.g., /chapters/123)
      config = BASE_SEO_CONFIG['/chapters'];
    } else if (route.startsWith('/teachers/') && route.split('/').length === 3) {
      // Teacher profile route (e.g., /teachers/john-doe)
      config = BASE_SEO_CONFIG['/teachers/dynamic'];
    } else if (route.startsWith('/groups/') && route.split('/').length === 3) {
      // Group detail route (e.g., /groups/123)
      config = BASE_SEO_CONFIG['/groups/dynamic'];
    } else if (route.startsWith('/teacher/courses/') && route.split('/').length === 3) {
      // Teacher course detail route (e.g., /teacher/courses/123)
      config = BASE_SEO_CONFIG['/teacher/courses/dynamic'];
    } else if (route.startsWith('/teacher/courses/') && route.includes('/manage') && route.split('/').length >= 4) {
      // Teacher course management route (e.g., /teacher/courses/123/manage, /teacher/courses/123/manage/lessons)
      config = BASE_SEO_CONFIG['/teacher/courses/manage/dynamic'];
    } else if (route.startsWith('/teacher/chapters/') && route.split('/').length === 3) {
      // Teacher chapter management route (e.g., /teacher/chapters/123)
      config = BASE_SEO_CONFIG['/teacher/chapters/dynamic'];
    } else if (route.startsWith('/teacher/groups/') && route.split('/').length === 3) {
      // Teacher group management route (e.g., /teacher/groups/123)
      config = BASE_SEO_CONFIG['/teacher/groups/dynamic'];
    } else if (route.startsWith('/teacher/students/') && route.split('/').length === 3) {
      // Teacher student detail route (e.g., /teacher/students/123)
      config = BASE_SEO_CONFIG['/teacher/students/dynamic'];
    } else if (route.startsWith('/invoices/') && route.split('/').length === 3) {
      // Invoice detail route (e.g., /invoices/123)
      config = BASE_SEO_CONFIG['/invoices/dynamic'];
    } else {
      // Try to find a partial match (e.g., /courses/123 -> /courses)
      const baseRoute = '/' + route.split('/')[1];
      config = BASE_SEO_CONFIG[baseRoute];
    }
  }
  
  if (!config) {
    // Fallback to 404
    config = BASE_SEO_CONFIG['*'];
  }

  const baseMetadata = config[language];
  
  // If we have a tenant name, customize the title and other metadata
  if (tenantName) {
    const tenantTitle = baseMetadata.title.replace(PLATFORM_NAME, tenantName);
    const tenantOgTitle = baseMetadata.ogTitle ? baseMetadata.ogTitle.replace(PLATFORM_NAME, tenantName) : tenantTitle;
    const tenantTwitterTitle = baseMetadata.twitterTitle ? baseMetadata.twitterTitle.replace(PLATFORM_NAME, tenantName) : tenantTitle;
    
    return {
      ...baseMetadata,
      title: tenantTitle,
      ogTitle: tenantOgTitle,
      twitterTitle: tenantTwitterTitle,
      // Also update description to include tenant context when appropriate
      description: baseMetadata.description.replace(PLATFORM_NAME, tenantName),
      ogDescription: baseMetadata.ogDescription ? baseMetadata.ogDescription.replace(PLATFORM_NAME, tenantName) : undefined,
      twitterDescription: baseMetadata.twitterDescription ? baseMetadata.twitterDescription.replace(PLATFORM_NAME, tenantName) : undefined,
    };
  }
  
  return baseMetadata;
};

// Function to get dynamic SEO metadata for specific content
export const getDynamicSEOMetadata = (
  baseRoute: string,
  language: Language,
  contentTitle: string,
  contentDescription: string,
  tenantName?: string
): SEOMetadata => {
  // Handle specific routes for better SEO
  let baseConfig;
  
  if (baseRoute === '/courses') {
    // For course-related pages
    baseConfig = BASE_SEO_CONFIG['/courses/dynamic'];
  } else if (baseRoute === '/chapters') {
    // For chapter-related pages
    baseConfig = BASE_SEO_CONFIG['/chapters'];
  } else if (baseRoute === '/teachers') {
    // For teacher profile pages
    baseConfig = BASE_SEO_CONFIG['/teachers/dynamic'];
  } else if (baseRoute === '/groups') {
    // For group detail pages
    baseConfig = BASE_SEO_CONFIG['/groups/dynamic'];
  } else if (baseRoute === '/teacher/courses') {
    // For teacher course pages
    baseConfig = BASE_SEO_CONFIG['/teacher/courses/dynamic'];
  } else if (baseRoute === '/teacher/chapters') {
    // For teacher chapter pages
    baseConfig = BASE_SEO_CONFIG['/teacher/chapters/dynamic'];
  } else if (baseRoute === '/teacher/groups') {
    // For teacher group pages
    baseConfig = BASE_SEO_CONFIG['/teacher/groups/dynamic'];
  } else if (baseRoute === '/teacher/students') {
    // For teacher student pages
    baseConfig = BASE_SEO_CONFIG['/teacher/students/dynamic'];
  } else if (baseRoute === '/invoices') {
    // For invoice detail pages
    baseConfig = BASE_SEO_CONFIG['/invoices/dynamic'];
  } else {
    // Fallback to the provided base route
    baseConfig = BASE_SEO_CONFIG[baseRoute];
  }
  
  if (!baseConfig) {
    return getSEOMetadata('*', language, tenantName);
  }

  const baseMetadata = baseConfig[language];
  const platformName = tenantName || PLATFORM_NAME;
  
  return {
    title: `${contentTitle} | ${platformName}`,
    description: contentDescription,
    keywords: baseMetadata.keywords,
    ogTitle: `${contentTitle} | ${platformName}`,
    ogDescription: contentDescription,
    ogImage: baseMetadata.ogImage,
    ogType: baseMetadata.ogType,
    twitterTitle: `${contentTitle} | ${platformName}`,
    twitterDescription: contentDescription,
    twitterImage: baseMetadata.twitterImage,
    canonical: baseMetadata.canonical,
  };
};


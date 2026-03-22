import { z } from 'zod';

// ============================================================================
// STUDENT DOMAIN SCHEMAS
// ============================================================================

// Base schemas for common entities
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(2).max(100),
  email: z.string().email(),
  avatar_url: z.string().url().optional().nullable(),
  role: z.enum(['student', 'teacher', 'admin']),
  wallet: z.number().int().min(0).default(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

export const TeacherSchema = z.object({
  user_id: z.string().uuid(),
  display_name: z.string().min(2).max(100),
  profile_image_url: z.string().url().optional().nullable(),
  cover_image_url: z.string().url().optional().nullable(),
  specialization: z.string().optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
  is_active: z.boolean().default(true),
  social_links: z.record(z.string()).optional().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

// Course-related schemas
export const CourseSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional().nullable(),
  price: z.number().optional(),
  cover_image_url: z.string().optional().nullable(),
  enrollment_code: z.string().optional().nullable(),
  instructor_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const CourseWithInstructorSchema = CourseSchema.extend({
  profiles: z.object({
    full_name: z.string().optional(),
  }).optional(),
  instructor_name: z.string().optional(),
  avatar_url: z.string().optional().nullable(),
});

// Enrollment schemas
export const EnrollmentSchema = z.object({
  id: z.string().optional(),
  student_id: z.string().optional(),
  course_id: z.string().optional(),
  enrolled_at: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const EnrolledCourseSchema = z.object({
  id: z.string().optional(),
  student_id: z.string().optional(),
  course_id: z.string().optional(),
  enrolled_at: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  course: z.any().optional(),
  progress: z.number().default(0),
  totalLessons: z.number().default(0),
  completedLessons: z.number().default(0),
  enrollment_count: z.number().default(0),
});

// Chapter schemas
export const ChapterSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  cover_image_url: z.string().optional().nullable(),
  instructor_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const ChapterEnrollmentSchema = z.object({
  id: z.string().optional(),
  student_id: z.string().optional(),
  chapter_id: z.string().optional(),
  enrolled_at: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const EnrolledChapterSchema = z.object({
  id: z.string().optional(),
  student_id: z.string().optional(),
  chapter_id: z.string().optional(),
  enrolled_at: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  chapter: z.any().optional(),
  totalCourses: z.number().default(0),
  enrolledCourses: z.number().default(0),
  chapterCourses: z.array(z.any()).default([]),
});

// Group schemas
export const GroupSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional().nullable(),
  is_public: z.boolean().optional(),
  created_by: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  member_count: z.number().default(0),
});

export const GroupMemberSchema = z.object({
  id: z.string().optional(),
  group_id: z.string().optional(),
  student_id: z.string().optional(),
  joined_at: z.string().optional(),
  created_at: z.string().optional(),
});

// Transaction schemas
export const WalletTransactionSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  amount: z.number().default(0),
  transaction_type: z.string().optional(),
  description: z.string().optional().nullable(),
  course_id: z.string().optional().nullable(),
  created_at: z.string().optional(),
});

// Dashboard schemas
export const StudentStatsSchema = z.object({
  totalCourses: z.number().int().min(0).default(0),
  completedCourses: z.number().int().min(0).default(0),
  inProgressCourses: z.number().int().min(0).default(0),
  totalCreditsSpent: z.number().int().min(0).default(0),
  studyStreak: z.number().int().min(0).default(0),
  avgQuizScore: z.number().min(0).max(1).default(0),
  totalStudyTime: z.number().int().min(0).default(0),
});

export const StudentDashboardDataSchema = z.object({
  enrolledCourses: z.array(EnrolledCourseSchema),
  stats: StudentStatsSchema,
});

// Quiz schemas
export const QuizAttemptSchema = z.object({
  id: z.string().uuid(),
  student_id: z.string().uuid(),
  quiz_id: z.string().uuid(),
  score: z.number().int().min(0).optional().nullable(),
  max_score: z.number().int().min(0).optional().nullable(),
  submitted_at: z.string().datetime().optional().nullable(),
  created_at: z.string().datetime(),
});

// Multiplayer quiz schemas
export const MultiplayerQuizQuestionSchema = z.object({
  id: z.string().uuid(),
  question: z.string().min(10).max(500),
  options: z.array(z.string().min(1).max(200)),
  correct_answer: z.string().min(1).max(200),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  time_limit: z.number().int().min(5).max(300).default(15),
  category: z.string().min(2).max(50).default('General'),
  instructor_id: z.string().uuid(),
  created_at: z.string().datetime(),
});

// Lesson progress schemas
export const LessonProgressSchema = z.object({
  id: z.string().uuid(),
  student_id: z.string().uuid(),
  lesson_id: z.string().uuid(),
  completed_at: z.string().datetime().optional().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

// Tenant schemas
export const TenantSchema = z.object({
  slug: z.string().min(2).max(50),
  teacher: TeacherSchema.optional().nullable(),
});

// ============================================================================
// INPUT VALIDATION SCHEMAS
// ============================================================================

export const StudentEnrollmentInputSchema = z.object({
  course_id: z.string().uuid(),
  enrollment_code: z.string().min(3).max(20).optional(),
});

export const StudentChapterEnrollmentInputSchema = z.object({
  chapter_id: z.string().uuid(),
});

export const GroupJoinInputSchema = z.object({
  group_id: z.string().uuid(),
  join_code: z.string().min(3).max(20).optional(),
});

export const WalletTransactionInputSchema = z.object({
  amount: z.number().int().min(1).max(10000),
  transaction_type: z.enum(['credit', 'debit', 'course_purchase', 'refund']),
  description: z.string().min(5).max(200).optional(),
  course_id: z.string().uuid().optional(),
});

// ============================================================================
// API RESPONSE SCHEMAS
// ============================================================================

export const StudentCoursesResponseSchema = z.object({
  data: z.array(EnrolledCourseSchema),
  error: z.string().optional().nullable(),
  count: z.number().int().min(0).optional(),
});

export const StudentGroupsResponseSchema = z.object({
  groups: z.array(z.any()).optional().default([]),
  memberGroupIds: z.array(z.string()).optional().default([]),
});

export const StudentTransactionsResponseSchema = z.object({
  transactions: z.array(z.any()).optional().default([]),
  wallet: z.number().default(0),
});

export const StudentDashboardResponseSchema = z.object({
  enrolledCourses: z.array(z.any()).optional().default([]),
  stats: z.any().optional().default({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalCreditsSpent: 0,
    studyStreak: 0,
    avgQuizScore: 0,
    totalStudyTime: 0
  }),
});


export const LessonSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional().nullable(),
  chapter_id: z.string().optional(),
  course_id: z.string().optional(),
  order_index: z.number().optional(),
  video_url: z.string().optional().nullable(),
  view_limit: z.number().optional().nullable(),
  device_limit: z.number().optional().nullable(),
  duration_minutes: z.number().optional().nullable(),
});

export const QuizSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
  time_limit: z.number().optional().nullable(),
  max_attempts: z.number().optional().nullable(),
  created_at: z.string().optional(),
});

export const AttachmentSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  file_url: z.string().optional(),
  file_type: z.string().optional(),
  file_size: z.number().optional(),
  course_id: z.string().optional(),
  lesson_id: z.string().optional(),
  created_at: z.string().optional(),
});



export const CourseDetailSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  instructor_id: z.string().optional(),
  enrollment_code: z.string().optional(),
  cover_image_url: z.string().optional().nullable(),
  price: z.number().optional(),
  created_at: z.string().optional(),
  profiles: z.object({
    full_name: z.string().optional(),
  }).optional(),
  instructor_name: z.string().optional(),
  enrollment_count: z.number().default(0),
  is_enrolled: z.boolean().default(false),
  avatar_url: z.string().optional().nullable(),
  chapters: z.array(ChapterSchema).optional().default([]),
});

// Response schemas
export const AvailableCoursesResponseSchema = z.object({
  courses: z.array(CourseWithInstructorSchema).optional().default([]),
});

export const CourseDetailResponseSchema = z.object({
  course: CourseDetailSchema.optional(),
});

export const CourseProgressResponseSchema = z.object({
  course: CourseDetailSchema.optional(),
  progress: z.number().default(0),
  completedLessons: z.number().default(0),
  totalLessons: z.number().default(0),
});

// Export the response types
export type AvailableCoursesResponse = z.infer<typeof AvailableCoursesResponseSchema>;
export type CourseDetailResponse = z.infer<typeof CourseDetailResponseSchema>;
export type CourseProgressResponse = z.infer<typeof CourseProgressResponseSchema>;

// ============================================================================
// QUERY PARAMETER SCHEMAS
// ============================================================================

export const StudentQueryParamsSchema = z.object({
  user_id: z.string().uuid(),
  teacher_id: z.string().uuid().optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
  order_by: z.string().default('created_at'),
  order_direction: z.enum(['asc', 'desc']).default('desc'),
});

export const StudentFilterSchema = z.object({
  course_id: z.string().uuid().optional(),
  chapter_id: z.string().uuid().optional(),
  group_id: z.string().uuid().optional(),
  transaction_type: z.enum(['credit', 'debit', 'course_purchase', 'refund']).optional(),
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type User = z.infer<typeof UserSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Teacher = z.infer<typeof TeacherSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type CourseWithInstructor = z.infer<typeof CourseWithInstructorSchema>;
export type Enrollment = z.infer<typeof EnrollmentSchema>;
export type EnrolledCourse = z.infer<typeof EnrolledCourseSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type ChapterEnrollment = z.infer<typeof ChapterEnrollmentSchema>;
export type EnrolledChapter = z.infer<typeof EnrolledChapterSchema>;
export type Group = z.infer<typeof GroupSchema>;
export type GroupMember = z.infer<typeof GroupMemberSchema>;
export type WalletTransaction = z.infer<typeof WalletTransactionSchema>;
export type StudentStats = z.infer<typeof StudentStatsSchema>;
export type StudentDashboardData = z.infer<typeof StudentDashboardDataSchema>;
export type QuizAttempt = z.infer<typeof QuizAttemptSchema>;
export type MultiplayerQuizQuestion = z.infer<typeof MultiplayerQuizQuestionSchema>;
export type LessonProgress = z.infer<typeof LessonProgressSchema>;
export type Tenant = z.infer<typeof TenantSchema>;

// Input types
export type StudentEnrollmentInput = z.infer<typeof StudentEnrollmentInputSchema>;
export type StudentChapterEnrollmentInput = z.infer<typeof StudentChapterEnrollmentInputSchema>;
export type GroupJoinInput = z.infer<typeof GroupJoinInputSchema>;
export type WalletTransactionInput = z.infer<typeof WalletTransactionInputSchema>;

// Response types
export type StudentCoursesResponse = z.infer<typeof StudentCoursesResponseSchema>;
export type StudentGroupsResponse = z.infer<typeof StudentGroupsResponseSchema>;
export type StudentTransactionsResponse = z.infer<typeof StudentTransactionsResponseSchema>;
export type StudentDashboardResponse = z.infer<typeof StudentDashboardResponseSchema>;

// Additional schemas
export const NotificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string(),
  message: z.string(),
  type: z.string(),
  read_at: z.string().nullable(),
  created_at: z.string(),
});

// Query types
export type StudentQueryParams = z.infer<typeof StudentQueryParamsSchema>;
export type StudentFilter = z.infer<typeof StudentFilterSchema>;

// Additional types
export type Notification = z.infer<typeof NotificationSchema>;

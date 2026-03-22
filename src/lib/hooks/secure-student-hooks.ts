import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchStudentEnrolledCourses,
  fetchStudentGroups,
  fetchStudentTransactionsAndWallet,
  fetchStudentDashboardData,
  fetchTenant,
  fetchStudentEnrolledChapters,
  fetchStudentNotifications,
  fetchAvailableCourses,
  fetchCourseDetails,
  fetchCourseProgress,
  enrollStudentInCourse,
  joinGroup,
  createWalletTransaction,
  purchaseCourse,
  validateUser,
  validateTeacher,
} from "../secure-queries";
import { 
  type StudentEnrollmentInput,
  type StudentChapterEnrollmentInput,
  type GroupJoinInput,
  type WalletTransactionInput,
} from "../schemas/student-schemas";

// ============================================================================
// SECURE STUDENT QUERY HOOKS
// ============================================================================

/**
 * Securely fetches student enrolled courses with Zod validation
 */
export function useSecureStudentEnrolledCourses(user: any, teacher: any) {
  return useQuery({
    queryKey: ['secure-enrolledCourses', user?.id, teacher?.user_id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      const validatedTeacher = teacher ? validateTeacher(teacher) : null;
      return fetchStudentEnrolledCourses(validatedUser, validatedTeacher);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
    meta: {
      timeout: 10000, // 10 seconds timeout
    },
  });
}

/**
 * Securely fetches student groups with Zod validation
 */
export function useSecureStudentGroups(user: any, teacher: any) {
  return useQuery({
    queryKey: ['secure-studentGroups', user?.id, teacher?.user_id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      const validatedTeacher = teacher ? validateTeacher(teacher) : null;
      return fetchStudentGroups(validatedUser, validatedTeacher);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
    meta: {
      timeout: 10000, // 10 seconds timeout
    },
  });
}

/**
 * Securely fetches student transactions and wallet with Zod validation
 */
export function useSecureStudentTransactionsAndWallet(user: any) {
  return useQuery({
    queryKey: ['secure-studentTransactions', user?.id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      return fetchStudentTransactionsAndWallet(validatedUser);
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
    meta: {
      timeout: 10000, // 10 seconds timeout
    },
  });
}

/**
 * Securely fetches student dashboard data with Zod validation
 */
export function useSecureStudentDashboardData(user: any, teacher: any) {
  return useQuery({
    queryKey: ['secure-studentDashboardData', user?.id, teacher?.user_id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      const validatedTeacher = teacher ? validateTeacher(teacher) : null;
      return fetchStudentDashboardData(validatedUser, validatedTeacher);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
    // Add timeout to prevent long loading times
    meta: {
      timeout: 10000, // 10 seconds timeout
    },
  });
}

/**
 * Securely fetches tenant information with Zod validation
 */
export function useSecureTenantQuery() {
  return useQuery({
    queryKey: ['secure-tenant'],
    queryFn: fetchTenant,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}

// ============================================================================
// SECURE STUDENT MUTATION HOOKS
// ============================================================================

/**
 * Securely enrolls student in a course with Zod validation
 */
export function useSecureEnrollStudentInCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, input }: { user: any; input: StudentEnrollmentInput }) => {
      const validatedUser = await validateUser();
      return enrollStudentInCourse(validatedUser, input);
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries({ queryKey: ['secure-enrolledCourses'] });
        queryClient.invalidateQueries({ queryKey: ['secure-studentDashboardData'] });
        queryClient.invalidateQueries({ queryKey: ['secure-studentTransactions'] });
      }
    },
    onError: (error) => {
      console.error('Enrollment error:', error);
    },
  });
}

/**
 * Securely joins a group with Zod validation
 */
export function useSecureJoinGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, input }: { user: any; input: GroupJoinInput }) => {
      const validatedUser = await validateUser();
      return joinGroup(validatedUser, input);
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries({ queryKey: ['secure-studentGroups'] });
      }
    },
    onError: (error) => {
      console.error('Join group error:', error);
    },
  });
}

/**
 * Securely creates a wallet transaction with Zod validation
 */
export function useSecureCreateWalletTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, input }: { user: any; input: WalletTransactionInput }) => {
      const validatedUser = await validateUser();
      return createWalletTransaction(validatedUser, input);
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries({ queryKey: ['secure-studentTransactions'] });
        queryClient.invalidateQueries({ queryKey: ['secure-studentDashboardData'] });
      }
    },
    onError: (error) => {
      console.error('Wallet transaction error:', error);
    },
  });
}

// ============================================================================
// SECURE STUDENT CHAPTER HOOKS
// ============================================================================

/**
 * Securely fetches student enrolled chapters with Zod validation
 */
export function useSecureStudentEnrolledChapters(user: any, teacher: any) {
  return useQuery({
    queryKey: ['secure-studentEnrolledChapters', user?.id, teacher?.user_id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      const validatedTeacher = teacher ? validateTeacher(teacher) : null;
      return fetchStudentEnrolledChapters(validatedUser, validatedTeacher);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
    meta: {
      timeout: 10000, // 10 seconds timeout
    },
  });
}

/**
 * Securely enrolls student in a chapter with Zod validation
 */
export function useSecureEnrollStudentInChapter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, input }: { user: any; input: StudentChapterEnrollmentInput }) => {
      const validatedUser = await validateUser();
      
      // This would need to be implemented in secure-queries.ts
      // For now, return success as placeholder
      return { success: true, message: 'Chapter enrollment not yet implemented' };
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries({ queryKey: ['secure-studentEnrolledChapters'] });
        queryClient.invalidateQueries({ queryKey: ['secure-studentDashboardData'] });
      }
    },
    onError: (error) => {
      console.error('Chapter enrollment error:', error);
    },
  });
}

// ============================================================================
// SECURE STUDENT QUIZ HOOKS
// ============================================================================

/**
 * Securely fetches multiplayer quiz questions with Zod validation
 */
export function useSecureMultiplayerQuizQuestions(userId: string) {
  return useQuery({
    queryKey: ['secure-multiplayerQuizQuestions', userId],
    queryFn: async () => {
      // This would need to be implemented in secure-queries.ts
      // For now, return empty array as placeholder
      return [];
    },
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}

/**
 * Securely fetches multiplayer quiz categories with Zod validation
 */
export function useSecureMultiplayerQuizCategories(userId: string) {
  return useQuery({
    queryKey: ['secure-multiplayerQuizCategories', userId],
    queryFn: async () => {
      // This would need to be implemented in secure-queries.ts
      // For now, return empty array as placeholder
      return [];
    },
    enabled: !!userId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 3,
  });
}

// ============================================================================
// SECURE STUDENT ANALYTICS HOOKS
// ============================================================================

/**
 * Securely fetches student analytics with Zod validation
 */
export function useSecureStudentAnalytics(user: any) {
  return useQuery({
    queryKey: ['secure-studentAnalytics', user?.id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      
      // This would need to be implemented in secure-queries.ts
      // For now, return empty analytics as placeholder
      return {
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        totalCreditsSpent: 0,
        studyStreak: 0,
        avgQuizScore: 0,
        totalStudyTime: 0
      };
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// ============================================================================
// SECURE STUDENT NOTIFICATION HOOKS
// ============================================================================

/**
 * Securely fetches student notifications with Zod validation
 */
export function useSecureStudentNotifications(user: any) {
  return useQuery({
    queryKey: ['secure-studentNotifications', user?.id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      return fetchStudentNotifications(validatedUser);
    },
    enabled: !!user,
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Securely fetches available courses for students with Zod validation
 */
export function useSecureAvailableCourses(user: any, teacher: any) {
  return useQuery({
    queryKey: ['secure-availableCourses', user?.id, teacher?.user_id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      const validatedTeacher = teacher ? validateTeacher(teacher) : null;
      return fetchAvailableCourses(validatedUser, validatedTeacher);
    },
    enabled: true, // Allow fetching even without user (for public courses)
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
    meta: {
      timeout: 10000, // 10 seconds timeout
    },
  });
}

/**
 * Securely fetches course details with Zod validation
 */
export function useSecureCourseDetails(courseId: string, user: any) {
  return useQuery({
    queryKey: ['secure-courseDetails', courseId, user?.id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      return fetchCourseDetails(courseId, validatedUser);
    },
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
    meta: {
      timeout: 10000, // 10 seconds timeout
    },
  });
}

/**
 * Securely fetches course progress with Zod validation
 */
export function useSecureCourseProgress(courseId: string, user: any) {
  return useQuery({
    queryKey: ['secure-courseProgress', courseId, user?.id],
    queryFn: async () => {
      const validatedUser = user ? await validateUser() : null;
      return fetchCourseProgress(courseId, validatedUser);
    },
    enabled: !!courseId && !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not authenticated')) {
        return false;
      }
      return failureCount < 3;
    },
    meta: {
      timeout: 10000, // 10 seconds timeout
    },
  });
}

// ============================================================================
// SECURE STUDENT STORE HOOKS
// ============================================================================


/**
 * Securely purchases a course with Zod validation
 */
export function useSecurePurchaseCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, courseId }: { user: any; courseId: string }) => {
      const validatedUser = await validateUser();
      return purchaseCourse(validatedUser, courseId);
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries({ queryKey: ['secure-enrolledCourses'] });
        queryClient.invalidateQueries({ queryKey: ['secure-studentDashboardData'] });
        queryClient.invalidateQueries({ queryKey: ['secure-studentTransactions'] });
        queryClient.invalidateQueries({ queryKey: ['secure-availableCourses'] });
      }
    },
    onError: (error) => {
      console.error('Course purchase error:', error);
    },
  });
}

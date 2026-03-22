# Student Routes Migration Guide

## Overview

This guide outlines the migration from the existing `queries.ts` functions to the new Zod-validated secure queries for student routes.

## Migration Steps

### 1. Update Student Dashboard Page

**File**: `src/pages/student/StudentDashboard.tsx`

**Before**:
```typescript
import { useStudentDashboardData } from '@/lib/queries';

export function StudentDashboard() {
  const { data, isLoading, error } = useStudentDashboardData(user, teacher);
  // ... rest of component
}
```

**After**:
```typescript
import { useSecureStudentDashboardData } from '@/lib/hooks/secure-student-hooks';

export function StudentDashboard() {
  const { data, isLoading, error } = useSecureStudentDashboardData(user, teacher);
  // ... rest of component
}
```

### 2. Update Student Courses Page

**File**: `src/pages/student/StudentCoursesPage.tsx`

**Before**:
```typescript
import { useStudentEnrolledCourses } from '@/lib/queries';

export function StudentCoursesPage() {
  const { data, isLoading, error } = useStudentEnrolledCourses(user, teacher);
  // ... rest of component
}
```

**After**:
```typescript
import { useSecureStudentEnrolledCourses } from '@/lib/hooks/secure-student-hooks';

export function StudentCoursesPage() {
  const { data, isLoading, error } = useSecureStudentEnrolledCourses(user, teacher);
  // ... rest of component
}
```

### 3. Update Student Groups Page

**File**: `src/pages/student/StudentGroups.tsx`

**Before**:
```typescript
import { useStudentGroups } from '@/lib/queries';

export function StudentGroups() {
  const { data, isLoading, error } = useStudentGroups(user, teacher);
  // ... rest of component
}
```

**After**:
```typescript
import { useSecureStudentGroups } from '@/lib/hooks/secure-student-hooks';

export function StudentGroups() {
  const { data, isLoading, error } = useSecureStudentGroups(user, teacher);
  // ... rest of component
}
```

### 4. Update Student Transactions Page

**File**: `src/pages/student/StudentTransactions.tsx`

**Before**:
```typescript
import { useStudentTransactionsAndWallet } from '@/lib/queries';

export function StudentTransactions() {
  const { data, isLoading, error } = useStudentTransactionsAndWallet(user);
  // ... rest of component
}
```

**After**:
```typescript
import { useSecureStudentTransactionsAndWallet } from '@/lib/hooks/secure-student-hooks';

export function StudentTransactions() {
  const { data, isLoading, error } = useSecureStudentTransactionsAndWallet(user);
  // ... rest of component
}
```

### 5. Update Student Chapters Page

**File**: `src/pages/student/StudentChaptersPage.tsx`

**Before**:
```typescript
import { useStudentEnrolledChapters } from '@/lib/queries';

export function StudentChaptersPage() {
  const { data, isLoading, error } = useStudentEnrolledChapters(user, teacher);
  // ... rest of component
}
```

**After**:
```typescript
import { useSecureStudentEnrolledChapters } from '@/lib/hooks/secure-student-hooks';

export function StudentChaptersPage() {
  const { data, isLoading, error } = useSecureStudentEnrolledChapters(user, teacher);
  // ... rest of component
}
```

### 6. Update Student Notifications Page

**File**: `src/pages/student/StudentNotificationsPage.tsx`

**Before**:
```typescript
// No existing hook - implement new secure hook
```

**After**:
```typescript
import { useSecureStudentNotifications } from '@/lib/hooks/secure-student-hooks';

export function StudentNotificationsPage() {
  const { data, isLoading, error } = useSecureStudentNotifications(user);
  // ... rest of component
}
```

### 7. Update Student Store Page

**File**: `src/pages/student/Store.tsx`

**Before**:
```typescript
// No existing hook - implement new secure hook
```

**After**:
```typescript
import { useSecureAvailableCourses, useSecurePurchaseCourse } from '@/lib/hooks/secure-student-hooks';

export function Store() {
  const { data: courses, isLoading } = useSecureAvailableCourses(user, teacher);
  const purchaseCourse = useSecurePurchaseCourse();
  
  // ... rest of component
}
```

### 8. Update Multiplayer Quiz Page

**File**: `src/pages/student/MultiplayerQuiz.tsx`

**Before**:
```typescript
import { useMultiplayerQuizQuestions, useMultiplayerQuizCategories } from '@/lib/queries';

export function MultiplayerQuiz() {
  const { data: questions } = useMultiplayerQuizQuestions(userId);
  const { data: categories } = useMultiplayerQuizCategories(userId);
  // ... rest of component
}
```

**After**:
```typescript
import { useSecureMultiplayerQuizQuestions, useSecureMultiplayerQuizCategories } from '@/lib/hooks/secure-student-hooks';

export function MultiplayerQuiz() {
  const { data: questions } = useSecureMultiplayerQuizQuestions(userId);
  const { data: categories } = useSecureMultiplayerQuizCategories(userId);
  // ... rest of component
}
```

## Form Integration Examples

### 1. Course Enrollment Form

**Before**:
```typescript
const handleEnrollment = async (courseId: string, enrollmentCode?: string) => {
  try {
    const { error } = await supabase
      .from('enrollments')
      .insert({
        student_id: user.id,
        course_id: courseId,
        enrollment_code: enrollmentCode
      });
    
    if (error) throw error;
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

**After**:
```typescript
import { useSecureEnrollStudentInCourse } from '@/lib/hooks/secure-student-hooks';
import { StudentEnrollmentInputSchema } from '@/lib/schemas/student-schemas';

const enrollStudent = useSecureEnrollStudentInCourse();

const handleEnrollment = async (courseId: string, enrollmentCode?: string) => {
  try {
    // Validate input with Zod
    const input = StudentEnrollmentInputSchema.parse({
      course_id: courseId,
      enrollment_code: enrollmentCode
    });
    
    const result = await enrollStudent.mutateAsync({
      user,
      input
    });
    
    if (result.success) {
      // Handle success
    } else {
      // Handle error
    }
  } catch (error) {
    // Handle validation or mutation error
  }
};
```

### 2. Group Join Form

**Before**:
```typescript
const handleJoinGroup = async (groupId: string, joinCode?: string) => {
  try {
    const { error } = await supabase
      .from('group_members')
      .insert({
        student_id: user.id,
        group_id: groupId,
        join_code: joinCode
      });
    
    if (error) throw error;
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

**After**:
```typescript
import { useSecureJoinGroup } from '@/lib/hooks/secure-student-hooks';
import { GroupJoinInputSchema } from '@/lib/schemas/student-schemas';

const joinGroup = useSecureJoinGroup();

const handleJoinGroup = async (groupId: string, joinCode?: string) => {
  try {
    // Validate input with Zod
    const input = GroupJoinInputSchema.parse({
      group_id: groupId,
      join_code: joinCode
    });
    
    const result = await joinGroup.mutateAsync({
      user,
      input
    });
    
    if (result.success) {
      // Handle success
    } else {
      // Handle error
    }
  } catch (error) {
    // Handle validation or mutation error
  }
};
```

### 3. Wallet Transaction Form

**Before**:
```typescript
const handleWalletTransaction = async (amount: number, type: string, description?: string) => {
  try {
    const { error } = await supabase
      .from('wallet_transactions')
      .insert({
        user_id: user.id,
        amount,
        transaction_type: type,
        description
      });
    
    if (error) throw error;
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

**After**:
```typescript
import { useSecureCreateWalletTransaction } from '@/lib/hooks/secure-student-hooks';
import { WalletTransactionInputSchema } from '@/lib/schemas/student-schemas';

const createTransaction = useSecureCreateWalletTransaction();

const handleWalletTransaction = async (amount: number, type: string, description?: string) => {
  try {
    // Validate input with Zod
    const input = WalletTransactionInputSchema.parse({
      amount,
      transaction_type: type,
      description
    });
    
    const result = await createTransaction.mutateAsync({
      user,
      input
    });
    
    if (result.success) {
      // Handle success
    } else {
      // Handle error
    }
  } catch (error) {
    // Handle validation or mutation error
  }
};
```

## Error Handling

### 1. Validation Errors

```typescript
try {
  const result = await secureFunction.mutateAsync({ user, input });
} catch (error) {
  if (error instanceof z.ZodError) {
    // Handle validation errors
    console.error('Validation errors:', error.errors);
    // Show user-friendly error messages
  } else {
    // Handle other errors
    console.error('Unexpected error:', error);
  }
}
```

### 2. Database Errors

```typescript
try {
  const result = await secureFunction.mutateAsync({ user, input });
} catch (error) {
  if (error instanceof Error && error.message.includes('Database error')) {
    // Handle database errors
    console.error('Database error:', error.message);
  } else {
    // Handle other errors
    console.error('Unexpected error:', error);
  }
}
```

### 3. Authentication Errors

```typescript
try {
  const result = await secureFunction.mutateAsync({ user, input });
} catch (error) {
  if (error instanceof Error && error.message.includes('not authenticated')) {
    // Handle authentication errors
    // Redirect to login or show auth error
  } else {
    // Handle other errors
    console.error('Unexpected error:', error);
  }
}
```

## Testing

### 1. Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { fetchStudentEnrolledCourses } from '@/lib/secure-queries';
import { EnrolledCourseSchema } from '@/lib/schemas/student-schemas';

describe('fetchStudentEnrolledCourses', () => {
  it('should validate input and return valid data', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const mockTeacher = { user_id: 'teacher-123' };
    
    // Mock supabase calls
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: mockEnrollmentsData,
            error: null
          })
        })
      })
    });
    
    const result = await fetchStudentEnrolledCourses(mockUser, mockTeacher);
    
    // Validate result with Zod schema
    expect(() => EnrolledCourseSchema.array().parse(result)).not.toThrow();
  });
});
```

### 2. Integration Tests

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSecureStudentEnrolledCourses } from '@/lib/hooks/secure-student-hooks';

describe('useSecureStudentEnrolledCourses', () => {
  it('should fetch and validate student courses', async () => {
    const { result } = renderHook(() => 
      useSecureStudentEnrolledCourses(mockUser, mockTeacher)
    );
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
  });
});
```

## Performance Considerations

### 1. Caching

The secure hooks include optimized caching:
- `staleTime`: Prevents unnecessary refetches
- `retry`: Handles transient errors
- `enabled`: Prevents queries when user is not available

### 2. Error Boundaries

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function StudentDashboard() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong</div>}
      onError={(error) => console.error('Student dashboard error:', error)}
    >
      <StudentDashboardContent />
    </ErrorBoundary>
  );
}
```

### 3. Loading States

```typescript
function StudentCoursesPage() {
  const { data, isLoading, error } = useSecureStudentEnrolledCourses(user, teacher);
  
  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div>Error loading courses: {error.message}</div>;
  
  return (
    <div>
      {data?.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

## Migration Checklist

- [ ] Update all student page imports
- [ ] Replace old hooks with secure hooks
- [ ] Add Zod validation to forms
- [ ] Implement proper error handling
- [ ] Add loading states
- [ ] Update tests
- [ ] Verify security improvements
- [ ] Performance testing
- [ ] Documentation updates

## Benefits of Migration

1. **Security**: All inputs validated with Zod schemas
2. **Type Safety**: Full TypeScript support with runtime validation
3. **Error Handling**: Comprehensive error handling and user feedback
4. **Performance**: Optimized caching and query management
5. **Maintainability**: Clean separation of concerns
6. **Testing**: Easier to test with validated schemas
7. **Documentation**: Self-documenting code with Zod schemas

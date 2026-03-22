# Sanitization Utilities Usage Guide

This comprehensive guide covers the usage of sanitization utilities and validation layers implemented in the Learnify application. These utilities follow OWASP security guidelines and community best practices to ensure robust input validation and sanitization.

## Table of Contents

1. [Overview](#overview)
2. [Core Sanitization Functions](#core-sanitization-functions)
3. [Validation Layers](#validation-layers)
4. [Query Sanitization](#query-sanitization)
5. [Form Validation](#form-validation)
6. [API Request/Response Validation](#api-requestresponse-validation)
7. [Database Operations](#database-operations)
8. [Best Practices](#best-practices)
9. [Migration Guide](#migration-guide)
10. [Examples](#examples)

## Overview

The sanitization system consists of three main modules:

- **`sanitization.ts`**: Core sanitization functions for XSS protection, SQL injection prevention, and input validation
- **`validation-layers.ts`**: Specialized validation layers for different data types and use cases
- **`query-sanitizer.ts`**: Safe query building and parameterization for database operations

### Key Features

- ✅ XSS Protection
- ✅ SQL Injection Prevention
- ✅ Input Validation and Normalization
- ✅ Type-safe Sanitization
- ✅ Performance Optimized
- ✅ Supabase Integration
- ✅ Comprehensive Error Handling

## Core Sanitization Functions

### Basic Usage

```typescript
import { sanitizeInput, validateString, validateEmail } from '@/utils/sanitization';

// Sanitize string input
const result = sanitizeInput(userInput, 'string', {
  maxLength: 100,
  minLength: 2,
  trim: true
});

if (result.isValid) {
  console.log('Sanitized value:', result.sanitized);
} else {
  console.log('Validation errors:', result.errors);
}

// Validate email
const emailResult = validateEmail('user@example.com');
if (emailResult.isValid) {
  console.log('Valid email:', emailResult.value);
}
```

### Available Sanitization Types

```typescript
// String sanitization
const stringResult = sanitizeInput(input, 'string', {
  maxLength: 1000,
  minLength: 1,
  allowSpecialChars: false,
  pattern: /^[a-zA-Z0-9\s]+$/
});

// Number sanitization
const numberResult = sanitizeInput(input, 'number', {
  min: 0,
  max: 100,
  integer: true
});

// Email sanitization
const emailResult = sanitizeInput(input, 'email');

// HTML sanitization
const htmlResult = sanitizeInput(input, 'html', {
  allowHtml: true,
  allowedTags: ['b', 'i', 'em', 'strong', 'p']
});

// SQL sanitization
const sqlResult = sanitizeInput(input, 'sql');

// File path sanitization
const filePathResult = sanitizeInput(input, 'filepath');
```

## Validation Layers

### User Validation

```typescript
import { validateFormData, ValidationSchemas } from '@/utils/validation-layers';

// Validate user signup data
const signupData = {
  email: 'user@example.com',
  password: 'SecurePass123!',
  fullName: 'John Doe',
  phone: '+1234567890',
  role: 'student'
};

const validation = validateFormData(signupData, 'signup');
if (validation.isValid) {
  // Proceed with signup
  console.log('Valid signup data:', validation.value);
} else {
  console.log('Validation errors:', validation.errors);
}
```

### Course Validation

```typescript
// Validate course creation data
const courseData = {
  title: 'Advanced React Development',
  description: 'Learn advanced React patterns and best practices',
  price: 99.99,
  category: 'Web Development',
  status: 'draft'
};

const courseValidation = validateFormData(courseData, 'create');
if (courseValidation.isValid) {
  // Create course
  console.log('Valid course data:', courseValidation.value);
}
```

### Question Validation

```typescript
// Validate question creation
const questionData = {
  content: 'How do I implement authentication in React?',
  is_anonymous: false,
  allow_student_answers: true,
  course_id: 'uuid-here'
};

const questionValidation = validateFormData(questionData, 'create');
if (questionValidation.isValid) {
  // Create question
  console.log('Valid question data:', questionValidation.value);
}
```

## Query Sanitization

### Safe Database Queries

```typescript
import { 
  safeSelect, 
  safeInsert, 
  safeUpdate, 
  safeDelete,
  createFilter,
  createSafeQuery 
} from '@/utils/query-sanitizer';

// Safe SELECT query
const { data, error } = await safeSelect('courses', [
  createFilter('instructor_id', 'eq', userId),
  createFilter('status', 'eq', 'published')
], {
  limit: 10,
  orderBy: 'created_at',
  orderDirection: 'desc'
});

// Safe INSERT query
const { data: newCourse, error: insertError } = await safeInsert('courses', {
  title: 'New Course',
  description: 'Course description',
  price: 99.99,
  instructor_id: userId
});

// Safe UPDATE query
const { data: updatedCourse, error: updateError } = await safeUpdate(
  'courses',
  { title: 'Updated Title' },
  [createFilter('id', 'eq', courseId)]
);

// Safe DELETE query
const { data: deletedCourse, error: deleteError } = await safeDelete(
  'courses',
  [createFilter('id', 'eq', courseId)]
);
```

### Query Builder Pattern

```typescript
// Using the query builder
const courses = await createSafeQuery('courses')
  .where('instructor_id', 'eq', userId)
  .where('status', 'eq', 'published')
  .select(['id', 'title', 'price', 'created_at'])
  .orderBy('created_at', 'desc')
  .limit(10)
  .execute();
```

## Form Validation

### React Form Integration

```typescript
import React, { useState } from 'react';
import { sanitizeFormData, ValidationSchemas } from '@/utils/validation-layers';

const CreateCourseForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: ''
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateFormData(formData, 'create');
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Clear errors and proceed
    setErrors({});
    
    try {
      // Use safe database operations
      const { data, error } = await safeInsert('courses', validation.value);
      
      if (error) {
        console.error('Database error:', error);
        return;
      }
      
      console.log('Course created:', data);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {Object.entries(errors).map(([field, fieldErrors]) => (
        <div key={field} className="error">
          {fieldErrors.join(', ')}
        </div>
      ))}
    </form>
  );
};
```

### Form Data Sanitization

```typescript
import { sanitizeFormData } from '@/utils/sanitization';

const formSchema = {
  title: { type: 'string', options: { maxLength: 200, trim: true } },
  description: { type: 'string', options: { maxLength: 2000, trim: true } },
  price: { type: 'number', options: { min: 0, max: 10000 } },
  category: { type: 'string', options: { maxLength: 50, trim: true } }
};

const { data, errors, warnings } = sanitizeFormData(formData, formSchema);

if (Object.keys(errors).length === 0) {
  // Form data is valid and sanitized
  console.log('Sanitized data:', data);
} else {
  // Handle validation errors
  console.log('Validation errors:', errors);
}
```

## API Request/Response Validation

### Request Validation

```typescript
import { validateApiRequest } from '@/utils/validation-layers';

// API endpoint handler
export async function createCourseHandler(request: Request) {
  try {
    const requestData = await request.json();
    
    // Validate request data
    const validation = validateApiRequest(requestData, ValidationSchemas.create);
    
    if (!validation.isValid) {
      return new Response(JSON.stringify({
        error: 'Validation failed',
        details: validation.errors
      }), { status: 400 });
    }
    
    // Proceed with safe database operation
    const { data, error } = await safeInsert('courses', validation.value);
    
    if (error) {
      return new Response(JSON.stringify({
        error: 'Database error',
        message: error.message
      }), { status: 500 });
    }
    
    return new Response(JSON.stringify({ data }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), { status: 500 });
  }
}
```

### Response Validation

```typescript
import { validateApiResponse } from '@/utils/validation-layers';

// Validate API response before sending
export async function getCoursesHandler() {
  try {
    const { data, error } = await safeSelect('courses');
    
    if (error) {
      throw error;
    }
    
    // Validate response data
    const validation = validateApiResponse(data, ValidationSchemas.create);
    
    return new Response(JSON.stringify({
      data: validation.value,
      warnings: validation.warnings
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch courses'
    }), { status: 500 });
  }
}
```

## Database Operations

### Supabase Integration

```typescript
import { supabase } from '@/integrations/supabase/client';
import { safeSelect, safeInsert, safeUpdate, safeDelete } from '@/utils/query-sanitizer';

// Replace direct Supabase calls with safe versions
export class CourseService {
  // Before (unsafe)
  static async getCoursesUnsafe(userId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('instructor_id', userId); // Potential SQL injection
    return { data, error };
  }

  // After (safe)
  static async getCourses(userId: string) {
    return await safeSelect('courses', [
      createFilter('instructor_id', 'eq', userId)
    ]);
  }

  // Before (unsafe)
  static async createCourseUnsafe(courseData: any) {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData]); // No validation
    return { data, error };
  }

  // After (safe)
  static async createCourse(courseData: any) {
    // Validate data first
    const validation = validateFormData(courseData, 'create');
    if (!validation.isValid) {
      return { data: null, error: { message: validation.errors.join(', ') } };
    }
    
    return await safeInsert('courses', validation.value);
  }
}
```

### Custom Query Building

```typescript
import { createSafeQuery, createFilter } from '@/utils/query-sanitizer';

// Complex queries with multiple filters
export async function getFilteredCourses(filters: {
  instructorId?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}) {
  const query = createSafeQuery('courses');
  
  if (filters.instructorId) {
    query.where('instructor_id', 'eq', filters.instructorId);
  }
  
  if (filters.category) {
    query.where('category', 'eq', filters.category);
  }
  
  if (filters.minPrice !== undefined) {
    query.where('price', 'gte', filters.minPrice);
  }
  
  if (filters.maxPrice !== undefined) {
    query.where('price', 'lte', filters.maxPrice);
  }
  
  if (filters.status) {
    query.where('status', 'eq', filters.status);
  }
  
  return await query
    .orderBy('created_at', 'desc')
    .limit(20)
    .execute();
}
```

## Best Practices

### 1. Always Validate Input

```typescript
// ❌ Bad - No validation
const handleSubmit = async (data: any) => {
  const { data: result } = await supabase
    .from('courses')
    .insert([data]);
};

// ✅ Good - Always validate
const handleSubmit = async (data: any) => {
  const validation = validateFormData(data, 'create');
  if (!validation.isValid) {
    throw new Error('Invalid data');
  }
  
  const { data: result } = await safeInsert('courses', validation.value);
};
```

### 2. Use Type-Safe Validation

```typescript
// ✅ Use specific validation schemas
const userValidation = validateFormData(userData, 'signup');
const courseValidation = validateFormData(courseData, 'create');
const questionValidation = validateFormData(questionData, 'create');
```

### 3. Handle Validation Errors Gracefully

```typescript
// ✅ Proper error handling
const validation = validateFormData(data, 'create');
if (!validation.isValid) {
  return {
    success: false,
    errors: validation.errors,
    warnings: validation.warnings
  };
}
```

### 4. Sanitize Before Storing

```typescript
// ✅ Sanitize all user inputs
const sanitizedTitle = sanitizeInput(title, 'string', {
  maxLength: 200,
  trim: true
}).sanitized;

const sanitizedDescription = sanitizeInput(description, 'html', {
  allowHtml: false,
  maxLength: 2000
}).sanitized;
```

### 5. Use Parameterized Queries

```typescript
// ❌ Bad - String concatenation
const query = `SELECT * FROM courses WHERE instructor_id = '${userId}'`;

// ✅ Good - Parameterized queries
const { data } = await safeSelect('courses', [
  createFilter('instructor_id', 'eq', userId)
]);
```

## Migration Guide

### Step 1: Replace Direct Supabase Calls

```typescript
// Before
const { data, error } = await supabase
  .from('courses')
  .select('*')
  .eq('instructor_id', userId);

// After
const { data, error } = await safeSelect('courses', [
  createFilter('instructor_id', 'eq', userId)
]);
```

### Step 2: Add Form Validation

```typescript
// Before
const handleSubmit = async (formData: any) => {
  const { data, error } = await supabase
    .from('courses')
    .insert([formData]);
};

// After
const handleSubmit = async (formData: any) => {
  const validation = validateFormData(formData, 'create');
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }
  
  const { data, error } = await safeInsert('courses', validation.value);
};
```

### Step 3: Update Component Props

```typescript
// Before
interface CourseFormProps {
  onSubmit: (data: any) => void;
}

// After
import { CourseFormData } from '@/types/sanitization';

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
}
```

## Examples

### Complete Form Component

```typescript
import React, { useState } from 'react';
import { 
  validateFormData, 
  ValidationSchemas,
  sanitizeInput 
} from '@/utils/validation-layers';
import { safeInsert } from '@/utils/query-sanitizer';
import { CourseFormData } from '@/types/sanitization';

const CreateCourseForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<CourseFormData>>({
    title: '',
    description: '',
    price: 0,
    category: ''
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof CourseFormData, value: any) => {
    // Sanitize input in real-time
    const sanitized = sanitizeInput(value, 'string', {
      maxLength: field === 'title' ? 200 : 2000,
      trim: true
    });
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitized.sanitized
    }));
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: []
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      // Validate form data
      const validation = validateFormData(formData, 'create');
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
      
      // Create course with safe database operation
      const { data, error } = await safeInsert('courses', {
        ...validation.value,
        instructor_id: getCurrentUserId(), // Get from auth context
        status: 'draft'
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Success - redirect or show success message
      console.log('Course created:', data);
      
    } catch (error) {
      console.error('Error creating course:', error);
      setErrors({ general: ['Failed to create course. Please try again.'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Course Title</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <div className="text-red-500 text-sm">
            {errors.title.join(', ')}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <div className="text-red-500 text-sm">
            {errors.description.join(', ')}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
          className={errors.price ? 'border-red-500' : ''}
        />
        {errors.price && (
          <div className="text-red-500 text-sm">
            {errors.price.join(', ')}
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Course'}
      </button>
      
      {errors.general && (
        <div className="text-red-500 text-sm">
          {errors.general.join(', ')}
        </div>
      )}
    </form>
  );
};

export default CreateCourseForm;
```

### API Route Handler

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { validateApiRequest, ValidationSchemas } from '@/utils/validation-layers';
import { safeInsert, safeSelect } from '@/utils/query-sanitizer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validation = validateApiRequest(body, ValidationSchemas.create);
    
    if (!validation.isValid) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validation.errors
      }, { status: 400 });
    }
    
    // Create course with safe database operation
    const { data, error } = await safeInsert('courses', validation.value);
    
    if (error) {
      return NextResponse.json({
        error: 'Database error',
        message: error.message
      }, { status: 500 });
    }
    
    return NextResponse.json({ data }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructor_id');
    const category = searchParams.get('category');
    
    // Build safe query with filters
    const filters = [];
    if (instructorId) {
      filters.push(createFilter('instructor_id', 'eq', instructorId));
    }
    if (category) {
      filters.push(createFilter('category', 'eq', category));
    }
    
    const { data, error } = await safeSelect('courses', filters, {
      limit: 20,
      orderBy: 'created_at',
      orderDirection: 'desc'
    });
    
    if (error) {
      return NextResponse.json({
        error: 'Database error',
        message: error.message
      }, { status: 500 });
    }
    
    return NextResponse.json({ data });
    
  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}
```

## Security Considerations

1. **Always validate on both client and server side**
2. **Use parameterized queries for all database operations**
3. **Sanitize HTML content to prevent XSS attacks**
4. **Validate file uploads and paths**
5. **Implement rate limiting for API endpoints**
6. **Log security-related events**
7. **Regular security audits and updates**

## Performance Tips

1. **Use validation schemas for consistent performance**
2. **Cache validation results when possible**
3. **Batch sanitization operations**
4. **Use appropriate limits for string lengths**
5. **Optimize database queries with proper indexing**

## Conclusion

The sanitization utilities provide a comprehensive, secure, and type-safe way to handle user input and database operations in the Learnify application. By following the patterns and examples in this guide, you can ensure that your application is protected against common security vulnerabilities while maintaining clean, maintainable code.

For questions or issues, please refer to the source code documentation or create an issue in the project repository.

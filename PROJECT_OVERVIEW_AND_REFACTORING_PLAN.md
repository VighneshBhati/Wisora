# Lrnflix - Project Overview & Refactoring Plan

## 🚀 Project Overview

**Lrnflix** is a comprehensive AI-powered Learning Management System (LMS) built with modern web technologies. The platform serves as an educational ecosystem connecting students, teachers, and administrators through gamified learning experiences, AI-powered features, and collaborative tools.

### 🎯 Core Mission
Transform traditional education through AI integration, gamification, and modern web technologies to create engaging, personalized learning experiences.

### 📊 Current State Analysis

#### ✅ Strengths
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Comprehensive Features**: AI integration, gamification, real-time collaboration
- **Security Foundation**: Existing sanitization utilities and validation layers
- **Scalable Architecture**: Supabase backend with RLS policies
- **Rich UI/UX**: shadcn/ui components with custom animations

#### ⚠️ Security Issues Identified
1. **XSS Vulnerabilities**: 
   - `dangerouslySetInnerHTML` usage in chart components
   - Unvalidated HTML content rendering
   - Potential script injection in user-generated content

2. **SQL Injection Risks**:
   - Direct Supabase queries without parameterization
   - User input directly passed to database queries
   - Missing input sanitization in critical paths

3. **Input Validation Gaps**:
   - Inconsistent form validation across components
   - Missing server-side validation
   - Unvalidated file uploads and media content

4. **Authentication & Authorization**:
   - Potential role-based access control bypasses
   - Missing CSRF protection
   - Insecure session management patterns

---

## 🏗️ Domain Architecture & Division

### 1. 🎓 **Learning Management Domain**
**Purpose**: Core educational content and course management

#### Components:
- **Course Management**: Creation, editing, publishing courses
- **Lesson Management**: Content creation, media integration, progress tracking
- **Chapter Organization**: Structured learning paths
- **Content Delivery**: Video, audio, document, and interactive content

#### Key Files:
```
src/components/courses/
src/components/lessons/
src/components/chapters/
src/pages/teacher/TeacherCourseManagement.tsx
src/pages/student/CourseView.tsx
```

#### Database Tables:
- `courses`, `lessons`, `chapters`, `attachments`, `enrollments`

### 2. 🤖 **AI & Intelligence Domain**
**Purpose**: AI-powered features and intelligent assistance

#### Components:
- **Global AI Assistant**: Context-aware chatbot
- **Voice AI Tutor**: Natural language interactions
- **AI Content Generation**: Question creation, content summarization
- **Personalized Recommendations**: Learning path optimization

#### Key Files:
```
src/components/chatbot/
src/components/lessons/VoiceTutor.tsx
src/components/lessons/LessonQA.tsx
```

#### Database Tables:
- `ai_sessions`, `ai_recommendations`, `voice_tutor_sessions`

### 3. 🎮 **Gamification Domain**
**Purpose**: Engagement through games, achievements, and social features

#### Components:
- **Multiplayer Quiz Games**: Real-time competitive quizzes
- **Achievement System**: Badges, streaks, XP tracking
- **Leaderboards**: Rankings and competitions
- **Progress Tracking**: Visual progress indicators

#### Key Files:
```
src/components/quiz/
src/components/student/AiAdviceCard.tsx
src/pages/student/MultiplayerQuiz.tsx
```

#### Database Tables:
- `quiz_rooms`, `quiz_room_players`, `achievements`, `user_progress`

### 4. 👥 **User Management Domain**
**Purpose**: User authentication, profiles, and role management

#### Components:
- **Authentication**: Login, signup, OAuth integration
- **User Profiles**: Personal information, preferences
- **Role Management**: Student, teacher, admin roles
- **User Analytics**: Activity tracking, performance metrics

#### Key Files:
```
src/components/auth/
src/contexts/AuthContext.tsx
src/pages/auth/
```

#### Database Tables:
- `profiles`, `user_sessions`, `role_permissions`

### 5. 💬 **Communication Domain**
**Purpose**: Collaboration, discussions, and notifications

#### Components:
- **Discussion Forums**: Q&A, peer interaction
- **Group Management**: Study groups, shared resources
- **Notifications**: Real-time updates, email integration
- **Chat Systems**: Group chats, direct messaging

#### Key Files:
```
src/components/discussions/
src/components/groups/
src/components/notifications/
```

#### Database Tables:
- `discussions`, `groups`, `notifications`, `messages`

### 6. 📊 **Analytics & Reporting Domain**
**Purpose**: Data analysis, insights, and performance tracking

#### Components:
- **Teacher Analytics**: Student performance, course metrics
- **Student Analytics**: Learning progress, study patterns
- **Admin Dashboard**: Platform-wide statistics
- **Reporting Tools**: Custom reports, data export

#### Key Files:
```
src/components/admin/
src/pages/admin/
src/components/teacher/TeacherAnalyticsPage.tsx
```

#### Database Tables:
- `analytics_events`, `performance_metrics`, `reports`

### 7. 💰 **Financial Domain**
**Purpose**: Payments, transactions, and monetization

#### Components:
- **Wallet System**: Digital credits, transactions
- **Payment Processing**: Course purchases, subscriptions
- **Invoice Management**: Billing, payment tracking
- **Revenue Analytics**: Financial performance

#### Key Files:
```
src/components/wallet/
src/components/invoices/
src/pages/student/StudentTransactions.tsx
```

#### Database Tables:
- `wallet_transactions`, `invoices`, `payments`, `subscriptions`

### 8. 🎨 **UI/UX Domain**
**Purpose**: User interface, theming, and user experience

#### Components:
- **Landing Pages**: Marketing, teacher-specific pages
- **Theme System**: Dynamic colors, custom branding
- **Responsive Design**: Mobile optimization
- **Animation System**: Interactive effects, transitions

#### Key Files:
```
src/components/landing/
src/components/ui/
src/contexts/ThemeContext.tsx
```

### 9. 🔧 **System & Infrastructure Domain**
**Purpose**: Core system functionality and technical infrastructure

#### Components:
- **API Layer**: Backend integration, data fetching
- **State Management**: Global state, caching
- **Security Layer**: Input validation, sanitization
- **Performance**: Optimization, monitoring

#### Key Files:
```
src/lib/
src/utils/
src/store/
src/integrations/
```

---

## 🔒 Security Refactoring Plan

### Phase 1: Foundation Security (Weeks 1-2)

#### 1.1 Input Validation & Sanitization
- **Replace all form validation** with Zod schemas
- **Implement server-side validation** for all API endpoints
- **Sanitize all user inputs** before database operations
- **Remove dangerouslySetInnerHTML** usage

#### 1.2 Database Security
- **Replace direct Supabase queries** with parameterized versions
- **Implement query sanitization** for all database operations
- **Add input validation** for all database interactions
- **Enhance RLS policies** with stricter access controls

#### 1.3 Authentication & Authorization
- **Strengthen JWT handling** with proper validation
- **Implement CSRF protection** for all forms
- **Add rate limiting** to prevent abuse
- **Enhance session management** with secure tokens

### Phase 2: Domain-Specific Security (Weeks 3-6)

#### 2.1 Learning Management Security
- **Secure file uploads** with type validation and virus scanning
- **Protect course content** with access controls
- **Validate lesson content** before rendering
- **Secure media streaming** with signed URLs

#### 2.2 AI Domain Security
- **Sanitize AI inputs** to prevent prompt injection
- **Rate limit AI requests** to prevent abuse
- **Validate AI outputs** before display
- **Secure AI session data** with encryption

#### 2.3 Gamification Security
- **Validate quiz answers** server-side
- **Prevent cheating** in multiplayer games
- **Secure leaderboard data** with validation
- **Protect achievement system** from manipulation

### Phase 3: Advanced Security (Weeks 7-8)

#### 3.1 Advanced Threat Protection
- **Implement WAF rules** for common attacks
- **Add anomaly detection** for suspicious activities
- **Enhance logging** for security monitoring
- **Implement security headers** (CSP, HSTS, etc.)

#### 3.2 Data Protection
- **Encrypt sensitive data** at rest and in transit
- **Implement data anonymization** for analytics
- **Add data retention policies** for compliance
- **Secure backup procedures** with encryption

---

## 🛠️ Technical Refactoring Strategy

### 1. **Zod Integration Plan**

#### 1.1 Schema Definition
```typescript
// Example: User validation schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().min(5).max(255),
  fullName: z.string().min(2).max(100).regex(/^[a-zA-Z\s]+$/),
  role: z.enum(['student', 'teacher', 'admin']),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Course validation schema
export const CourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  price: z.number().min(0).max(10000),
  instructorId: z.string().uuid(),
  status: z.enum(['draft', 'published', 'archived'])
});
```

#### 1.2 Form Integration
```typescript
// Replace existing form validation
const formSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  price: z.number().min(0).max(10000)
});

const CourseForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });
  
  // Form implementation with Zod validation
};
```

#### 1.3 API Validation
```typescript
// Server-side validation for API endpoints
export const validateCourseData = (data: unknown) => {
  try {
    return CourseSchema.parse(data);
  } catch (error) {
    throw new ValidationError('Invalid course data', error);
  }
};
```

### 2. **Database Query Refactoring**

#### 2.1 Safe Query Patterns
```typescript
// Replace direct Supabase queries
// OLD (unsafe):
const { data } = await supabase
  .from('courses')
  .select('*')
  .eq('instructor_id', userId);

// NEW (safe):
const { data, error } = await safeSelect('courses', [
  createFilter('instructor_id', 'eq', userId)
], {
  limit: 10,
  orderBy: 'created_at'
});
```

#### 2.2 Parameterized Queries
```typescript
// All database operations use parameterized queries
export const createCourse = async (courseData: CourseInput) => {
  const validatedData = CourseSchema.parse(courseData);
  return await safeInsert('courses', validatedData);
};
```

### 3. **Component Security Refactoring**

#### 3.1 Remove XSS Vulnerabilities
```typescript
// Replace dangerouslySetInnerHTML with safe alternatives
// OLD (unsafe):
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// NEW (safe):
<div>{sanitizeHtml(userContent, { allowHtml: true })}</div>
```

#### 3.2 Input Sanitization
```typescript
// Sanitize all user inputs
const handleUserInput = (input: string) => {
  const sanitized = sanitizeInput(input, 'string', {
    maxLength: 1000,
    allowSpecialChars: false
  });
  
  if (!sanitized.isValid) {
    throw new ValidationError('Invalid input', sanitized.errors);
  }
  
  return sanitized.sanitized;
};
```

---

## 📋 Implementation Roadmap

### Week 1-2: Foundation Security
- [ ] Implement Zod schemas for all data types
- [ ] Replace form validation with Zod
- [ ] Remove dangerouslySetInnerHTML usage
- [ ] Implement safe database query patterns
- [ ] Add input sanitization to all forms

### Week 3-4: Domain-Specific Security
- [ ] Secure Learning Management domain
- [ ] Implement AI domain security measures
- [ ] Secure Gamification features
- [ ] Add file upload security

### Week 5-6: Advanced Security
- [ ] Implement CSRF protection
- [ ] Add rate limiting
- [ ] Enhance authentication security
- [ ] Implement data encryption

### Week 7-8: Testing & Optimization
- [ ] Security testing and penetration testing
- [ ] Performance optimization
- [ ] Security monitoring implementation
- [ ] Documentation and training

---

## 🎯 Success Metrics

### Security Improvements
- [ ] Zero XSS vulnerabilities
- [ ] Zero SQL injection risks
- [ ] 100% input validation coverage
- [ ] Secure authentication flow
- [ ] Protected file uploads

### Code Quality
- [ ] Type-safe database operations
- [ ] Consistent validation patterns
- [ ] Comprehensive error handling
- [ ] Clean separation of concerns
- [ ] Maintainable codebase

### Performance
- [ ] Optimized database queries
- [ ] Efficient validation processes
- [ ] Minimal security overhead
- [ ] Fast response times
- [ ] Scalable architecture

---

## 🔧 Development Guidelines

### 1. **Security-First Development**
- Always validate inputs with Zod schemas
- Use parameterized queries for database operations
- Sanitize all user-generated content
- Implement proper error handling
- Follow OWASP security guidelines

### 2. **Code Organization**
- Group related functionality by domain
- Use consistent naming conventions
- Implement proper TypeScript typing
- Follow React best practices
- Maintain clean component architecture

### 3. **Testing Strategy**
- Unit tests for all validation functions
- Integration tests for API endpoints
- Security tests for vulnerability scanning
- Performance tests for optimization
- End-to-end tests for user flows

---

## 📚 Resources & Documentation

### Security Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Zod Documentation](https://zod.dev/)
- [React Security Best Practices](https://react.dev/learn/security)
- [Supabase Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

### Development Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

*This document serves as the comprehensive guide for refactoring the Lrnflix platform with modern security practices and Zod integration. Regular updates and reviews are recommended to ensure the plan remains current and effective.*

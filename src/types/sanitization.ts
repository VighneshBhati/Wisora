/**
 * TypeScript Type Definitions for Sanitization Utilities
 * 
 * This module provides comprehensive type definitions for all sanitization
 * and validation utilities, ensuring type safety across the application.
 */

// ============================================================================
// CORE SANITIZATION TYPES
// ============================================================================

export type SanitizationType = 
  | 'string' 
  | 'number' 
  | 'email' 
  | 'phone' 
  | 'url' 
  | 'html' 
  | 'sql' 
  | 'filepath';

export type ValidationType = 
  | 'string' 
  | 'number' 
  | 'email' 
  | 'boolean' 
  | 'date' 
  | 'array' 
  | 'object';

export type FilterOperator = 
  | 'eq' 
  | 'neq' 
  | 'gt' 
  | 'gte' 
  | 'lt' 
  | 'lte' 
  | 'like' 
  | 'ilike' 
  | 'in' 
  | 'is' 
  | 'not';

export type OrderDirection = 'asc' | 'desc';

export type UserRole = 'student' | 'teacher' | 'admin';

export type CourseStatus = 'draft' | 'published' | 'archived';

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';

export type Currency = 'USD' | 'EUR' | 'EGP';

// ============================================================================
// SANITIZATION OPTIONS TYPES
// ============================================================================

export interface SanitizationOptions {
  /** Maximum length for string inputs */
  maxLength?: number;
  /** Minimum length for string inputs */
  minLength?: number;
  /** Allow HTML tags (use with caution) */
  allowHtml?: boolean;
  /** Allowed HTML tags when allowHtml is true */
  allowedTags?: string[];
  /** Allow special characters */
  allowSpecialChars?: boolean;
  /** Custom regex pattern for validation */
  pattern?: RegExp;
  /** Whether to trim whitespace */
  trim?: boolean;
  /** Default value if input is invalid */
  defaultValue?: any;
  /** Whether to throw errors on validation failure */
  throwOnError?: boolean;
}

export interface NumberValidationOptions {
  min?: number;
  max?: number;
  integer?: boolean;
  defaultValue?: number;
  throwOnError?: boolean;
}

export interface EmailValidationOptions {
  throwOnError?: boolean;
}

// ============================================================================
// VALIDATION RESULT TYPES
// ============================================================================

export interface ValidationResult<T = any> {
  isValid: boolean;
  value: T;
  errors: string[];
  warnings: string[];
}

export interface SanitizedInput<T = any> {
  original: any;
  sanitized: T;
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// VALIDATION SCHEMA TYPES
// ============================================================================

export interface ValidationSchemaField {
  type: ValidationType;
  required?: boolean;
  options?: SanitizationOptions | NumberValidationOptions | EmailValidationOptions;
  customValidator?: (value: any) => ValidationResult;
}

export interface ValidationSchema {
  [key: string]: ValidationSchemaField;
}

// ============================================================================
// QUERY TYPES
// ============================================================================

export interface QueryOptions {
  /** Maximum number of results to return */
  limit?: number;
  /** Number of results to skip */
  offset?: number;
  /** Column to order by */
  orderBy?: string;
  /** Order direction */
  orderDirection?: OrderDirection;
  /** Columns to select */
  select?: string[];
  /** Whether to count total results */
  count?: boolean;
}

export interface FilterCondition {
  column: string;
  operator: FilterOperator;
  value: any;
}

export interface JoinCondition {
  table: string;
  on: string;
  type?: 'inner' | 'left' | 'right' | 'full';
}

export interface SafeQuery {
  query: any;
  params: Record<string, any>;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// DATABASE ENTITY TYPES
// ============================================================================

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  price: number;
  category?: string;
  instructor_id: string;
  cover_image_url?: string;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  content: string;
  student_id: string;
  instructor_id?: string;
  course_id?: string;
  is_anonymous: boolean;
  allow_student_answers: boolean;
  status: 'pending' | 'answered' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface QuestionAnswer {
  id: string;
  question_id: string;
  content: string;
  answered_by: string;
  is_instructor_answer: boolean;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  time_limit?: number;
  max_attempts?: number;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  points: number;
  options?: string[];
  correct_answer: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: Currency;
  payment_method: PaymentMethod;
  course_id: string;
  student_id: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

// ============================================================================
// FORM DATA TYPES
// ============================================================================

export interface SignupFormData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: 'student' | 'teacher';
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface CourseFormData {
  title: string;
  description?: string;
  price: number;
  category?: string;
  cover_image_url?: string;
  status?: CourseStatus;
}

export interface QuestionFormData {
  content: string;
  is_anonymous: boolean;
  allow_student_answers: boolean;
  course_id?: string;
}

export interface QuizFormData {
  title: string;
  description?: string;
  course_id: string;
  time_limit?: number;
  max_attempts?: number;
}

export interface PaymentFormData {
  amount: number;
  currency: Currency;
  payment_method: PaymentMethod;
  course_id: string;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface ApiRequest<T = any> {
  data: T;
  timestamp: string;
  requestId: string;
}

export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  timestamp: string;
  requestId: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
  timestamp: string;
  requestId: string;
}

// ============================================================================
// VALIDATION ERROR TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface ValidationErrorResponse {
  errors: ValidationError[];
  message: string;
  timestamp: string;
}

// ============================================================================
// SANITIZATION CONFIG TYPES
// ============================================================================

export interface SanitizationConfig {
  /** Global maximum string length */
  globalMaxStringLength: number;
  /** Global maximum number value */
  globalMaxNumber: number;
  /** Global minimum number value */
  globalMinNumber: number;
  /** Allowed HTML tags globally */
  globalAllowedHtmlTags: string[];
  /** Whether to throw errors on validation failure globally */
  globalThrowOnError: boolean;
  /** Custom sanitization rules */
  customRules: Record<string, (value: any) => any>;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type NonNullable<T> = T extends null | undefined ? never : T;

export type ArrayElement<T> = T extends (infer U)[] ? U : never;

// ============================================================================
// FUNCTION SIGNATURE TYPES
// ============================================================================

export type SanitizationFunction<T = any> = (
  input: any,
  options?: SanitizationOptions
) => SanitizedInput<T>;

export type ValidationFunction<T = any> = (
  input: any,
  options?: any
) => ValidationResult<T>;

export type QueryBuilderFunction = (
  table: string,
  filters?: FilterCondition[],
  options?: QueryOptions
) => SafeQuery;

export type SafeQueryExecutor<T = any> = () => Promise<{
  data: T[] | null;
  error: any;
  count?: number;
}>;

// ============================================================================
// CONSTANT TYPES
// ============================================================================

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]+$/,
  UUID: /^[a-f0-9\-]{36}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  SLUG: /^[a-z0-9\-]+$/,
} as const;

export const SANITIZATION_LIMITS = {
  MAX_STRING_LENGTH: 1000,
  MAX_EMAIL_LENGTH: 254,
  MAX_PHONE_LENGTH: 20,
  MAX_URL_LENGTH: 500,
  MAX_FILE_PATH_LENGTH: 255,
  MAX_HTML_LENGTH: 10000,
  MAX_NUMBER: Number.MAX_SAFE_INTEGER,
  MIN_NUMBER: Number.MIN_SAFE_INTEGER,
} as const;

export const ALLOWED_HTML_TAGS = [
  'b', 'i', 'em', 'strong', 'p', 'br', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre'
] as const;

export const DANGEROUS_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
  /(--|\/\*|\*\/)/,
  /(\bOR\b|\bAND\b).*(\b1\b|\btrue\b)/i,
  /(\bUNION\b.*\bSELECT\b)/i,
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /on\w+\s*=/gi,
] as const;

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

// All types are already exported above, no need to re-export

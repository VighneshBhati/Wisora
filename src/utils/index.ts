/**
 * Sanitization and Validation Utilities Index
 * 
 * This file exports all sanitization and validation utilities
 * for easy importing throughout the application.
 */

// Core sanitization functions
export {
  sanitizeInput,
  sanitizeHtml,
  sanitizeSql,
  sanitizeFilePath,
  sanitizeEmail,
  sanitizePhone,
  sanitizeUrl,
  validateString,
  validateNumber,
  validateEmail,
  validateObject,
  sanitizeBatch,
  isSafeForDatabase,
  createParameterizedQuery,
  sanitizeFormData,
  type SanitizationOptions,
  type ValidationResult,
  type SanitizedInput
} from './sanitization';

// Validation layers
export {
  validateAgainstSchema,
  validateFormData,
  validateApiRequest,
  validateApiResponse,
  validateDatabaseEntity,
  validateNestedObject,
  createValidationSchema,
  mergeValidationSchemas,
  ValidationSchemas,
  UserValidationSchemas,
  CourseValidationSchemas,
  QuestionValidationSchemas,
  QuizValidationSchemas,
  PaymentValidationSchemas,
  type ValidationSchema,
  type NumberValidationOptions,
  type EmailValidationOptions
} from './validation-layers';

// Query sanitization
export {
  sanitizeColumnName,
  sanitizeTableName,
  sanitizeFilterValue,
  sanitizeQueryOptions,
  buildSelectQuery,
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
  safeSelect,
  safeInsert,
  safeUpdate,
  safeDelete,
  createFilter,
  validateQueryParams,
  SafeQueryBuilder,
  createSafeQuery,
  type QueryOptions,
  type FilterCondition,
  type JoinCondition,
  type SafeQuery
} from './query-sanitizer';

// Type definitions
export type {
  SanitizationType,
  ValidationType,
  FilterOperator,
  OrderDirection,
  UserRole,
  CourseStatus,
  QuestionType,
  PaymentMethod,
  Currency,
  UserProfile,
  Course,
  Question,
  QuestionAnswer,
  Quiz,
  QuizQuestion,
  PaymentTransaction,
  SignupFormData,
  LoginFormData,
  CourseFormData,
  QuestionFormData,
  QuizFormData,
  PaymentFormData,
  ApiRequest,
  ApiResponse,
  PaginatedResponse,
  ValidationError,
  ValidationErrorResponse,
  SanitizationConfig,
  DeepPartial,
  RequiredFields,
  OptionalFields,
  NonNullable,
  ArrayElement,
  SanitizationFunction,
  ValidationFunction,
  QueryBuilderFunction,
  SafeQueryExecutor
} from '../types/sanitization';

// Constants
export {
  VALIDATION_PATTERNS,
  SANITIZATION_LIMITS,
  ALLOWED_HTML_TAGS,
  DANGEROUS_PATTERNS
} from '../types/sanitization';

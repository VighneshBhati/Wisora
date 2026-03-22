/**
 * Validation Layers for Different Data Types
 * 
 * This module provides specialized validation layers for various data types
 * and use cases in the application, following clean architecture principles.
 * 
 * Features:
 * - Type-specific validation schemas
 * - Form validation layers
 * - API request/response validation
 * - Database entity validation
 * - Custom validation rules
 */

import { 
  validateString, 
  validateNumber, 
  validateEmail, 
  validateObject,
  ValidationResult,
  SanitizationOptions 
} from './sanitization';

// Additional type definitions for validation options
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
// VALIDATION SCHEMAS
// ============================================================================

export interface ValidationSchema {
  [key: string]: {
    type: 'string' | 'number' | 'email' | 'boolean' | 'date' | 'array' | 'object';
    required?: boolean;
    options?: SanitizationOptions | NumberValidationOptions | EmailValidationOptions;
    customValidator?: (value: unknown) => ValidationResult;
  };
}

// ============================================================================
// USER VALIDATION LAYERS
// ============================================================================

export const UserValidationSchemas = {
  profile: {
    full_name: {
      type: 'string' as const,
      required: true,
      options: { minLength: 2, maxLength: 100, trim: true }
    },
    email: {
      type: 'email' as const,
      required: true
    },
    phone_number: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 20, pattern: /^[\d\s\-+()]+$/ }
    },
    role: {
      type: 'string' as const,
      required: true,
      options: { pattern: /^(student|teacher|admin)$/ }
    },
    avatar_url: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 500 }
    }
  },

  signup: {
    email: {
      type: 'email' as const,
      required: true
    },
    password: {
      type: 'string' as const,
      required: true,
      options: { minLength: 8, maxLength: 128 },
      customValidator: (value: string) => {
        const errors: string[] = [];
        const warnings: string[] = [];

        if (!/(?=.*[a-z])/.test(value)) {
          errors.push('Password must contain at least one lowercase letter');
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          errors.push('Password must contain at least one uppercase letter');
        }
        if (!/(?=.*\d)/.test(value)) {
          errors.push('Password must contain at least one number');
        }
        if (!/(?=.*[@$!%*?&])/.test(value)) {
          errors.push('Password must contain at least one special character');
        }

        return {
          isValid: errors.length === 0,
          value,
          errors,
          warnings
        };
      }
    },
    fullName: {
      type: 'string' as const,
      required: true,
      options: { minLength: 2, maxLength: 100, trim: true }
    },
    phone: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 20, pattern: /^[\d\s\-+()]+$/ }
    },
    role: {
      type: 'string' as const,
      required: true,
      options: { pattern: /^(student|teacher)$/ }
    }
  }
};

// ============================================================================
// COURSE VALIDATION LAYERS
// ============================================================================

export const CourseValidationSchemas = {
  create: {
    title: {
      type: 'string' as const,
      required: true,
      options: { minLength: 3, maxLength: 200, trim: true }
    },
    description: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 2000, trim: true }
    },
    price: {
      type: 'number' as const,
      required: true,
      options: { min: 0, max: 10000, integer: false }
    },
    category: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 50, trim: true }
    },
    cover_image_url: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 500 }
    },
    status: {
      type: 'string' as const,
      required: false,
      options: { pattern: /^(draft|published|archived)$/ }
    }
  },

  update: {
    title: {
      type: 'string' as const,
      required: false,
      options: { minLength: 3, maxLength: 200, trim: true }
    },
    description: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 2000, trim: true }
    },
    price: {
      type: 'number' as const,
      required: false,
      options: { min: 0, max: 10000, integer: false }
    },
    category: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 50, trim: true }
    },
    cover_image_url: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 500 }
    },
    status: {
      type: 'string' as const,
      required: false,
      options: { pattern: /^(draft|published|archived)$/ }
    }
  }
};

// ============================================================================
// QUESTION VALIDATION LAYERS
// ============================================================================

export const QuestionValidationSchemas = {
  create: {
    content: {
      type: 'string' as const,
      required: true,
      options: { minLength: 10, maxLength: 1000, trim: true }
    },
    is_anonymous: {
      type: 'boolean' as const,
      required: false
    },
    allow_student_answers: {
      type: 'boolean' as const,
      required: false
    },
    course_id: {
      type: 'string' as const,
      required: false,
      options: { pattern: /^[a-f0-9-]{36}$/ }
    }
  },

  answer: {
    content: {
      type: 'string' as const,
      required: true,
      options: { minLength: 5, maxLength: 2000, trim: true }
    },
    question_id: {
      type: 'string' as const,
      required: true,
      options: { pattern: /^[a-f0-9-]{36}$/ }
    }
  }
};

// ============================================================================
// QUIZ VALIDATION LAYERS
// ============================================================================

export const QuizValidationSchemas = {
  create: {
    title: {
      type: 'string' as const,
      required: true,
      options: { minLength: 3, maxLength: 200, trim: true }
    },
    description: {
      type: 'string' as const,
      required: false,
      options: { maxLength: 1000, trim: true }
    },
    course_id: {
      type: 'string' as const,
      required: true,
      options: { pattern: /^[a-f0-9-]{36}$/ }
    },
    time_limit: {
      type: 'number' as const,
      required: false,
      options: { min: 1, max: 300, integer: true }
    },
    max_attempts: {
      type: 'number' as const,
      required: false,
      options: { min: 1, max: 10, integer: true }
    }
  },

  question: {
    question_text: {
      type: 'string' as const,
      required: true,
      options: { minLength: 5, maxLength: 1000, trim: true }
    },
    question_type: {
      type: 'string' as const,
      required: true,
      options: { pattern: /^(multiple_choice|true_false|short_answer|essay)$/ }
    },
    points: {
      type: 'number' as const,
      required: true,
      options: { min: 1, max: 100, integer: true }
    },
    options: {
      type: 'array' as const,
      required: false,
      customValidator: (value: unknown) => {
        const errors: string[] = [];
        const warnings: string[] = [];

        if (!Array.isArray(value)) {
          errors.push('Options must be an array');
          return { isValid: false, value: [], errors, warnings };
        }

        const arrayValue = value as unknown[];

        if (arrayValue.length < 2) {
          errors.push('At least 2 options are required');
        }

        if (arrayValue.length > 10) {
          errors.push('Maximum 10 options allowed');
        }

        for (let i = 0; i < arrayValue.length; i++) {
          if (typeof arrayValue[i] !== 'string' || (arrayValue[i] as string).trim().length === 0) {
            errors.push(`Option ${i + 1} must be a non-empty string`);
          }
        }

        return {
          isValid: errors.length === 0,
          value: arrayValue,
          errors,
          warnings
        };
      }
    },
    correct_answer: {
      type: 'string' as const,
      required: true,
      options: { maxLength: 1000, trim: true }
    }
  }
};

// ============================================================================
// PAYMENT VALIDATION LAYERS
// ============================================================================

export const PaymentValidationSchemas = {
  transaction: {
    amount: {
      type: 'number' as const,
      required: true,
      options: { min: 0.01, max: 10000, integer: false }
    },
    currency: {
      type: 'string' as const,
      required: true,
      options: { pattern: /^(USD|EUR|EGP)$/ }
    },
    payment_method: {
      type: 'string' as const,
      required: true,
      options: { pattern: /^(credit_card|debit_card|paypal|bank_transfer)$/ }
    },
    course_id: {
      type: 'string' as const,
      required: true,
      options: { pattern: /^[a-f0-9-]{36}$/ }
    }
  }
};

// ============================================================================
// VALIDATION LAYER FUNCTIONS
// ============================================================================

/**
 * Validates data against a schema
 */
export function validateAgainstSchema<T = unknown>(
  data: unknown,
  schema: ValidationSchema,
  options: { throwOnError?: boolean; partial?: boolean } = {}
): ValidationResult<T> {
  const { throwOnError = false, partial = false } = options;
  const errors: string[] = [];
  const warnings: string[] = [];
  const result: Record<string, unknown> = {};

  for (const [field, config] of Object.entries(schema)) {
    const value = data[field];
    const isRequired = config.required && !partial;

    // Check if required field is missing
    if (isRequired && (value === undefined || value === null || value === '')) {
      const error = `Field '${field}' is required`;
      errors.push(error);
      if (throwOnError) throw new Error(error);
      continue;
    }

    // Skip validation for optional missing fields
    if (!isRequired && (value === undefined || value === null || value === '')) {
      result[field] = value;
      continue;
    }

    let validation: ValidationResult<unknown>;

    // Use custom validator if provided
    if (config.customValidator) {
      validation = config.customValidator(value);
    } else {
      // Use type-specific validators
      switch (config.type) {
        case 'string':
          validation = validateString(value, config.options as SanitizationOptions);
          break;
        case 'number':
          validation = validateNumber(value, config.options as NumberValidationOptions);
          break;
        case 'email':
          validation = validateEmail(value, config.options as EmailValidationOptions);
          break;
        case 'boolean': {
          validation = {
            isValid: typeof value === 'boolean',
            value: Boolean(value),
            errors: typeof value !== 'boolean' ? ['Must be a boolean'] : [],
            warnings: []
          };
          break;
        }
        case 'date': {
          const date = new Date(value);
          validation = {
            isValid: !isNaN(date.getTime()),
            value: date,
            errors: isNaN(date.getTime()) ? ['Invalid date format'] : [],
            warnings: []
          };
          break;
        }
        case 'array': {
          validation = {
            isValid: Array.isArray(value),
            value: Array.isArray(value) ? value : [],
            errors: !Array.isArray(value) ? ['Must be an array'] : [],
            warnings: []
          };
          break;
        }
        case 'object': {
          validation = {
            isValid: typeof value === 'object' && value !== null && !Array.isArray(value),
            value: typeof value === 'object' && value !== null && !Array.isArray(value) ? value : {},
            errors: typeof value !== 'object' || value === null || Array.isArray(value) ? ['Must be an object'] : [],
            warnings: []
          };
          break;
        }
        default:
          throw new Error(`Unknown validation type: ${config.type}`);
      }
    }

    if (!validation.isValid) {
      errors.push(`${field}: ${validation.errors.join(', ')}`);
    }

    if (validation.warnings.length > 0) {
      warnings.push(`${field}: ${validation.warnings.join(', ')}`);
    }

    result[field] = validation.value;
  }

  return {
    isValid: errors.length === 0,
    value: result as T,
    errors,
    warnings
  };
}

/**
 * Validates form data with specific schema
 */
export function validateFormData<T = unknown>(
  formData: unknown,
  schemaName: keyof typeof ValidationSchemas,
  options: { throwOnError?: boolean; partial?: boolean } = {}
): ValidationResult<T> {
  const schemas = {
    ...UserValidationSchemas,
    ...CourseValidationSchemas,
    ...QuestionValidationSchemas,
    ...QuizValidationSchemas,
    ...PaymentValidationSchemas
  };

  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Unknown schema: ${String(schemaName)}`);
  }

  return validateAgainstSchema<T>(formData, schema, options);
}

/**
 * Validates API request data
 */
export function validateApiRequest<T = unknown>(
  requestData: unknown,
  schema: ValidationSchema,
  options: { throwOnError?: boolean } = {}
): ValidationResult<T> {
  return validateAgainstSchema<T>(requestData, schema, { ...options, partial: false });
}

/**
 * Validates API response data
 */
export function validateApiResponse<T = unknown>(
  responseData: unknown,
  schema: ValidationSchema,
  options: { throwOnError?: boolean } = {}
): ValidationResult<T> {
  return validateAgainstSchema<T>(responseData, schema, { ...options, partial: true });
}

/**
 * Validates database entity
 */
export function validateDatabaseEntity<T = unknown>(
  entity: unknown,
  schema: ValidationSchema,
  options: { throwOnError?: boolean } = {}
): ValidationResult<T> {
  return validateAgainstSchema<T>(entity, schema, { ...options, partial: false });
}

// ============================================================================
// VALIDATION SCHEMAS EXPORT
// ============================================================================

export const ValidationSchemas = {
  ...UserValidationSchemas,
  ...CourseValidationSchemas,
  ...QuestionValidationSchemas,
  ...QuizValidationSchemas,
  ...PaymentValidationSchemas
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a custom validation schema
 */
export function createValidationSchema(
  fields: Record<string, {
    type: 'string' | 'number' | 'email' | 'boolean' | 'date' | 'array' | 'object';
    required?: boolean;
    options?: SanitizationOptions;
    customValidator?: (value: unknown) => ValidationResult;
  }>
): ValidationSchema {
  return fields;
}

/**
 * Merges multiple validation schemas
 */
export function mergeValidationSchemas(...schemas: ValidationSchema[]): ValidationSchema {
  return schemas.reduce((merged, schema) => ({ ...merged, ...schema }), {});
}

/**
 * Validates nested object structure
 */
export function validateNestedObject<T = unknown>(
  data: unknown,
  schema: Record<string, ValidationSchema>,
  options: { throwOnError?: boolean } = {}
): ValidationResult<T> {
  const { throwOnError = false } = options;
  const errors: string[] = [];
  const warnings: string[] = [];
  const result: Record<string, unknown> = {};

  for (const [key, nestedSchema] of Object.entries(schema)) {
    const value = data[key];
    
    if (value === undefined || value === null) {
      result[key] = value;
      continue;
    }

    const validation = validateAgainstSchema(value, nestedSchema, { throwOnError });
    
    if (!validation.isValid) {
      errors.push(`${key}: ${validation.errors.join(', ')}`);
    }

    if (validation.warnings.length > 0) {
      warnings.push(`${key}: ${validation.warnings.join(', ')}`);
    }

    result[key] = validation.value;
  }

  return {
    isValid: errors.length === 0,
    value: result as T,
    errors,
    warnings
  };
}

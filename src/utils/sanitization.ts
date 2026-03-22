/**
 * Comprehensive Sanitization Utilities
 * 
 * This module provides robust input sanitization and validation utilities
 * following OWASP security guidelines and community best practices.
 * 
 * Features:
 * - XSS protection
 * - SQL injection prevention
 * - Input validation and normalization
 * - Type-safe sanitization
 * - Performance optimized
 */

// ============================================================================
// TYPES AND INTERFACES
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
// CORE SANITIZATION FUNCTIONS
// ============================================================================

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export function sanitizeHtml(input: string, options: SanitizationOptions = {}): string {
  if (typeof input !== 'string') {
    return options.defaultValue || '';
  }

  const {
    allowHtml = false,
    allowedTags = ['b', 'i', 'em', 'strong', 'p', 'br'],
    trim = true
  } = options;

  let sanitized = input;

  if (trim) {
    sanitized = sanitized.trim();
  }

  if (!allowHtml) {
    // Remove all HTML tags and decode entities
    sanitized = sanitized
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&#x60;/g, '`')
      .replace(/&#x3D;/g, '=');
  } else {
    // Allow only specific HTML tags
    const allowedTagsRegex = new RegExp(`<(?!\\/?(?:${allowedTags.join('|')})\\b)[^>]*>`, 'gi');
    sanitized = sanitized.replace(allowedTagsRegex, '');
  }

  // Remove dangerous attributes and event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*javascript\s*:/gi, '');
  sanitized = sanitized.replace(/\s*vbscript\s*:/gi, '');
  sanitized = sanitized.replace(/\s*data\s*:/gi, '');

  return sanitized;
}

/**
 * Sanitizes SQL input to prevent injection attacks
 */
export function sanitizeSql(input: any): string {
  if (input === null || input === undefined) {
    return 'NULL';
  }

  if (typeof input === 'boolean') {
    return input ? 'TRUE' : 'FALSE';
  }

  if (typeof input === 'number') {
    return input.toString();
  }

  if (typeof input === 'string') {
    // Escape single quotes and backslashes
    return `'${input.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
  }

  if (input instanceof Date) {
    return `'${input.toISOString()}'`;
  }

  if (Array.isArray(input)) {
    return `(${input.map(item => sanitizeSql(item)).join(', ')})`;
  }

  if (typeof input === 'object') {
    return `'${JSON.stringify(input).replace(/'/g, "''")}'`;
  }

  return 'NULL';
}

/**
 * Sanitizes file paths to prevent directory traversal attacks
 */
export function sanitizeFilePath(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/\.\./g, '') // Remove directory traversal
    .replace(/[<>:"|?*]/g, '') // Remove invalid filename characters
    .replace(/^[\/\\]+/, '') // Remove leading slashes
    .replace(/[\/\\]+$/, '') // Remove trailing slashes
    .replace(/[\/\\]{2,}/g, '/') // Replace multiple slashes with single
    .trim();
}

/**
 * Sanitizes email addresses
 */
export function sanitizeEmail(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w@.-]/g, '') // Remove invalid characters
    .substring(0, 254); // Email length limit
}

/**
 * Sanitizes phone numbers
 */
export function sanitizePhone(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[^\d+\-\(\)\s]/g, '') // Keep only digits, +, -, (, ), and spaces
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

/**
 * Sanitizes URLs
 */
export function sanitizeUrl(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  try {
    const url = new URL(input);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return '';
    }

    return url.toString();
  } catch {
    return '';
  }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates and sanitizes string input
 */
export function validateString(
  input: any,
  options: SanitizationOptions = {}
): ValidationResult<string> {
  const {
    maxLength = 1000,
    minLength = 0,
    pattern,
    trim = true,
    allowSpecialChars = true,
    defaultValue = '',
    throwOnError = false
  } = options;

  const errors: string[] = [];
  const warnings: string[] = [];

  // Convert to string if not already
  let value = typeof input === 'string' ? input : String(input || '');

  // Trim if requested
  if (trim) {
    value = value.trim();
  }

  // Check length constraints
  if (value.length < minLength) {
    const error = `String too short. Minimum length: ${minLength}`;
    errors.push(error);
    if (throwOnError) throw new Error(error);
  }

  if (value.length > maxLength) {
    const error = `String too long. Maximum length: ${maxLength}`;
    errors.push(error);
    if (throwOnError) throw new Error(error);
    value = value.substring(0, maxLength);
    warnings.push('String truncated to maximum length');
  }

  // Check pattern if provided
  if (pattern && !pattern.test(value)) {
    const error = 'String does not match required pattern';
    errors.push(error);
    if (throwOnError) throw new Error(error);
  }

  // Sanitize HTML
  value = sanitizeHtml(value, { allowHtml: false, trim: false });

  // Check for special characters if not allowed
  if (!allowSpecialChars && /[<>'"&]/.test(value)) {
    warnings.push('Special characters detected and removed');
  }

  return {
    isValid: errors.length === 0,
    value: errors.length === 0 ? value : defaultValue,
    errors,
    warnings
  };
}

/**
 * Validates and sanitizes number input
 */
export function validateNumber(
  input: any,
  options: {
    min?: number;
    max?: number;
    integer?: boolean;
    defaultValue?: number;
    throwOnError?: boolean;
  } = {}
): ValidationResult<number> {
  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    integer = false,
    defaultValue = 0,
    throwOnError = false
  } = options;

  const errors: string[] = [];
  const warnings: string[] = [];

  let value: number;

  // Convert to number
  if (typeof input === 'number') {
    value = input;
  } else if (typeof input === 'string') {
    value = parseFloat(input);
  } else {
    const error = 'Invalid number input';
    errors.push(error);
    if (throwOnError) throw new Error(error);
    return {
      isValid: false,
      value: defaultValue,
      errors,
      warnings
    };
  }

  // Check for NaN
  if (isNaN(value)) {
    const error = 'Input is not a valid number';
    errors.push(error);
    if (throwOnError) throw new Error(error);
    return {
      isValid: false,
      value: defaultValue,
      errors,
      warnings
    };
  }

  // Check for infinity
  if (!isFinite(value)) {
    const error = 'Number cannot be infinite';
    errors.push(error);
    if (throwOnError) throw new Error(error);
    return {
      isValid: false,
      value: defaultValue,
      errors,
      warnings
    };
  }

  // Check integer constraint
  if (integer && !Number.isInteger(value)) {
    const error = 'Number must be an integer';
    errors.push(error);
    if (throwOnError) throw new Error(error);
    value = Math.round(value);
    warnings.push('Number rounded to nearest integer');
  }

  // Check range constraints
  if (value < min) {
    const error = `Number too small. Minimum: ${min}`;
    errors.push(error);
    if (throwOnError) throw new Error(error);
  }

  if (value > max) {
    const error = `Number too large. Maximum: ${max}`;
    errors.push(error);
    if (throwOnError) throw new Error(error);
  }

  return {
    isValid: errors.length === 0,
    value: errors.length === 0 ? value : defaultValue,
    errors,
    warnings
  };
}

/**
 * Validates and sanitizes email input
 */
export function validateEmail(
  input: any,
  options: { throwOnError?: boolean } = {}
): ValidationResult<string> {
  const { throwOnError = false } = options;
  const errors: string[] = [];
  const warnings: string[] = [];

  const email = sanitizeEmail(String(input || ''));

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    const error = 'Invalid email format';
    errors.push(error);
    if (throwOnError) throw new Error(error);
  }

  if (email.length > 254) {
    const error = 'Email too long';
    errors.push(error);
    if (throwOnError) throw new Error(error);
  }

  return {
    isValid: errors.length === 0,
    value: email,
    errors,
    warnings
  };
}

/**
 * Validates and sanitizes object input
 */
export function validateObject<T = Record<string, any>>(
  input: any,
  schema: Record<string, (value: any) => ValidationResult>,
  options: { throwOnError?: boolean } = {}
): ValidationResult<T> {
  const { throwOnError = false } = options;
  const errors: string[] = [];
  const warnings: string[] = [];

  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    const error = 'Input must be a valid object';
    errors.push(error);
    if (throwOnError) throw new Error(error);
    return {
      isValid: false,
      value: {} as T,
      errors,
      warnings
    };
  }

  const result: any = {};
  let isValid = true;

  for (const [key, validator] of Object.entries(schema)) {
    const validation = validator(input[key]);
    
    if (!validation.isValid) {
      isValid = false;
      errors.push(`${key}: ${validation.errors.join(', ')}`);
    }
    
    if (validation.warnings.length > 0) {
      warnings.push(`${key}: ${validation.warnings.join(', ')}`);
    }
    
    result[key] = validation.value;
  }

  return {
    isValid,
    value: result as T,
    errors,
    warnings
  };
}

// ============================================================================
// HIGH-LEVEL SANITIZATION FUNCTIONS
// ============================================================================

/**
 * Comprehensive input sanitization with validation
 */
export function sanitizeInput<T = any>(
  input: any,
  type: 'string' | 'number' | 'email' | 'phone' | 'url' | 'html' | 'sql' | 'filepath',
  options: SanitizationOptions = {}
): SanitizedInput<T> {
  const original = input;
  let sanitized: any;
  let isValid = true;
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    switch (type) {
      case 'string': {
        const stringResult = validateString(input, options);
        sanitized = stringResult.value;
        isValid = stringResult.isValid;
        errors.push(...stringResult.errors);
        warnings.push(...stringResult.warnings);
        break;
      }

      case 'number': {
        const numberResult = validateNumber(input, options);
        sanitized = numberResult.value;
        isValid = numberResult.isValid;
        errors.push(...numberResult.errors);
        warnings.push(...numberResult.warnings);
        break;
      }

      case 'email': {
        const emailResult = validateEmail(input, options);
        sanitized = emailResult.value;
        isValid = emailResult.isValid;
        errors.push(...emailResult.errors);
        warnings.push(...emailResult.warnings);
        break;
      }

      case 'phone':
        sanitized = sanitizePhone(String(input || ''));
        break;

      case 'url':
        sanitized = sanitizeUrl(String(input || ''));
        break;

      case 'html':
        sanitized = sanitizeHtml(String(input || ''), options);
        break;

      case 'sql':
        sanitized = sanitizeSql(input);
        break;

      case 'filepath':
        sanitized = sanitizeFilePath(String(input || ''));
        break;

      default:
        throw new Error(`Unknown sanitization type: ${type}`);
    }
  } catch (error) {
    isValid = false;
    errors.push(error instanceof Error ? error.message : 'Sanitization failed');
    sanitized = options.defaultValue || null;
  }

  return {
    original,
    sanitized: sanitized as T,
    isValid,
    errors,
    warnings
  };
}

/**
 * Batch sanitization for multiple inputs
 */
export function sanitizeBatch(
  inputs: Record<string, { value: any; type: string; options?: SanitizationOptions }>
): Record<string, SanitizedInput> {
  const results: Record<string, SanitizedInput> = {};

  for (const [key, config] of Object.entries(inputs)) {
    results[key] = sanitizeInput(
      config.value,
      config.type as any,
      config.options || {}
    );
  }

  return results;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if a value is safe for database operations
 */
export function isSafeForDatabase(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    // Check for SQL injection patterns
    const dangerousPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(--|\/\*|\*\/)/,
      /(\bOR\b|\bAND\b).*(\b1\b|\btrue\b)/i,
      /(\bUNION\b.*\bSELECT\b)/i
    ];

    return !dangerousPatterns.some(pattern => pattern.test(value));
  }

  if (typeof value === 'number' && isFinite(value)) {
    return true;
  }

  if (typeof value === 'boolean') {
    return true;
  }

  if (value instanceof Date) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(item => isSafeForDatabase(item));
  }

  if (typeof value === 'object') {
    return Object.values(value).every(item => isSafeForDatabase(item));
  }

  return false;
}

/**
 * Creates a safe parameterized query string
 */
export function createParameterizedQuery(
  query: string,
  params: Record<string, any>
): { query: string; values: any[] } {
  const values: any[] = [];
  let paramIndex = 1;

  const safeQuery = query.replace(/\$\{(\w+)\}/g, (match, paramName) => {
    const value = params[paramName];
    
    if (!isSafeForDatabase(value)) {
      throw new Error(`Unsafe parameter: ${paramName}`);
    }

    values.push(value);
    return `$${paramIndex++}`;
  });

  return { query: safeQuery, values };
}

/**
 * Sanitizes form data object
 */
export function sanitizeFormData<T extends Record<string, any>>(
  formData: T,
  schema: Record<keyof T, { type: string; options?: SanitizationOptions }>
): { data: T; errors: Record<string, string[]>; warnings: Record<string, string[]> } {
  const sanitizedData = {} as T;
  const errors: Record<string, string[]> = {};
  const warnings: Record<string, string[]> = {};

  for (const [key, config] of Object.entries(schema)) {
    const result = sanitizeInput(formData[key], config.type as any, config.options);
    
    sanitizedData[key as keyof T] = result.sanitized;
    
    if (result.errors.length > 0) {
      errors[key] = result.errors;
    }
    
    if (result.warnings.length > 0) {
      warnings[key] = result.warnings;
    }
  }

  return { data: sanitizedData, errors, warnings };
}

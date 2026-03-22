/**
 * Query Sanitizer for Database Operations
 * 
 * This module provides secure query building and parameterization utilities
 * specifically designed for Supabase and other database operations.
 * 
 * Features:
 * - Parameterized query building
 * - SQL injection prevention
 * - Type-safe query construction
 * - Supabase-specific optimizations
 * - Query validation and sanitization
 */

import { supabase } from '../integrations/supabase/client';
import { sanitizeInput, isSafeForDatabase, createParameterizedQuery } from './sanitization';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export interface QueryOptions {
  /** Maximum number of results to return */
  limit?: number;
  /** Number of results to skip */
  offset?: number;
  /** Column to order by */
  orderBy?: string;
  /** Order direction */
  orderDirection?: 'asc' | 'desc';
  /** Columns to select */
  select?: string[];
  /** Whether to count total results */
  count?: boolean;
}

export interface FilterCondition {
  column: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'in' | 'is' | 'not';
  value: any;
}

export interface JoinCondition {
  table: string;
  on: string;
  type?: 'inner' | 'left' | 'right' | 'full';
}

export interface SafeQuery {
  query: unknown;
  params: Record<string, unknown>;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// CORE QUERY SANITIZATION FUNCTIONS
// ============================================================================

/**
 * Sanitizes column names to prevent SQL injection
 */
export function sanitizeColumnName(column: string): string {
  if (typeof column !== 'string') {
    throw new Error('Column name must be a string');
  }

  // Remove dangerous characters and validate format
  const sanitized = column
    .replace(/[^a-zA-Z0-9_]/g, '') // Only allow alphanumeric and underscore
    .toLowerCase();

  if (sanitized.length === 0) {
    throw new Error('Invalid column name');
  }

  return sanitized;
}

/**
 * Sanitizes table names to prevent SQL injection
 */
export function sanitizeTableName(table: string): string {
  if (typeof table !== 'string') {
    throw new Error('Table name must be a string');
  }

  // Remove dangerous characters and validate format
  const sanitized = table
    .replace(/[^a-zA-Z0-9_]/g, '') // Only allow alphanumeric and underscore
    .toLowerCase();

  if (sanitized.length === 0) {
    throw new Error('Invalid table name');
  }

  return sanitized;
}

/**
 * Sanitizes filter values based on operator type
 */
export function sanitizeFilterValue(value: unknown, operator: FilterCondition['operator']): unknown {
  if (value === null || value === undefined) {
    return null;
  }

  switch (operator) {
    case 'eq':
    case 'neq':
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte':
      return sanitizeInput(value, 'string').sanitized;
    
    case 'like':
    case 'ilike':
      return sanitizeInput(value, 'string').sanitized;
    
    case 'in':
      if (!Array.isArray(value)) {
        throw new Error('IN operator requires an array value');
      }
      return value.map(item => sanitizeInput(item, 'string').sanitized);
    
    case 'is':
    case 'not':
      if (value !== null && value !== 'null') {
        throw new Error('IS/NOT operators only accept null values');
      }
      return null;
    
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

/**
 * Validates and sanitizes query options
 */
export function sanitizeQueryOptions(options: QueryOptions = {}): QueryOptions {
  const sanitized: QueryOptions = {};

  if (options.limit !== undefined) {
    const limitResult = sanitizeInput(options.limit, 'number', { 
      min: 1, 
      max: 1000, 
      integer: true 
    } as unknown);
    if (limitResult.isValid) {
      sanitized.limit = limitResult.sanitized;
    }
  }

  if (options.offset !== undefined) {
    const offsetResult = sanitizeInput(options.offset, 'number', { 
      min: 0, 
      max: 10000, 
      integer: true 
    } as unknown);
    if (offsetResult.isValid) {
      sanitized.offset = offsetResult.sanitized;
    }
  }

  if (options.orderBy) {
    sanitized.orderBy = sanitizeColumnName(options.orderBy);
  }

  if (options.orderDirection) {
    if (['asc', 'desc'].includes(options.orderDirection)) {
      sanitized.orderDirection = options.orderDirection;
    }
  }

  if (options.select && Array.isArray(options.select)) {
    sanitized.select = options.select.map(col => sanitizeColumnName(col));
  }

  if (options.count !== undefined) {
    sanitized.count = Boolean(options.count);
  }

  return sanitized;
}

// ============================================================================
// SUPABASE QUERY BUILDERS
// ============================================================================

/**
 * Builds a safe SELECT query for Supabase
 */
export function buildSelectQuery(
  table: string,
  filters: FilterCondition[] = [],
  options: QueryOptions = {}
): SafeQuery {
  const errors: string[] = [];
  const warnings: string[] = [];
  const params: Record<string, unknown> = {};

  try {
    // Sanitize table name
    const sanitizedTable = sanitizeTableName(table);
    
    // Sanitize options
    const sanitizedOptions = sanitizeQueryOptions(options);
    
    // Start building the query - use type assertion to work around Supabase typing
    let query = supabase.from(sanitizedTable as never) as any;

    // Apply select columns
    if (sanitizedOptions.select && sanitizedOptions.select.length > 0) {
      query = query.select(sanitizedOptions.select.join(', '));
    } else {
      query = query.select('*');
    }

    // Apply filters
    for (const filter of filters) {
      try {
        const sanitizedColumn = sanitizeColumnName(filter.column);
        const sanitizedValue = sanitizeFilterValue(filter.value, filter.operator);
        
        // Store parameter for reference
        const paramKey = `${sanitizedColumn}_${filter.operator}`;
        params[paramKey] = sanitizedValue;

        // Apply filter based on operator
        switch (filter.operator) {
          case 'eq':
            query = query.eq(sanitizedColumn, sanitizedValue);
            break;
          case 'neq':
            query = query.neq(sanitizedColumn, sanitizedValue);
            break;
          case 'gt':
            query = query.gt(sanitizedColumn, sanitizedValue);
            break;
          case 'gte':
            query = query.gte(sanitizedColumn, sanitizedValue);
            break;
          case 'lt':
            query = query.lt(sanitizedColumn, sanitizedValue);
            break;
          case 'lte':
            query = query.lte(sanitizedColumn, sanitizedValue);
            break;
          case 'like':
            query = query.like(sanitizedColumn, sanitizedValue);
            break;
          case 'ilike':
            query = query.ilike(sanitizedColumn, sanitizedValue);
            break;
          case 'in':
            query = query.in(sanitizedColumn, sanitizedValue);
            break;
          case 'is':
            query = query.is(sanitizedColumn, null);
            break;
          case 'not':
            query = query.not(sanitizedColumn, 'is', null);
            break;
        }
      } catch (error) {
        errors.push(`Filter error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Apply ordering
    if (sanitizedOptions.orderBy) {
      query = query.order(sanitizedOptions.orderBy, { 
        ascending: sanitizedOptions.orderDirection !== 'desc' 
      });
    }

    // Apply pagination
    if (sanitizedOptions.limit) {
      query = query.limit(sanitizedOptions.limit);
    }

    if (sanitizedOptions.offset) {
      query = query.range(sanitizedOptions.offset, sanitizedOptions.offset + (sanitizedOptions.limit || 10) - 1);
    }

    // Apply count if requested
    if (sanitizedOptions.count) {
      query = query.select('*', { count: 'exact', head: true });
    }

    return {
      query,
      params,
      errors,
      warnings
    };

  } catch (error) {
    errors.push(`Query build error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      query: null,
      params: {},
      errors,
      warnings
    };
  }
}

/**
 * Builds a safe INSERT query for Supabase
 */
export function buildInsertQuery(
  table: string,
  data: Record<string, unknown> | Record<string, unknown>[],
  options: { returning?: string[] } = {}
): SafeQuery {
  const errors: string[] = [];
  const warnings: string[] = [];
  const params: Record<string, unknown> = {};

  try {
    // Sanitize table name
    const sanitizedTable = sanitizeTableName(table);
    
    // Sanitize data
    const sanitizedData = Array.isArray(data) ? data : [data];
    const processedData = sanitizedData.map(item => {
      const sanitized: Record<string, unknown> = {};
      
      for (const [key, value] of Object.entries(item)) {
        const sanitizedKey = sanitizeColumnName(key);
        
        if (!isSafeForDatabase(value)) {
          errors.push(`Unsafe value for column ${sanitizedKey}`);
          continue;
        }
        
        sanitized[sanitizedKey] = value;
        params[`${sanitizedKey}_${Date.now()}`] = value;
      }
      
      return sanitized;
    });

    // Build query - use type assertion to work around Supabase typing
    let query = (supabase.from(sanitizedTable as never) as any).insert(processedData);

    // Apply returning clause
    if (options.returning && options.returning.length > 0) {
      const sanitizedReturning = options.returning.map(col => sanitizeColumnName(col));
      query = query.select(sanitizedReturning.join(', '));
    }

    return {
      query,
      params,
      errors,
      warnings
    };

  } catch (error) {
    errors.push(`Insert query build error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      query: null,
      params: {},
      errors,
      warnings
    };
  }
}

/**
 * Builds a safe UPDATE query for Supabase
 */
export function buildUpdateQuery(
  table: string,
  data: Record<string, unknown>,
  filters: FilterCondition[] = [],
  options: { returning?: string[] } = {}
): SafeQuery {
  const errors: string[] = [];
  const warnings: string[] = [];
  const params: Record<string, unknown> = {};

  try {
    // Sanitize table name
    const sanitizedTable = sanitizeTableName(table);
    
    // Sanitize update data
    const sanitizedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const sanitizedKey = sanitizeColumnName(key);
      
      if (!isSafeForDatabase(value)) {
        errors.push(`Unsafe value for column ${sanitizedKey}`);
        continue;
      }
      
      sanitizedData[sanitizedKey] = value;
      params[`update_${sanitizedKey}`] = value;
    }

    // Build query - use type assertion to work around Supabase typing
    let query = (supabase.from(sanitizedTable as never) as any).update(sanitizedData);

    // Apply filters
    for (const filter of filters) {
      try {
        const sanitizedColumn = sanitizeColumnName(filter.column);
        const sanitizedValue = sanitizeFilterValue(filter.value, filter.operator);
        
        params[`filter_${sanitizedColumn}_${filter.operator}`] = sanitizedValue;

        switch (filter.operator) {
          case 'eq':
            query = query.eq(sanitizedColumn, sanitizedValue);
            break;
          case 'neq':
            query = query.neq(sanitizedColumn, sanitizedValue);
            break;
          case 'gt':
            query = query.gt(sanitizedColumn, sanitizedValue);
            break;
          case 'gte':
            query = query.gte(sanitizedColumn, sanitizedValue);
            break;
          case 'lt':
            query = query.lt(sanitizedColumn, sanitizedValue);
            break;
          case 'lte':
            query = query.lte(sanitizedColumn, sanitizedValue);
            break;
          case 'in':
            query = query.in(sanitizedColumn, sanitizedValue);
            break;
          case 'is':
            query = query.is(sanitizedColumn, null);
            break;
          case 'not':
            query = query.not(sanitizedColumn, 'is', null);
            break;
        }
      } catch (error) {
        errors.push(`Filter error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Apply returning clause
    if (options.returning && options.returning.length > 0) {
      const sanitizedReturning = options.returning.map(col => sanitizeColumnName(col));
      query = query.select(sanitizedReturning.join(', '));
    }

    return {
      query,
      params,
      errors,
      warnings
    };

  } catch (error) {
    errors.push(`Update query build error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      query: null,
      params: {},
      errors,
      warnings
    };
  }
}

/**
 * Builds a safe DELETE query for Supabase
 */
export function buildDeleteQuery(
  table: string,
  filters: FilterCondition[] = [],
  options: { returning?: string[] } = {}
): SafeQuery {
  const errors: string[] = [];
  const warnings: string[] = [];
  const params: Record<string, unknown> = {};

  try {
    // Sanitize table name
    const sanitizedTable = sanitizeTableName(table);
    
    // Build query - use type assertion to work around Supabase typing
    let query = (supabase.from(sanitizedTable as never) as any).delete();

    // Apply filters
    for (const filter of filters) {
      try {
        const sanitizedColumn = sanitizeColumnName(filter.column);
        const sanitizedValue = sanitizeFilterValue(filter.value, filter.operator);
        
        params[`delete_${sanitizedColumn}_${filter.operator}`] = sanitizedValue;

        switch (filter.operator) {
          case 'eq':
            query = query.eq(sanitizedColumn, sanitizedValue);
            break;
          case 'neq':
            query = query.neq(sanitizedColumn, sanitizedValue);
            break;
          case 'gt':
            query = query.gt(sanitizedColumn, sanitizedValue);
            break;
          case 'gte':
            query = query.gte(sanitizedColumn, sanitizedValue);
            break;
          case 'lt':
            query = query.lt(sanitizedColumn, sanitizedValue);
            break;
          case 'lte':
            query = query.lte(sanitizedColumn, sanitizedValue);
            break;
          case 'in':
            query = query.in(sanitizedColumn, sanitizedValue);
            break;
          case 'is':
            query = query.is(sanitizedColumn, null);
            break;
          case 'not':
            query = query.not(sanitizedColumn, 'is', null);
            break;
        }
      } catch (error) {
        errors.push(`Filter error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Apply returning clause
    if (options.returning && options.returning.length > 0) {
      const sanitizedReturning = options.returning.map(col => sanitizeColumnName(col));
      query = query.select(sanitizedReturning.join(', '));
    }

    return {
      query,
      params,
      errors,
      warnings
    };

  } catch (error) {
    errors.push(`Delete query build error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      query: null,
      params: {},
      errors,
      warnings
    };
  }
}

// ============================================================================
// HIGH-LEVEL QUERY FUNCTIONS
// ============================================================================

/**
 * Executes a safe SELECT query
 */
export async function safeSelect<T = unknown>(
  table: string,
  filters: FilterCondition[] = [],
  options: QueryOptions = {}
): Promise<{ data: T[] | null; error: unknown; count?: number }> {
  const safeQuery = buildSelectQuery(table, filters, options);
  
  if (safeQuery.errors.length > 0) {
    return {
      data: null,
      error: { message: safeQuery.errors.join(', ') }
    };
  }

  try {
    const { data, error, count } = await (safeQuery.query as any);
    return { data, error, count };
  } catch (error) {
    return {
      data: null,
      error: { message: `Query execution error: ${error instanceof Error ? error.message : 'Unknown error'}` }
    };
  }
}

/**
 * Executes a safe INSERT query
 */
export async function safeInsert<T = unknown>(
  table: string,
  data: Record<string, unknown> | Record<string, unknown>[],
  options: { returning?: string[] } = {}
): Promise<{ data: T | T[] | null; error: unknown }> {
  const safeQuery = buildInsertQuery(table, data, options);
  
  if (safeQuery.errors.length > 0) {
    return {
      data: null,
      error: { message: safeQuery.errors.join(', ') }
    };
  }

  try {
    const { data, error } = await (safeQuery.query as any);
    return { data, error };
  } catch (error) {
    return {
      data: null,
      error: { message: `Insert execution error: ${error instanceof Error ? error.message : 'Unknown error'}` }
    };
  }
}

/**
 * Executes a safe UPDATE query
 */
export async function safeUpdate<T = unknown>(
  table: string,
  data: Record<string, unknown>,
  filters: FilterCondition[] = [],
  options: { returning?: string[] } = {}
): Promise<{ data: T | T[] | null; error: unknown }> {
  const safeQuery = buildUpdateQuery(table, data, filters, options);
  
  if (safeQuery.errors.length > 0) {
    return {
      data: null,
      error: { message: safeQuery.errors.join(', ') }
    };
  }

  try {
    const { data, error } = await (safeQuery.query as any);
    return { data, error };
  } catch (error) {
    return {
      data: null,
      error: { message: `Update execution error: ${error instanceof Error ? error.message : 'Unknown error'}` }
    };
  }
}

/**
 * Executes a safe DELETE query
 */
export async function safeDelete<T = unknown>(
  table: string,
  filters: FilterCondition[] = [],
  options: { returning?: string[] } = {}
): Promise<{ data: T | T[] | null; error: unknown }> {
  const safeQuery = buildDeleteQuery(table, filters, options);
  
  if (safeQuery.errors.length > 0) {
    return {
      data: null,
      error: { message: safeQuery.errors.join(', ') }
    };
  }

  try {
    const { data, error } = await (safeQuery.query as any);
    return { data, error };
  } catch (error) {
    return {
      data: null,
      error: { message: `Delete execution error: ${error instanceof Error ? error.message : 'Unknown error'}` }
    };
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates filter conditions helper
 */
export function createFilter(column: string, operator: FilterCondition['operator'], value: unknown): FilterCondition {
  return { column, operator, value };
}

/**
 * Validates query parameters before execution
 */
export function validateQueryParams(params: Record<string, unknown>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (!isSafeForDatabase(value)) {
      errors.push(`Unsafe parameter: ${key}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Creates a query builder with common patterns
 */
export class SafeQueryBuilder {
  private table: string;
  private filters: FilterCondition[] = [];
  private options: QueryOptions = {};

  constructor(table: string) {
    this.table = sanitizeTableName(table);
  }

  where(column: string, operator: FilterCondition['operator'], value: unknown): this {
    this.filters.push(createFilter(column, operator, value));
    return this;
  }

  select(columns: string[]): this {
    this.options.select = columns;
    return this;
  }

  limit(count: number): this {
    this.options.limit = count;
    return this;
  }

  offset(count: number): this {
    this.options.offset = count;
    return this;
  }

  orderBy(column: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.options.orderBy = column;
    this.options.orderDirection = direction;
    return this;
  }

  count(): this {
    this.options.count = true;
    return this;
  }

  async execute<T = unknown>(): Promise<{ data: T[] | null; error: unknown; count?: number }> {
    return safeSelect<T>(this.table, this.filters, this.options);
  }
}

/**
 * Creates a new safe query builder
 */
export function createSafeQuery(table: string): SafeQueryBuilder {
  return new SafeQueryBuilder(table);
}

import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/modules/shared/utils/apiError';
import mongoose from 'mongoose';

// Validate product creation data
export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, images, description, brand, category, stock, compareAtPrice } = req.body;

  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  } else if (name.length > 200) {
    errors.push('Name must not exceed 200 characters');
  }

  if (!price || typeof price !== 'number') {
    errors.push('Price is required and must be a number');
  } else if (price <= 0) {
    errors.push('Price must be greater than 0');
  }

  if (!images || !Array.isArray(images) || images.length === 0) {
    errors.push('At least one image URL is required');
  } else {
    const invalidImages = images.filter((img: any) => typeof img !== 'string' || img.trim().length === 0);
    if (invalidImages.length > 0) {
      errors.push('All image URLs must be non-empty strings');
    }
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push('Description is required and must be at least 10 characters');
  }

  if (!brand || !mongoose.Types.ObjectId.isValid(brand)) {
    errors.push('Valid brand ID is required');
  }

  if (!category || !mongoose.Types.ObjectId.isValid(category)) {
    errors.push('Valid category ID is required');
  }

  if (stock !== undefined) {
    if (typeof stock !== 'number' || stock < 0) {
      errors.push('Stock must be a non-negative number');
    }
  }

  if (compareAtPrice !== undefined) {
    if (typeof compareAtPrice !== 'number' || compareAtPrice < 0) {
      errors.push('Compare at price must be a non-negative number');
    }
  }

  if (errors.length > 0) {
    throw new ApiError(400, `Validation failed: ${errors.join(', ')}`);
  }

  next();
};

// Validate product update data
export const validateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, images, description, brand, category, stock, compareAtPrice } = req.body;
  const errors: string[] = [];

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Name must be a non-empty string');
    } else if (name.length > 200) {
      errors.push('Name must not exceed 200 characters');
    }
  }

  if (price !== undefined) {
    if (typeof price !== 'number' || price <= 0) {
      errors.push('Price must be a positive number');
    }
  }

  if (images !== undefined) {
    if (!Array.isArray(images) || images.length === 0) {
      errors.push('Images must be a non-empty array');
    } else {
      const invalidImages = images.filter((img: any) => typeof img !== 'string' || img.trim().length === 0);
      if (invalidImages.length > 0) {
        errors.push('All image URLs must be non-empty strings');
      }
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim().length < 10) {
      errors.push('Description must be at least 10 characters');
    }
  }

  if (brand !== undefined && !mongoose.Types.ObjectId.isValid(brand)) {
    errors.push('Brand must be a valid ObjectId');
  }

  if (category !== undefined && !mongoose.Types.ObjectId.isValid(category)) {
    errors.push('Category must be a valid ObjectId');
  }

  if (stock !== undefined) {
    if (typeof stock !== 'number' || stock < 0) {
      errors.push('Stock must be a non-negative number');
    }
  }

  if (compareAtPrice !== undefined) {
    if (typeof compareAtPrice !== 'number' || compareAtPrice < 0) {
      errors.push('Compare at price must be a non-negative number');
    }
  }

  if (errors.length > 0) {
    throw new ApiError(400, `Validation failed: ${errors.join(', ')}`);
  }

  next();
};

// Validate product ID parameter
export const validateProductId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid product ID format');
  }

  next();
};

// Validate query parameters for getProducts
export const validateGetProductsQuery = (req: Request, res: Response, next: NextFunction) => {
  const { price_min, price_max, page, limit, sort } = req.query;
  const errors: string[] = [];

  if (price_min !== undefined) {
    const min = Number(price_min);
    if (isNaN(min) || min < 0) {
      errors.push('price_min must be a non-negative number');
    }
  }

  if (price_max !== undefined) {
    const max = Number(price_max);
    if (isNaN(max) || max < 0) {
      errors.push('price_max must be a non-negative number');
    }
  }

  if (price_min !== undefined && price_max !== undefined) {
    const min = Number(price_min);
    const max = Number(price_max);
    if (min > max) {
      errors.push('price_min cannot be greater than price_max');
    }
  }

  if (page !== undefined) {
    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) {
      errors.push('page must be a positive integer');
    }
  }

  if (limit !== undefined) {
    const limitNum = Number(limit);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      errors.push('limit must be between 1 and 100');
    }
  }

  if (sort !== undefined && sort !== '' && sort !== null) {
    const validSorts = ['newest', 'oldest', 'price_low', 'price_high', 'name_asc', 'name_desc'];
    const sortValue = String(sort).trim();
    if (sortValue && !validSorts.includes(sortValue)) {
      errors.push(`sort must be one of: ${validSorts.join(', ')}`);
    }
  }

  if (errors.length > 0) {
    throw new ApiError(400, `Validation failed: ${errors.join(', ')}`);
  }

  next();
};

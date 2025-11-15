import { Request, Response } from 'express';
import { ApiError } from '@/modules/shared/utils/apiError';
import { asyncHandler } from '@/modules/shared/utils/asyncHandler';
import * as productService from '../services/product.service';

// Create a new product
export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json({ success: true, data: product });
});

// Get products with filters, pagination, and sorting
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const {
    category,
    brand,
    price_min,
    price_max,
    search,
    page = 1,
    limit = 30,
    sort = "newest",
  } = req.query;

  const filters: productService.ProductFilters = {
    category: category as string | undefined,
    brand: brand as string | undefined,
    price_min: price_min ? Number(price_min) : undefined,
    price_max: price_max ? Number(price_max) : undefined,
    search: search as string | undefined,
  };

  const options: productService.PaginationOptions = {
    page: Number(page),
    limit: Number(limit),
    sort: sort as string,
  };

  const result = await productService.getProducts(filters, options);

  res.status(200).json({
    success: true,
    data: result.products,
    pagination: result.pagination,
  });
});

// Get a single product by ID
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id);
  
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  
  res.status(200).json({ success: true, data: product });
});

// Get all products without pagination
export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.status(200).json({ success: true, data: products });
});

// Update a product
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const updatedProduct = await productService.updateProduct(req.params.id, req.body);
  
  if (!updatedProduct) {
    throw new ApiError(404, 'Product not found');
  }
  
  res.status(200).json({ success: true, data: updatedProduct });
});

// Delete a product
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const deletedProduct = await productService.deleteProduct(req.params.id);
  
  if (!deletedProduct) {
    throw new ApiError(404, 'Product not found');
  }
  
  res.status(200).json({ success: true, message: 'Product deleted successfully' });
});

import { Document,Types } from "mongoose";
import { IBrand } from "./brand.type";
import { ICategory } from "./category.type";

export interface IProduct extends Document {
    name: string;
    images: string[];  // Multiple images support
    price: number;
    compareAtPrice?: number;  // Original price for showing discounts
    brand: Types.ObjectId | IBrand;
    category: Types.ObjectId | ICategory;
    description: string;
    stock: number;  // Inventory count
    inStock: boolean;  // Quick availability check
    sku?: string;  // Stock Keeping Unit
    tags?: string[];  // For additional categorization/search
    featured?: boolean;  // For highlighting special products
    rating?: number;  // Average rating (0-5)
    reviewCount?: number;  // Number of reviews
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  price_min?: number;
  price_max?: number;
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
}

export interface PaginatedProducts {
  products: IProduct[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
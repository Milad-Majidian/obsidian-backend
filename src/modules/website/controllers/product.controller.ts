import {Request , Response} from 'express';
import { ApiError } from '@/modules/shared/utils/apiError';
import { asyncHandler } from '@/modules/shared/utils/asyncHandler';
import Product , { IProduct } from '@/modules/shared/models/product.model';
import Category from '@/modules/shared/models/category.model';
import Brand from '@/modules/shared/models/brand.model';

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
    const productData = req.body;
    console.log('Creating product with data:', productData);
    const  product = await Product.create(productData);
    if(!product) {
        throw new ApiError(400, 'Product creation failed');
    }
    res.status(201).json({ success: true, data: product });
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const {
    category, // slug
    brand,
    price_min,
    price_max,
    page = 1,
    limit = 30,
    sort_by = "createdAt",
    order = "desc",
  } = req.query;

  const filters: any = {};

  // find category by slug or category name then add category id to filters)
  
  if (category) {
    const cat = await Category.findOne({ 
        name : category
    });
    if (!cat) throw new ApiError(404, "Category not found");
    filters.category = cat._id;
  }
  // find brand by brand name then add brand id to filters
    
  if(brand){
    const brandDoc = await Brand.findOne({ 
      name: brand
    })
    if(!brandDoc) throw new ApiError(404,"Brand not found")
    filters.brand = brandDoc._id;
  }

  // price filter
  if (price_min || price_max) {
    filters.price = {};
    if (price_min) filters.price.$gte = Number(price_min);
    if (price_max) filters.price.$lte = Number(price_max);
  }

  // pagination
  const currentPage = Math.max(1, Number(page));
  const pageSize = Math.max(1, Number(limit));
  const skip = (currentPage - 1) * pageSize;

  // sorting
  const sort: any = { [String(sort_by)]: order === "asc" ? 1 : -1 };

  const products = await Product.find(filters)
    .populate("brand category")
    .skip(skip)
    .limit(pageSize)
    .sort(sort);


  const total = await Product.countDocuments(filters);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasNextPage = currentPage < totalPages;

  res.status(200).json({
    success: true,
    data: products,
    pagination: {
      total,
      page: currentPage,
      limit: pageSize,
      totalPages,
      hasNextPage,
    },
  });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
        throw new ApiError(400, 'Product ID is required');
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }
    res.status(200).json({ success: true, data: product });
});

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productData: Partial<IProduct> = req.body;
    if (!productId) {
        throw new ApiError(400, 'Product ID is required');
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updatedProduct) {
        throw new ApiError(404, 'Product not found');
    }
    res.status(200).json({ success: true, data: updatedProduct });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) {
        throw new ApiError(400, 'Product ID is required');
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        throw new ApiError(404, 'Product not found');
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
});

import {Request , Response} from 'express';
import { ApiError } from '@/modules/shared/utils/apiError';
import { asyncHandler } from '@/modules/shared/utils/asyncHandler';
import Product , { IProduct } from '@/modules/shared/models/product.model';

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
    const productData = req.body;
    console.log('Creating product with data:', productData);
    const  product = await Product.create(productData);
    if(!product) {
        throw new ApiError(400, 'Product creation failed');
    }
    res.status(201).json({ success: true, data: product });
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

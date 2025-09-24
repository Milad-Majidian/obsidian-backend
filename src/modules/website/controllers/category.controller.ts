import {Request, Response} from 'express';
import { ApiError } from '@/modules/shared/utils/apiError';
import { asyncHandler } from '@/modules/shared/utils/asyncHandler';
import Category, { ICategory } from '@/modules/shared/models/category';

export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
});

export const getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
    const categorySlug = req.params.slug;
    if (!categorySlug) {
        throw new ApiError(400, 'Category slug is required');
    }
    console.log('category',categorySlug)
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
        throw new ApiError(404, 'Category not found');
    }
    res.status(200).json({ success: true, data: category });
});

export const addCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryData = req.body;
    const category = await Category.create(categoryData);
    if (!category) {
        throw new ApiError(400, 'Category creation failed');
    }
    res.status(201).json({ success: true, data: category });
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = req.params.id
    const categoryData: Partial<ICategory> = req.body;
    if (!categoryId) {
        throw new ApiError(400, 'Category ID is required');
    }
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    if (!updatedCategory) {
        throw new ApiError(404, 'Category not found');
    }
    res.status(200).json({ success: true, data: updatedCategory });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = req.params.id;   
    if (!categoryId) {
        throw new ApiError(400, 'Category ID is required');
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
        throw new ApiError(404, 'Category not found');
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
});



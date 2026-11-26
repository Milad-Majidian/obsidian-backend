
import {Request, Response} from 'express'
import { asyncHandler } from "@/modules/shared/utils/asyncHandler";
import Brand from '@/modules/shared/models/brand.model';
import { ApiError } from '@/modules/shared/utils/apiError';
import Category from '@/modules/shared/models/category.model';


export const getAllBrands = asyncHandler(async (req: Request, res: Response) => {
    const { category } = req.query;
    if(!category) throw new ApiError(400, 'Category query parameter is required');  
    const categoryDoc = await Category.findOne({name: category.toString()});
    if(!categoryDoc) throw new ApiError(404, 'Category not found');
    const brands = await Brand.find({ categories: categoryDoc._id });
    res.status(200).json({ success: true, data: brands });
})

export const getBrandById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if(!brand) throw new ApiError(404, 'Brand not found');
    res.status(200).json({ success: true, data: brand });
})

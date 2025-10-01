
import {Request, Response} from 'express'
import { asyncHandler } from "@/modules/shared/utils/asyncHandler";
import Brand from '@/modules/shared/models/brand.model';


export const getAllBrands = asyncHandler(async (req: Request, res: Response) => {
    const brands = await Brand.find()  
    res.status(200).json({success: true, data: brands})
})
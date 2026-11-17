
import {Request, Response} from 'express';
import { ApiError } from '@/modules/shared/utils/apiError';
import { asyncHandler } from '@/modules/shared/utils/asyncHandler';
import { IAgency } from '../types/agencies.type';
import AgencyModel from '@/modules/shared/models/agency.model';



export const getAllAgencies = asyncHandler(async (req: Request, res: Response) => {
    const agencies = await AgencyModel.find();
    res.status(200).json({ success: true, data: agencies });
});

export const getAgencyBySlug = asyncHandler(async (req: Request, res: Response) => {
    const agencySlug = req.params.slug;
    if (!agencySlug) {
        throw new ApiError(400, 'Agency slug is required');
    }
    console.log('agency', agencySlug)
    const agency = await AgencyModel.findOne({ slug: agencySlug });
    if (!agency) {
        throw new ApiError(404, 'Agency not found');
    }
    res.status(200).json({ success: true, data: agency });
});

export const addAgency = asyncHandler(async (req: Request, res: Response) => {
    const agencyData = req.body;
    const agency = await AgencyModel.create(agencyData);
    if (!agency) {
        throw new ApiError(400, 'Agency creation failed');
    }
    res.status(201).json({ success: true, data: agency });
});

export const updateAgency = asyncHandler(async (req: Request, res: Response) => {
    const agencyId = req.params.id;
    const agencyData: Partial<IAgency> = req.body;
    if (!agencyId) {
        throw new ApiError(400, 'Agency ID is required');
    }
    const updatedAgency = await AgencyModel.findByIdAndUpdate(agencyId, agencyData, { new: true });
    if (!updatedAgency) {
        throw new ApiError(404, 'Agency not found');
    }
    res.status(200).json({ success: true, data: updatedAgency });
});

export const deleteAgency = asyncHandler(async (req: Request, res: Response) => {
    const agencyId = req.params.id;   
    if (!agencyId) {
        throw new ApiError(400, 'Agency ID is required');
    }
    const deletedAgency = await AgencyModel.findByIdAndDelete(agencyId);
    if (!deletedAgency) {
        throw new ApiError(404, 'Agency not found');
    }
    res.status(200).json({ success: true, message: 'Agency deleted successfully' });
});
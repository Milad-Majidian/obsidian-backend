import { v4 as uuidv4 } from 'uuid';
import Category from "@/modules/shared/models/category.model";
import { ICategory } from '../types/category.type';

export const addCategory = async (data: Partial<ICategory>) => {
    data.id = data.id || uuidv4(); // Ensure id is set
    return await Category.create(data);
}

export const getCategoryById = async (id: string) => {
    return await Category.findOne({ id });
}

export const getAllCategories = async () => {
    return await Category.find();
};

export const updateCategory = async (id: string, data: Partial<ICategory>) => {
    return await Category.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteCategory = async (id: string) => {
    return await Category.findOneAndDelete({ id });
};

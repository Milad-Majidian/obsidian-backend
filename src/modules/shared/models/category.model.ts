import { v4 as uuidv4 } from 'uuid';
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    id: string;
    description: string;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    id: { type: String, unique: true },
    description: { type: String, required: false },
}, {
    timestamps: true,
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;

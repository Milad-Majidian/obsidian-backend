import { v4 as uuidv4 } from 'uuid';
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description?: string;
    image: string;
    createdAt: Date;
    updateAt: Date;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: {type: String, required: true},
    createdAt: {type:Date, required: true},
    updateAt: { type: Date, required: true }
}, {
    timestamps: true,
});

 const Category = mongoose.model<ICategory>("Category", CategorySchema);

 export default Category


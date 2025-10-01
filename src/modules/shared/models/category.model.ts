import { v4 as uuidv4 } from 'uuid';
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description?: string;
    image: string;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    image: {type: String, required: false},
}, {
    timestamps: true,
    versionKey: false
});

 const Category = mongoose.model<ICategory>("Category", CategorySchema);

 export default Category


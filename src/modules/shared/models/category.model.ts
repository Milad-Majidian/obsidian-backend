import { ICategory } from "@/modules/website/types/category.type";
import mongoose, { Schema } from "mongoose";

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


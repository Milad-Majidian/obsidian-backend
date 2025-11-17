
import mongoose , { Schema } from "mongoose";
import { IBrand } from "@/modules/website/types/brand.type";

const BrandSchema = new Schema<IBrand>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, {
    timestamps: true,
    versionKey: false
})

const Brand = mongoose.model<IBrand>("Brand", BrandSchema);

export default Brand;
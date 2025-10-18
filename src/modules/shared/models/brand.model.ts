
import mongoose , { Document, Schema } from "mongoose";

export interface IBrand extends Document {
    name: string;
    description: string;
    image: string;
    categories: mongoose.Types.ObjectId[];
}

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
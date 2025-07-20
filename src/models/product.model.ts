import mongoose , { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name :string ;
    productId: string;
    price: number;
    description: string;
    category: string;
}


const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
})

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

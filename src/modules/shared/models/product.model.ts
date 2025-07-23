import mongoose , { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export interface IProduct extends Document {
    name :string ;
    productId: string;
    price: number;
    description: string;
    category: string;
}


const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    productId: { type: String, default: uuidv4, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
},{
    timestamps: true,
})

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

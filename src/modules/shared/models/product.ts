import mongoose , { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export interface IProduct extends Document {
    name :string ;
    image: String,
    price: number;
    category: { 
        id: string;
        name: string;
    };
    description: string;
}


const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, {
    timestamps: true,
    versionKey: false
})

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

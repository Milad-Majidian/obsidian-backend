import mongoose , { Schema, Document, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { ICategory } from "./category.model";
import { IBrand } from "./brand.model";


export interface IProduct extends Document {
    name :string ;
    image: String,
    price: number;
    brand: Types.ObjectId | IBrand ,
    category: Types.ObjectId |  ICategory,
    description: string;
}


const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId , ref: 'Brand' ,required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, {
    timestamps: true,
    versionKey: false
})

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

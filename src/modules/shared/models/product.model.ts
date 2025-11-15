import mongoose , { Schema, Document, Types } from "mongoose";
import { ICategory } from "./category.model";
import { IBrand } from "./brand.model";


export interface IProduct extends Document {
    name: string;
    images: string[];  // Multiple images support
    price: number;
    compareAtPrice?: number;  // Original price for showing discounts
    brand: Types.ObjectId | IBrand;
    category: Types.ObjectId | ICategory;
    description: string;
    stock: number;  // Inventory count
    inStock: boolean;  // Quick availability check
    sku?: string;  // Stock Keeping Unit
    tags?: string[];  // For additional categorization/search
    featured?: boolean;  // For highlighting special products
    rating?: number;  // Average rating (0-5)
    reviewCount?: number;  // Number of reviews
}


const ProductSchema = new Schema<IProduct>({
    name: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 200
    },
    images: { 
        type: [String], 
        required: true,
        validate: {
            validator: function(images: string[]) {
                return images.length > 0;
            },
            message: 'At least one image is required'
        }
    },
    price: { 
        type: Number, 
        required: true,
        min: 0
    },
    compareAtPrice: {
        type: Number,
        min: 0
    },
    description: { 
        type: String, 
        required: true,
        minlength: 10
    },
    brand: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Brand',
        required: true 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    inStock: {
        type: Boolean,
        default: true
    },
    sku: {
        type: String,
        unique: true,
        sparse: true  // Allows null values to not be considered for uniqueness
    },
    tags: {
        type: [String],
        default: []
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ price: 1 });
ProductSchema.index({ brand: 1, category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ inStock: 1 });

// Update inStock based on stock count
ProductSchema.pre('save', function(next) {
    this.inStock = this.stock > 0;
    next();
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

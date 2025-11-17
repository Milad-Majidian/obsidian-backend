import { Document,Types } from "mongoose";

export interface IBrand extends Document {
    name: string;
    description: string;
    image: string;
    categories: Types.ObjectId[];
}
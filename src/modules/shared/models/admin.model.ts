import mongoose, {Schema, Document} from "mongoose";

export interface IAdmin extends Document {
    email:string;
    password: string;
    role: "superAdmin" | "admin" | "operator"
    isActive: boolean;
    createAt: Date;
    UpdateAt: Date;
}


const adminSchema = new Schema<IAdmin> ({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superAdmin", "admin", "operator"], default: "admin" },
    isActive: { type: Boolean, default: true },
}, 
{ timestamps: true });



export const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema); 

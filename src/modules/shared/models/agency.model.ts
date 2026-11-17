import mangoose, { Schema, Document } from "mongoose";

export interface IAgency extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
    createAt: Date;
    UpdateAt: Date;
}

const agencySchema = new Schema<IAgency>({
    name: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true },
    isActive: { type: Boolean, default: true },
},
{ timestamps: true });

const AgencyModel = mangoose.model<IAgency>("Agency", agencySchema);

export default AgencyModel;

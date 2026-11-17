export {Document, Types} from "mongoose";


export interface IAgency extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
    createAt: Date;
    UpdateAt: Date;
}




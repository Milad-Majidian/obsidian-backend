import mongoose from 'mongoose';
import dotenv from "dotenv";


dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

export const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    } 

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    console.log("Connected to DB:", mongoose.connection.name);

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

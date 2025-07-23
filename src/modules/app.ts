import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './website/routes/product.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

// Test route
app.get('/api/test', (req, res) => {
  console.log('✅ Test route hit');
  res.status(200).json({ message: 'Test successful' });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// MongoDB connection function
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      authSource: 'admin',
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // exit if unable to connect
  }
};
   
export {app};



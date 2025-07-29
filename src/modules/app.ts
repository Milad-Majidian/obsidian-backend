import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './website/routes/product.routes';
import categoryRoutes from './website/routes/category.routes'
import authRoutes from './website/routes/auth.routes';


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories",categoryRoutes)
app.use("/api/products", productRoutes);
app.use('/api/auth', authRoutes);

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



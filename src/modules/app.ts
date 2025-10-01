import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './website/routes/product.routes';
import categoryRoutes from './website/routes/category.routes'
import brandRoutes from "./website/routes/brand.routes"
import authRoutes from './website/routes/auth.routes';

var cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', // 👈 Your frontend URL
  credentials: true, // if you're using cookies
}));
app.use(express.json());

app.use("/categories",categoryRoutes)
app.use("/brands",brandRoutes)
app.use("/products", productRoutes);
app.use('/auth', authRoutes);

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



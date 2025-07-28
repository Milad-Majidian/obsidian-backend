// src/scripts/seedCategories.ts
import { connectToDb } from '../config/db';
import Category from '../modules/shared/models/category.model';
import { v4 as uuidv4 } from 'uuid';

const categories = [
  { name: 'Smartphones' },
  { name: 'Laptops' },
  { name: 'Accessories' },
];

export const seedCategories = async () => {
  await connectToDb();
  await Category.insertMany(categories);
  console.log('✅ Categories seeded successfully!');
  process.exit(0);
};


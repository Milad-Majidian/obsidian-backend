// src/scripts/seedCategories.ts

import { connectToDb } from "../src/config/db";
import Category from "../src/modules/shared/models/category.model";


export const categories = [
      { name: "Laptops", description: "Portable computers", image: "/images/laptops.png" },
      { name: "Chairs", description: "Comfortable seating", image: "/images/chairs.png" },
      { name: "Tables", description: "Wooden & metal tables", image: "/images/tables.png" }
    ];

export const seedCategories = async () => {
  await connectToDb();
  await Category.create(categories);
  console.log('✅ Categories seeded successfully!');
  process.exit(0);
};


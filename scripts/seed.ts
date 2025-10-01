
import Category from "../src/modules/shared/models/category.model";
import Product from "../src/modules/shared/models/product.model";
import { connectToDb } from "../src/config/db";
import Brand from "../src/modules/shared/models/brand.model";

async function seed() {
  try {
    await connectToDb();
    console.log("Connected to DB");
    // Clear old data (optional for dev)
    await Category.deleteMany({});
    await Product.deleteMany({});

    const electronicsBrand = await Brand.create(
        { name: "apple", description: "Apple Inc.", image: "" },
        {name: "lenovo", description: "Lenovo Group Limited", image: ""},
        {name: "dell", description: "Dell Technologies", image: ""},
        {name: "samsung", description: "Samsung Electronics", image: ""},
        {name: "google", description: "Google LLC", image: ""
        }
    );
    const furnitureBrand = await Brand.create(
        {name: "ikea", description: "Ikea Furniture", image: ""},
        {name: "ashley", description: "Ashley Furniture", image: ""},
        {name: "wayfair", description: "Wayfair Inc.", image: ""},
        {name:  "west-elm", description: "West Elm Furniture", image: ""},
        {name: "rugs-usa", description: "Rugs USA", image: ""}
    );
    console.log("Brand seeded ✅");

    // Insert categories
    const categories = await Category.create([
      { name: "laptops", description: "Portable computers", image: "" },
      {
        name: "phones",
        description: "Cozy rugs",
        image: "",
      },
      { name: "chairs", description: "Comfortable seating", image: "" },
      { name: "tables", description: "Wooden & metal tables", image: "" },
      {
        name: "sofas",
        description: "Comfortable sofas",
        image: ""
      },
      {
        name: "rugs",
        description: "Cozy rugs",
        image: ""
      } 
    ]);

    console.log("Categories seeded ✅");

    // Insert products with category references
    await Product.create([
        // Laptops
        { 
            name: "MacBook Pro 16",
            description: "Apple laptop",
            price: 2500,
            image: "/categories/product-placeholder.png",
            brand: electronicsBrand[0].name,
            category: categories[0]._id
        },
        {
            name: "Dell XPS 13",
            description: "Compact and powerful laptop",
            price: 1200,
            image: "/categories/product-placeholder.png",
            brand: electronicsBrand[2].name,
            category: categories[0]._id
        },
        {
            name: "Lenovo ThinkPad X1",
            description: "Business-class laptop",
            price: 1400,
            image: "/categories/product-placeholder.png",
            brand: electronicsBrand[1].name,
            category: categories[0]._id
        },

        // Phones
        {
            name: "iPhone 14 Pro",
            description: "Latest Apple smartphone",
            price: 999,
            image: "/categories/product-placeholder.png",
            brand: electronicsBrand[0].name,
            category: categories[1]._id
        },
        {
            name: "Samsung Galaxy S23",
            description: "Flagship Android phone",
            price: 899,
            image: "/categories/product-placeholder.png",
            brand: electronicsBrand[3].name,
            category: categories[1]._id
        },
        {
            name: "Google Pixel 7",
            description: "Google's latest phone",
            price: 799,
            image: "/categories/product-placeholder.png",
            brand: electronicsBrand[4].name,
            category: categories[1]._id
        },

        // Chairs
        {
            name: "Office Chair",
            description: "Ergonomic chair",
            price: 200,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[0].name,
            category: categories[2]._id
        },
        {
            name: "Gaming Chair",
            description: "High-end gaming chair",
            price: 300,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[1].name,
            category: categories[2]._id
        },
        {
            name: "Dining Chair",
            description: "Comfortable dining chair",
            price: 120,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[2].name,
            category: categories[2]._id
        },

        // Tables
        {
            name: "Dining Table",
            description: "Wooden dining table",
            price: 500,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[3].name,
            category: categories[3]._id
        },
        {
            name: "Coffee Table",
            description: "Stylish coffee table",
            price: 150,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[4].name,
            category: categories[3]._id
        },
        {
            name: "Gaming Desk",
            description: "Ergonomic gaming desk",
            price: 400,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[1].name,
            category: categories[3]._id
        },

        // Sofas
        {
            name: "Leather Sofa",
            description: "Luxury leather sofa",
            price: 1200,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[0].name,
            category: categories[4]._id
        },
        {
            name: "Fabric Sofa",
            description: "Comfortable fabric sofa",
            price: 800,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[2].name,
            category: categories[4]._id
        },
        {
            name: "Sectional Sofa",
            description: "Spacious sectional sofa",
            price: 1500,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[3].name,
            category: categories[4]._id
        },

        // Rugs
        {
            name: "Persian Rug",
            description: "Handmade Persian rug",
            price: 600,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[4].name,
            category: categories[5]._id
        },
        {
            name: "Shaggy Rug",
            description: "Soft shaggy rug",
            price: 250,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[0].name,
            category: categories[5]._id
        },
        {
            name: "Outdoor Rug",
            description: "Durable outdoor rug",
            price: 180,
            image: "/categories/product-placeholder.png",
            brand: furnitureBrand[2].name,
            category: categories[5]._id
        }
    ]);   console.log("Products seeded ✅");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();


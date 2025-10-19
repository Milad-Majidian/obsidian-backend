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

    // Insert categories
    const categories = await Category.insertMany([
      { name: "laptops", description: "Portable computers", image: "" },
      {
        name: "phones",
        description: "Smartphones and mobile devices",
        image: "",
      },
      { name: "chairs", description: "Comfortable seating", image: "" },
      { name: "tables", description: "Wooden & metal tables", image: "" },
      {
        name: "sofas",
        description: "Comfortable sofas",
        image: "",
      },
      {
        name: "rugs",
        description: "Cozy rugs",
        image: "",
      },
    ]);

    const categoryMap = Object.fromEntries(
      categories.map((c) => [c.name, c.id])
    );

    console.log("Categories seeded ✅");

    const electronicsBrand = await Brand.create(
      {
        name: "apple",
        description: "Apple Inc.",
        image: "",
        categories: [categoryMap["laptops"], categoryMap["phones"]],
      },
      {
        name: "lenovo",
        description: "Lenovo Group Limited",
        image: "",
        categories: [categoryMap["laptops"], categoryMap["phones"]],
      },
      {
        name: "asus",
        description: "AsusTek Computer Inc.",
        image: "",
        categories: [categoryMap["laptops"], categoryMap["phones"]],
      },
      {
        name: "samsung",
        description: "Samsung Electronics",
        image: "",
        categories: [categoryMap["laptops"], categoryMap["phones"]],
      },
      {
        name: "google",
        description: "Google LLC",
        image: "",
        categories: [categoryMap["phones"]],
      }
    );
    const furnitureBrand = await Brand.create(
      {
        name: "ikea",
        description: "Ikea Furniture",
        image: "",
        categories: [
          categoryMap["chairs"],
          categoryMap["tables"],
          categoryMap["sofas"],
          categoryMap["rugs"],
        ],
      },
      {
        name: "ashley",
        description: "Ashley Furniture",
        image: "",
        categories: [
          categoryMap["chairs"],
          categoryMap["tables"],
          categoryMap["sofas"],
          categoryMap["rugs"],
        ],
      },
      {
        name: "wayfair",
        description: "Wayfair Inc.",
        image: "",
        categories: [
          categoryMap["chairs"],
          categoryMap["tables"],
          categoryMap["sofas"],
          categoryMap["rugs"],
        ],
      },
      {
        name: "west-elm",
        description: "West Elm Furniture",
        image: "",
        categories: [
          categoryMap["chairs"],
          categoryMap["tables"],
          categoryMap["sofas"],
          categoryMap["rugs"],
        ],
      },
      {
        name: "rugs-usa",
        description: "Rugs USA",
        image: "",
        categories: [
          categoryMap["chairs"],
          categoryMap["tables"],
          categoryMap["sofas"],
          categoryMap["rugs"],
        ],
      }
    );
    console.log("Brand seeded ✅");

    const PER_CATEGORY = 30;

    await Product.create([
      // Laptops
    // NOTE: Seeding more products doesn't change per-page results.
    // Increase your API/UI page size (e.g., ?limit=50) to show more than 10 per page.
    ...Array.from({ length: PER_CATEGORY }, (_, i) => ({
      name: `Laptop Model ${String(i + 1).padStart(3, "0")}`,
      description: `Bulk laptop item ${i + 1}`,
      price: 800 + (i % 20) * 25,
      image: "/categories/product-placeholder.png",
      brand: electronicsBrand[i % electronicsBrand.length]!._id,
      category: categories.find((c) => c.name === "laptops")!._id,
    })),
      // Phones
      ...Array.from({ length: PER_CATEGORY }, (_, i) => ({
        name: `Phone Model ${String(i + 1).padStart(3, "0")}`,
        description: `Bulk phone item ${i + 1}`,
        price: 300 + (i % 20) * 20,
        image: "/categories/product-placeholder.png",
        brand: electronicsBrand[i % electronicsBrand.length]!._id,
        category: categories.find((c) => c.name === "phones")!._id,
      })),
      // Chairs
      ...Array.from({ length: PER_CATEGORY }, (_, i) => ({
        name: `Chair Model ${String(i + 1).padStart(3, "0")}`,
        description: `Bulk chair item ${i + 1}`,
        price: 80 + (i % 20) * 5,
        image: "/categories/product-placeholder.png",
        brand: furnitureBrand[i % furnitureBrand.length]!._id,
        category: categories.find((c) => c.name === "chairs")!._id,
      })),
      // Tables
      ...Array.from({ length: PER_CATEGORY }, (_, i) => ({
        name: `Table Model ${String(i + 1).padStart(3, "0")}`,
        description: `Bulk table item ${i + 1}`,
        price: 120 + (i % 20) * 15,
        image: "/categories/product-placeholder.png",
        brand: furnitureBrand[i % furnitureBrand.length]!._id,
        category: categories.find((c) => c.name === "tables")!._id,
      })),
      // Sofas
      ...Array.from({ length: PER_CATEGORY }, (_, i) => ({
        name: `Sofa Model ${String(i + 1).padStart(3, "0")}`,
        description: `Bulk sofa item ${i + 1}`,
        price: 400 + (i % 20) * 50,
        image: "/categories/product-placeholder.png",
        brand: furnitureBrand[i % furnitureBrand.length]!._id,
        category: categories.find((c) => c.name === "sofas")!._id,
      })),
      // Rugs
      ...Array.from({ length: PER_CATEGORY }, (_, i) => ({
        name: `Rug Model ${String(i + 1).padStart(3, "0")}`,
        description: `Bulk rug item ${i + 1}`,
        price: 60 + (i % 20) * 10,
        image: "/categories/product-placeholder.png",
        brand: furnitureBrand[i % furnitureBrand.length]!._id,
        category: categories.find((c) => c.name === "rugs")!._id,
      })),
    ]);
    console.log("Products seeded ✅");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

import Product, {IProduct} from "../../shared/models/product.model";
import Category from "../../shared/models/category.model";
import Brand from "../../shared/models/brand.model";
import { FilterQuery } from "mongoose";

export interface ProductFilters {
  category?: string;
  brand?: string;
  price_min?: number;
  price_max?: number;
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
}

export interface PaginatedProducts {
  products: IProduct[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

// Create a new product
export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = await Product.create(data);
  return await Product.findById(product._id).populate('brand category') as IProduct;
};

// Get products with filters, pagination, and sorting
export const getProducts = async (
  filters: ProductFilters,
  options: PaginationOptions
): Promise<PaginatedProducts> => {
  const query: FilterQuery<IProduct> = {};

  // Category filter
  if (filters.category) {
    const cat = await Category.findOne({ name: filters.category });
    if (cat) {
      query.category = cat._id;
    }
  }

  // Brand filter
  if (filters.brand) {
    const brandDoc = await Brand.findOne({ name: filters.brand });
    if (brandDoc) {
      query.brand = brandDoc._id;
    }
  }

  // Price range filter
  if (filters.price_min !== undefined || filters.price_max !== undefined) {
    query.price = {};
    if (filters.price_min !== undefined) {
      query.price.$gte = filters.price_min;
    }
    if (filters.price_max !== undefined) {
      query.price.$lte = filters.price_max;
    }
  }

  // Search filter (if implemented)
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  // Pagination
  const page = Math.max(1, options.page);
  const limit = Math.max(1, options.limit);
  const skip = (page - 1) * limit;

  // Sorting
  let sortOptions: any = { createdAt: -1 };
  switch (options.sort) {
    case "price_low":
      sortOptions = { price: 1 };
      break;
    case "price_high":
      sortOptions = { price: -1 };
      break;
    case "name_asc":
      sortOptions = { name: 1 };
      break;
    case "name_desc":
      sortOptions = { name: -1 };
      break;
    case "oldest":
      sortOptions = { createdAt: 1 };
      break;
    case "newest":
    default:
      sortOptions = { createdAt: -1 };
      break;
  }

  // Execute queries
  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('brand category')
      .skip(skip)
      .limit(limit)
      .sort(sortOptions),
    Product.countDocuments(query)
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasNextPage = page < totalPages;

  return {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage
    }
  };
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id).populate('brand category');
};

// Get all products (no pagination)
export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find().populate('brand category');
};

// Update a product
export const updateProduct = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, data, { new: true })
    .populate('brand category');
};

// Delete a product
export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id);
};


// class ProductService {
//     async addProduct(productData: IProduct): Promise<IProduct> {
//         const product = new Product(productData);
//         return await product.save();
//     }

//     async getProductById(productId: string): Promise<IProduct | null> {
//         return await Product.findById(productId);
//     }

//     async getAllProducts(): Promise<IProduct[]> {
//         return await Product.find();
//     }

//     async updateProduct(productId: string, productData: Partial<IProduct>): Promise<IProduct | null> {
//         return await Product.findByIdAndUpdate(productId, productData, { new: true });
//     }

//     async deleteProduct(productId: string): Promise<IProduct | null> {
//         return await Product.findByIdAndDelete(productId);
//     }
// }

// export default new ProductService();

import Product, {IProduct} from "../../shared/models/product";

export const addProduct = async (data:Partial<IProduct>) => {
    return await Product.create(data); 
}

export const getProductById = async (id: string) => {
    return await Product.findOne({id});
}

export const getAllProducts = async () => {
    return await Product.find();
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
    return await Product.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteProduct = async (id: string) => {
    return await Product.findOneAndDelete({ id });
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

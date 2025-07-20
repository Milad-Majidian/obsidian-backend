import {Request , Response} from 'express';
import * as productService from '../services/product.service';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id)  {
        return res.status(400).json({ message: 'Product ID is required' });
    }
    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

export const getAllProducts = async (req:Request, res:Response) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }
    try {
        const product = productService.updateProduct(id, req.body);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
}

export const deleteProduct = async (req:Request, res:Response) => {
    const { id } = req.params
    if(!id){
        return res.status(400).json({ message: 'Product ID is required' });
    }
    try {
        const product = await productService.deleteProduct(id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
}
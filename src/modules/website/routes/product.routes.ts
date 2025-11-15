
import express from 'express'
import * as productController from '@/modules/website/controllers/product.controller'
import * as productValidator from '@/modules/website/validators/product.validator'

const router = express.Router()

// Create product
router.post(
  '/', 
  productValidator.validateCreateProduct,
  productController.addProduct
)

// Get products with filters and pagination
router.get(
  '/', 
  productValidator.validateGetProductsQuery,
  productController.getProducts
)

// Get all products without pagination (must come before /:id)
router.get('/all', productController.getAllProducts)

// Get single product by ID
router.get(
  '/:id', 
  productValidator.validateProductId,
  productController.getProductById
)

// Update product
router.put(
  '/:id', 
  productValidator.validateProductId,
  productValidator.validateUpdateProduct,
  productController.updateProduct
)

// Delete product
router.delete(
  '/:id', 
  productValidator.validateProductId,
  productController.deleteProduct
)

export default router


import express from 'express'
import * as productController  from '@/modules/website/controllers/product.controller'

const router = express.Router()

router.post('/', productController.addProduct)
router.get('/', productController.getProducts);
// Specific routes must come before parameterized routes
router.get('/all', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router

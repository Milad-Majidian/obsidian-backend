
import express from 'express'
import * as productController  from '@/modules/website/controllers/product.controller'

const router = express.Router()

router.post('/', productController.addProduct)
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById)
// Avoid colliding with paginated list route
router.get('/all', productController.getAllProducts)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router


import express from 'express'
import * as productController  from '@/modules/website/controllers/product.controller'

const router = express.Router()

router.post('/', productController.addProduct)
router.get("/", productController.getProducts);
router.get('/:id', productController.getProductById)
router.get('/', productController.getAllProducts)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router

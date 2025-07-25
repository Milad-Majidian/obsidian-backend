
import express from 'express'
import * as categoryController from '@/modules/website/controllers/category.controller'

const router = express.Router()

router.post('/', categoryController.addCategory)
router.get('/:id', categoryController.getCategoryById)
router.get('/',categoryController.getAllCategories)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id',categoryController.deleteCategory)

export default router


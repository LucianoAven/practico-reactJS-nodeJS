const express = require('express')
const router = express.Router()
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products.controllers')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', createProduct),
router.put('/:id', updateProduct),
router.delete('/:id', deleteProduct)

module.exports = router
const express = require('express')

const adminCtrl = require('../controllers/admin')

const router = express.Router()

// GET /admin/products
router.get('/products', adminCtrl.products)

// GET /admin/add-product
router.get('/add-product', adminCtrl.addProduct)

// GET /admin/edit-product/:id
router.get('/edit-product/:id', adminCtrl.editProduct)

// POST /admin/products
router.post('/products', adminCtrl.createProduct)

// POST /admin/products/update
router.post('/products/update/:id', adminCtrl.updateProduct)

// FIXME: Should be DELETE request
router.post('/product/delete/:id', adminCtrl.deleteProduct)

module.exports = router

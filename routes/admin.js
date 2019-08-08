const express = require('express')

const adminCtrl = require('../controllers/admin')
const isAdmin = require('../middleware/is-admin')

const router = express.Router()

// GET /admin/products
router.get('/products', isAdmin, adminCtrl.products)

// GET /admin/add-product
router.get('/add-product', isAdmin, adminCtrl.addProduct)

// GET /admin/edit-product/:id
router.get('/edit-product/:id', isAdmin, adminCtrl.editProduct)

// POST /admin/products
router.post('/products', isAdmin, adminCtrl.createProduct)

// POST /admin/products/update
router.post('/products/update/:id', isAdmin, adminCtrl.updateProduct)

// FIXME: Should be DELETE request
router.post('/product/delete/:id', isAdmin, adminCtrl.deleteProduct)

module.exports = router

const express = require('express')

const adminCtrl = require('../controllers/admin')

const router = express.Router()

// GET /admin/products
router.get('/products', adminCtrl.products)

// GET /admin/add-product
router.get('/add-product', adminCtrl.addProduct)

// POST /admin/products
router.post('/products', adminCtrl.createProduct)

module.exports = router

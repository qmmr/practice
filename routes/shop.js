const express = require('express')

const shopCtrl = require('../controllers/shop')

const router = express.Router()

// GET / a.k.a. shop index
router.get('/', shopCtrl.index)

// GET /products
router.get('/products', shopCtrl.products)

// GET /cart
router.get('/cart', shopCtrl.cart)

// GET /cart
router.get('/checkout', shopCtrl.checkout)

// POST /cart
// TODO: Not implemented yet
router.post('/cart', shopCtrl.addToCart)

module.exports = router

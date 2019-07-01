const express = require('express')

const shopCtrl = require('../controllers/shop')

const router = express.Router()

// GET / a.k.a. shop index
router.get('/', shopCtrl.index)

// GET /products
router.get('/products', shopCtrl.products)

// GET /products/:id
router.get('/products/:id', shopCtrl.productById)

// GET /cart
router.get('/cart', shopCtrl.cart)

// GET /cart
router.get('/orders', shopCtrl.orders)

// GET /checkout
router.get('/checkout', shopCtrl.checkout)

// POST /checkout
router.post('/checkout', shopCtrl.addToCheckout)

// POST /cart
router.post('/cart', shopCtrl.addToCart)

// POST /cart/remove
router.post('/cart/remove', shopCtrl.removeFromCart)

module.exports = router

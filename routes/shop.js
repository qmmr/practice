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

// GET /cart
router.get('/checkout', shopCtrl.checkout)

// POST /cart
router.post('/cart', shopCtrl.addToCart)

// FIXME: That should be FE DELETE action...k
router.post('/cart/remove', shopCtrl.removeFromCart)

module.exports = router

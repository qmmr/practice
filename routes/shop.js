const express = require('express')

const shopCtrl = require('../controllers/shop')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET / a.k.a. shop index
router.get('/', shopCtrl.index)

// GET /products
router.get('/products', shopCtrl.products)

// GET /products/:id
router.get('/products/:id', shopCtrl.productById)

// GET /cart
router.get('/cart', isAuth, shopCtrl.cart)

// GET /cart
router.get('/orders', isAuth, shopCtrl.orders)

// GET /checkout
router.get('/checkout', isAuth, shopCtrl.checkout)

// POST /checkout
router.post('/checkout', isAuth, shopCtrl.addToCheckout)

// POST /cart
router.post('/cart', isAuth, shopCtrl.addToCart)

// POST /cart/remove
router.post('/cart/remove', isAuth, shopCtrl.removeFromCart)

module.exports = router

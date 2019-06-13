const express = require('express')
// const bodyParser = require('body-parser')

const shopCtrl = require('../controllers/shop')

const router = express.Router()

// router.use(bodyParser.urlencoded({ extended: true }))

const items = []

// GET / a.k.a. shop index
router.get('/', shopCtrl.index)

// GET /products
router.get('/products', shopCtrl.products)

// GET /cart
router.get('/cart', shopCtrl.cart)

// POST /cart
router.post('/cart', (req, res, next) => {
  // Add item to the cart
  const { name, price } = req.body
  const quantity = parseInt(req.body.quantity, 10)
  // console.log(`name: ${name}, quantity: ${quantity}, price: ${price}`)

  const item = { name, quantity, price: quantity * parseFloat(price, 10) }
  items.push(item)

  res.status(200).send({ item })
})

module.exports = router
